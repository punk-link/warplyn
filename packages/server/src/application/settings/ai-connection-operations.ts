import { APPLICATION_ERROR, AI_PROVIDER, isAiProvider, type AiConnection, type AiProvider } from "@skladno/shared";
import { failure, success, type ApplicationResult } from "../errors/application-result.js";
import type { SettingsStore } from "./settings-store.js";
import type { AvailableModelsProvider } from "./available-models-provider.js";
import type { CredentialStore } from "./credential-store.js";
import { normalizeAiConnections, prepareEnvironmentVariableName } from "./application-settings-normalizers.js";


export class AiConnectionOperations {
    constructor(
        private readonly settings: SettingsStore,
        private readonly models: AvailableModelsProvider,
        private readonly createConnectionId: () => string,
        private readonly credentialStore?: CredentialStore,
    ) { }


    create(value: { provider?: unknown; label?: unknown; environmentVariableName?: unknown }): ApplicationResult<AiConnection> {
        const saved = normalizeAiConnections(this.settings.getSetting("application-ai-connections")?.value);
        const requestedName = prepareEnvironmentVariableName(value.environmentVariableName);
        if (!requestedName.ok)
            return requestedName;

        const provider = this.getProvider(value.provider);
        if (!provider.ok)
            return provider;

        const connection: AiConnection = {
            id: this.createConnectionId(),
            provider: provider.value,
            label: typeof value.label === "string" && value.label.trim()
                ? value.label.trim() : this.getProviderLabel(provider.value),
            credentialSource: { kind: "environment-variable", environmentVariableName: requestedName.value }, active: true, status: "unchecked"
        };
        saved.connections.push(connection);
        this.settings.saveSetting("application-ai-connections", { connections: saved.connections });

        return success(connection);
    }


    async createManaged(value: { provider?: unknown; label?: unknown; apiKey?: unknown }): Promise<ApplicationResult<AiConnection>> {
        if (!this.credentialStore?.available() || typeof value.apiKey !== "string" || !value.apiKey.trim())
            return failure(APPLICATION_ERROR.INVALID_REQUEST);

        const resolvedProvider = this.getProvider(value.provider);
        if (!resolvedProvider.ok)
            return resolvedProvider;

        const provider = resolvedProvider.value;
        const connection: AiConnection = {
            id: this.createConnectionId(),
            provider,
            label: typeof value.label === "string" && value.label.trim() ? value.label.trim() : this.getProviderLabel(provider),
            credentialSource: { kind: "managed" },
            active: true,
            status: "unchecked"
        };

        try {
            await this.models.list(connection, value.apiKey);
        } catch {
            return failure(APPLICATION_ERROR.AI_CONNECTION_VERIFICATION_FAILED);
        }

        this.credentialStore.set(connection.id, value.apiKey);
        try {
            const saved = normalizeAiConnections(this.settings.getSetting("application-ai-connections")?.value);
            saved.connections.push({ ...connection, status: "connected", lastCheckedAt: new Date().toISOString() });
            this.settings.saveSetting("application-ai-connections", { connections: saved.connections });

            return success(saved.connections.at(-1)!);
        } catch (error) {
            this.credentialStore.delete(connection.id);
            throw error;
        }
    }


    setActive(connectionId: string, active: boolean): ApplicationResult<AiConnection> {
        const state = this.connectionState(connectionId);
        if (!state.ok)
            return state;

        const { saved, index, connection } = state.value;
        const updated = { ...connection, active };
        saved.connections[index] = updated;
        this.settings.saveSetting("application-ai-connections", { connections: saved.connections });

        return success(updated);
    }


    async test(connectionId: string): Promise<ApplicationResult<AiConnection>> {
        const state = this.connectionState(connectionId);
        if (!state.ok)
            return state;

        const { saved, index, connection } = state.value;
        try {
            await this.models.list(connection);
            saved.connections[index] = { ...connection, status: "connected", lastCheckedAt: new Date().toISOString(), diagnostic: undefined };
        } catch (error) {
            saved.connections[index] = {
                ...connection, status: "unavailable",
                lastCheckedAt: new Date().toISOString(),
                diagnostic: error instanceof Error ? error.message : APPLICATION_ERROR.AI_CONNECTION_VERIFICATION_FAILED
            };
        }

        this.settings.saveSetting("application-ai-connections", saved);

        return success(saved.connections[index]!);
    }


    update(connectionId: string, value: { label?: unknown; environmentVariableName?: unknown }): ApplicationResult<AiConnection> {
        const state = this.connectionState(connectionId);
        if (!state.ok)
            return state;

        const { saved, index, connection } = state.value;
        const environmentName = prepareEnvironmentVariableName(value.environmentVariableName);
        if (!environmentName.ok)
            return environmentName;

        const updated = {
            ...connection,
            label: typeof value.label === "string" && value.label.trim() ? value.label.trim() : connection.label,
            credentialSource: { kind: "environment-variable" as const,
                environmentVariableName: environmentName.value },
            status: "unchecked" as const,
            diagnostic: undefined,
            lastCheckedAt: undefined
        };
        saved.connections[index] = updated;
        this.settings.saveSetting("application-ai-connections", saved);

        return success(updated);
    }


    renameManaged(connectionId: string, label: unknown): ApplicationResult<AiConnection> {
        const state = this.connectionState(connectionId);
        if (!state.ok)
            return state;

        const { saved, index, connection } = state.value;
        if (connection.credentialSource.kind !== "managed")
            return failure(APPLICATION_ERROR.INVALID_REQUEST);

        const updated = { ...connection, label: typeof label === "string" && label.trim() ? label.trim() : connection.label };
        saved.connections[index] = updated;
        this.settings.saveSetting("application-ai-connections", saved);

        return success(updated);
    }


    delete(connectionId: string): ApplicationResult<void> {
        const state = this.connectionState(connectionId);
        if (!state.ok)
            return state;

        const { saved, index, connection } = state.value;
        if (connection.credentialSource.kind === "managed")
            this.credentialStore?.delete(connection.id);

        saved.connections.splice(index, 1);
        this.settings.saveSetting("application-ai-connections", { connections: saved.connections });
        return success(undefined);
    }


    private connectionState(connectionId: string): ApplicationResult<{
        saved: { connections: AiConnection[]; activeConnectionId?: string }; index: number; connection: AiConnection;
    }> {
        const saved = normalizeAiConnections(this.settings.getSetting("application-ai-connections")?.value);
        const index = saved.connections.findIndex((connection) => connection.id === connectionId);
        if (index < 0)
            return failure(APPLICATION_ERROR.AI_CONNECTION_NOT_FOUND, "not-found");

        return success({ saved, index, connection: saved.connections[index]! });
    }


    private getProvider(value: unknown): ApplicationResult<AiProvider> {
        if (value === undefined)
            return success(AI_PROVIDER.OPENAI);

        if (!isAiProvider(value))
            return failure(APPLICATION_ERROR.INVALID_REQUEST);

        return success(value);
    }


    private getProviderLabel(provider: AiProvider): string {
        return {
            [AI_PROVIDER.OPENAI]: "OpenAI",
            [AI_PROVIDER.OPENCODE]: "OpenCode Zen",
            [AI_PROVIDER.ANTHROPIC]: "Anthropic",
            [AI_PROVIDER.GOOGLE]: "Google Gemini",
            [AI_PROVIDER.XAI]: "xAI Grok",
            [AI_PROVIDER.DEEPSEEK]: "DeepSeek",
        }[provider];
    }
}
