function splitString(value) {
    const characters = Array.from(value);
    const chunks = [];

    while (characters.length > 0) {
        let boundary = 0;
        while (boundary < characters.length && JSON.stringify(characters.slice(0, boundary + 1).join("")).length < 160)
            boundary++;

        if (boundary === characters.length) {
            chunks.push(characters.splice(0).join(""));
            break;
        }

        const lastSpace = characters.lastIndexOf(" ", boundary - 1);
        if (lastSpace > 0 && lastSpace < boundary)
            boundary = lastSpace + 1;

        chunks.push(characters.splice(0, boundary).join(""));
    }

    return chunks;
}


function createStringFix(fixer, node, value, sourceCode) {
    const chunks = splitString(value);
    const lineStart = sourceCode.text.lastIndexOf("\n", node.range[0] - 1) + 1;
    const punctuationPattern = /^[ \t]*/u;
    const indentation = punctuationPattern.exec(sourceCode.text.slice(lineStart, node.range[0]))?.[0] ?? "";
    const newline = sourceCode.text.includes("\r\n") ? "\r\n" : "\n";
    const expression = chunks.length === 1
        ? JSON.stringify(chunks[0])
        : `(${chunks.map((chunk) => JSON.stringify(chunk)).join(` +${newline}${indentation}    `)})`;

    if (node.parent.type === "JSXAttribute")
        return fixer.replaceText(node, `{${expression}}`);

    if (node.parent.type === "TSLiteralType" || node.parent.type === "ImportDeclaration" || node.parent.type === "ExportNamedDeclaration" || node.parent.type === "ExportAllDeclaration")
        return null;

    return fixer.replaceText(node, expression);
}


export default {
    meta: {
        type: "layout",
        docs: {
            description: "Require long string content to span multiple source lines.",
        },
        fixable: "code",
        messages: {
            multilineLongString: "Break string content of 160 characters or more across multiple source lines.",
        },
        schema: [],
    },

    create(context) {
        function hasLongLine(value) {
            const lineBreakPattern = /\r?\n/u;
            return value.split(lineBreakPattern).some((line) => Array.from(line).length >= 160);
        }


        function checkString(node) {
            if (hasLongLine(node.raw.slice(1, -1)))
                context.report({
                    node,
                    messageId: "multilineLongString",
                    fix: (fixer) => createStringFix(fixer, node, node.value, context.sourceCode),
                });
        }


        function checkTemplate(node) {
            if (!node.quasis.some((quasi) => hasLongLine(quasi.value.raw)))
                return;

            const taggedTemplate = node.parent.type === "TaggedTemplateExpression";
            const isStringRaw = taggedTemplate && context.sourceCode.getText(node.parent.tag) === "String.raw";
            const canFix = node.expressions.length === 0 && (!taggedTemplate || isStringRaw);

            context.report({
                node,
                messageId: "multilineLongString",
                fix: canFix
                    ? (fixer) => {
                        const value = isStringRaw ? node.quasis[0].value.raw : node.quasis[0].value.cooked ?? node.quasis[0].value.raw;
                        const fixes = createStringFix(fixer, node, value, context.sourceCode);
                        return isStringRaw ? fixer.replaceText(node.parent, fixes.text) : fixes;
                    }
                    : undefined,
            });
        }


        return {
            Literal(node) {
                if (typeof node.value === "string")
                    checkString(node);
            },

            TemplateLiteral: checkTemplate,
        };
    },
};
