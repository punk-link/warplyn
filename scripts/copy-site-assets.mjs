import { copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const source = fileURLToPath(
    new URL("../packages/web/src/design-tokens.css", import.meta.url),
);
const destination = fileURLToPath(
    new URL("../site/tokens.css", import.meta.url),
);

await copyFile(source, destination);

await copyFile(
    fileURLToPath(new URL("../packages/web/src/ui/warplyn-light.svg", import.meta.url)),
    fileURLToPath(new URL("../site/warplyn.svg", import.meta.url)),
);
