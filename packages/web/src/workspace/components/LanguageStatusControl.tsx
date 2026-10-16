import { useId, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { articleLanguages, normalizeWritingLanguage } from "@skladno/shared";
import { ChevronDownIcon } from "../../ui/icons.js";
import { handleStatusMenuKeyDown, openStatusMenu } from "./ArticleStatusBarMenu.js";
import { WritingLanguageDialog } from "./WritingLanguageDialog.js";


type LanguageMessageId = "languages.english" | "languages.spanish" | "languages.portuguese" | "languages.russian" | "languages.french" | "languages.german" | "languages.italian";
const languageMessageIds: Record<string, LanguageMessageId> = { en: "languages.english", es: "languages.spanish", pt: "languages.portuguese", ru: "languages.russian", fr: "languages.french", de: "languages.german", it: "languages.italian" };


export function LanguageStatusControl({ language, setLanguage, open, onToggle, onOpen, onClose }: { language: string; setLanguage: (language: string) => Promise<void>; open: boolean; onToggle: () => void; onOpen: () => void; onClose: () => void }) {
    const intl = useIntl();
    const trigger = useRef<HTMLButtonElement>(null);
    const menuId = useId();
    const [customOpen, setCustomOpen] = useState(false);
    const languageNames = new Intl.DisplayNames([intl.locale], { type: "language" });
    const formatLanguage = (tag: string) => {
        const normalized = normalizeWritingLanguage(tag);
        if (!normalized)
            return tag;

        const messageId = languageMessageIds[normalized];
        return messageId ? intl.formatMessage({ id: messageId }) : languageNames.of(normalized) ?? tag;
    };


    async function selectLanguage(nextLanguage: string) {
        await setLanguage(nextLanguage);
        onClose();
        trigger.current?.focus();
    }


    return <div className="relative shrink-0">
        <button
            data-focus-area-entry
            ref={trigger}
            className={("inline-flex h-6 items-center gap-1 border-x border-border px-1.5 text-xs text-muted hover:bg-brand-soft hover:text-brand focus:outline-none " +
            "focus-visible:ring-2 focus-visible:ring-brand")}
            type="button"
            aria-label={intl.formatMessage({ id: "articleHeader.sourceLanguage" })}
            aria-controls={open ? menuId : undefined}
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={onToggle}
            onKeyDown={(event) => {
                if (event.key === "Escape")
                    onClose();

                openStatusMenu(event, onOpen, menuId);
            }}>
            <span>{formatLanguage(language)}</span>
            <ChevronDownIcon className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
            <div
                id={menuId}
                className="absolute bottom-6 left-0 z-10 w-40 rounded-control border border-border bg-surface-raised p-1 shadow-raised"
                role="menu"
                aria-label={intl.formatMessage({ id: "articleHeader.sourceLanguage" })}
                onKeyDown={(event) => handleStatusMenuKeyDown(event, () => {
                    onClose();
                    trigger.current?.focus();
                })}>
                {articleLanguages.map((option) => (
                    <button
                        key={option}
                        className="flex min-h-9 w-full items-center rounded-control px-2 text-left text-xs text-ink hover:bg-brand-soft focus:outline-none"
                        type="button"
                        role="menuitemradio"
                        aria-checked={option === language}
                        onClick={() => void selectLanguage(option)}>
                        {formatLanguage(option)}
                    </button>
                ))}
                <button
                    type="button"
                    role="menuitem"
                    className="flex min-h-9 w-full items-center rounded-control px-2 text-left text-xs text-ink hover:bg-brand-soft focus:outline-none"
                    onClick={() => {
                        onClose();
                        setCustomOpen(true);
                    }}>
                    {intl.formatMessage({ id: "typography.otherLanguage" })}
                </button>
            </div>
        )}
        {customOpen && (
            <WritingLanguageDialog save={setLanguage} close={() => {
                setCustomOpen(false);
                trigger.current?.focus();
            }} />
        )}
    </div>;
}
