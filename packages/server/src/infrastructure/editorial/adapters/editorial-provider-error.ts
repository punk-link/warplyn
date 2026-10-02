import { EDITORIAL_ENGINE_ERROR } from "../../../application/editorial/engine/editorial-engine-errors.js";
import { EditorialEngineError } from "../../../application/editorial/engine/editorial-engine-error.js";


export function createProviderError(error: unknown, hadPreviousResponseId: boolean): EditorialEngineError {
    const message = error instanceof Error ? error.message : EDITORIAL_ENGINE_ERROR.PROVIDER;
    if (hadPreviousResponseId && /previous[_ ]response|response.*not found|not found/i.test(message))
        return new EditorialEngineError(EDITORIAL_ENGINE_ERROR.SESSION_EXPIRED, EDITORIAL_ENGINE_ERROR.SESSION_EXPIRED);

    if (/network|fetch|connect|timeout|ECONN|ENOTFOUND/i.test(message))
        return new EditorialEngineError(EDITORIAL_ENGINE_ERROR.NETWORK, EDITORIAL_ENGINE_ERROR.NETWORK);

    return new EditorialEngineError(EDITORIAL_ENGINE_ERROR.PROVIDER, EDITORIAL_ENGINE_ERROR.PROVIDER);
}
