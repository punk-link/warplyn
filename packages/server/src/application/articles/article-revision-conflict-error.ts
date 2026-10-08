import { APPLICATION_ERROR, type Article } from "@skladno/shared";


export class ArticleRevisionConflictError extends Error {
    readonly code = APPLICATION_ERROR.REVISION_CONFLICT;


    constructor(public readonly article: Article) {
        super(APPLICATION_ERROR.REVISION_CONFLICT);
    }
}
