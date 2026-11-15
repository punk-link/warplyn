import { createContext } from "react";
import type { InterfaceLocale } from "@skladno/shared";

export const InterfaceLocaleContext = createContext<((locale: InterfaceLocale) => void) | undefined>(undefined);
