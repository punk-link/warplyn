import type { ArticleRevision } from "@skladno/shared";

import type { ArticleStore } from "./article-store.js";
import type { ArticleTitleGenerator } from "../editorial/article-title-generator.js";
import { protectArticleSpans } from "../editorial/translation/translation.js";


interface TitlePromotion {
    id: string;
    articleId: string;
    titleGeneration: ArticleRevision["titleGeneration"];
    cancellation: AbortController;
}


export class ArticleTitleService {
    private readonly promotions = new Map<string, TitlePromotion>();


    constructor(private readonly store: ArticleStore, private readonly resolveGenerator: () => ArticleTitleGenerator | undefined) { }


    getPromotion(revision: ArticleRevision): ArticleRevision {
        const titleGeneration = this.getGeneration(revision.articleId, revision.id);
        return titleGeneration ? { ...revision, titleGeneration } : revision;
    }


    getGeneration(articleId: string, revisionId: string): ArticleRevision["titleGeneration"] {
        const promotion = this.promotions.get(articleId);
        return promotion?.id === revisionId ? promotion.titleGeneration : undefined;
    }


    forget(articleId: string): void {
        this.promotions.get(articleId)?.cancellation.abort();
        this.promotions.delete(articleId);
    }


    completePromotion(revision: ArticleRevision, signal: AbortSignal): ArticleRevision {
        try {
            return this.startPromotion(revision, signal);
        } catch {
            return revision;
        }
    }


    private startPromotion(revision: ArticleRevision, signal: AbortSignal): ArticleRevision {
        const article = this.store.getArticle(revision.articleId);
        if (!article || article.title.trim() || article.currentRevisionId !== revision.id)
            return revision;

        const existing = this.promotions.get(revision.articleId);
        if (existing?.id === revision.id)
            return { ...revision, titleGeneration: existing.titleGeneration };

        this.forget(revision.articleId);
        const content = Array.from(revision.content).slice(0, 12000).join("");
        if (!hasTitleContext(content))
            return { ...revision, titleGeneration: { status: "insufficient-context" } };

        const pending: TitlePromotion = {
            id: revision.id, articleId: revision.articleId, titleGeneration: { status: "pending" }, cancellation: new AbortController(),
        };
        this.promotions.set(revision.articleId, pending);
        void this.generateTitle(pending, content, article.language, signal);

        return { ...revision, titleGeneration: pending.titleGeneration };
    }


    private async generateTitle(revision: TitlePromotion, content: string, language: string | undefined, signal: AbortSignal): Promise<void> {
        const boundedSignal = AbortSignal.any([signal, revision.cancellation.signal, AbortSignal.timeout(15000)]);
        const fail = () => this.finishPromotion(revision, { status: "failed" });
        boundedSignal.addEventListener("abort", fail, { once: true });
        try {
            boundedSignal.throwIfAborted();
            const generator = this.resolveGenerator();
            if (!generator) {
                fail();
                return;
            }

            const title = (await generator.generate(content, boundedSignal, language)).trim();
            boundedSignal.throwIfAborted();
            if (!isValidTitle(title, content)) {
                fail();
                return;
            }

            const updated = this.store.setGeneratedTitle(revision.articleId, revision.id, title);
            this.finishPromotion(revision, updated ? { status: "generated", title } : undefined);
        } catch {
            fail();
        } finally {
            boundedSignal.removeEventListener("abort", fail);
        }
    }


    private finishPromotion(revision: TitlePromotion, titleGeneration: ArticleRevision["titleGeneration"]): void {
        if (this.promotions.get(revision.articleId) === revision)
            this.promotions.set(revision.articleId, { ...revision, titleGeneration });
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
