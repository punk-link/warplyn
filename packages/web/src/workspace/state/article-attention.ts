export interface ArticleAttention {
    running: boolean;
    failed: boolean;
    review: boolean;
    translation: boolean;
    findings: boolean;
    unread: boolean;
}


export function combineArticleAttention(items: (ArticleAttention | undefined)[]): ArticleAttention {
    return {
        running: items.some((item) => item?.running), failed: items.some((item) => item?.failed),
        review: items.some((item) => item?.review), translation: items.some((item) => item?.translation),
        findings: items.some((item) => item?.findings), unread: items.some((item) => item?.unread),
    };
}
