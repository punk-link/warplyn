import { useContext, useEffect, useRef } from "react";
import type { AssistantSkillSummary } from "@skladno/shared";
import type { IntlShape } from "react-intl";
import { EditorSkillContext } from "./editor-skill-context.js";
import { getSkillPresentation } from "../../i18n/skill-presentation.js";
import type { AssistantComposerSkill } from "../components/assistant/AssistantSkillTagNode.js";


export function useEditorSkillPreparation(intl: IntlShape, selectSkill: (skill: AssistantComposerSkill, immediate?: boolean) => void) {
    const context = useContext(EditorSkillContext);
    const consume = context?.consume;
    const lastPrepared = useRef<AssistantSkillSummary>();

    useEffect(() => {
        const prepared = context?.prepared;
        if (!prepared || lastPrepared.current === prepared)
            return;

        lastPrepared.current = prepared;
        selectSkill(getSkillPresentation(prepared, intl), context?.immediate);
        consume?.();
        window.requestAnimationFrame(() => document.querySelector<HTMLElement>("[data-assistant-composer]")?.focus());
    }, [consume, context?.prepared, context?.immediate, intl, selectSkill]);
}
