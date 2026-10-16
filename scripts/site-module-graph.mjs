import { readFileSync } from "node:fs";
import ts from "typescript";


export function readSiteModuleGraph(entry, visited = new Set()) {
    if (visited.has(entry.href))
        return "";

    visited.add(entry.href);
    const source = readFileSync(entry, "utf8");
    const module = ts.createSourceFile(entry.pathname, source, ts.ScriptTarget.Latest, false, ts.ScriptKind.JS);
    const dependencies = module.statements.flatMap((statement) => {
        if (!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement))
            return [];

        const specifier = statement.moduleSpecifier;
        if (!specifier || !ts.isStringLiteral(specifier) || !specifier.text.startsWith("."))
            return [];

        return [readSiteModuleGraph(new URL(specifier.text, entry), visited)];
    });
    return [source, ...dependencies].join("\n");
}
