import { useIntl, type IntlShape } from "react-intl";
import { WarningIcon } from "../../ui/icons.js";
import type { ArticleAttention } from "../state/article-attention.js";


function getArticleAttentionReasons(attention: ArticleAttention, intl: IntlShape): string[] {
    const reasons = [];
    if (attention.failed)
        reasons.push(intl.formatMessage({ id: "navigation.attention.failed" }));

    if (attention.review)
        reasons.push(intl.formatMessage({ id: "navigation.attention.review" }));

    if (attention.translation)
        reasons.push(intl.formatMessage({ id: "navigation.attention.translation" }));

    if (attention.findings)
        reasons.push(intl.formatMessage({ id: "navigation.attention.findings" }));

    if (attention.unread)
        reasons.push(intl.formatMessage({ id: "navigation.attention.unread" }));

    if (attention.running)
        reasons.push(intl.formatMessage({ id: "navigation.attention.running" }));

    return reasons;
}


export function ArticleAttentionIndicator({ attention }: { attention?: ArticleAttention }) {
    const intl = useIntl();
    if (!attention)
        return null;

    const reasons = getArticleAttentionReasons(attention, intl);
    if (!reasons.length)
        return null;

    const label = reasons.join(". ");
    let icon = <span className="size-1.5 rounded-full bg-brand" />;
    if (attention.failed)
        icon = <WarningIcon className="size-3 text-warning" />;
    else if (attention.running)
        icon = <span className="size-1.5 rounded-full bg-brand/50 motion-safe:animate-pulse" />;

    return <span
        className="inline-flex size-3 shrink-0 items-center justify-center"
        role="img"
        aria-label={label}
        title={label}>
        {icon}
    </span>;
}
