import { useEffect } from "react";
import type { LexicalEditor } from "lexical";
import type { AssistantSkillSummary } from "@skladno/shared";
import type { IntlShape } from "react-intl";
import { getSkillPresentation } from "../../i18n/skill-presentation.js";


function requestsImmediateSend(detail: object): boolean {
    return "ctrlKey" in detail && detail.ctrlKey === true;
}


export function useNativeEditorMenu(editor: LexicalEditor, intl: IntlShape, skills: readonly AssistantSkillSummary[],
    prepare: ((skill: AssistantSkillSummary, immediate?: boolean) => void) | undefined, restore: () => void) {
    useEffect(() => {
        const root = editor.getRootElement();
        if (!root)
            return;

        root.dataset.editorSkills = JSON.stringify(skills.map((skill) => ({
            id: skill.reference.id,
            name: getSkillPresentation(skill, intl).name, source: skill.reference.source,
            enabled: (skill.scopes ?? ["article", "selection"]).includes("selection")
        })));
        root.dataset.editorSkillsLabel = intl.formatMessage({ id: "editor.skills" });
        root.dataset.editorMenuOwner = editor.getKey();
        root.dataset.editorMenuGroups = JSON.stringify([
            { id: "text", name: intl.formatMessage({ id: "editor.moreTextFormatting" }) },
            { id: "paragraph", name: intl.formatMessage({ id: "editor.paragraphStyle" }) },
            { id: "lists", name: intl.formatMessage({ id: "editor.lists" }) },
            { id: "link", name: intl.formatMessage({ id: "editor.addLink" }) },
            { id: "editLink", name: intl.formatMessage({ id: "editor.editLink" }) },
        ]);

        const activate = (event: Event) => {
            if (!(event instanceof CustomEvent) || typeof event.detail !== "object" || !event.detail)
                return;

            const detail: unknown = event.detail;
            if (typeof detail !== "object" || detail === null || !("kind" in detail) || !("id" in detail) || typeof detail.id !== "string")
                return;

            restore();
            if (detail.kind === "skill") {
                const skill = skills.find((candidate) => candidate.reference.id === detail.id);
                if (skill && (skill.scopes ?? ["article", "selection"]).includes("selection"))
                    prepare?.(skill, requestsImmediateSend(detail));

                return;
            }

            const shell = root.closest("[data-article-editor-shell]");
            if (detail.kind === "format") {
                const buttons = shell?.querySelectorAll<HTMLButtonElement>("[data-editor-command]");
                [...buttons ?? []].find((button) => button.dataset.editorCommand === detail.id)?.click();
            }

            if (detail.kind === "block") {
                const select = shell?.querySelector<HTMLSelectElement>("[data-editor-block-style]");
                if (select && [...select.options].some((option) => option.value === detail.id)) {
                    select.value = detail.id;
                    select.dispatchEvent(new Event("change", { bubbles: true }));
                }
            }
        };

        root.addEventListener("warplyn:editor-menu", activate);

        return () => {
            root.removeEventListener("warplyn:editor-menu", activate);
            delete root.dataset.editorSkills;
            delete root.dataset.editorSkillsLabel;
            delete root.dataset.editorMenuOwner;
            delete root.dataset.editorMenuGroups;
        };
    }, [editor, intl, prepare, restore, skills]);
}
