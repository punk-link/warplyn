import { BUILT_IN_SKILL, type AssistantMessage } from "@skladno/shared";
import { useState } from "react";
import { useIntl } from "react-intl";
import { Button, IconButton } from "../../../ui/primitives.js";
import { ArticleIcon, FolderIcon, UpdateIcon } from "../../../ui/icons.js";

type AssistantView = "proposal" | "fact-check" | "style-profile" | "translations";
type AssistantViewHandler = (view: AssistantView) => void;
type Intl = ReturnType<typeof useIntl>;


function getViewLabel(view: AssistantView, intl: Intl): string {
    if (view === "fact-check" || view === "style-profile")
        return intl.formatMessage({ id: "assistant.viewFindings" });

    if (view === "translations")
        return intl.formatMessage({ id: "assistant.reviewTranslation" });

    return intl.formatMessage({ id: "assistant.reviewProposal" });
}


function AssistantApplyButton({ message, applyEdit, intl }: { message: AssistantMessage; applyEdit: (messageId: string) => Promise<void>; intl: Intl }) {
    const [applying, setApplying] = useState(false);

    return <Button
        compact
        variant="secondary"
        disabled={applying}
        onClick={() => {
            setApplying(true);
            void applyEdit(message.id).finally(() => setApplying(false));
        }}>{intl.formatMessage({ id: message.editCandidate?.target === "selection" ? "assistant.applySelection" : "assistant.applyArticle" })}
    </Button>;
}


function getAvailableMessageActions(message: AssistantMessage, skillId: string | undefined, view: AssistantView | undefined,
    openSkillFolder: ((requestId: string) => void) | undefined, onRetry: ((requestId: string) => void) | undefined,
    applyEdit: ((messageId: string) => Promise<void>) | undefined) {
    return {
        review: Boolean(view && message.status !== "rejected"),
        folder: Boolean(message.role !== "author" && skillId === BUILT_IN_SKILL.SKILL_CREATOR &&
            message.status === "completed" && message.requestId && openSkillFolder),
        retry: Boolean((message.status === "failed" || message.status === "cancelled") && message.requestId && onRetry),
        apply: Boolean(!view && message.status === "completed" && message.editCandidate && !message.appliedEdit && applyEdit),
    };
}


export function AssistantMessageActions({ message,
    skillId,
    earlierSuggestion,
    view,
    openView,
    openSkillFolder,
    onRetry,
    applyEdit,
    intl
}: {
    message: AssistantMessage;
    skillId: string | undefined;
    earlierSuggestion?: boolean;
    view: AssistantView | undefined;
    openView?: AssistantViewHandler;
    openSkillFolder?: (requestId: string) => void;
    onRetry?: (requestId: string) => void;
    applyEdit?: (messageId: string) => Promise<void>;
    intl: Intl
}) {
    const available = getAvailableMessageActions(message, skillId, view, openSkillFolder, onRetry, applyEdit);
    if (!Object.values(available).some(Boolean) && !message.appliedEdit)
        return null;

    return <div className="flex shrink-0 gap-1">
        {available.review && view && openView && (
            <IconButton
                className="!size-6"
                variant="secondary"
                label={earlierSuggestion && view === "proposal" ? intl.formatMessage({ id: "views.earlierSuggestion" }) : getViewLabel(view, intl)}
                title={earlierSuggestion && view === "proposal" ? intl.formatMessage({ id: "views.earlierSuggestion" }) : getViewLabel(view, intl)}
                onClick={() => openView?.(view)}><ArticleIcon className="size-3" />
            </IconButton>
        )}
        {available.folder && message.requestId && (
            <IconButton
                className="!size-6"
                variant="secondary"
                label={intl.formatMessage({ id: "assistant.openSkillFolder" })}
                title={intl.formatMessage({ id: "assistant.openSkillFolder" })}
                onClick={() => openSkillFolder?.(message.requestId!)}><FolderIcon className="size-3" />
            </IconButton>
        )}
        {available.retry && message.requestId && (
            <IconButton
                className="!size-6"
                variant="secondary"
                label={intl.formatMessage({ id: "assistant.retry" })}
                title={intl.formatMessage({ id: "assistant.retry" })}
                onClick={() => onRetry?.(message.requestId!)}><UpdateIcon className="size-3" />
            </IconButton>
        )}
        {available.apply && applyEdit && <AssistantApplyButton message={message} applyEdit={applyEdit} intl={intl} />}
        {message.appliedEdit && <span className="text-xs text-muted" role="status">{intl.formatMessage({ id: "assistant.appliedEdit" })}</span>}
    </div>;
}
