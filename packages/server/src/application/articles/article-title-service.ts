import type { ArticleRevision } from "@skladno/shared";

import type { ArticleStore } from "./article-store.js";
import type { ArticleTitleGenerator } from "../editorial/article-title-generator.js";
import { protectArticleSpans } from "../editorial/translation/translation.js";


export class ArticleTitleService {
    constructor(private readonly store: ArticleStore, private readonly resolveGenerator: () => ArticleTitleGenerator | undefined) { }


    async completePromotion(revision: ArticleRevision, signal: AbortSignal): Promise<ArticleRevision> {
        const article = this.store.getArticle(revision.articleId);
        if (!article || article.title.trim() || article.currentRevisionId !== revision.id)
            return revision;

        const content = Array.from(revision.content).slice(0, 12000).join("");
        if (!hasTitleContext(content))
            return { ...revision, titleGeneration: { status: "insufficient-context" } };

        try {
            const generator = this.resolveGenerator();
            if (!generator)
                return { ...revision, titleGeneration: { status: "failed" } };

            const boundedSignal = AbortSignal.any([signal, AbortSignal.timeout(15000)]);
            boundedSignal.throwIfAborted();
            const title = (await generator.generate(content, boundedSignal, article.language)).trim();
            boundedSignal.throwIfAborted();
            if (!isValidTitle(title, content))
                return { ...revision, titleGeneration: { status: "failed" } };

            if (!this.store.setGeneratedTitle(revision.articleId, revision.id, title))
                return revision;

            return { ...revision, titleGeneration: { status: "generated", title } };
        } catch {
            return { ...revision, titleGeneration: { status: "failed" } };
        }
    }
}


function hasTitleContext(content: string): boolean {
    const protectedSpanPlaceholderPattern = /\[\[SKLADNO_PROTECTED_\d+\]\]/g;
    const prose = protectArticleSpans(content).protectedText.replace(protectedSpanPlaceholderPattern, "");
    const letterCharacterPattern = /\p{L}/gu;
    const letters = prose.match(letterCharacterPattern) ?? [];
    const letterSequencePattern = /\p{L}+/gu;
    const words = new Set(prose.toLowerCase().match(letterSequencePattern));
    const ideographPattern = /\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}/gu;
    const ideographs = prose.match(ideographPattern) ?? [];

    return letters.length >= 80 && (words.size >= 12 || ideographs.length >= 40);
}


function isValidTitle(title: string, content: string): boolean {
    const lineEndingPattern = /[\r\n\p{Cc}]|\[\[SKLADNO_PROTECTED_|^```/u;
    if (!title || Array.from(title).length > 120 || lineEndingPattern.test(title))
        return false;

    const titleNumberPattern = /\b\d+(?:[.,]\d+)*\b/g;
    const values = [...protectArticleSpans(title).protectedSpans, ...(title.match(titleNumberPattern) ?? [])];
    const sourceNumberPattern = /\b\d+(?:[.,]\d+)*\b/g;
    const sourceValues = new Set([...protectArticleSpans(content).protectedSpans, ...(content.match(sourceNumberPattern) ?? [])]);

    return values.every((value) => sourceValues.has(value));
}
