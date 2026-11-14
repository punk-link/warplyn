export function readAppImageUpdateMetadata(value: unknown, version: string) {
    if (!value || typeof value !== "object")
        throw new Error("Invalid AppImage metadata.");

    const sha256Pattern = /^[a-f0-9]{64}$/;
    if (!("version" in value) || value.version !== version ||
        !("architecture" in value) || value.architecture !== "x64" ||
        !("file" in value) || value.file !== `Warplyn-${version}-linux-x64.AppImage` ||
        !("size" in value) || typeof value.size !== "number" || !Number.isSafeInteger(value.size) ||
        value.size <= 0 || value.size > 2_147_483_648 ||
        !("sha256" in value) || typeof value.sha256 !== "string" || !sha256Pattern.test(value.sha256))
        throw new Error("Incompatible AppImage metadata.");

    return { file: value.file, size: value.size, sha256: value.sha256 };
}
