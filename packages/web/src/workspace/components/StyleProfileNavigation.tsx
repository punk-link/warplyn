import { useEffect, useRef, type KeyboardEvent } from "react";
import { useIntl } from "react-intl";
import { ArrowLeftIcon } from "../../ui/icons.js";
import { Button, Select } from "../../ui/primitives.js";
import { styleProfileSections, type StyleProfileSection } from "../style-profile-sections.js";


export function StyleProfileNavigation({ section, setSection, back }: {
    section: StyleProfileSection;
    setSection: (section: StyleProfileSection) => void;
    back: () => void;
}) {
    const intl = useIntl();
    const desktopBack = useRef<HTMLButtonElement>(null);
    const mobileBack = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const sidebar = desktopBack.current?.closest("aside");
        const target = sidebar && getComputedStyle(sidebar).display !== "none" ? desktopBack.current : mobileBack.current;
        target?.focus();
    }, []);


    function handleNavigationKeyDown(event: KeyboardEvent<HTMLElement>) {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key))
            return;

        const controls = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)")];
        const index = controls.findIndex((control) => control === event.target);
        if (index < 0)
            return;

        const positions: Record<string, number> = {
            ArrowUp: (index + controls.length - 1) % controls.length,
            ArrowDown: (index + 1) % controls.length,
            Home: 0, End: controls.length - 1,
        };
        event.preventDefault();
        controls[positions[event.key]!]?.focus();
    }


    return <>
        <header data-focus-area="settings-navigation" data-focus-area-native-tab
            className="flex shrink-0 items-center gap-3 border-b border-border bg-surface-supporting p-2 md:hidden">
            <Button
                ref={mobileBack}
                data-focus-area-entry
                variant="quiet"
                className="inline-flex shrink-0 items-center gap-2"
                onClick={back}>
                <ArrowLeftIcon className="size-4" />{intl.formatMessage({ id: "settings.backToWorkspace" })}
            </Button>
            <Select aria-label={intl.formatMessage({ id: "styleProfile.navigation" })} value={section} onChange={(event) => {
                const selected = styleProfileSections.find((item) => item.id === event.target.value);
                if (selected)
                    setSection(selected.id);
            }}>
                {styleProfileSections.map((item) => <option key={item.id} value={item.id}>{intl.formatMessage({ id: item.label })}</option>)}
            </Select>
        </header>
        <aside
            data-focus-area="settings-navigation"
            onKeyDown={handleNavigationKeyDown}
            aria-label={intl.formatMessage({ id: "styleProfile.navigation" })}
            className="hidden w-52 shrink-0 flex-col border-r border-border bg-surface-supporting md:flex">
            <header className="flex min-h-18 items-center border-b border-border px-3">
                <Button
                    ref={desktopBack}
                    data-focus-area-entry
                    variant="quiet"
                    className="inline-flex items-center gap-2"
                    onClick={back}>
                    <ArrowLeftIcon className="size-4" />{intl.formatMessage({ id: "settings.backToWorkspace" })}
                </Button>
            </header>
            <nav className="p-2">
                {styleProfileSections.map((item) => (
                    <button
                        key={item.id}
                        aria-current={section === item.id ? "page" : undefined}
                        className={"min-h-10 w-full rounded-control px-3 py-2 text-left text-sm " +
                        (section === item.id ? "bg-brand-soft font-semibold text-brand" : "text-muted hover:bg-surface")}
                        onClick={() => setSection(item.id)}>{intl.formatMessage({ id: item.label })}
                    </button>
                ))}
            </nav>
        </aside>
    </>;
}
