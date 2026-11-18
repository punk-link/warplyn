import { readFile, writeFile } from "node:fs/promises";
import { installedLocaleCatalogs } from "../packages/web/src/i18n/catalogs.ts";
import { formatUiTerminologyTable } from "./format-ui-terminology-table.mjs";

const guidePath = "docs/development/i18n/ui-terminology.md";
const guide = (await readFile(guidePath, "utf8")).replaceAll("\r\n", "\n");
const table = formatUiTerminologyTable(installedLocaleCatalogs);
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
    console.log(`Generated terminology for ${installedLocaleCatalogs.length} locales and ${Object.keys(installedLocaleCatalogs[0].messages).length} messages.`);
}
