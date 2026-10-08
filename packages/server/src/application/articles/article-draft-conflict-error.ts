import { APPLICATION_ERROR, type Article, type ArticleDraft } from "@skladno/shared";


export class ArticleDraftConflictError extends Error {
    readonly code = APPLICATION_ERROR.DRAFT_CONFLICT;


    constructor(
        public readonly article: Article,
        public readonly draft?: ArticleDraft,
    ) {
        super(APPLICATION_ERROR.DRAFT_CONFLICT);
    }
}
