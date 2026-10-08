import type { ArticleSummary } from "@skladno/shared";
import { useIntl } from "react-intl";
import { ArticleIcon, ChevronRightIcon } from "../../ui/icons.js";


export function ArticleLibraryRowLabel({ article, child, childCount, expanded }: { article: ArticleSummary; child: boolean; childCount: number; expanded: boolean }) {
    const intl = useIntl();
    const title = article.title.trim() || intl.formatMessage({ id: "article.defaultTitle" });
    const chevronClass = expanded ? "rotate-90" : "";
    return <span className="flex gap-2">
        {childCount > 0
            ? <ChevronRightIcon className={`mt-1 size-3 shrink-0 text-muted transition-transform duration-150 motion-reduce:transition-none ${chevronClass}`} />
            : <ArticleIcon className="mt-0.5 size-4 shrink-0 text-muted" />}
        <span className="min-w-0 flex-1">
            <span className={`block truncate font-medium ${child ? "text-xs leading-4" : "text-sm leading-5"}`} title={title}>{title}</span>
            <span className="mt-0.5 block text-xs leading-4 text-muted">{[article.language, formatUpdatedAt(article.updatedAt, intl.formatMessage)].filter(Boolean).join(" · ")}</span>
        </span>
    </span>;
}


function formatUpdatedAt(updatedAt: string, formatMessage: ReturnType<typeof useIntl>["formatMessage"]): string {
    const minutes = Math.max(0, Math.floor((Date.now() - new Date(updatedAt).getTime()) / 60_000));
    if (minutes < 1)
        return formatMessage({ id: "navigation.updatedJustNow" });

    if (minutes < 60)
        return formatMessage({ id: "navigation.updatedMinutes" }, { count: minutes });

    const hours = Math.floor(minutes / 60);
    if (hours < 24)
        return formatMessage({ id: "navigation.updatedHours" }, { count: hours });

    return formatMessage({ id: "navigation.updatedDays" }, { count: Math.floor(hours / 24) });
}
