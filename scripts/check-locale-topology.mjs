import { readdirSync, readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";


function catalogTopology(directory) {
    const topology = new Map();
    for (const entry of readdirSync(directory, { recursive: true, withFileTypes: true })) {
        if (!entry.isFile())
            continue;

        const path = resolve(entry.parentPath, entry.name);
        const name = relative(directory, path).replaceAll("\\", "/");
        const source = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true);
        const keys = [];


        function visit(node) {
            if (ts.isPropertyAssignment(node))
                keys.push(node.name.getText(source));

            ts.forEachChild(node, visit);
        }


        visit(source);
        topology.set(name, keys.sort().join("\n"));
    }

    return topology;
}


export function checkLocaleTopology(root) {
    const locales = readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory());
    const reference = locales.find((entry) => entry.name === "en") ?? locales[0];
    if (!reference)
        return ["No locale directories found."];

    const expected = catalogTopology(resolve(root, reference.name));
    const errors = [];
    for (const locale of locales) {
        const actual = catalogTopology(resolve(root, locale.name));
        for (const file of new Set([...expected.keys(), ...actual.keys()])) {
            if (!actual.has(file))
                errors.push(`${locale.name}/${file}: missing file (reference: ${reference.name}).`);
            else if (!expected.has(file))
                errors.push(`${locale.name}/${file}: unexpected file (reference: ${reference.name}).`);
            else if (actual.get(file) !== expected.get(file))
                errors.push(`${locale.name}/${file}: translation key structure differs from ${reference.name}/${file}.`);
        }
    }

    return errors;
}


if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const errors = checkLocaleTopology(resolve("packages/web/src/i18n/locales"));
    for (const error of errors)
        console.error(error);

    process.exitCode = errors.length ? 1 : 0;
}
