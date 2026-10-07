import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import type { DesktopSpellingSnapshot, DesktopSpellingRequest, DesktopSpellingResult } from "@skladno/shared";
import { renderLocalized, createFakeClient } from "../workspace/EditorialWorkspace.test-utils.js";
import { SpellingSettingsSection } from "./components/SpellingSettingsSection.js";
import { ApplicationSettings } from "./ApplicationSettings.js";
import { NotificationProvider } from "../notifications/NotificationProvider.js";

afterEach(() => {
    cleanup();
    window.warplynSpelling = undefined;
});

// Product scenarios: settings.spelling-dictionaries, settings.spelling-personal-words
it("prepares dictionaries and retains failed technical words for retry", async () => {
    const user = userEvent.setup();
    const snapshot: DesktopSpellingSnapshot = { dictionaries: { supported: ["af", "en-US", "pt-BR"], requested: [], states: { "en-US": "ready" } }, personal: { words: ["gRPC"], failed: [], affectsSystem: true } };
    const request = vi.fn(async (input: DesktopSpellingRequest): Promise<DesktopSpellingResult> => {
        if (input.method === "prepare") {
            snapshot.dictionaries.requested = input.languages;
            snapshot.dictionaries.states = { "en-US": "ready", af: "ready", "pt-BR": "ready" };
        }

        if (input.method === "unload") {
            snapshot.dictionaries.states[input.language] = "unloaded";
            snapshot.dictionaries.requested = snapshot.dictionaries.requested.filter((language) => language !== input.language);
        }

        if (input.method === "addWords")
            snapshot.personal = { words: ["gRPC", "PostgreSQL"], failed: ["failedterm"], affectsSystem: true };

        if (input.method === "removeWord")
            snapshot.personal = { words: ["PostgreSQL"], failed: [], affectsSystem: true };

        return { ok: true as const, value: { ...snapshot } };
    });
    window.warplynSpelling = { setArticleLanguage: vi.fn(), request };
    renderLocalized(<SpellingSettingsSection />);
    await screen.findByText("gRPC");
    expect(screen.getByText(/also changes your operating system/)).toBeTruthy();
    const languages = screen.getByRole("group", { name: "Language dictionaries" }).textContent ?? "";
    expect(languages.indexOf("en-US")).toBeLessThan(languages.indexOf("Afrikaans"));
    expect(screen.queryByRole("checkbox", { name: /en-US/ })).toBeNull();
    await user.click(screen.getByRole("checkbox", { name: /Afrikaans/ }));
    const filter = screen.getByRole("searchbox", { name: "Filter languages" });
    await user.type(filter, "Portuguese");
    expect(screen.getAllByRole("checkbox")).toHaveLength(1);
    await user.clear(filter);
    await user.type(filter, "PT-br");
    await user.click(screen.getByRole("checkbox", { name: /pt-BR/ }));
    await user.click(screen.getByRole("button", { name: "Download dictionaries" }));
    await waitFor(() => expect(request).toHaveBeenCalledWith({ method: "prepare", languages: ["af", "pt-BR"] }));
    expect(await screen.findByText("Downloaded")).toBeTruthy();
    expect(screen.queryByRole("checkbox", { name: /pt-BR/ })).toBeNull();
    expect(screen.getByRole("button", { name: "Download dictionaries" }).hasAttribute("disabled")).toBe(true);
    await user.click(screen.getByRole("button", { name: /Unload.*pt-BR/ }));
    await screen.findByText("Unloaded");
    expect(request).toHaveBeenCalledWith({ method: "unload", language: "pt-BR" });
    expect((screen.getByRole("checkbox", { name: /pt-BR/ }) as HTMLInputElement).checked).toBe(false);
    await user.clear(filter);
    await user.type(filter, "absent");
    expect(screen.getByText("No matching languages.")).toBeTruthy();
    await user.type(screen.getByRole("textbox", { name: "Words to add" }), "PostgreSQL\nfailedterm");
    await user.click(screen.getByRole("button", { name: "Add words" }));
    await waitFor(() => {
        const input = screen.getByRole("textbox", { name: "Words to add" });
        expect(input instanceof HTMLTextAreaElement ? input.value : undefined).toBe("failedterm");
    });
    expect(screen.getByText(/Some words couldn't be added/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Remove gRPC from personal dictionary" }));
    await waitFor(() => expect(request).toHaveBeenCalledWith({ method: "removeWord", word: "gRPC" }));
    await user.type(screen.getByRole("textbox", { name: "Search personal dictionary" }), "absent");
    expect(screen.getByText("No matching personal words.")).toBeTruthy();
});

it("keeps input on native failure and exposes desktop guidance through Settings navigation", async () => {
    const user = userEvent.setup();
    const snapshot: DesktopSpellingSnapshot = { dictionaries: { supported: [], requested: [], states: {} }, personal: { words: [], failed: [], affectsSystem: false } };
    window.warplynSpelling = { setArticleLanguage: vi.fn(), request: vi.fn(async (request: DesktopSpellingRequest): Promise<DesktopSpellingResult> => request.method === "snapshot" ? { ok: true, value: snapshot } : { ok: false }) };
    const view = renderLocalized(<SpellingSettingsSection />);
    await screen.findByText("Spelling settings loaded.");
    await user.type(screen.getByRole("textbox", { name: "Words to add" }), "gRPC");
    await user.click(screen.getByRole("button", { name: "Add words" }));
    await screen.findByText(/Couldn't update spelling settings/);
    const input = screen.getByRole("textbox", { name: "Words to add" });
    expect(input instanceof HTMLTextAreaElement ? input.value : undefined).toBe("gRPC");
    view.unmount();
    window.warplynSpelling = undefined;
    renderLocalized(<NotificationProvider><ApplicationSettings client={createFakeClient()} back={vi.fn()} /></NotificationProvider>);
    await user.click(screen.getByRole("button", { name: "Spelling" }));
    expect(await screen.findByText(/Use the desktop app to download/)).toBeTruthy();
});
