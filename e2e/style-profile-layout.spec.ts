import { expect, test } from "@playwright/test";

test("Style Profile keeps one column and retains drafts inside keyboard-accessible disclosures", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    const create = page.getByRole("button", { name: "Create", exact: true });
    if (await create.isVisible())
        await create.click();
    else
        await page.getByRole("button", { name: "New article", exact: true }).click();

    await page.getByRole("tab", { name: "Style Profile", exact: true }).click();
    const guidance = page.getByRole("button", { name: "Manual rules", exact: true });
    const insights = page.getByRole("heading", { name: "Detected characteristics", exact: true });
    const samplesPanel = page.getByRole("button", { name: "Writing samples", exact: true });
    await expect(guidance).toHaveAttribute("aria-expanded", "false");
    await expect(insights).toBeVisible();
    await expect(page.getByRole("button", { name: "Detected characteristics", exact: true })).toHaveCount(0);
    await expect(samplesPanel).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByRole("button", { name: "Add writing sample", exact: true })).toHaveCount(0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await guidance.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("region", { name: "Manual rules", exact: true })).toHaveCSS("transition-duration", "0s");
    const rules = page.getByRole("textbox", { name: "Global style rules", exact: true });
    await rules.fill("Keep this unsaved instruction.");
    await guidance.click();
    await expect(rules).toHaveCount(0);
    await expect(guidance).toBeFocused();
    await page.keyboard.press("Space");
    await expect(rules).toHaveValue("Keep this unsaved instruction.");
    await guidance.click();

    for (const width of [1440, 760]) {
        await page.setViewportSize({ width, height: 900 });
        const typography = page.getByRole("heading", { name: "Typography rules", exact: true });
        const samples = page.getByRole("heading", { name: "Writing samples", exact: true });
        const typographyBox = await typography.boundingBox();
        const samplesBox = await samples.boundingBox();
        const recapBox = await insights.boundingBox();
        expect(typographyBox).not.toBeNull();
        expect(samplesBox).not.toBeNull();
        expect(recapBox).not.toBeNull();
        if (recapBox && typographyBox)
            expect(typographyBox.y).toBeGreaterThan(recapBox.y + recapBox.height);

        if (typographyBox && samplesBox) {
            expect(samplesBox.y).toBeGreaterThan(typographyBox.y + typographyBox.height);
            expect(samplesBox.x).toBeCloseTo(typographyBox.x, 0);
        }

        await expect(insights).toBeVisible();
    }

    await samplesPanel.click();
    await page.getByRole("button", { name: "Add writing sample", exact: true }).click();
    await page.getByRole("textbox", { name: "Source name", exact: true }).fill("Layout sample");
    await page.getByRole("textbox", { name: "Sample text", exact: true }).fill("A local writing sample for the layout journey.");
    await samplesPanel.click();
    await expect(page.getByRole("textbox", { name: "Sample text", exact: true })).toHaveCount(0);
    await samplesPanel.click();
    await expect(page.getByRole("textbox", { name: "Sample text", exact: true })).toHaveValue("A local writing sample for the layout journey.");
    await page.getByRole("button", { name: "Add", exact: true }).click();
    await expect(page.getByText("Layout sample", { exact: true })).toBeVisible();
    await expect(page.getByRole("checkbox", { name: "Include", exact: true })).toBeVisible();
    await samplesPanel.click();
    await expect(page.getByRole("checkbox", { name: "Include", exact: true })).toHaveCount(0);
    await page.getByRole("button", { name: "Rebuild profile", exact: true }).click();
    await expect(page.getByText("Profile rebuilt from 1 active source.", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Voice", exact: true })).toBeVisible();
});
