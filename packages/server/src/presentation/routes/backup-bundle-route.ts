import type { IncomingMessage, ServerResponse } from "node:http";
import { APPLICATION_ERROR, HTTP_STATUS } from "@skladno/shared";

import type { BackupBundleTransfers } from "../../infrastructure/persistence/backup-bundle.js";
import { ApplicationServiceError } from "../errors/application-error.js";
import { readBinary, readJson, writeJson } from "../transport/json.js";


function requestedIndex(value: string): number {
    const index = Number(value);
    if (!Number.isSafeInteger(index) || index < 0)
        throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);

    return index;
}


export async function createBackupExportRoute(response: ServerResponse, transfers: BackupBundleTransfers): Promise<void> {
    writeJson(response, HTTP_STATUS.CREATED, await transfers.createExport());
}


export async function readBackupExportRoute(response: ServerResponse, transfers: BackupBundleTransfers, id: string, index: string): Promise<void> {
    const bytes = await transfers.readExport(id, requestedIndex(index));
    response.writeHead(HTTP_STATUS.OK, { "content-type": "application/octet-stream" });
    response.end(bytes);
}


export async function removeBackupTransferRoute(response: ServerResponse, transfers: BackupBundleTransfers, id: string): Promise<void> {
    await transfers.remove(id);
    response.writeHead(HTTP_STATUS.NO_CONTENT);
    response.end();
}


export async function beginBackupImportRoute(request: IncomingMessage, response: ServerResponse, transfers: BackupBundleTransfers): Promise<void> {
    writeJson(response, HTTP_STATUS.CREATED, { id: await transfers.beginImport(await readJson(request, 5_000_000)) });
}


export async function writeBackupImportRoute(request: IncomingMessage, response: ServerResponse, transfers: BackupBundleTransfers, id: string, index: string): Promise<void> {
    await transfers.writeImport(id, requestedIndex(index), await readBinary(request));
    response.writeHead(HTTP_STATUS.NO_CONTENT);
    response.end();
}


export async function restoreBackupImportRoute(response: ServerResponse, transfers: BackupBundleTransfers, id: string): Promise<void> {
    await transfers.restoreImport(id);
    response.writeHead(HTTP_STATUS.NO_CONTENT);
    response.end();
}
