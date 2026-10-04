import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { isArticleFileFormat, type ArticleFileFormat } from "@skladno/shared";
import { Button, Dialog, Select } from "../../ui/primitives.js";
import type { MessageId } from "../../i18n/messages.js";
import { RevisionArticlePreview } from "../editor/RevisionArticlePreview.js";
import type { useArticleFileDialogs } from "./article-file-dialog-state.js";


const formatMessages: Record<ArticleFileFormat, MessageId> = {
    markdown: "articleFiles.formatMarkdown", html: "articleFiles.formatHtml", docx: "articleFiles.formatDocx", rtf: "articleFiles.formatRtf",
};


export function ArticleFileDialogs({ state }: { state: ReturnType<typeof useArticleFileDialogs> }) {
    const intl = useIntl();
    const ref = useRef<HTMLDialogElement>(null);
    const [format, setFormat] = useState<ArticleFileFormat>("markdown");
    const { dialog, close, confirm } = state;

    useEffect(() => {
        if (!dialog || !ref.current)
            return;

        setFormat("markdown");
        const element = ref.current;
        element.showModal();
        return () => element.close();
    }, [dialog]);

    if (!dialog)
        return null;

    const reviewing = dialog.kind === "review";
    return <Dialog ref={ref} aria-labelledby="article-file-dialog-heading" className="w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl" onCancel={(event) => {
        event.preventDefault();
        close();
    }}>
        <h2 id="article-file-dialog-heading" className="font-semibold">{intl.formatMessage({ id: reviewing ? "articleFiles.review" : "articleFiles.menuSave" })}</h2>
        {dialog.kind === "format" && <label className="mt-4 block text-sm">
            <span>{intl.formatMessage({ id: "articleFiles.format" })}</span>
            <Select autoFocus value={format} onChange={(event) => {
                if (isArticleFileFormat(event.target.value))
                    setFormat(event.target.value);
            }}>
                {Object.entries(formatMessages).map(([value, message]) => <option key={value} value={value}>{intl.formatMessage({ id: message })}</option>)}
            </Select>
        </label>}
        {dialog.kind === "review" && <>
            <p className="mt-2 text-sm text-muted">{intl.formatMessage({ id: "articleFiles.layoutWarning" })}</p>
            <div className="mt-4 max-h-96 overflow-auto rounded-control border border-border p-4">
                <RevisionArticlePreview revisionId="file-import" content={dialog.file.content} />
            </div>
        </>}
        <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={close}>{intl.formatMessage({ id: "editor.cancel" })}</Button>
            <Button autoFocus={reviewing} onClick={() => confirm(format)}>{intl.formatMessage({ id: reviewing ? "articleFiles.import" : "articleFiles.download" })}</Button>
        </div>
    </Dialog>;
}
