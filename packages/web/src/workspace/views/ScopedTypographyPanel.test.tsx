import { useState } from "react";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { articleLanguages, type StyleCorpus, type TypographyConfigurationUpdate } from "@skladno/shared";
import { renderLocalized, resetWorkspaceTestEnvironment } from "../EditorialWorkspace.test-utils.js";
import { ScopedTypographyPanel } from "./ScopedTypographyPanel.js";

afterEach(resetWorkspaceTestEnvironment);

const getArticle = vi.fn().mockResolvedValue(undefined);


function Harness({ save, legacy = false }: { save: (input: TypographyConfigurationUpdate) => Promise<void>; legacy?: boolean }) {
    const [corpus, setCorpus] = useState<StyleCorpus>({
        items: [], rules: "", status: "ready",
        typographyRules: legacy ? [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }] : [],
        typographyConfiguration: { version: 1, languages: {} },
    });
    return <ScopedTypographyPanel data={{ corpus, articleId: "one", language: "en" }} actions={{
        getArticle, check: async () => undefined,
        save: async (input) => {
            await save(input);
            if (!input.articleId)
                setCorpus((current) => ({ ...current, typographyConfiguration: {
                    version: 1, languages: { ...current.typographyConfiguration?.languages, [input.language]: input.preferences },
                } }));
        },
    }} />;
}


it("retains unsaved rule drafts when switching languages and saves only the active scope", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockResolvedValue(undefined);
    renderLocalized(<Harness save={save} />);
    const languageOptions = within(screen.getByRole("combobox", { name: "Typography language" })).getAllByRole("option");
    expect(languageOptions.map((option) => option.getAttribute("value"))).toEqual(articleLanguages);
    await waitFor(() => expect(screen.getByRole("button", { name: "Add rule" })).toHaveProperty("disabled", false));
    await user.click(screen.getByRole("button", { name: "Add rule" }));
    await user.selectOptions(screen.getByRole("combobox", { name: "Typography language" }), "ru");
    expect(screen.queryByRole("group", { name: "Rule 1" })).toBeNull();
    await user.selectOptions(screen.getByRole("combobox", { name: "Typography language" }), "en");
    expect(within(screen.getByRole("group", { name: "Rule 1" })).getByText("Unsaved")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(save).toHaveBeenCalledOnce());
    expect(save.mock.calls[0]?.[0]).toMatchObject({ language: "en", preferences: { rules: [{ definition: { kind: "ellipsis" } }], disabled: [] } });
    expect(screen.getByRole("button", { name: "Check typography" })).toHaveProperty("disabled", false);
});

it("copies recoverable legacy rules explicitly and can disable and restore an inherited Article rule", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockResolvedValue(undefined);
    renderLocalized(<Harness save={save} legacy />);
    await user.click(await screen.findByRole("button", { name: "Copy earlier rules to this language" }));
    await waitFor(() => expect(screen.getByRole("group", { name: "Rule 1" })).toBeTruthy());
    await user.selectOptions(screen.getByRole("combobox", { name: "Apply rules to" }), "article");
    await user.click(screen.getByRole("button", { name: "Remove" }));
    await user.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(save).toHaveBeenLastCalledWith({
        language: "en", articleId: "one", preferences: { rules: [], disabled: ["dots"] },
    }));
    await user.click(screen.getByRole("button", { name: "Restore inherited rules" }));
    await waitFor(() => expect(screen.getByRole("group", { name: "Rule 1" })).toBeTruthy());
});

it("shows pending preset previews without enabling unreviewed conventions", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockResolvedValue(undefined);
    renderLocalized(<Harness save={save} />);
    await user.selectOptions(screen.getByRole("combobox", { name: "Convention preset" }), "en-US@1");
    expect(screen.getByRole("button", { name: "Apply preset" })).toHaveProperty("disabled", true);
    expect(screen.getByText("Preset previews await native-language review. You can add your own rules below.")).toBeTruthy();
    expect(save).not.toHaveBeenCalled();
});

it("keeps failed saves editable and exposes a retry path for preference loading", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockRejectedValue(new Error("fixture"));
    getArticle.mockRejectedValueOnce(new Error("fixture"));
    renderLocalized(<Harness save={save} legacy />);
    await user.click(await screen.findByRole("button", { name: "Retry loading preferences" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Copy earlier rules to this language" })).toHaveProperty("disabled", false));
    await user.click(screen.getByRole("button", { name: "Copy earlier rules to this language" }));
    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Copy earlier rules to this language" })).toHaveProperty("disabled", false);
});
