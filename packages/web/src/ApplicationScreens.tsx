import { useIntl } from "react-intl";
import type { KeyBindingOverrides, ThemePreference } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "./application/client.js";
import type { ApplicationScreen } from "./application-screen.js";
import type { KeyBindingDispatcher } from "./key-bindings/dispatcher.js";
import { ApplicationSettings } from "./settings/ApplicationSettings.js";
import type { SettingsSection } from "./settings/settings-sections.js";
import { ActivityIndicator, Banner, Button } from "./ui/primitives.js";
import { EditorialWorkspace } from "./workspace/EditorialWorkspace.js";
import { StyleProfileScreen } from "./workspace/components/StyleProfileScreen.js";
import { useEditorialWorkspace } from "./workspace/state/use-editorial-workspace.js";
import { useSkillRecovery } from "./settings/use-skill-recovery.js";


interface ApplicationScreenContext {
    client: EditorialWorkspaceClient;
    screen: ApplicationScreen;
    settingsSection: SettingsSection;
}


interface ApplicationScreenNavigation {
    openSettings: () => void;
    openStyleProfile: () => void;
    openModelSettings: () => void;
    openQuickStart: () => void;
    openSkillRecovery: () => void;
    backToWorkspace: () => void;
}


interface ApplicationScreenBindings {
    dispatcher: KeyBindingDispatcher;
    keyBindingOverrides: KeyBindingOverrides;
    onKeyBindingsUpdated: (overrides: KeyBindingOverrides) => void;
    onThemeApplied: (theme: ThemePreference) => void;
}


interface ApplicationScreenUpdates {
    focusUpdates: boolean;
    onUpdatesFocused: () => void;
}


export function ApplicationScreens({ context, navigation, bindings, updates }: {
    context: ApplicationScreenContext;
    navigation: ApplicationScreenNavigation;
    bindings: ApplicationScreenBindings;
    updates: ApplicationScreenUpdates;
}) {
    const { client, screen, settingsSection } = context;
    const model = useEditorialWorkspace({ client, active: screen === "editorial-workspace", navigation, bindings });
    const skillRecovery = useSkillRecovery(client, navigation.openSkillRecovery, model.environment.loadAuthorSkills);
    const { workspace, editorial, revisions, generalSettings, assistant, layout } = model.content;

    if (screen === "application-settings")
        return <ApplicationSettings
            client={client}
            back={navigation.backToWorkspace}
            initialSection={settingsSection}
            onKeyBindingsUpdated={bindings.onKeyBindingsUpdated}
            onThemeApplied={bindings.onThemeApplied}
            focusUpdates={updates.focusUpdates}
            onUpdatesFocused={updates.onUpdatesFocused}
            openQuickStart={navigation.openQuickStart}
            skillRecovery={skillRecovery} />;

    if (screen === "style-profile")
        return <StyleProfileScreen
            content={{ workspace, editorial, revisions, corpus: model.corpus, generalSettings, requestActive: assistant.state === "streaming" }}
            back={navigation.backToWorkspace}
            openProposal={() => {
                layout.setView("proposal");
                navigation.backToWorkspace();
            }} />;

    if (workspace.state !== "ready")
        return <WorkspaceAvailability state={workspace.state} message={workspace.message} openSettings={model.actions.openSettings} />;

    return <EditorialWorkspace model={model} />;
}


function WorkspaceAvailability({ state, message, openSettings }: {
    state: "loading" | "error";
    message: string;
    openSettings: () => void;
}) {
    const intl = useIntl();
    return <main className="grid min-h-screen place-items-center">
        <div className="flex max-w-xl flex-col items-center gap-4 p-6">
            {state === "loading" ? (
                <span role="status" className="inline-flex items-center gap-2 text-muted">
                    <ActivityIndicator />{intl.formatMessage({ id: "workspace.loadingArticles" })}
                </span>
            ) : (
                <Banner tone="error" role="alert">{message}</Banner>
            )}
            <Button variant="secondary" onClick={openSettings}>{intl.formatMessage({ id: "navigation.settings" })}</Button>
        </div>
    </main>;
}
