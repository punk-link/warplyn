import { useIntl } from "react-intl";
import type { KeyboardEvent } from "react";
import { Button, Select } from "../../ui/primitives.js";
import { ArrowLeftIcon } from "../../ui/icons.js";
import { settingsSections, type SettingsSection } from "../settings-sections.js";


export function SettingsNavigation({ section, setSection, back, status }: { section: SettingsSection; setSection: (section: SettingsSection) => void; back: () => void; status: string }) {
    const intl = useIntl();


    function handleNavigationKeyDown(event: KeyboardEvent<HTMLElement>) {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key))
            return;

        const controls = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)")];
        const index = controls.findIndex((control) => control === event.target);
        if (index < 0)
            return;

        const positions: Record<string, number> = { ArrowUp: (index + controls.length - 1) % controls.length, ArrowDown: (index + 1) % controls.length, Home: 0, End: controls.length - 1 };
        event.preventDefault();
        controls[positions[event.key]!]?.focus();
    }


    return <>
        <header data-focus-area="settings-navigation" data-focus-area-native-tab className="flex shrink-0 items-center gap-3 border-b border-border bg-surface-supporting p-2 md:hidden">
            <Button data-focus-area-entry className="inline-flex items-center gap-2" variant="quiet" onClick={back}>
                <ArrowLeftIcon className="size-4" />{intl.formatMessage({ id: "settings.backToWorkspace" })}
            </Button>
            <Select aria-label={intl.formatMessage({ id: "settings.navigation" })} value={section} onChange={(event) => {
                const selected = settingsSections.find((item) => item.id === event.target.value);
                if (selected)
                    setSection(selected.id);
            }}>
                {settingsSections.map((item) => <option key={item.id} value={item.id}>{intl.formatMessage({ id: item.label })}</option>)}
            </Select>
        </header>
        <aside data-focus-area="settings-navigation" onKeyDown={handleNavigationKeyDown} className="hidden w-52 shrink-0 border-r border-border bg-surface-supporting md:flex md:flex-col" aria-label={intl.formatMessage({ id: "settings.navigation" })}>
            <header className="flex min-h-18 items-center border-b border-border px-3">
                <Button data-focus-area-entry className="inline-flex items-center gap-2" variant="quiet" onClick={back}><ArrowLeftIcon className="size-4" />{intl.formatMessage({ id: "settings.backToWorkspace" })}</Button>
            </header>
            <nav className="p-2">
                {settingsSections.map((item) => <button key={item.id} aria-current={section === item.id ? "page" : undefined} className={`min-h-10 w-full rounded-control px-3 text-left text-sm ${section === item.id ? "bg-brand-soft font-semibold text-brand" : "text-muted hover:bg-surface"}`} onClick={() => setSection(item.id)}>{intl.formatMessage({ id: item.label })}</button>)}
            </nav>
            <footer className="mt-auto border-t border-border px-3 py-2 text-micro text-muted" role="status">
                <span aria-hidden="true">&#9679;</span> {status}
            </footer>
        </aside>
    </>;
}
