import { useEffect, useRef, useState, type KeyboardEventHandler } from "react";
import { useIntl } from "react-intl";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import type { AssistantEditMode, KeyBindingOverrides } from "@skladno/shared";
import { KEY_BINDING_COMMAND } from "@skladno/shared";
import { Button, IconButton } from "../../../ui/primitives.js";
import { SendIcon, StopIcon } from "../../../ui/icons.js";
import { getShortcutHint } from "../../../key-bindings/shortcut-hint.js";
import type { AssistantSelectionScope } from "../../state/assistant-messages-state.js";
import { AssistantQuickActions, SelectionChip } from "./AssistantComposerActions.js";
import { AssistantSkillTagNode, type AssistantComposerSkill } from "./AssistantSkillTagNode.js";
import { ComposerBridge, PickerKeyboard, PlainTextPaste, type AssistantComposerValue, type AssistantSkillPickerControls } from "./assistant-composer-plugins.js";

export type { AssistantComposerValue } from "./assistant-composer-plugins.js";


type AssistantComposerProps = AssistantSkillPickerControls & {
    state: "idle" | "streaming" | "error";
    canSend: boolean;
    guidance: string;
    selectedSkill?: AssistantComposerSkill;
    skillOffset: number;
    caretOffset: number;
    selection?: AssistantSelectionScope;
    clearSelection?: () => void;
    incompatibleSelectionSkill: boolean;
    editMode?: AssistantEditMode;
    setActiveSkillIndex: (value: number) => void;
    send: () => void;
    onCancel: () => void;
    onChange: (value: AssistantComposerValue) => void;
    onKeyDown: KeyboardEventHandler<HTMLDivElement>;
    shortcutOverrides?: KeyBindingOverrides;
};


interface AssistantComposerState {
    state: AssistantComposerProps["state"];
    canSend: boolean;
    guidance: string;
    selectedSkill?: AssistantComposerSkill;
    skillOffset: number;
    caretOffset: number;
    selection?: AssistantSelectionScope;
    clearSelection?: () => void;
    incompatibleSelectionSkill: boolean;
    editMode?: AssistantEditMode;
}


interface AssistantComposerActions {
    send: () => void;
    onCancel: () => void;
    onChange: (value: AssistantComposerValue) => void;
    onKeyDown: KeyboardEventHandler<HTMLDivElement>;
    shortcutOverrides?: KeyBindingOverrides;
    setEditMode?: (mode: AssistantEditMode) => Promise<void>;
}


function AssistantEditModeControl({ mode, disabled, setMode }: { mode?: AssistantEditMode; disabled: boolean; setMode?: (mode: AssistantEditMode) => Promise<void> }) {
    const intl = useIntl();
    const label = intl.formatMessage({ id: "assistant.editMode.direct" });
    const checked = mode === "direct";
    return <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={!mode || disabled || !setMode}
        onClick={() => void setMode?.(checked ? "review" : "direct")}
        className={("group inline-flex min-h-9 appearance-none items-center gap-2 border-0 bg-transparent px-0 py-1 text-xs font-semibold " +
        `${checked ? "text-brand" : "text-muted"} hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-55`)}>
        <span aria-hidden="true" className={`relative inline-flex h-5 w-9 items-center rounded-full border p-0.5 transition-colors group-hover:border-brand ${checked ? "border-brand bg-brand" : "border-border-strong bg-surface-raised"}`}>
            <span className={`size-4 rounded-full border border-border-strong bg-surface transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`} />
        </span>
        <span>{label}</span>
    </button>;
}


export function AssistantComposer({ state, picker, actions }: {
    state: AssistantComposerState;
    picker: Parameters<typeof AssistantQuickActions>[0]["picker"];
    actions: AssistantComposerActions;
}) {
    const { state: requestState, canSend, guidance, selectedSkill, skillOffset, caretOffset, selection, clearSelection, incompatibleSelectionSkill, editMode } = state;
    const { quickActionsOpen, availableSkills, activeSkillIndex, setQuickActionsOpen, selectSkill, focusQuickAction } = picker;
    const { send, onCancel, onChange, onKeyDown, shortcutOverrides, setEditMode } = actions;
    const intl = useIntl();
    const composer = useRef<HTMLDivElement>(null);
    const value: AssistantComposerValue = { guidance, selectedSkill, skillOffset, caretOffset };
    const activeSkill = availableSkills[activeSkillIndex];

    return <footer data-focus-area="assistant-composer" className="shrink-0 border-t border-border px-4 py-3">
        {selection && <p className="mb-2 text-xs text-muted">{intl.formatMessage({ id: "assistant.selectionContextHint" })}</p>}
        {incompatibleSelectionSkill && <p className="mb-2 text-xs text-muted" role="status">{intl.formatMessage({ id: "assistant.selectionSkillUnavailable" })}</p>}
        <div className="flex min-h-25 flex-col rounded-control border border-border bg-surface-raised px-3 py-2" onClick={(event) => {
            if (event.target instanceof Element && !event.target.closest("button, select, label, [contenteditable]"))
                composer.current?.focus();
        }}>
            <div className="min-h-11 flex-1">
                <SelectionChip selection={selection} clearSelection={clearSelection} />
                <LexicalComposer initialConfig={{ namespace: "skladno-assistant-composer", nodes: [AssistantSkillTagNode], onError: () => undefined }}>
                    <RichTextPlugin contentEditable={<ContentEditable
                        ref={composer}
                        data-focus-area-entry
                        data-assistant-composer
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={quickActionsOpen}
                        aria-activedescendant={quickActionsOpen && activeSkill ? `assistant-skill-option-${activeSkill.id}` : undefined}
                        aria-multiline="true"
                        aria-label={intl.formatMessage({ id: "assistant.guidance" })}
                        aria-controls={quickActionsOpen ? "assistant-skill-picker" : undefined}
                        className={("min-h-11 whitespace-pre-wrap text-sm leading-5 text-ink outline-none focus-visible:outline focus-visible:outline-brand " +
                        "empty:before:content-[attr(data-placeholder)] empty:before:text-ink/45")}
                        data-placeholder={!guidance && !selectedSkill ? intl.formatMessage({ id: "assistant.guidancePlaceholder" }) : undefined}
                        onKeyDown={onKeyDown} />} placeholder={null} ErrorBoundary={LexicalErrorBoundary} />
                    <HistoryPlugin />
                    <ComposerBridge value={value} onChange={onChange} />
                    <PlainTextPaste />
                    <PickerKeyboard
                        quickActionsOpen={quickActionsOpen}
                        availableSkills={availableSkills}
                        activeSkillIndex={activeSkillIndex}
                        setQuickActionsOpen={setQuickActionsOpen}
                        selectSkill={selectSkill}
                        focusQuickAction={focusQuickAction} />
                </LexicalComposer>
            </div>
            <div data-assistant-composer-actions className="flex shrink-0 items-end justify-between gap-2">
                <AssistantEditModeControl mode={editMode} disabled={requestState === "streaming"} setMode={setEditMode} />
                {requestState === "streaming"
                    ? (
                        <IconButton
                            variant="danger"
                            title={getShortcutHint(intl.formatMessage({ id: "assistant.stop" }), KEY_BINDING_COMMAND.STOP_EDITORIAL_REQUEST, shortcutOverrides)}
                            label={intl.formatMessage({ id: "assistant.stop" })}
                            onClick={onCancel}>
                            <StopIcon className="size-4" />
                        </IconButton>
                    )
                    : (
                        <div className="flex">
                            <IconButton
                                className="rounded-r-none"
                                variant="quiet"
                                title={getShortcutHint(
                                    intl.formatMessage({ id: "assistant.send" }),
                                    KEY_BINDING_COMMAND.SEND_EDITORIAL_REQUEST,
                                    shortcutOverrides
                                )}
                                label={intl.formatMessage({ id: "assistant.send" })}
                                disabled={!canSend}
                                onClick={send}>
                                <SendIcon className="size-4" />
                            </IconButton>
                            <AssistantQuickActions context={{ state: requestState, composer }} picker={picker} />
                        </div>
                    )}
            </div>
        </div>
    </footer>;
}
