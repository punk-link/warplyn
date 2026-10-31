import {
    APPLICATION_ERROR, getAiModelPreferenceId, parseAiModelPreferenceId, type AiConnection,
    type AppModelPreference, type ApplicationSettingsSnapshot, type AvailableAiModel,
    type BackupPolicy, type GeneralSettings, type KeyBindingOverrides, type ModelPreferences, type TelemetryCaptureSource,
} from "@skladno/shared";

import { failure, success, type ApplicationResult } from "../errors/application-result.js";
import { unwrapApplicationResult } from "../errors/unwrap-application-result.js";
import type { AvailableModelsProvider } from "./available-models-provider.js";
import type { BackupSnapshotCreator } from "./backup-snapshot-creator.js";
import type { SettingsStore } from "./settings-store.js";
import type { SystemDateTimeFormatProvider } from "./system-date-time-format-provider.js";
import { AiConnectionOperations } from "./ai-connection-operations.js";
import type { CredentialStore } from "./credential-store.js";
import {
    prepareGeneralSettings, prepareKeyBindingOverrides, normalizeAiConnections,
    normalizeAppModel, normalizeBackupPolicy, normalizeGeneralSettings, normalizeModelPreferences, normalizeStoredKeyBindingOverrides,
} from "./application-settings-normalizers.js";


export class ApplicationSettingsService {
    private readonly connections: AiConnectionOperations;


    private readonly pendingBackups = new Set<ReturnType<BackupSnapshotCreator["createTemporary"]>>();


    constructor(
        private readonly settings: SettingsStore,
        private readonly dateTimeFormat: SystemDateTimeFormatProvider,
        private readonly models: AvailableModelsProvider,
        createConnectionId: () => string,
        private readonly backups?: BackupSnapshotCreator,
        credentialStore?: CredentialStore,
        telemetry?: TelemetryCaptureSource,
    ) {
        this.connections = new AiConnectionOperations(settings, models, createConnectionId, credentialStore, telemetry);
    }


    async getSnapshot(): Promise<ApplicationSettingsSnapshot> {
        const connections = normalizeAiConnections(this.settings.getSetting("application-ai-connections")?.value);
        const { preferences, selectedAppModel } = this.readModelSettings(connections.activeConnectionId);
        return {
            general: normalizeGeneralSettings(this.settings.getSetting("application-general")?.value),
            systemDateTimeFormat: await this.dateTimeFormat.read(),
            connections: connections.connections,
            modelPreferences: preferences,
            ...(selectedAppModel ? { appModel: selectedAppModel } : {}),
            backupPolicy: normalizeBackupPolicy(this.settings.getSetting("application-backup-policy")?.value),
            keyBindingOverrides: normalizeStoredKeyBindingOverrides(this.settings.getSetting("application-key-bindings")?.value),
        };
    }


    private readModelSettings(activeConnectionId: string | undefined) {
        const rawPreferences = this.settings.getSetting("application-model-preferences")?.value;
        const legacyPreferences = this.readLegacyPreferences(rawPreferences);
        const preferences = legacyPreferences && typeof legacyPreferences === "object" && !Array.isArray(legacyPreferences)
            ? normalizeModelPreferences((legacyPreferences as Record<string, unknown>)[activeConnectionId ?? ""], activeConnectionId)
            : normalizeModelPreferences(rawPreferences, activeConnectionId);
        const appModelRecord = this.settings.getSetting("application-app-model");
        const savedAppModel = normalizeAppModel(appModelRecord?.value, activeConnectionId);
        const legacyAppModel = appModelRecord
            ? undefined
            : normalizeAppModel(rawPreferences, activeConnectionId);

        const selectedAppModel = savedAppModel ?? legacyAppModel;

        const hasLegacyModelIds = this.hasLegacyModelIds(rawPreferences, legacyPreferences);

        if (legacyPreferences || hasLegacyModelIds || legacyAppModel)
            this.settings.saveSetting("application-model-preferences", preferences);

        if (!savedAppModel && legacyAppModel)
            this.settings.saveSetting("application-app-model", legacyAppModel);

        return { preferences, selectedAppModel };
    }


    private readLegacyPreferences(value: unknown): unknown {
        return value && typeof value === "object" && !Array.isArray(value)
            ? (value as { byConnection?: unknown }).byConnection
            : undefined;
    }


    private hasLegacyModelIds(rawPreferences: unknown, legacyPreferences: unknown): boolean {
        return Boolean(rawPreferences && typeof rawPreferences === "object" && !Array.isArray(rawPreferences) &&
            !legacyPreferences && typeof (rawPreferences as { defaultModel?: unknown }).defaultModel === "string" &&
            !parseAiModelPreferenceId((rawPreferences as { defaultModel: string }).defaultModel));
    }


    updateGeneral(value: unknown): GeneralSettings {
        const normalized = unwrapApplicationResult(prepareGeneralSettings(value));
        this.settings.saveSetting("application-general", normalized);

        return normalized;
    }


    updateBackupPolicy(value: unknown): BackupPolicy {
        const normalized = normalizeBackupPolicy(value);
        this.settings.saveSetting("application-backup-policy", normalized);

        return normalized;
    }


    async createBackup(): ReturnType<BackupSnapshotCreator["createTemporary"]> {
        return unwrapApplicationResult(await this.createTrackedBackup());
    }


    private async createTrackedBackup(): Promise<ApplicationResult<Awaited<ReturnType<BackupSnapshotCreator["createTemporary"]>>>> {
        if (!this.backups)
            return failure(APPLICATION_ERROR.EDITORIAL_REQUEST_FAILED, "unavailable");

        const pending = this.backups.createTemporary();
        this.pendingBackups.add(pending);
        try {
            return success(await pending);
        } finally {
            this.pendingBackups.delete(pending);
        }
    }


    async waitForBackups(): Promise<void> {
        while (this.pendingBackups.size > 0)
            await Promise.allSettled(this.pendingBackups);
    }


    updateKeyBindingOverrides(value: unknown): KeyBindingOverrides {
        const normalized = unwrapApplicationResult(prepareKeyBindingOverrides(value));
        this.settings.saveSetting("application-key-bindings", normalized);

        return normalized;
    }


    updateModelPreferences(value: unknown): ModelPreferences {
        const normalized = normalizeModelPreferences(value);
        this.settings.saveSetting("application-model-preferences", normalized);

        return normalized;
    }


    updateAppModel(value: unknown): AppModelPreference | null {
        const normalized = normalizeAppModel(value);
        this.settings.saveSetting("application-app-model", normalized ?? null);

        return normalized ?? null;
    }


    createAiConnection(value: { provider?: unknown; label?: unknown; environmentVariableName?: unknown }): AiConnection {
        return unwrapApplicationResult(this.connections.create(value));
    }


    async createManagedAiConnection(value: { provider?: unknown; label?: unknown; apiKey?: unknown }): Promise<AiConnection> {
        return unwrapApplicationResult(await this.connections.createManaged(value));
    }


    setAiConnectionActive(connectionId: string, active: boolean): AiConnection {
        return unwrapApplicationResult(this.connections.setActive(connectionId, active));
    }


    async testAiConnection(connectionId: string): Promise<AiConnection> {
        return unwrapApplicationResult(await this.connections.test(connectionId));
    }


    updateAiConnection(connectionId: string, value: { label?: unknown; environmentVariableName?: unknown }): AiConnection {
        return unwrapApplicationResult(this.connections.update(connectionId, value));
    }


    renameManagedAiConnection(connectionId: string, label: unknown): AiConnection {
        return unwrapApplicationResult(this.connections.renameManaged(connectionId, label));
    }


    deleteAiConnection(connectionId: string): void {
        unwrapApplicationResult(this.connections.delete(connectionId));
    }


    async listAiModels(): Promise<AvailableAiModel[]> {
        const saved = normalizeAiConnections(this.settings.getSetting("application-ai-connections")?.value);
        const lists = await Promise.allSettled(saved.connections.filter((connection) => connection.active).map(async (connection) =>
            (await this.models.list(connection))
                .map((model) => ({ id: getAiModelPreferenceId(connection.id, model), model, connectionId: connection.id, provider: connection.provider }))));

        return lists.flatMap((result) => result.status === "fulfilled" ? result.value : []);
    }


}
