import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";


/** Hash bounded chunks so large snapshots do not monopolize the event loop. */
export async function recordBackupFile(path: string): Promise<{ size: number; sha256: string }> {
    const hash = createHash("sha256");
    let size = 0;
    for await (const bytes of createReadStream(path)) {
        size += bytes.length;
        hash.update(bytes);
    }

    return { size, sha256: hash.digest("hex") };
}
