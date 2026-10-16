const unicodeCharacterEscapePattern = /\\u(?:\{([0-9a-f]{1,6})\}|([0-9a-f]{4}))|\\x([0-9a-f]{2})|\\([0-9a-f]{2,6})(?:[ \t\r\n])?|\\0(?![0-9])/giu;
const trailingBackslashesPattern = /\\*$/u;


function unicodeEscapes(source) {
    const escapes = [];
    for (const match of source.matchAll(unicodeCharacterEscapePattern)) {
        const precedingBackslashes = source.slice(0, match.index).match(trailingBackslashesPattern)?.[0].length ?? 0;
        if (precedingBackslashes % 2 === 1)
            continue;

        escapes.push(match);
    }

    return escapes;
}


function isNamedCharacterConstant(node, source) {
    if (node.regex || typeof node.value !== "string" || Array.from(node.value).length !== 1 || unicodeEscapes(source).length !== 1)
        return false;

    const declarator = node.parent;
    const declaration = declarator?.parent;
    return declarator?.type === "VariableDeclarator" &&
        declarator.init === node &&
        declarator.id.type === "Identifier" &&
        declaration?.type === "VariableDeclaration" &&
        declaration.kind === "const";
}


export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Give Unicode character escapes a named constant before using them.",
        },
        messages: {
            unnamedUnicodeCharacter: "Use a named character constant or write the readable character directly.",
        },
        schema: [],
    },

    create(context) {
        const sourceCode = context.sourceCode;


        function checkLiteral(node) {
            const source = sourceCode.getText(node);
            if (unicodeEscapes(source).length > 0 && !isNamedCharacterConstant(node, source))
                context.report({ node, messageId: "unnamedUnicodeCharacter" });
        }


        function checkTemplate(node) {
            if (unicodeEscapes(sourceCode.getText(node)).length > 0)
                context.report({ node, messageId: "unnamedUnicodeCharacter" });
        }


        return {
            Literal: checkLiteral,
            TemplateLiteral: checkTemplate,
        };
    },
};
