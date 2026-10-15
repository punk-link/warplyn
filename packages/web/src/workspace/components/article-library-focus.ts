import type { KeyboardEvent } from "react";


export function moveLibraryFocus(event: KeyboardEvent<HTMLElement>, scope: HTMLElement) {
    if (!(document.activeElement instanceof HTMLButtonElement))
        return;

    const controls = [...scope.querySelectorAll<HTMLButtonElement>("button:not([role^=menuitem]):not(:disabled)")]
        .filter((button) => !button.closest("[inert], [aria-hidden=true]"));
    const index = controls.indexOf(document.activeElement);
    if (index < 0)
        return;

    event.preventDefault();
    controls[(index + (event.key === "ArrowDown" ? 1 : controls.length - 1)) % controls.length]?.focus();
}


export function enterLibraryResults(event: KeyboardEvent<HTMLElement>, drawer: HTMLElement | null) {
    const first = drawer?.querySelector<HTMLButtonElement>("[data-library-article]");
    if (!first)
        return;

    event.preventDefault();
    first.focus();
}
