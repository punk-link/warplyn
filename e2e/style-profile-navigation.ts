import type { Page } from "@playwright/test";


export async function selectStyleProfileSection(page: Page, section: "profile" | "typography" | "guidance" | "sources"): Promise<void> {
    const selector = page.getByRole("combobox", { name: "Style Profile sections", exact: true });
    if (await selector.isVisible()) {
        await selector.selectOption(section);
        return;
    }

    const labels = { profile: "Detected characteristics", typography: "Typography rules", guidance: "Manual rules", sources: "Writing samples" };
    await page.getByRole("button", { name: labels[section], exact: true }).click();
}
