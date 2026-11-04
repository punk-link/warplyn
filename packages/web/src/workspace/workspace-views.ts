import type { MessageId } from "../i18n/messages.js";
import { KEY_BINDING_COMMAND, type KeyBindingCommandId } from "@skladno/shared";


export const workspaceViews = [
    "write",
    "proposal",
    "revisions",
    "fact-check",
    "translations",
] as const;

/** Includes the persisted Proposal Review mode of Write for existing routes and shortcuts. */
export type WorkspaceView = typeof workspaceViews[number];


export interface WorkspaceViewDefinition {
    id: WorkspaceView;
    label: MessageId;
    command: KeyBindingCommandId;
}


export const workspaceViewDefinitions: readonly WorkspaceViewDefinition[] = [
    { id: "write", label: "workspace.tabs.write", command: KEY_BINDING_COMMAND.VIEW_WRITE },
    { id: "revisions", label: "workspace.tabs.revisions", command: KEY_BINDING_COMMAND.VIEW_REVISIONS },
    { id: "fact-check", label: "workspace.tabs.factCheck", command: KEY_BINDING_COMMAND.VIEW_FACT_CHECK },
    { id: "translations", label: "workspace.tabs.translations", command: KEY_BINDING_COMMAND.VIEW_TRANSLATIONS },
];


export function isWorkspaceView(value: unknown): value is WorkspaceView {
    return typeof value === "string" && workspaceViews.includes(value as WorkspaceView);
}
