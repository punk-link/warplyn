import { existsSync, realpathSync } from "node:fs";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";


function canonicalPath(path: string): string {
    const suffix: string[] = [];
    let ancestor = resolve(path);
    while (!existsSync(ancestor)) {
        suffix.unshift(basename(ancestor));
        ancestor = dirname(ancestor);
    }

    const canonical = join(realpathSync(ancestor), ...suffix);
    return process.platform === "win32" ? canonical.toLowerCase() : canonical;
}


function containsDirectory(parent: string, child: string): boolean {
    const difference = relative(parent, child);
    return difference === "" || (!isAbsolute(difference) && difference !== ".." && !difference.startsWith(`..${sep}`));
}


export function resolveDataDirectory(environment: NodeJS.ProcessEnv, homeDirectory: string): string {
    const directory = resolve(environment.WARPLYN_DATA_DIR || join(homeDirectory, ".warplyn"));
    const destination = canonicalPath(directory);
    const legacyDirectories = [join(homeDirectory, ".skladno"), environment.SKLADNO_DATA_DIR].filter((path): path is string => Boolean(path));
    for (const path of legacyDirectories) {
        const legacy = canonicalPath(path);
        if (containsDirectory(legacy, destination) || containsDirectory(destination, legacy))
            throw new Error("Warplyn cannot use a Skladno data directory. Choose a separate WARPLYN_DATA_DIR and restore a backup in Data & backups.");
    }

    return directory;
}
