import { useIntl } from "react-intl";
import type { KeyBindingOverrides, ThemePreference } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "./application/client.js";
import type { ApplicationScreen } from "./application-screen.js";
import type { KeyBindingDispatcher } from "./key-bindings/dispatcher.js";
import { ApplicationSettings } from "./settings/ApplicationSettings.js";
import type { SettingsSection } from "./settings/settings-sections.js";
import { ActivityIndicator, Banner } from "./ui/primitives.js";
import { EditorialWorkspace } from "./workspace/EditorialWorkspace.js";
import { StyleProfileScreen } from "./workspace/components/StyleProfileScreen.js";
import { useEditorialWorkspace } from "./workspace/state/use-editorial-workspace.js";


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
    const intl = useIntl();
    const model = useEditorialWorkspace({ client, active: screen === "editorial-workspace", navigation, bindings });
    const { workspace, editorial, revisions, generalSettings, assistant, layout } = model.content;

    if (workspace.state === "loading")
        return <main className="grid min-h-screen place-items-center text-muted" role="status">
            <span className="inline-flex items-center gap-2"><ActivityIndicator />{intl.formatMessage({ id: "workspace.loadingArticles" })}</span>
        </main>;

    if (workspace.state === "error")
        return <main className="grid min-h-screen place-items-center">
            <Banner tone="error" role="alert">{workspace.message}</Banner>
        </main>;

    if (screen === "application-settings")
        return <ApplicationSettings
            client={client}
            back={navigation.backToWorkspace}
            initialSection={settingsSection}
            onKeyBindingsUpdated={bindings.onKeyBindingsUpdated}
            onThemeApplied={bindings.onThemeApplied}
            focusUpdates={updates.focusUpdates}
            onUpdatesFocused={updates.onUpdatesFocused}
            openQuickStart={navigation.openQuickStart} />;

    if (screen === "style-profile")
        return <StyleProfileScreen
            content={{ workspace, editorial, revisions, corpus: model.corpus, generalSettings, requestActive: assistant.state === "streaming" }}
            back={navigation.backToWorkspace}
            openProposal={() => {
                layout.setView("proposal");
                navigation.backToWorkspace();
            }} />;

    return <EditorialWorkspace model={model} />;
}
