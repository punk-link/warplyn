

export const errorsMessages = {
    "errors.activeConnectionRemovalBlocked": "Choose another active AI connection before removing this one.",
    "errors.activeConnectionRequired": "Add and select an AI connection first.",
    "errors.aiConnectionNotFound": "Couldn't find that AI connection. Choose another connection and try again.",
    "errors.aiConnectionVerificationFailed": "The AI provider could not verify this connection. Check the variable and its key, then try again.",
    "errors.articleNotFound": "Couldn't find that Article. Select an existing Article and try again.",
    "errors.assistantCheckpointConflict": "The Assistant conversation changed. Review the updated restoration details and try again.",
    "errors.assistantCheckpointInvalid": "That conversation checkpoint is no longer available. Choose another Author message.",
    "errors.assistantCoordinatorFailed": "Couldn't finish that Assistant action. Your Article was not changed. Try again.",
    "errors.assistantEditConflict": "The Article or Draft changed. Save or resolve current work, then request a fresh edit.",
    "errors.assistantEditInvalid": (
        "The Assistant could not produce a safe replacement. Your Article was not changed. Try a narrower selection or " +
        "a more specific instruction."
    ),
    "errors.assistantRequestConflict": "That Assistant action is already running. Wait for it to finish before trying again.",
    "errors.assistantRequestTimedOut": (
        "This Assistant request reached its time limit. Your Article was not changed. Retry or increase the request tim" +
        "e limit in General Settings."
    ),
    "errors.assistantRetryInvalid": "That Assistant action can't be retried. Start it again from the Assistant.",
    "errors.assistantSelectionInvalid": "That selection can't be used for this Assistant action. Change it and try again.",
    "errors.assistantSkillScopeIncompatible": "That Assistant action can't use this selection. Change the selection and try again.",
    "errors.assistantSkillUnsupported": "That Assistant action isn't available. Choose another action.",
    "errors.duplicateStyleCorpusItem": "This text is already in the style corpus.",
    "errors.editorialConfigurationMissing": "Couldn't start that AI-assisted action. Choose a compatible model in Settings, then try again.",
    "errors.editorialOperationUnsupported": "That AI-assisted action isn't available. Choose another action.",
    "errors.editorialProviderFailed": (
        "Couldn't finish that AI-assisted action. Your Article was not changed. Try again, or check your AI connection " +
        "in Settings."
    ),
    "errors.editorialRequestFailed": (
        "Couldn't complete that AI-assisted action. Your Article was not changed. Try again, or check your AI connectio" +
        "n in Settings."
    ),
    "errors.editorialStreamIncomplete": "Couldn't finish that AI-assisted action. Your Article was not changed. Try again.",
    "errors.environmentVariableUnavailable": "The {environmentVariableName} variable isn't available. Add it, then try again.",
    "errors.factCorrectionSelectionInvalid": (
        "Couldn't prepare corrections because the selected Findings are no longer current or need review. Run" +
        " Fact Check again, then select unresolved disputed or unverifiable Findings."
    ),
    "errors.generic": "Couldn't finish that action. Your Article was not changed. Try again.",
    "errors.invalidEnvironmentVariableName": "Enter an environment-variable name using capital letters, numbers, and underscores.",
    "errors.invalidJson": "Couldn't finish that action because some information was invalid. Check it and try again.",
    "errors.invalidKeyBinding": "Enter a complete shortcut using a non-modifier key.",
    "errors.invalidRequest": "Couldn't finish that action because some information was invalid. Check it and try again.",
    "errors.keyBindingConflict": "Choose a shortcut that is not already assigned.",
    "errors.managedCredentialMissing": (
        "This connection has no API key in Warplyn. Add a new API-key connection and select it for your models, then re" +
        "move this old connection."
    ),
    "errors.managedCredentialsUnavailable": "Secure credential storage is unavailable on this device. Choose Environment variable instead.",
    "errors.originNotPermitted": "Couldn't finish that action in this app window. Reopen Warplyn and try again.",
    "errors.proposalEditInvalid": (
        "Couldn't apply your edited Proposal. Your Article was not changed. Keep the proposed numbers, links," +
        " code, and technical terms unchanged, then try again. If the Proposal is unavailable, generate a new" +
        " one."
    ),
    "errors.requestTooLarge": "Couldn't finish that action because the selected content is too large. Reduce it and try again.",
    "errors.resourceNotFound": "Couldn't find what that action needs. Refresh Warplyn and try again.",
    "errors.revisionConflict": (
        "Couldn't save because this Article changed first. Your latest changes are still in the editor; review the conf" +
        "lict and try again."
    ),
    "errors.revisionNotFound": "Couldn't find that Revision. Choose another Revision and try again.",
    "errors.skillPackageConflict": (
        "This Skill changed or its ID or name is already in use. Reload the Skill list, choose an available name if nee" +
        "ded, then try again."
    ),
    "errors.skillRevisionNotFound": "That Skill Revision is unavailable. List the Skill's Revisions again and choose one that exists.",
    "errors.styleCorpusRequired": "Add at least one style corpus item before checking style.",
    "errors.targetLanguageRequired": "Choose a target language before requesting a translation.",
    "errors.unsupportedPublishingProfile": "Choose a supported publishing profile.",
} satisfies Record<string, string>;
