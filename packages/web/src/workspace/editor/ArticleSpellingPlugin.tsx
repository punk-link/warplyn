import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { isSpellingLanguage } from "@skladno/shared";
import { useIntl } from "react-intl";
import { getDesktopSpellingClient } from "../../application/desktop-client.js";
import { useNotifications } from "../../notifications/NotificationProvider.js";


export function ArticleSpellingPlugin({ language }: { language?: string }) {
    const [editor] = useLexicalComposerContext();
    const intl = useIntl();
    const { notify } = useNotifications();
    useEffect(() => {
        const client = getDesktopSpellingClient();
        client?.setArticleLanguage(isSpellingLanguage(language) ? language : "und");

        return () => client?.setArticleLanguage(null);
    }, [editor, language]);
    useEffect(() => {
        const markUrlLabels = () => {
            const root = editor.getRootElement();
            for (const link of root?.querySelectorAll("a") ?? []) {
                if (link.textContent?.trim() === link.getAttribute("href"))
                    link.setAttribute("spellcheck", "false");
                else
                    link.removeAttribute("spellcheck");
            }
        };

        const unregisterRoot = editor.registerRootListener(markUrlLabels);
        const unregisterUpdate = editor.registerUpdateListener(markUrlLabels);

        return () => {
            unregisterRoot();
            unregisterUpdate();
        };
    }, [editor]);
    useEffect(() => {
        const failure = (event: Event) => {
            let id: "spelling.wordFailed" | "spelling.correctionFailed" | "spelling.languageFailed" = "spelling.wordFailed";
            if (event instanceof CustomEvent && event.detail === "correction")
                id = "spelling.correctionFailed";

            if (event instanceof CustomEvent && event.detail === "language")
                id = "spelling.languageFailed";

            notify({ tone: "error", title: intl.formatMessage({ id }) });
        };

        window.addEventListener("warplyn:spelling-failed", failure);
        return () => window.removeEventListener("warplyn:spelling-failed", failure);
    }, [intl, notify]);

    return null;
}
