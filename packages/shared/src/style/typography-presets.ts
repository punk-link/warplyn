import { enUsTypographyV1 } from "./presets/en-us-v1.js";
import { ruRuTypographyV1 } from "./presets/ru-ru-v1.js";
import { frFrTypographyV1 } from "./presets/fr-fr-v1.js";
import type { TypographyPreset } from "./typography-configuration.js";

/** Keeps saved selections reproducible by retaining each versioned preset. */
export const typographyPresets: readonly TypographyPreset[] = [enUsTypographyV1, ruRuTypographyV1, frFrTypographyV1];


export function findTypographyPreset(selection: { id: string; version: number }) {
    return typographyPresets.find((preset) => preset.id === selection.id && preset.version === selection.version);
}
