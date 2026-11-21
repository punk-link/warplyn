import { readFile, writeFile } from "node:fs/promises";
import { installedLocaleCatalogs } from "../packages/web/src/i18n/catalogs.ts";
import { formatUiTerminologyTable } from "./format-ui-terminology-table.mjs";

const guidePath = "docs/development/i18n/ui-terminology.md";
const guide = (await readFile(guidePath, "utf8")).replaceAll("\r\n", "\n");
const terminologyRowPattern = /^\| `([^`]+)` \|/gm;
const messageIds = [...guide.matchAll(terminologyRowPattern)].map((match) => match[1]);
const catalogs = installedLocaleCatalogs.map((catalog) => ({
    ...catalog,
    messages: Object.fromEntries(messageIds.map((id) => [id, catalog.messages[id]])),
}));
const table = formatUiTerminologyTable(catalogs);
const start = guide.indexOf("| Message ID |");
const end = guide.indexOf("\n## Variable labels", start);
if (start < 0 || end < 0)
    throw new Error("Could not find terminology table boundaries.");

if (process.argv.includes("--check")) {
    if (guide.slice(start, end).trimEnd() !== table) {
        console.error("UI terminology table is outdated. Run npm run docs:i18n-terminology and commit the updated table.");
        process.exitCode = 1;
    } else {
        console.log("UI terminology table is current.");
    }
} else {
    await writeFile(guidePath, `${guide.slice(0, start)}${table}\n${guide.slice(end).trimEnd()}\n`);
    console.log(`Generated terminology for ${catalogs.length} locales and ${messageIds.length} documentation terms.`);
}
