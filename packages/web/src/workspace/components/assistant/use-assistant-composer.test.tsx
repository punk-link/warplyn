import { act, renderHook } from "@testing-library/react";
import { createIntl } from "react-intl";
import { expect, it, vi } from "vitest";
import { defaultGeneralSettings } from "@skladno/shared";
import { messages } from "../../../i18n/messages.js";
import { skillCatalogFixture } from "../../skill-catalog.test-fixture.js";
import { useAssistantComposer } from "./use-assistant-composer.js";


it("catalog refresh does not overwrite text edited after restoring a checkpoint", () => {
    const options = {
        intl: createIntl({ locale: "en", messages }), state: "idle" as const,
        onRequest: vi.fn().mockResolvedValue(undefined), onCancel: vi.fn(), translationLanguages: [],
        assistantSendMode: defaultGeneralSettings.assistantSendMode, shortcutOverrides: {},
        restoredComposer: { text: "Restored direction", skillId: "flow_and_clarity", usedSelection: false },
    };
    const { result, rerender } = renderHook(({ skills }) => useAssistantComposer({ ...options, authorSkills: skills }), { initialProps: { skills: skillCatalogFixture } });
    act(() => result.current.onChange({ guidance: "My new direction", selectedSkill: result.current.selectedSkill, skillOffset: 0, caretOffset: 16 }));
    rerender({ skills: [...skillCatalogFixture] });
    expect(result.current.guidance).toBe("My new direction");
    expect(result.current.selectedSkill?.name).toBe("Improve flow and clarity");
});
