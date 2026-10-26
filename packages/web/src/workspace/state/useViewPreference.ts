import { useEffect, useState } from "react";


/** Store presentation choices only, never Article content or pending actions. */
export function useViewPreference<T extends string | boolean>(key: string, fallback: T, choices: readonly T[]) {
    const storageKey = `skladno-view-preference:${key}`;
    const [value, setValue] = useState<T>(() => {
        try {
            const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "null");
            return choices.find((choice) => choice === stored) ?? fallback;
        } catch {
            return fallback;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(value));
        } catch {
            // Keep controls usable when local preference storage is unavailable.
        }
    }, [storageKey, value]);

    return [value, setValue] as const;
}
