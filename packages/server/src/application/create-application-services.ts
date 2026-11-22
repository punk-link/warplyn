import type { ApplicationServices } from "./application-services.js";
import { ArticleService } from "./articles/article-service.js";
import { AssistantService } from "./assistant/assistant-service.js";
import type { AvailableModelsProvider } from "./settings/available-models-provider.js";
import type { BackupSnapshotCreator } from "./settings/backup-snapshot-creator.js";
import type { AssistantArtifactStore } from "./assistant/assistant-artifact-store.js";
import type { AssistantStore } from "./assistant/assistant-store.js";
import type { EditorialEngineResolver } from "./editorial/engine/editorial-engine-resolver.js";
import { PublishingService } from "./publishing/publishing-service.js";
import { StyleCorpusService } from "./editorial/style/style-corpus-service.js";
import { ApplicationSettingsService } from "./settings/application-settings-service.js";
import { ProposalSummaryService } from "./editorial/proposals/proposal-summary-service.js";
import { FactCheckService } from "./editorial/fact-checking/fact-check-service.js";
import type { FactCheckRunStore } from "./editorial/fact-checking/fact-check-run-store.js";
import type { ArticleStore } from "./articles/article-store.js";
import type { SettingsStore } from "./settings/settings-store.js";
import type { StyleCorpusStore } from "./editorial/style/style-corpus-store.js";
import type { SystemDateTimeFormatProvider } from "./settings/system-date-time-format-provider.js";
import type { CredentialStore } from "./settings/credential-store.js";
import { EditorialCapabilityCatalog } from "./assistant/capabilities/editorial-capability-catalog.js";
import { AssistantCapabilityLoop } from "./assistant/capabilities/assistant-capability-loop.js";
import { AssistantCompletionService } from "./assistant/completion/assistant-completion-service.js";
import { AssistantRequestPreparer } from "./assistant/requests/assistant-request-preparer.js";
import { getConversationHistory } from "./assistant/requests/conversation-history.js";
import type { EditorialService } from "./editorial/editorial-service.js";
import type { TelemetryObserver } from "./telemetry/telemetry-observer.js";
import { CreateApplicationServicesOptions } from "./create-application-services-options.js";
import { AssistantSkillRecoveryService } from "./assistant/skills/assistant-skill-recovery-service.js";


export interface ApplicationServiceStores {
    articles: ArticleStore;
    styleCorpus: StyleCorpusStore;
    assistant: AssistantStore;
    artifacts: AssistantArtifactStore;
    engines: EditorialEngineResolver;
    factChecks?: ConstructorParameters<typeof FactCheckService>[0] & FactCheckRunStore;
}


export interface ApplicationSettingsDependencies {
    settings: SettingsStore;
    dateTimeFormat: SystemDateTimeFormatProvider;
    models: AvailableModelsProvider;
    createConnectionId: () => string;
    backups?: BackupSnapshotCreator;
    credentialStore?: CredentialStore;
}


export interface ApplicationServiceIntegration {
    editorial?: EditorialService;
    telemetry?: TelemetryObserver;
}


export function createApplicationServices({
    stores, settings, integration = {}, skills: { catalog: skills, authorSkills: authorSkillService },
}: CreateApplicationServicesOptions): ApplicationServices {
    const factChecks = stores.factChecks ?? { listFactChecks: () => [], resolveFactCheckFinding: () => undefined, saveFactCheckRun: () => undefined };
    const articleService = new ArticleService(stores.articles, stores.assistant, integration.telemetry, () => stores.engines.resolveRevisionDescriptionGenerator?.(), () => stores.engines.resolveArticleTitleGenerator?.());
    const publishing = new PublishingService(settings.settings);
    const factCheckService = new FactCheckService(factChecks);
    const styleCorpusService = new StyleCorpusService(stores.styleCorpus, stores.engines, stores.articles, stores.artifacts);
    const capabilities = integration.editorial
        ? new EditorialCapabilityCatalog(articleService, stores.artifacts, publishing, integration.editorial, styleCorpusService, factChecks, stores.assistant)
        : undefined;
    const preparation = new AssistantRequestPreparer({ articles: stores.articles, assistant: stores.assistant, styleCorpus: stores.styleCorpus, engines: stores.engines, capabilities, skills });
    const capabilityLoop = new AssistantCapabilityLoop({ assistant: stores.assistant, engines: stores.engines, capabilities, authorSkills: authorSkillService, skills, conversationHistory: (articleId, limit) => getConversationHistory(stores.assistant, articleId, limit) });
    const completion = new AssistantCompletionService({ articles: stores.articles, assistant: stores.assistant, styleCorpus: stores.styleCorpus, artifacts: stores.artifacts, factChecks, capabilities });

    return {
        articles: articleService,
        assistant: new AssistantService({ assistant: stores.assistant, styleCorpus: stores.styleCorpus, factChecks, settings: settings.settings }, articleService, integration.telemetry, preparation, capabilityLoop, completion),
        settings: new ApplicationSettingsService(settings.settings, settings.dateTimeFormat, settings.models,
            settings.createConnectionId, settings.backups, settings.credentialStore, integration.telemetry),
        publishing,
        styleCorpus: styleCorpusService,
        proposalSummaries: new ProposalSummaryService(stores.engines, stores.artifacts),
        factChecks: factCheckService,
        skills,
        skillRecovery: new AssistantSkillRecoveryService(authorSkillService, stores.assistant),
        ...(authorSkillService ? { authorSkills: authorSkillService } : {}),
        ...(capabilities ? { capabilities } : {}),
    };
}
