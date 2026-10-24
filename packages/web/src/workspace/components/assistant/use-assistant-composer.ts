import { useCallback, useEffect, useRef, useState, type KeyboardEventHandler } from "react";
import { type IntlShape } from "react-intl";
import { KEY_BINDING_COMMAND, areKeyBindingsEqual, resolveKeyBindings, type AssistantCheckpointComposer, type AssistantSkillSummary, type GeneralSettings, type KeyBindingOverrides } from "@skladno/shared";
import { getEventKeyBinding, type KeyBindingDispatcher } from "../../../key-bindings/dispatcher.js";
import type { AssistantComposerValue } from "./AssistantComposer.js";
import { getSkillPresentation } from "../../../i18n/skill-presentation.js";
import type { AssistantSelectionScope } from "../../state/assistant-messages-state.js";
import type { AssistantComposerSkill } from "./AssistantSkillTagNode.js";

type AssistantState = "idle" | "streaming" | "error";


function getSlashQueryAt(guidance: string, caretOffset: number): { start: number; query: string } | undefined {
    const start = guidance.lastIndexOf("/", caretOffset - 1);
    const characterWhitespacePattern = /\s/;
    if (start < 0 || (start > 0 && !characterWhitespacePattern.test(guidance[start - 1] ?? "")))
        return undefined;

    const query = guidance.slice(start + 1, caretOffset);
    const queryWhitespacePattern = /\s/;
    return queryWhitespacePattern.test(query) ? undefined : { start, query };
}


function handleComposerKeyDown(event: Parameters<KeyboardEventHandler<HTMLDivElement>>[0], context: {
    quickActionsOpen: boolean;
    selectedPickerSkill: AssistantComposerSkill | undefined;
    selectSkill: (skill: AssistantComposerSkill) => void;
    assistantSendMode: GeneralSettings["assistantSendMode"];
    shortcutOverrides: KeyBindingOverrides;
    send: () => void;
    activeSkillIndex: number;
    focusQuickAction: (index: number) => void;
    setQuickActionsOpen: (open: boolean) => void;
}) {
    if (handlePickerKeyDown(event, context))
        return;

    if (handleSendKeyDown(event, context))
        return;

    if (!context.quickActionsOpen)
        return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        context.focusQuickAction(context.activeSkillIndex + (event.key === "ArrowDown" ? 1 : -1));
    } else if (event.key === "Escape") {
        event.preventDefault();
        context.setQuickActionsOpen(false);
    }
}


function handlePickerKeyDown(event: Parameters<KeyboardEventHandler<HTMLDivElement>>[0], context: Parameters<typeof handleComposerKeyDown>[1]): boolean {
    if (!context.quickActionsOpen || (event.key !== "Enter" && event.key !== "Tab") || !context.selectedPickerSkill)
        return false;

    event.preventDefault();
    context.selectSkill(context.selectedPickerSkill);
    return true;
}


function handleSendKeyDown(event: Parameters<KeyboardEventHandler<HTMLDivElement>>[0], context: Parameters<typeof handleComposerKeyDown>[1]): boolean {
    if (event.key !== "Enter" || event.shiftKey || event.altKey)
        return false;

    const primary = event.ctrlKey || event.metaKey;
    const sendOnEnter = context.assistantSendMode === "enter" ? !primary : primary;
    const configuredBinding = Object.prototype.hasOwnProperty.call(context.shortcutOverrides, KEY_BINDING_COMMAND.SEND_EDITORIAL_REQUEST)
        ? resolveKeyBindings(context.shortcutOverrides)[KEY_BINDING_COMMAND.SEND_EDITORIAL_REQUEST]
        : undefined;
    const currentBinding = getEventKeyBinding(event);
    if (configuredBinding !== undefined && configuredBinding !== null && currentBinding !== undefined && areKeyBindingsEqual(configuredBinding, currentBinding))
        return true;

    event.stopPropagation();
    if (sendOnEnter) {
        event.preventDefault();
        context.send();
    }

    return true;
}


interface AssistantComposerOptions {
    articleId?: string;
    intl: IntlShape;
    state: AssistantState;
    onRequest: (authorMessage: string, skillId?: string, language?: string | readonly string[], skillOffset?: number) => Promise<void>;
    onCancel: () => void;
    translationLanguages: readonly string[];
    authorSkills?: readonly AssistantSkillSummary[];
    loadAuthorSkills?: () => Promise<void>;
    dispatcher?: KeyBindingDispatcher;
    selection?: AssistantSelectionScope;
    clearSelection?: () => void;
    assistantSendMode: GeneralSettings["assistantSendMode"];
    shortcutOverrides: KeyBindingOverrides;
    restoredComposer?: AssistantCheckpointComposer;
}


const draftKey = (articleId: string) => `skladno-assistant-composer:${articleId}`;
const recentSkillsKey = "skladno-assistant-recent-skills";
const recentSkillLimit = 5;


function readRecentSkillIds(): string[] {
    try {
        const stored: unknown = JSON.parse(localStorage.getItem(recentSkillsKey) ?? "[]");
        return Array.isArray(stored) ? [...new Set(stored.filter((id): id is string => typeof id === "string"))].slice(0, recentSkillLimit) : [];
    } catch {
        return [];
    }
}


function saveRecentSkillIds(skillIds: string[]) {
    try {
        localStorage.setItem(recentSkillsKey, JSON.stringify(skillIds));
    } catch {
        // Recent history must not block an explicit request.
    }
}


function savedSkill(value: unknown): AssistantComposerSkill | undefined {
    if (typeof value !== "object" || value === null || !("id" in value) || typeof value.id !== "string" || !("name" in value) || typeof value.name !== "string")
        return undefined;

    return { id: value.id, name: value.name };
}


function readDraft(articleId?: string): AssistantComposerValue | undefined {
    if (!articleId)
        return undefined;

    try {
        const stored: unknown = JSON.parse(localStorage.getItem(draftKey(articleId)) ?? "null");
        if (typeof stored !== "object" || stored === null || !("guidance" in stored) || typeof stored.guidance !== "string")
            return undefined;

        const selectedSkill = "selectedSkill" in stored
            ? savedSkill(stored.selectedSkill)
            : undefined;
        const skillOffset = "skillOffset" in stored && typeof stored.skillOffset === "number" && Number.isInteger(stored.skillOffset) && stored.skillOffset >= 0 && stored.skillOffset <= stored.guidance.length
            ? stored.skillOffset
            : 0;

        return { guidance: stored.guidance, selectedSkill, skillOffset, caretOffset: stored.guidance.length };
    } catch {
        return undefined;
    }
}


export function useAssistantComposer({ articleId, intl, state, onRequest, onCancel, translationLanguages, authorSkills = [], loadAuthorSkills, dispatcher, selection, clearSelection, assistantSendMode, shortcutOverrides, restoredComposer }: AssistantComposerOptions) {
    const [initialDraft] = useState(() => readDraft(articleId));
    const [guidance, setGuidance] = useState(initialDraft?.guidance ?? "");
    const [quickActionsOpen, setQuickActionsOpen] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [recentSkillIds, setRecentSkillIds] = useState(readRecentSkillIds);
    const [selectedSkill, setSelectedSkill] = useState<AssistantComposerSkill | undefined>(initialDraft?.selectedSkill);
    const [skillOffset, setSkillOffset] = useState(initialDraft?.skillOffset ?? 0);
    const [slashRange, setSlashRange] = useState<{ start: number; end: number }>();
    const [slashQuery, setSlashQuery] = useState("");
    const [caretOffset, setCaretOffset] = useState(initialDraft?.caretOffset ?? 0);
    const [activeSkillIndex, setActiveSkillIndex] = useState(0);
    const [restoredTargetLanguage, setRestoredTargetLanguage] = useState<string>();
    useEffect(() => {
        if (!articleId)
            return;

        if (guidance || selectedSkill)
            localStorage.setItem(draftKey(articleId), JSON.stringify({ guidance, selectedSkill, skillOffset }));
        else
            localStorage.removeItem(draftKey(articleId));
    }, [articleId, guidance, selectedSkill, skillOffset]);
    const restoredCheckpoint = useRef<AssistantCheckpointComposer>();
    useEffect(() => {
        if (!restoredComposer || restoredCheckpoint.current === restoredComposer)
            return;

        restoredCheckpoint.current = restoredComposer;
        const skill = authorSkills.find((candidate) => candidate.reference.id === restoredComposer.skillId);
        setGuidance(restoredComposer.text);
        setSelectedSkill(restoredComposer.skillId ? { id: restoredComposer.skillId, name: skill ? getSkillPresentation(skill, intl).name : restoredComposer.skillId } : undefined);
        setSkillOffset(restoredComposer.skillOffset ?? 0);
        setCaretOffset(restoredComposer.text.length);
        setRestoredTargetLanguage(restoredComposer.targetLanguage);
        clearSelection?.();
        window.requestAnimationFrame(() => document.querySelector<HTMLElement>("[data-assistant-composer]")?.focus());
    }, [clearSelection, restoredComposer, authorSkills, intl]);
    const selectedDefinition = authorSkills.find((skill) => skill.reference.id === selectedSkill?.id);
    const isTranslation = selectedDefinition?.execution?.capability === "translate";
    const incompatibleSelectionSkill = Boolean(selection && selectedDefinition && !(selectedDefinition.scopes ?? ["article", "selection"]).includes("selection"));
    const canSend = state !== "streaming" && Boolean(guidance.trim() || selectedSkill) && (!isTranslation || translationLanguages.length > 0) && !incompatibleSelectionSkill;
    const pickerSkills = authorSkills
        .filter((skill) => slashRange !== undefined || skill.reference.source === "built-in")
        .filter((skill) => !selection || (skill.scopes ?? ["article", "selection"]).includes("selection"))
        .map((skill) => getSkillPresentation(skill, intl))
        .filter((skill) => !slashQuery || skill.name.toLocaleLowerCase().includes(slashQuery.toLocaleLowerCase()));
    const recentSkills = [
        ...recentSkillIds.map((id) => pickerSkills.find((skill) => skill.id === id)).filter((skill) => skill !== undefined),
        ...pickerSkills.filter((skill) => !recentSkillIds.includes(skill.id)),
    ].slice(0, recentSkillLimit);
    const availableSkills = slashRange || showAllSkills ? pickerSkills : recentSkills;
    const hasMoreSkills = pickerSkills.length > recentSkillLimit;

    const slashPickerWasOpen = useRef(false);
    useEffect(() => {
        if (slashRange && !slashPickerWasOpen.current)
            void loadAuthorSkills?.();

        slashPickerWasOpen.current = slashRange !== undefined;
    }, [loadAuthorSkills, slashRange]);


    function focusQuickAction(index: number) {
        if (!availableSkills.length)
            return;

        const nextIndex = (index + availableSkills.length) % availableSkills.length;
        setActiveSkillIndex(nextIndex);
        document.querySelectorAll<HTMLButtonElement>("[data-assistant-skill]")[nextIndex]?.focus();
    }


    const selectSkill = useCallback((skill: AssistantComposerSkill) => {
        const insertionOffset = selectedSkill ? skillOffset : slashRange?.start ?? caretOffset;
        const guidanceWithoutSlash = slashRange
            ? `${guidance.slice(0, slashRange.start)}${guidance.slice(slashRange.end)}`
            : guidance;
        const whitespacePattern = /\s/;
        const needsTrailingSpace = insertionOffset === guidanceWithoutSlash.length || !whitespacePattern.test(guidanceWithoutSlash[insertionOffset] ?? "");
        const nextGuidance = needsTrailingSpace
            ? `${guidanceWithoutSlash.slice(0, insertionOffset)} ${guidanceWithoutSlash.slice(insertionOffset)}`
            : guidanceWithoutSlash;
        setQuickActionsOpen(false);
        setSelectedSkill({ id: skill.id, name: skill.name, source: skill.source });
        setRestoredTargetLanguage(undefined);
        setSkillOffset(insertionOffset);
        setCaretOffset(insertionOffset + (needsTrailingSpace ? 1 : 0));
        setSlashRange(undefined);
        setSlashQuery("");
        setGuidance(nextGuidance);
    }, [caretOffset, guidance, selectedSkill, skillOffset, slashRange]);

    const send = useCallback(() => {
        if (!canSend)
            return;

        const authorMessage = guidance.trim();
        const leadingWhitespace = guidance.length - guidance.trimStart().length;
        const requestSkill = selectedSkill?.id;
        const selectedSkillOffset = requestSkill ? Math.max(0, skillOffset - leadingWhitespace) : undefined;

        if (requestSkill && selectedDefinition?.reference.source === "built-in") {
            const nextRecentSkillIds = [requestSkill, ...recentSkillIds.filter((id) => id !== requestSkill)].slice(0, recentSkillLimit);
            setRecentSkillIds(nextRecentSkillIds);
            saveRecentSkillIds(nextRecentSkillIds);
        }

        setGuidance("");
        setSelectedSkill(undefined);
        clearSelection?.();
        void onRequest(authorMessage, requestSkill, isTranslation ? restoredTargetLanguage ?? translationLanguages : undefined, selectedSkillOffset);
        setRestoredTargetLanguage(undefined);
    }, [canSend, clearSelection, guidance, isTranslation, onRequest, recentSkillIds, restoredTargetLanguage, selectedDefinition, selectedSkill, skillOffset, translationLanguages]);

    useEffect(() => {
        const unregisterSend = dispatcher?.register(KEY_BINDING_COMMAND.SEND_EDITORIAL_REQUEST, send);
        const unregisterStop = dispatcher?.register(KEY_BINDING_COMMAND.STOP_EDITORIAL_REQUEST, onCancel);
        return () => {
            unregisterSend?.();
            unregisterStop?.();
        };
    }, [dispatcher, onCancel, send]);

    const onChange = useCallback((value: AssistantComposerValue) => {
        setGuidance(value.guidance);
        setSelectedSkill(value.selectedSkill);
        setSkillOffset(value.skillOffset);
        setCaretOffset(value.caretOffset);
        const slash = getSlashQueryAt(value.guidance, value.caretOffset);
        if (slash) {
            setQuickActionsOpen(true);
            setActiveSkillIndex(0);
            setSlashRange({ start: slash.start, end: value.caretOffset });
            setSlashQuery(slash.query);
        } else if (slashRange) {
            setQuickActionsOpen(false);
            setSlashRange(undefined);
            setSlashQuery("");
        }
    }, [slashRange]);

    const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => handleComposerKeyDown(event, {
        quickActionsOpen,
        selectedPickerSkill: availableSkills[activeSkillIndex],
        selectSkill,
        assistantSendMode,
        shortcutOverrides,
        send,
        activeSkillIndex,
        focusQuickAction,
        setQuickActionsOpen,
    });

    return {
        canSend,
        guidance,
        selectedSkill,
        skillOffset,
        caretOffset,
        selection,
        clearSelection,
        quickActionsOpen,
        availableSkills,
        showAllSkills,
        setShowAllSkills,
        hasMoreSkills,
        searchingSkills: slashRange !== undefined,
        activeSkillIndex,
        incompatibleSelectionSkill,
        setQuickActionsOpen,
        setActiveSkillIndex,
        selectSkill,
        focusQuickAction,
        send,
        onChange,
        onKeyDown
    };
}
