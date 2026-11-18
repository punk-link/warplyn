export function formatUiTerminologyTable(installedCatalogs) {
    const english = installedCatalogs.find((catalog) => catalog.code === "en");
    if (!english)
        throw new Error("English catalog is missing.");

    const catalogs = [english, ...installedCatalogs.filter((catalog) => catalog.code !== "en")];
    const rows = Object.keys(english.messages).map((id) => {
        const cells = catalogs.map((catalog) => {
            const value = catalog.messages[id];
            if (typeof value !== "string")
                throw new Error(`Missing message ${id} in ${catalog.code}.`);

            return escapeCell(value);
        });

        return `| \`${id}\` | ${cells.join(" | ")} |`;
    });
    const headings = catalogs.map((catalog) => catalog.code === "en" ? "English" : catalog.code);

    return [
        `| Message ID | ${headings.join(" | ")} |`,
        `| ${["---", ...catalogs.map(() => "---")].join(" | ")} |`,
        ...rows,
    ].join("\n");
}


function escapeCell(value) {
    return value.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("|", "&#124;")
        .replaceAll("\r\n", "\n")
        .replaceAll("\n", "<br>");
}
