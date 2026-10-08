import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { settingsFocusAreas, useFocusAreaNavigation } from "./focus-area-navigation.js";


function SettingsFocusAreas() {
    const focusAreas = useFocusAreaNavigation(settingsFocusAreas);
    return <main ref={focusAreas.ref} onFocusCapture={focusAreas.onFocusCapture} onKeyDownCapture={focusAreas.onKeyDownCapture}>
        <aside data-focus-area="settings-navigation"><button data-focus-area-entry>Navigation</button></aside>
        <section data-focus-area="settings-content"><button>First control</button><button data-focus-area-entry>Content</button><button>Second control</button></section>
    </main>;
}


it("traverses Settings navigation and content as separate areas", () => {
    render(<SettingsFocusAreas />);
    const navigation = screen.getByRole("button", { name: "Navigation" });
    navigation.focus();

    fireEvent.keyDown(navigation, { key: "Tab" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Content" }));
    const secondControl = screen.getByRole("button", { name: "Second control" });
    secondControl.focus();
    fireEvent.keyDown(secondControl, { key: "Tab" });
    expect(document.activeElement).toBe(navigation);
    fireEvent.keyDown(document.activeElement!, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Content" }));
});


it("allows native Tab navigation inside Settings content and switches areas at its boundaries", async () => {
    function SettingsControls() {
        const focusAreas = useFocusAreaNavigation(settingsFocusAreas);
        return <main ref={focusAreas.ref} onFocusCapture={focusAreas.onFocusCapture} onKeyDownCapture={focusAreas.onKeyDownCapture}>
            <aside style={{ display: "none" }} data-focus-area="settings-navigation"><button data-focus-area-entry>Hidden navigation</button></aside>
            <aside data-focus-area="settings-navigation"><button data-focus-area-entry>Back</button></aside>
            <section data-focus-area="settings-content" data-focus-area-native-tab>
                <input aria-label="First setting" />
                <button disabled>Unavailable</button>
                <div hidden><button>Hidden setting</button></div>
                <button>Last setting</button>
            </section>
        </main>;
    }


    const user = userEvent.setup();
    render(<SettingsControls />);
    const first = screen.getByRole("textbox", { name: "First setting" });
    const last = screen.getByRole("button", { name: "Last setting" });
    first.focus();
    await user.tab();
    expect(document.activeElement).toBe(last);
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(first);
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Back" }));
    await user.tab();
    expect(document.activeElement).toBe(first);
    last.focus();
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Back" }));
});


it("enters a content-editable Writing Surface", () => {
    function WritingSurface() {
        const focusAreas = useFocusAreaNavigation(["toolbar", "article-editor"]);
        return <main ref={focusAreas.ref} onFocusCapture={focusAreas.onFocusCapture} onKeyDownCapture={focusAreas.onKeyDownCapture}>
            <div data-focus-area="toolbar"><button data-focus-area-entry>Toolbar</button></div>
            <div data-focus-area="article-editor"><div data-focus-area-entry contentEditable aria-label="Writing Surface" /></div>
        </main>;
    }


    render(<WritingSurface />);
    const toolbar = screen.getByRole("button", { name: "Toolbar" });
    toolbar.focus();

    fireEvent.keyDown(toolbar, { key: "Tab" });
    expect(document.activeElement).toBe(screen.getByLabelText("Writing Surface"));
});


it("skips inert results and reaches composer controls in both directions", () => {
    function BusyWorkspace() {
        const focusAreas = useFocusAreaNavigation(["workspace-views", "article-editor", "assistant-composer"]);
        return <main ref={focusAreas.ref} onFocusCapture={focusAreas.onFocusCapture} onKeyDownCapture={focusAreas.onKeyDownCapture}>
            <button data-focus-area="workspace-views">Views</button>
            <div {...{ inert: "" }}><button data-focus-area="article-editor" data-focus-area-entry>Previous result</button></div>
            <button data-focus-area="assistant-composer" data-focus-area-entry>Stop request</button>
        </main>;
    }


    render(<BusyWorkspace />);
    const views = screen.getByRole("button", { name: "Views" });
    const stop = screen.getByRole("button", { name: "Stop request" });
    views.focus();
    fireEvent.keyDown(views, { key: "Tab" });
    expect(document.activeElement).toBe(stop);
    fireEvent.keyDown(stop, { key: "Tab" });
    expect(document.activeElement).toBe(views);
    fireEvent.keyDown(document.activeElement!, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(stop);
});
