import type { MessageId } from "../../messages.js";


export const workspaceMessages = {
    "workspace.acceptProposalFailed": "Couldn't accept this Proposal. Your Article was not changed. Try again.",
    "workspace.addModelKey": "Add model key",
    "workspace.aiConnectionCapabilities": (
        "You can still write, save, organize, and copy Articles, and check typography locally. Assistant requ" +
        "ests, translations, Fact Checks, and full Style reviews need a configured model connection, includin" +
        "g a supported local model."
    ),
    "workspace.aiConnectionRequired": "Local writing is available. Set up a model to use the Assistant.",
    "workspace.badges.findings": "{count, plural, =0 {No findings} one {# finding} other {# findings}}",
    "workspace.badges.nearLimit": "Near limit",
    "workspace.badges.overLimit": "Over limit",
    "workspace.badges.ready": "Ready",
    "workspace.badges.review": "Review",
    "workspace.badges.stale": "Stale",
    "workspace.createArticleFailed": "Couldn't create this Article. Try again.",
    "workspace.createTranslationFailed": "Couldn't create this translation Article. Your original Article was not changed. Try again.",
    "workspace.deleteArticleFailed": "Couldn't delete this Article. It is still available. Try again.",
    "workspace.loadingArticles": "Loading your local articles…",
    "workspace.renameArticleFailed": "Couldn't rename this Article. Its previous title is still saved. Try again.",
    "workspace.resolveFindingFailed": "Couldn't update that Finding. Your Article was not changed. Try again.",
    "workspace.restoreRevisionFailed": "Couldn't restore that Revision. Your Article was not changed. Try again.",
    "workspace.revisionHistoryFailed": "Couldn't load Revision history. Your Article was not changed. Refresh and try again.",
    "workspace.saveFailed": "Couldn't save this Draft. Your latest changes are still in the editor. Try saving again.",
    "workspace.serviceUnavailable": "Your local service is unavailable. Start it, then retry.",
    "workspace.styleCorpusAddFailed": "Couldn't add that text to the Style Profile. Your Style Profile was not changed. Try again.",
    "workspace.styleCorpusLoadFailed": "Couldn't load the Style Profile. Refresh and try again.",
    "workspace.styleCorpusRebuildFailed": "Couldn't rebuild the Style Profile. Your previous Style Profile is still available. Try again.",
    "workspace.styleCorpusRemoveFailed": "Couldn't remove that text from the Style Profile. Your Style Profile was not changed. Try again.",
    "workspace.styleCorpusSnapshotFailed": "Couldn't add that Revision to the Style Profile. Your Style Profile was not changed. Try again.",
    "workspace.styleCorpusUpdateFailed": "Couldn't update the Style Profile. Your previous Style Profile is still saved. Try again.",
    "workspace.styleRulesLoadFailed": "Couldn't load Style Profile rules. Refresh and try again.",
    "workspace.styleRulesSaveFailed": "Couldn't save Style Profile rules. Your previous rules are still saved. Try again.",
    "workspace.tabs.ariaLabel": "Article workspace views",
    "workspace.tabs.factCheck": "Fact Check",
    "workspace.tabs.proposal": "Proposals",
    "workspace.tabs.revisions": "Revisions",
    "workspace.tabs.styleProfile": "Style Profile",
    "workspace.tabs.translations": "Translations",
    "workspace.tabs.write": "Write",
    "workspace.updateArticleFailed": "Couldn't update this Article. Your latest changes are still in the editor. Try again.",
} satisfies Partial<Record<MessageId, string>>;
