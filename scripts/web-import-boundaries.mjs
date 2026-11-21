import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const repositoryRoot = process.cwd();
const sourceRoot = path.join(repositoryRoot, "packages", "web", "src");

const boundaryRules = [
    {
        name: "cross-cutting renderer modules do not import feature modules",
        matchesSource: (file) => ["ui/", "i18n/", "key-bindings/", "notifications/"].some((prefix) => file.startsWith(prefix)),
        matchesTarget: isFeatureModule,
    },
    {
        name: "workspace state does not import UI or feature rendering",
        matchesSource: (file) => file.startsWith("workspace/state/"),
        matchesTarget: (file) => file.startsWith("workspace/components/") || file.startsWith("workspace/views/") || file.startsWith("settings/") || file.startsWith("ui/"),
    },
    {
        name: "workspace components do not import the composition root",
        matchesSource: (file) => file.startsWith("workspace/components/"),
        matchesTarget: (file) => file === "workspace/EditorialWorkspace",
    },
    {
        name: "workspace views do not import the composition root",
        matchesSource: (file) => file.startsWith("workspace/views/"),
        matchesTarget: (file) => file === "workspace/EditorialWorkspace",
    },
    {
        name: "settings does not import workspace modules",
        matchesSource: (file) => file.startsWith("settings/"),
        matchesTarget: (file) => file.startsWith("workspace/"),
    },
    {
        name: "the application client does not import feature modules",
        matchesSource: (file) => file === "application-client.ts" || file.startsWith("application/"),
        matchesTarget: isFeatureModule,
    },
];


function isFeatureModule(file) {
    return file.startsWith("settings/") || file.startsWith("workspace/") ||
        ["App", "ApplicationScreens", "QuickStartDialog"].includes(file);
}


async function collectSourceFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...await collectSourceFiles(entryPath));
            continue;
        }

        const tsxPattern = /\.(ts|tsx)$/;
        const testFilenamePattern = /\.test\.(ts|tsx)$/;
        if (tsxPattern.test(entry.name) && !testFilenamePattern.test(entry.name))
            files.push(entryPath);
    }

    return files;
}


function relativeSourcePath(filePath) {
    return path.relative(sourceRoot, filePath).replaceAll(path.sep, "/");
}


function resolveRelativeImport(sourceFile, importPath) {
    if (!importPath.startsWith("."))
        return undefined;

    const sourceDirectory = path.posix.dirname(sourceFile);
    const resolved = path.posix.normalize(path.posix.join(sourceDirectory, importPath));

    const jsxTsxPattern = /\.(?:js|jsx|ts|tsx)$/;
    return resolved.replace(jsxTsxPattern, "");
}


function findImports(source, filename) {
    const parsed = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
    const imports = [];


    function visit(node) {
        let specifier;
        if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
            specifier = node.moduleSpecifier;
        else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword)
            specifier = node.arguments[0];
        else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument))
            specifier = node.argument.literal;
        else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference))
            specifier = node.moduleReference.expression;

        if (specifier && ts.isStringLiteralLike(specifier))
            imports.push({ path: specifier.text, line: parsed.getLineAndCharacterOfPosition(specifier.getStart(parsed)).line + 1 });

        ts.forEachChild(node, visit);
    }


    visit(parsed);
    return imports;
}


async function checkBoundaries() {
    const sourceFiles = await collectSourceFiles(sourceRoot);
    const violations = [];

    for (const sourceFile of sourceFiles) {
        const sourcePath = relativeSourcePath(sourceFile);
        const source = await readFile(sourceFile, "utf8");

        for (const imported of findImports(source, sourcePath)) {
            const targetPath = resolveRelativeImport(sourcePath, imported.path);
            if (!targetPath)
                continue;

            for (const rule of boundaryRules) {
                if (rule.matchesSource(sourcePath) && rule.matchesTarget(targetPath))
                    violations.push(`${sourcePath}:${imported.line} -> ${targetPath}: ${rule.name}`);
            }
        }
    }

    return { sourceFiles, violations };
}


const { sourceFiles, violations } = await checkBoundaries();

if (violations.length > 0) {
    process.stderr.write("Web import-boundary violations:\n");
    for (const violation of violations)
        process.stderr.write(`- ${violation}\n`);

    process.exitCode = 1;
} else {
    process.stdout.write(`Checked ${sourceFiles.length} web modules against ${boundaryRules.length} import boundaries.\n`);
}
