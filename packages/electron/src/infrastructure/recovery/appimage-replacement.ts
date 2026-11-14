import { constants } from "node:fs";
import { access, chmod, copyFile, open, rename, rm } from "node:fs/promises";
import { dirname } from "node:path";


/** Stage on the installation filesystem so replacement is one atomic rename. */
export async function prepareAppImageReplacement(installed: string, downloaded: string) {
    await access(dirname(installed), constants.W_OK);
    const staged = `${installed}.update`;
    const previous = `${installed}.previous`;
    try {
        await copyFile(installed, `${previous}.tmp`);
        await rename(`${previous}.tmp`, previous);
        await copyFile(downloaded, staged, constants.COPYFILE_EXCL);
        await chmod(staged, 0o700);
        const file = await open(staged, "r+");

        try {
            await file.sync();
        } finally {
            await file.close();
        }
    } catch (error) {
        await rm(staged, { force: true });
        await rm(`${previous}.tmp`, { force: true });

        throw error;
    }

    return {
        apply: () => rename(staged, installed),
        cancel: () => rm(staged, { force: true }),
    };
}
