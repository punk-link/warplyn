import ts from "typescript";


const localePath = /^(packages\/(?:web\/src\/i18n|shared\/src\/application\/desktop)\/locales\/[^/]+)\/.+\.ts$/;


export function compactLocaleChanges(changes, readBefore, readAfter) {
    const catalogs = new Map();
    const retained = [];
    for (const change of changes) {
        const match = localePath.exec(change.path);
        if (!match) {
            retained.push(change);
            continue;
        }

        const before = literalMessages(readBefore(change.path));
        const after = literalMessages(readAfter(change.path));
        if (!before || !after) {
            retained.push(change);
            continue;
        }

        const catalog = catalogs.get(match[1]) || { before: new Map(), after: new Map(), paths: [] };
        catalog.paths.push(change.path);
        for (const [key, value] of before)
            catalog.before.set(key, value);

        for (const [key, value] of after)
            catalog.after.set(key, value);

        catalogs.set(match[1], catalog);
    }

    for (const [path, catalog] of catalogs) {
        const messages = [];
        let unchanged = 0;
        for (const key of new Set([...catalog.before.keys(), ...catalog.after.keys()])) {
            const before = catalog.before.get(key);
            const after = catalog.after.get(key);
            if (before === after)
                unchanged++;
            else
                messages.push({ key, before, after });
        }

        retained.push({ path, patch: JSON.stringify({ paths: catalog.paths, unchanged, messages }) });
    }

    return retained;
}


function literalMessages(content) {
    if (!content)
        return new Map();

    const source = ts.createSourceFile("catalog.ts", content, ts.ScriptTarget.Latest, true);
    if (source.parseDiagnostics.length)
        return null;

    for (const statement of source.statements) {
        if (ts.isImportDeclaration(statement) && statement.importClause?.isTypeOnly)
            continue;

        if (!ts.isVariableStatement(statement))
            return null;

        for (const declaration of statement.declarationList.declarations) {
            let value = declaration.initializer;
            while (value && (ts.isSatisfiesExpression(value) || ts.isAsExpression(value) || ts.isParenthesizedExpression(value)))
                value = value.expression;

            if (!value || !ts.isObjectLiteralExpression(value))
                return null;
        }
    }

    const messages = new Map();
    let unsupported = false;


    function visit(node) {
        if (ts.isObjectLiteralExpression(node))
            for (const property of node.properties) {
                const value = ts.isPropertyAssignment(property) ? literalText(property.initializer) : undefined;
                if (!ts.isPropertyAssignment(property) || !ts.isStringLiteral(property.name) ||
                    value === undefined || messages.has(property.name.text)) {
                    unsupported = true;
                    continue;
                }

                messages.set(property.name.text, value);
            }

        ts.forEachChild(node, visit);
    }


    visit(source);
    return unsupported || !messages.size ? null : messages;
}


function literalText(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
        return node.text;

    if (ts.isParenthesizedExpression(node))
        return literalText(node.expression);

    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
        const left = literalText(node.left);
        const right = literalText(node.right);
        if (left !== undefined && right !== undefined)
            return left + right;
    }

    return undefined;
}
