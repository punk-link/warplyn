import { createContext } from "react";
import type { EditorNote } from "@skladno/shared";

export const EditorNotesContext = createContext<{
    notes: readonly EditorNote[];
    canAdd: boolean;
    add: () => void;
    open: (note?: EditorNote) => void;
} | undefined>(undefined);
