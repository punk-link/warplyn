import { expect, test } from "@playwright/test";

test("typography rules rebuild automatically and corrections retain provenance after reload", async ({ page, request }) => {
    await request.put("http://127.0.0.1:8787/api/style-corpus/typography", { data: { rules: [] } });
    await request.put("http://127.0.0.1:8787/api/style-corpus/typography-configuration", {
        data: { language: "en", preferences: { rules: [], disabled: [] } },
    });
    await request.post("http://127.0.0.1:8787/api/articles", { data: { title: "Existing fixture", content: "Existing fixture." } });
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    const created = page.waitForResponse((response) => response.url().endsWith("/api/articles") && response.request().method() === "POST");
    const create = page.getByRole("button", { name: "Create", exact: true });
    if (await create.isVisible())
        await create.click();
    else
        await page.getByRole("button", { name: "New article", exact: true }).click();

    const article = await (await created).json();
    const editor = page.getByRole("textbox", { name: "Article draft" });
    await expect(editor).toBeEmpty();
    const checkpointed = page.waitForResponse((response) => response.url().endsWith(`/articles/${article.id}/draft`) &&
        response.request().method() === "PUT");
    await editor.pressSequentially("Wait...");
    await expect(editor).toContainText("Wait...");
    await checkpointed;
    const saved = page.waitForResponse((response) => response.url().endsWith(`/articles/${article.id}/revisions`) &&
        response.request().method() === "POST");
    await page.getByRole("button", { name: "Save revision", exact: true }).click();
    expect((await (await saved).json()).content).toBe("Wait...");
    await expect(page.getByRole("status", { name: "Saved", exact: true })).toBeVisible();
    const olderProposal = page.waitForResponse((response) => response.url().includes("/assistant/requests") && response.request().method() === "POST");
    await page.getByRole("button", { name: "Quick actions", exact: true }).click();
    await page.getByRole("option", { name: "Shorten text", exact: true }).click();
    await page.getByRole("button", { name: "Send editorial request", exact: true }).click();
    await (await olderProposal).finished();
    await page.getByRole("button", { name: "Style Profile", exact: true }).click();
    await page.getByRole("button", { name: "Typography rules", exact: true }).click();
    await page.getByRole("button", { name: "Add rule", exact: true }).click();
    await expect(page.getByRole("group", { name: "Rule 1", exact: true }).getByText("Unsaved", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Save", exact: true }).click();
    await expect(page.getByText("Typography rules saved and Style Profile rebuilt.", { exact: true })).toBeVisible();
    await expect(page.getByRole("group", { name: "Rule 1", exact: true }).getByText("Saved", { exact: true })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Rule 1 convention", exact: true })).toHaveCount(0);
    const rule = page.getByRole("group", { name: "Rule 1", exact: true });
    const badge = await rule.getByText("Saved", { exact: true }).boundingBox();
    const edit = await rule.getByRole("button", { name: "Edit", exact: true }).boundingBox();
    const remove = await rule.getByRole("button", { name: "Remove", exact: true }).boundingBox();
    expect(badge).not.toBeNull();
    expect(edit).not.toBeNull();
    expect(remove).not.toBeNull();
    if (badge && edit && remove) {
        expect(edit.y + edit.height / 2).toBeCloseTo(badge.y + badge.height / 2, 0);
        expect(remove.y + remove.height / 2).toBeCloseTo(badge.y + badge.height / 2, 0);
    }

    await rule.getByRole("button", { name: "Edit", exact: true }).click();
    const close = rule.getByRole("button", { name: "Close", exact: true });
    const closeBox = await close.boundingBox();
    const fields = await rule.getByRole("combobox").all();
    for (const field of fields) {
        const fieldBox = await field.boundingBox();
        expect(fieldBox).not.toBeNull();
        expect(closeBox).not.toBeNull();
        if (fieldBox && closeBox)
            expect(closeBox.y).toBeGreaterThanOrEqual(fieldBox.y + fieldBox.height);
    }

    await close.click();
    await expect(rule.getByRole("button", { name: "Edit", exact: true })).toBeFocused();
    let summaryRequests = 0;
    page.on("request", (request) => {
        if (request.url().includes("proposal-summaries"))
            summaryRequests++;
    });
    await page.getByRole("button", { name: "Check typography", exact: true }).click();
    await expect(page.getByRole("button", { name: "Review Proposal", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Review Proposal", exact: true }).click();
    await expect(page.getByText("Typography rules: Ellipsis: …", { exact: true })).toBeVisible();
    await page.reload();
    const proposalsNamePattern = /Proposals:/;
    await page.getByRole("tab", { name: proposalsNamePattern }).click();
    await expect(page.getByText("Typography rules: Ellipsis: …", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Set all decisions…" }).click();
    await page.getByRole("menuitem", { name: "Mark all accepted" }).click();
    await page.getByRole("button", { name: "Apply", exact: true }).click();
    await page.getByRole("tab", { name: "Write", exact: true }).click();
    await expect(editor).toContainText("Wait…");
    await page.reload();
    await expect(editor).toContainText("Wait…");
    expect(summaryRequests).toBe(0);
});
