import type { PropsWithChildren } from "react";
import { useIntl } from "react-intl";
import { getProviderLanguageName } from "../state/editorial-language.js";
import type { TranslationsData } from "./translations-view-data.js";
import { ActivityIndicator } from "../../ui/primitives.js";


export function TranslationReviewSurface({ generation, children }: PropsWithChildren<{ generation: TranslationsData["generation"] }>) {
    const intl = useIntl();
    const languages = generation?.languages.map(getProviderLanguageName);
    return <div className="relative mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col">
        <div {...(generation ? { inert: "" } : {})} aria-busy={Boolean(generation)} className={`flex h-full min-h-0 w-full flex-col ${generation ? "opacity-40" : ""}`}>
            {children}
        </div>
        {generation && <div className="absolute inset-0 z-10 grid place-items-center bg-canvas/40 p-4">
            <div role="status" className="flex max-w-full items-center gap-3 rounded-panel border border-border bg-surface-raised p-5 text-center text-sm text-ink shadow-raised">
                <ActivityIndicator />
                <span>{languages?.length ? intl.formatMessage({ id: "views.translationGeneratingLanguages" }, { languages: languages.join(", ") }) : intl.formatMessage({ id: "views.translationGenerating" })}</span>
            </div>
        </div>}
    </div>;
}
