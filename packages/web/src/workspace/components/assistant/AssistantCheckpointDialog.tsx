import { useEffect, useRef, useState } from "react";
import type { AssistantCheckpointDraftMode, AssistantCheckpointPreview } from "@skladno/shared";
import { useIntl, type IntlShape } from "react-intl";
import { Button, Dialog } from "../../../ui/primitives.js";
import { getProvenanceMessageId } from "../../views/revision-history-presentation.js";


export function AssistantCheckpointDialog({ preview, replacingComposer, close, restore }: {
    preview: AssistantCheckpointPreview;
    replacingComposer: boolean;
    close: () => void;
    restore: (mode?: AssistantCheckpointDraftMode) => Promise<unknown>;
}) {
    const intl = useIntl();
    const dialog = useRef<HTMLDialogElement>(null);
    const [pending, setPending] = useState<AssistantCheckpointDraftMode | "restore">();
    const start = (mode?: AssistantCheckpointDraftMode) => {
        setPending(mode ?? "restore");
        void restore(mode).then(() => setPending(undefined), () => setPending(undefined));
    };
    useEffect(() => {
        const element = dialog.current;
        element?.showModal();
        return () => element?.close();
    }, []);
    const rejectedWork = [
        ["assistant.checkpoint.proposals", preview.counts.proposals],
        ["assistant.checkpoint.findings", preview.counts.findings],
        ["assistant.checkpoint.translations", preview.counts.translations],
    ] as const;
    const rejectedDescriptions = rejectedWork.filter(([, count]) => count > 0).map(([id, count]) => intl.formatMessage({ id }, { count }));
    const revisionDescription = describeCheckpointRevision(preview.revision, intl);
    const restoreMode = preview.draftDecisionRequired ? "preserve" : "restore";

    return <Dialog ref={dialog} className="w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl" aria-labelledby="assistant-checkpoint-title" onCancel={(event) => {
        event.preventDefault();
        close();
    }}>
        <h2 id="assistant-checkpoint-title" className="font-semibold">{intl.formatMessage({ id: "assistant.checkpoint.heading" })}</h2>
        {rejectedDescriptions.length > 0 && <div className="mt-2 text-sm">
            <p>{intl.formatMessage({ id: "assistant.checkpoint.work" })}</p>
            <ul className="mt-1 list-disc pl-5">{rejectedDescriptions.map((item) => <li key={item}>
                {item}
            </li>)}
            </ul>
        </div>}
        {preview.revision && <p className="mt-2 text-sm">{revisionDescription}</p>}
        {replacingComposer && <p className="mt-2 text-sm text-muted">{intl.formatMessage({ id: "assistant.checkpoint.replaceComposer" })}</p>}
        {preview.draftDecisionRequired && <p className="mt-2 text-sm text-muted">{intl.formatMessage({ id: "assistant.checkpoint.draft" })}</p>}
        <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" disabled={Boolean(pending)} onClick={close}>{intl.formatMessage({ id: "editor.cancel" })}</Button>
            {preview.draftDecisionRequired && <Button variant="danger" disabled={Boolean(pending)} state={pending === "discard" ? "loading" : "default"} onClick={() => start("discard")}>{intl.formatMessage({ id: "assistant.checkpoint.discard" })}</Button>}
            <Button variant="primary" disabled={Boolean(pending)} state={pending === restoreMode ? "loading" : "default"} onClick={() => start(preview.draftDecisionRequired ? "preserve" : undefined)}>
                {intl.formatMessage({ id: preview.draftDecisionRequired ? "assistant.checkpoint.save" : "assistant.checkpoint.restore" })}
            </Button>
        </div>
    </Dialog>;
}


function describeCheckpointRevision(revision: AssistantCheckpointPreview["revision"], intl: IntlShape): string | undefined {
    if (!revision)
        return undefined;

    return intl.formatMessage(
        { id: revision.description ? "assistant.checkpoint.describedRevision" : "assistant.checkpoint.revision" },
        { number: revision.number, description: revision.description, provenance: intl.formatMessage({ id: getProvenanceMessageId(revision) }) },
    );
}
