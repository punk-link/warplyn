function getStaticSql(node) {
    if (node.type === "Literal" && typeof node.value === "string")
        return node.value;

    if (node.type === "TemplateLiteral" && node.expressions.length === 0)
        return node.quasis[0]?.value.cooked ?? node.quasis[0]?.value.raw;

    if (node.type !== "BinaryExpression" || node.operator !== "+")
        return undefined;

    const left = getStaticSql(node.left);
    const right = getStaticSql(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
}


function maskSqlLiterals(sql) {
    const characters = sql.split("");
    let quote;
    let comment;

    for (let index = 0; index < characters.length; index++) {
        const character = characters[index];
        const next = characters[index + 1];

        if (comment === "line") {
            if (character === "\n")
                comment = undefined;
            else
                characters[index] = " ";

            continue;
        }

        if (comment === "block") {
            if (character === "*" && next === "/") {
                characters[index] = " ";
                characters[index + 1] = " ";
                index++;
                comment = undefined;
            } else if (character !== "\n" && character !== "\r") {
                characters[index] = " ";
            }

            continue;
        }

        if (quote) {
            if (character === quote) {
                if (next === quote) {
                    characters[index + 1] = " ";
                    index++;
                } else {
                    quote = undefined;
                }
            }

            if (character !== "\n" && character !== "\r")
                characters[index] = " ";

            continue;
        }

        if (character === "-" && next === "-") {
            characters[index] = " ";
            characters[index + 1] = " ";
            index++;
            comment = "line";
        } else if (character === "/" && next === "*") {
            characters[index] = " ";
            characters[index + 1] = " ";
            index++;
            comment = "block";
        } else if (["'", '"', "`", "["].includes(character)) {
            quote = character === "[" ? "]" : character;
            characters[index] = " ";
        }
    }

    return characters.join("");
}


function hasStructuredClauses(sql) {
    if (/[ \t]+(?:\r?\n|$)/u.test(sql))
        return false;

    const maskedSql = maskSqlLiterals(sql);
    const clauses = /\b(?:SELECT|FROM|LEFT\s+JOIN|RIGHT\s+JOIN|INNER\s+JOIN|CROSS\s+JOIN|FULL(?:\s+OUTER)?\s+JOIN|JOIN|WHERE|GROUP\s+BY|HAVING|ORDER\s+BY|LIMIT|OFFSET|VALUES|SET|ON\s+CONFLICT|RETURNING|UNION(?:\s+ALL)?)\b/giu;

    for (const clause of maskedSql.matchAll(clauses)) {
        const index = clause.index ?? 0;
        const lineStart = maskedSql.lastIndexOf("\n", index - 1) + 1;
        const prefix = maskedSql.slice(lineStart, index);
        if (clause[0].toUpperCase() === "FROM" && /^\s*DELETE\s*$/iu.test(prefix))
            continue;

        if (prefix.trim())
            return false;
    }

    return true;
}


function formatSql(sql, indentation) {
    const maskedSql = maskSqlLiterals(sql);
    const clauses = /\b(?:SELECT|FROM|LEFT\s+JOIN|RIGHT\s+JOIN|INNER\s+JOIN|CROSS\s+JOIN|FULL(?:\s+OUTER)?\s+JOIN|JOIN|WHERE|GROUP\s+BY|HAVING|ORDER\s+BY|LIMIT|OFFSET|VALUES|SET|ON\s+CONFLICT|RETURNING|UNION(?:\s+ALL)?)\b/giu;
    const breaks = [];

    for (const clause of maskedSql.matchAll(clauses)) {
        const index = clause.index ?? 0;
        const lineStart = maskedSql.lastIndexOf("\n", index - 1) + 1;
        const prefix = maskedSql.slice(lineStart, index);
        if (clause[0].toUpperCase() === "FROM" && /^\s*DELETE\s*$/iu.test(prefix))
            continue;

        if (prefix.trim())
            breaks.push(index);
    }

    let formatted = "";
    let previous = 0;
    for (const index of breaks) {
        formatted += `${sql.slice(previous, index).replace(/[ \t]+$/u, "")}\n${indentation}`;
        previous = index;
    }

    formatted += sql.slice(previous);

    return wrapLongLines(formatted, indentation).replace(/[ \t]+(?=\r?$)/gmu, "");
}


function wrapLongLines(sql, indentation) {
    return sql.split(/\r?\n/u).flatMap((sourceLine) => {
        const lines = [];
        let line = sourceLine;

        while (Array.from(line).length >= 160) {
            const maskedLine = maskSqlLiterals(line);
            const comma = maskedLine.lastIndexOf(",", 149);
            if (comma < 0)
                break;

            lines.push(line.slice(0, comma + 1));
            line = `${indentation}    ${line.slice(comma + 1).trimStart()}`;
        }

        lines.push(line);
        return lines;
    }).join("\n");
}


function toTemplateLiteral(sql, indentation) {
    const content = formatSql(sql, indentation);
    const escaped = content.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");
    return `\`${escaped}\``;
}


function isDatabaseQuery(node) {
    return node.type === "CallExpression"
        && node.callee.type === "MemberExpression"
        && !node.callee.computed
        && node.callee.property.type === "Identifier"
        && (node.callee.property.name === "prepare" || node.callee.property.name === "exec");
}


function isMigrationSql(node, filename) {
    return /[\\/]infrastructure[\\/]persistence[\\/]migrations\.ts$/u.test(filename)
        && node.type === "Property"
        && !node.computed
        && node.key.type === "Identifier"
        && node.key.name === "sql";
}


export default {
    meta: {
        type: "layout",
        docs: {
            description: "Put the clauses of long database queries on separate lines.",
        },
        fixable: "code",
        messages: {
            structuredSql: "Format long SQL with each clause starting on its own line.",
        },
        schema: [],
    },

    create(context) {
        function checkSql(node, expression) {
            const sql = getStaticSql(expression);
            if (!sql || Array.from(sql).length < 160 || hasStructuredClauses(sql))
                return;

            context.report({
                node: expression,
                messageId: "structuredSql",
                fix(fixer) {
                    const sourceLine = context.sourceCode.text.lastIndexOf("\n", expression.range[0] - 1) + 1;
                    const baseIndentation = /^[ \t]*/u.exec(context.sourceCode.text.slice(sourceLine, expression.range[0]))?.[0] ?? "";
                    const indentation = `${baseIndentation}    `;
                    return fixer.replaceText(expression, toTemplateLiteral(sql, indentation));
                },
            });
        }


        return {
            CallExpression(node) {
                if (isDatabaseQuery(node) && node.arguments[0])
                    checkSql(node, node.arguments[0]);
            },

            Property(node) {
                if (isMigrationSql(node, context.filename))
                    checkSql(node, node.value);
            },
        };
    },
};
