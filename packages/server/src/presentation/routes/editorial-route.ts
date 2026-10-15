import type { IncomingMessage, ServerResponse } from "node:http";
import { APPLICATION_ERROR, EDITORIAL_ERROR_CATEGORY, EDITORIAL_OPERATION, HTTP_STATUS, type ApplicationErrorCode, type EditorialEvent, type EditorialOperation } from "@skladno/shared";

import { EditorialService } from "../../application/editorial/editorial-service.js";
import type { EditorialServiceRequest } from "../../application/editorial/editorial-request.js";
import { ApplicationServiceError } from "../../application/errors/application-service-error.js";
import { EDITORIAL_ENGINE_ERROR } from "../../application/editorial/engine/editorial-engine-errors.js";
import { EDITORIAL_ENGINE_EVENT } from "../../application/editorial/engine/editorial-engine-events.js";
import { EditorialEngineError } from "../../application/editorial/engine/editorial-engine-error.js";
import { isEditorialOperation } from "../../application/editorial/workflow-prompt.js";
import { parseObject, readJson, parseString } from "../transport/json.js";


function createEditorialErrorEvent(requestId: string, code: Extract<EditorialEvent, { type: "error" }>["code"], errorCode: ApplicationErrorCode, retryable: boolean): EditorialEvent {
    return { type: "error", requestId, code, errorCode, retryable };
}


function writeEditorialEvent(response: ServerResponse, event: EditorialEvent): void {
    response.write(`event: editorial\ndata: ${JSON.stringify(event)}\n\n`);
}


async function readEditorialRequest(request: IncomingMessage, articleId: string): Promise<EditorialServiceRequest> {
    const body = parseObject(await readJson(request));
    const operation = parseString(body.operation, "operation");
    if (body.reviewMode !== undefined && (body.reviewMode !== "typography" || operation !== EDITORIAL_OPERATION.STYLE_REVIEW))
        throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);

    const selection = body.correctionSelection === undefined ? undefined : parseObject(body.correctionSelection);
    if (selection && (!Array.isArray(selection.occurrenceIds) || selection.occurrenceIds.some((id: unknown) => typeof id !== "string")))
        throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);

    return {
        requestId: parseString(body.requestId, "requestId"),
        articleContext: {
            articleId,
            ...(body.targetLanguage === undefined ? {} : { targetLanguage: parseString(body.targetLanguage, "targetLanguage") }),
        },
        editorial: {
            operation: operation as EditorialOperation,
            authorContext: body.authorContext === undefined ? "" : parseString(body.authorContext, "authorContext"),
            ...(body.reviewMode === "typography" ? { reviewMode: "typography" as const } : {}),
        },
        ...(selection ? {
            factChecking: {
                correctionSelection: {
                    expectedRevisionId: parseString(selection.expectedRevisionId, "expectedRevisionId"),
                    occurrenceIds: selection.occurrenceIds as string[],
                },
            },
        } : {}),
    };
}


function openEditorialStream(request: IncomingMessage, response: ServerResponse): AbortController {
    response.writeHead(HTTP_STATUS.OK, { "cache-control": "no-cache, no-transform", connection: "keep-alive", "content-type": "text/event-stream; charset=utf-8" });
    const controller = new AbortController();
    request.once("aborted", () => controller.abort());
    response.once("close", () => controller.abort());

    return controller;
}


function rejectUnsupportedOperation(response: ServerResponse, request: EditorialServiceRequest): boolean {
    if (isEditorialOperation(request.editorial.operation))
        return false;

    writeEditorialEvent(response, createEditorialErrorEvent(request.requestId, EDITORIAL_ERROR_CATEGORY.PROVIDER, APPLICATION_ERROR.EDITORIAL_OPERATION_UNSUPPORTED, false));
    response.end();

    return true;
}


function rejectMissingTargetLanguage(response: ServerResponse, request: EditorialServiceRequest): boolean {
    if (request.editorial.operation !== EDITORIAL_OPERATION.TRANSLATION || request.articleContext.targetLanguage?.trim())
        return false;

    writeEditorialEvent(response, createEditorialErrorEvent(request.requestId, EDITORIAL_ERROR_CATEGORY.INVALID_OUTPUT, APPLICATION_ERROR.TARGET_LANGUAGE_REQUIRED, false));
    response.end();

    return true;
}


function createEditorialError(error: unknown): { category: Extract<EditorialEvent, { type: "error" }>["code"]; errorCode: ApplicationErrorCode } {
    if (error instanceof ApplicationServiceError)
        return {
            category:
                error.code === APPLICATION_ERROR.EDITORIAL_CONFIGURATION_MISSING
                    ? EDITORIAL_ERROR_CATEGORY.CONFIGURATION
                    : EDITORIAL_ERROR_CATEGORY.INVALID_OUTPUT,
            errorCode: error.code,
        };

    return {
        category: editorialErrorCategory(error),
        errorCode: error instanceof EditorialEngineError && error.code === EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM
            ? APPLICATION_ERROR.EDITORIAL_STREAM_INCOMPLETE
            : APPLICATION_ERROR.EDITORIAL_PROVIDER_FAILED,
    };
}


function editorialErrorCategory(error: unknown): Extract<EditorialEvent, { type: "error" }>["code"] {
    if (error instanceof EditorialEngineError)
        return ({
            [EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT]: EDITORIAL_ERROR_CATEGORY.INVALID_OUTPUT,
            [EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM]: EDITORIAL_ERROR_CATEGORY.MALFORMED_STREAM,
            [EDITORIAL_ENGINE_ERROR.NETWORK]: EDITORIAL_ERROR_CATEGORY.NETWORK,
            [EDITORIAL_ENGINE_ERROR.PROVIDER]: EDITORIAL_ERROR_CATEGORY.PROVIDER,
            [EDITORIAL_ENGINE_ERROR.SESSION_EXPIRED]: EDITORIAL_ERROR_CATEGORY.SESSION_EXPIRED,
        } as const)[error.code];

    const networkFetchConnectPattern = /network|fetch|connect|timeout|ECONN|ENOTFOUND/i;
    return error instanceof Error && networkFetchConnectPattern.test(error.message)
        ? EDITORIAL_ERROR_CATEGORY.NETWORK
        : EDITORIAL_ERROR_CATEGORY.PROVIDER;
}


async function streamEditorialEvents(response: ServerResponse, editorial: EditorialService, request: EditorialServiceRequest, controller: AbortController): Promise<void> {
    try {
        const completed = await writeEditorialStream(response, editorial, request, controller.signal);

        if (!completed && !controller.signal.aborted) {
            const editorialError = createEditorialErrorEvent(request.requestId, EDITORIAL_ERROR_CATEGORY.MALFORMED_STREAM, APPLICATION_ERROR.EDITORIAL_STREAM_INCOMPLETE, true);
            writeEditorialEvent(response, editorialError);
        }
    } catch (error) {
        if (!controller.signal.aborted) {
            const failure = createEditorialError(error);
            writeEditorialEvent(response, createEditorialErrorEvent(request.requestId, failure.category, failure.errorCode, true));
        }
    }
}


async function writeEditorialStream(response: ServerResponse, editorial: EditorialService, request: EditorialServiceRequest, signal: AbortSignal): Promise<boolean> {
    let completed = false;
    for await (const event of editorial.stream(request, signal)) {
        if (event.type === EDITORIAL_ENGINE_EVENT.COMPLETED)
            completed = true;
        else if (request.editorial.operation === EDITORIAL_OPERATION.STYLE_REVIEW && event.type === EDITORIAL_ENGINE_EVENT.TEXT_DELTA)
            continue;

        writeEditorialEvent(response, { ...event, requestId: request.requestId });
    }

    return completed;
}


export async function handleEditorialRoute(request: IncomingMessage, response: ServerResponse, articleId: string, editorial: EditorialService): Promise<void> {
    const editorialRequest = await readEditorialRequest(request, articleId);

    const controller = openEditorialStream(request, response);
    if (rejectUnsupportedOperation(response, editorialRequest) || rejectMissingTargetLanguage(response, editorialRequest))
        return;

    await streamEditorialEvents(response, editorial, editorialRequest, controller);
    response.end();
}
