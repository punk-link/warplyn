import type { MessageId } from "../i18n/messages.js";


export const styleProfileSections = [
    { id: "profile", label: "styleProfile.detectedCharacteristics" },
    { id: "typography", label: "typography.title" },
    { id: "guidance", label: "styleProfile.manualRules" },
    { id: "sources", label: "styleProfile.writingSamples" },
] as const satisfies readonly { id: string; label: MessageId }[];

export type StyleProfileSection = typeof styleProfileSections[number]["id"];
