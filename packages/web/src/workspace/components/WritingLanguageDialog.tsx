import { useId, useState } from "react";
import { useIntl } from "react-intl";
import { normalizeWritingLanguage } from "@skladno/shared";
import { Banner, Button, Dialog, Field } from "../../ui/primitives.js";


export function WritingLanguageDialog({ save, close }: { save: (language: string) => Promise<void>; close: () => void }) {
    const intl = useIntl();
    const headingId = useId();
    const helpId = useId();
    const [value, setValue] = useState("");
    const [pending, setPending] = useState(false);
    const [failed, setFailed] = useState(false);
    const language = normalizeWritingLanguage(value);
    const submit = async () => {
        if (!language || pending)
            return;

        setPending(true);
        setFailed(false);
        try {
            await save(language);
            close();
        } catch {
            setFailed(true);
        } finally {
            setPending(false);
        }
    };

    return <Dialog
        open
        aria-labelledby={headingId}
        className="w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl"
        onKeyDown={(event) => {
            event.stopPropagation();
            if (event.key === "Escape" && !pending) {
                event.preventDefault();
                close();
            }
        }}
        onCancel={(event) => {
            event.preventDefault();
            if (!pending)
                close();
        }}>
        <h2 id={headingId} className="text-lg font-semibold">{intl.formatMessage({ id: "typography.otherLanguageTitle" })}</h2>
        <label className="mt-4 block text-sm">
            {intl.formatMessage({ id: "typography.languageCode" })}
            <Field
                autoFocus
                value={value}
                maxLength={100}
                disabled={pending}
                aria-describedby={helpId}
                onChange={(event) => setValue(event.target.value)} />
        </label>
        <p id={helpId} className="mt-2 text-xs text-muted">{intl.formatMessage({ id: "typography.languageCodeHint" })}</p>
        {failed && <Banner tone="error" role="alert">{intl.formatMessage({ id: "typography.languageSaveFailed" })}</Banner>}
        <div className="mt-5 flex justify-end gap-3">
            <Button variant="secondary" disabled={pending} onClick={close}>{intl.formatMessage({ id: "editor.cancel" })}</Button>
            <Button variant="primary" disabled={!language || pending} onClick={() => void submit()}>
                {intl.formatMessage({ id: "typography.useLanguage" })}
            </Button>
        </div>
    </Dialog>;
}
