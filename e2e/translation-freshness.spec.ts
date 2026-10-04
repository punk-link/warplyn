import { expect, test } from "@playwright/test";
import { defaultGeneralSettings, type AssistantMessage, type AssistantRequestInput } from "@skladno/shared";


test("parallel translations become stale after a source edit and refresh preserves existing history", async ({ page }) => {
    const service = "http://127.0.0.1:8787";
    const configured = await page.request.put(`${service}/api/settings/general`, { data: { ...defaultGeneralSettings, defaultTranslationLanguages: ["es", "de"] } });
    expect(configured.ok()).toBe(true);
    const created = await page.request.post(`${service}/api/articles`, { data: { title: "Parallel source", content: "Original translation source.", language: "en" } });
    expect(created.ok()).toBe(true);
    const source = await created.json();
    await page.addInitScript((id) => {
        localStorage.setItem("skladno.quick-start.v1", "complete");
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 3, view: "translations", selectedArticleId: id }));
    }, source.id);
    await page.goto("/");
    await page.getByRole("tab", { name: /Translations/ }).click();
    await page.getByRole("button", { name: "New translation…", exact: true }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Generate translations", exact: true }).click();
    await expect(page.getByRole("tab", { name: "Spanish", exact: true })).toBeVisible();
    await expect(page.getByRole("tab", { name: "German", exact: true })).toBeVisible();
    await expect(page.getByText(/Translation\s*in Spanish$/)).toBeVisible();
    await expect(page.getByText(/Translation\s*in German$/)).toBeVisible();
    for (const language of ["Spanish", "German"]) {
        await page.getByRole("tab", { name: language, exact: true }).click();
        await page.getByRole("button", { name: "Edit", exact: true }).click();
        await page.getByRole("tab", { name: /Translations/ }).click();
        await page.getByRole("button", { name: "Parallel source", exact: true }).click();
    }

    const before = (await (await page.request.get(`${service}/api/articles`)).json()).filter((article: { sourceArticleId?: string }) => article.sourceArticleId === source.id);
    expect(before).toHaveLength(2);
    await page.getByRole("tab", { name: "Write", exact: true }).click();
    await page.getByRole("textbox", { name: "Article draft" }).fill("Changed translation source.");
    await page.getByRole("button", { name: "Save revision", exact: true }).click();
    await page.getByRole("tab", { name: /Translations/ }).click();
    await expect(page.getByText("The source Article has changed since this translation proposal was made.", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Edit", exact: true })).toBeEnabled();
    await expect(page.getByRole("button", { name: "Update", exact: true })).toBeDisabled();
    await expect(page.getByText("Existing translations", { exact: true })).toHaveCount(0);
    await expect(page.getByRole("combobox", { name: "Translation to update", exact: true })).toHaveCount(0);
    const unchanged = (await (await page.request.get(`${service}/api/articles`)).json()).filter((article: { sourceArticleId?: string }) => article.sourceArticleId === source.id);
    expect(unchanged.map((article: { currentRevisionId: string }) => article.currentRevisionId).sort()).toEqual(before.map((article: { currentRevisionId: string }) => article.currentRevisionId).sort());
    await page.getByRole("tab", { name: "Spanish", exact: true }).click();
    await page.getByRole("button", { name: "New translation…", exact: true }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Generate Spanish translation", exact: true }).click();
    await page.getByRole("tab", { name: "Spanish", exact: true }).click();
    await expect(page.getByRole("button", { name: "Update", exact: true })).toBeEnabled();
    await page.getByRole("button", { name: "Update", exact: true }).click();
    await expect(page.getByRole("dialog").getByRole("button", { name: "Cancel", exact: true })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Update", exact: true })).toBeFocused();
    await page.getByRole("button", { name: "Update", exact: true }).click();
    const accepted = page.waitForResponse((response) => response.url().endsWith("/proposal-acceptances") && response.request().method() === "POST");
    await page.getByRole("dialog").getByRole("button", { name: "Update", exact: true }).click();
    expect((await accepted).status()).toBe(201);
    await expect(page.getByText(/Its text has been preserved/)).toHaveCount(0);
    const spanish = before.find((article: { language: string }) => article.language === "es");
    const revisions = await (await page.request.get(`${service}/api/articles/${spanish.id}/revisions`)).json();
    expect(revisions).toHaveLength(2);
    expect(revisions.some((revision: { id: string }) => revision.id === spanish.currentRevisionId)).toBe(true);
    await page.reload();
    await page.getByRole("tab", { name: /Translations/ }).click();
    await page.getByRole("tab", { name: "Spanish", exact: true }).click();
    await expect(page.getByText(/Translation\s*in Spanish$/)).toHaveCount(2);
    await expect(page.getByText(/Translation\s*in German$/)).toBeVisible();
    await expect(page.getByText("The source Article has changed since this translation proposal was made.", { exact: true })).toHaveCount(0);
    await page.getByRole("button", { name: "New translation…", exact: true }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Generate Spanish translation", exact: true }).click();
    await page.getByRole("tab", { name: "Spanish", exact: true }).click();
    await page.getByRole("button", { name: "Edit", exact: true }).click();
    await expect(page.getByRole("textbox", { name: "Article draft", exact: true })).toBeVisible();
    const afterEdit = (await (await page.request.get(`${service}/api/articles`)).json()).filter((article: { sourceArticleId?: string }) => article.sourceArticleId === source.id);
    expect(afterEdit).toHaveLength(2);
    const afterEditRevisions = await (await page.request.get(`${service}/api/articles/${spanish.id}/revisions`)).json();
    expect(afterEditRevisions).toHaveLength(2);
});


test("same-Revision translations survive reload and exact-result rejection", async ({ page }) => {
    const service = "http://127.0.0.1:8787";
    await page.request.put(`${service}/api/settings/general`, { data: { ...defaultGeneralSettings, defaultTranslationLanguages: ["es"] } });
    const created = await page.request.post(`${service}/api/articles`, { data: { title: "Repeated source", content: "An unchanged source for fresh translations.", language: "en" } });
    const source = await created.json();
    await page.addInitScript((id) => {
        localStorage.setItem("skladno.quick-start.v1", "complete");
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 3, view: "write", selectedArticleId: id, libraryCollapsed: true, assistantCollapsed: true }));
    }, source.id);
    await page.goto("/");
    const expandAssistant = page.getByRole("button", { name: "Expand Editorial Assistant Panel", exact: true });
    if (await expandAssistant.count())
        await expandAssistant.click();

    const editor = page.getByRole("textbox", { name: "Article draft" });
    await editor.click();
    await editor.press("Control+a");
    await page.getByRole("tab", { name: /Translations/ }).click();
    const requests: AssistantRequestInput[] = [];
    page.on("request", (request) => {
        if (request.url().endsWith(`/articles/${source.id}/assistant/requests`) && request.method() === "POST")
            requests.push(request.postDataJSON());
    });
    await page.getByRole("button", { name: "New translation…", exact: true }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Cancel", exact: true }).click();
    await expect(page.getByRole("button", { name: "New translation…", exact: true })).toBeFocused();
    expect(requests).toHaveLength(0);
    for (let attempt = 0; attempt < 2; attempt += 1) {
        await page.getByRole("button", { name: "New translation…", exact: true }).click();
        await page.getByRole("dialog").getByRole("button", { name: "Generate Spanish translation", exact: true }).click();
        await expect.poll(async () => {
            const messages: AssistantMessage[] = await (await page.request.get(`${service}/api/articles/${source.id}/assistant/messages`)).json();
            return messages.filter((message) => message.translation).length;
        }).toBe(attempt + 1);
    }

    expect(requests).toHaveLength(2);
    expect(new Set(requests.map((request) => request.requestId)).size).toBe(2);
    expect(requests.every((request) => request.kind === "new" && request.scope.kind === "article" && request.scope.baseRevisionId === source.currentRevisionId)).toBe(true);
    const messages: AssistantMessage[] = await (await page.request.get(`${service}/api/articles/${source.id}/assistant/messages`)).json();
    const results = messages.filter((message) => message.translation);
    const revisions = await (await page.request.get(`${service}/api/articles/${source.id}/revisions`)).json();
    expect(revisions).toHaveLength(1);
    await page.reload();
    await page.getByRole("tab", { name: /Translations/ }).click();
    const selector = page.getByRole("combobox", { name: "Translation result", exact: true });
    await expect(selector.locator("option")).toHaveCount(2);
    const firstId = results[0]?.editorialArtifactId;
    expect(firstId).toBeTruthy();
    await selector.selectOption(firstId!);
    await page.getByRole("button", { name: "Reject", exact: true }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Reject", exact: true }).click();
    await expect(selector).toHaveCount(0);
    const remaining: AssistantMessage[] = await (await page.request.get(`${service}/api/articles/${source.id}/assistant/messages`)).json();
    expect(remaining.find((message) => message.editorialArtifactId === firstId)?.status).toBe("rejected");
    expect(remaining.find((message) => message.editorialArtifactId === results[1]?.editorialArtifactId)?.status).toBe("completed");
});
