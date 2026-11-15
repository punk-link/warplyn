const metadataCommentPattern = /^\s*(?:eslint(?:-|\s)|@vitest-environment\b|product(?::| scenarios?:)|ponytail:)/iu;

const documentationTargets = new Set([
    "FunctionDeclaration", "ClassDeclaration", "VariableDeclaration",
    "ExportNamedDeclaration", "ExportDefaultDeclaration", "MethodDefinition",
    "PropertyDefinition", "TSInterfaceDeclaration", "TSTypeAliasDeclaration",
    "TSEnumDeclaration", "TSMethodSignature", "TSPropertySignature",
    "TSDeclareFunction",
]);


function isDeclarationDocumentation(sourceCode, comment) {
    if (comment.type !== "Block" || !comment.value.startsWith("*"))
        return false;

    const nextToken = sourceCode.getTokenAfter(comment, { includeComments: true });
    if (!nextToken || nextToken.loc.start.line > comment.loc.end.line + 1)
        return false;

    let node = sourceCode.getNodeByRangeIndex(nextToken.range[0]);
    while (node && node.range[0] === nextToken.range[0]) {
        if (documentationTargets.has(node.type))
            return true;

        node = node.parent;
    }

    return false;
}


export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Keep behavior explanations in names and control flow; reserve comments for descriptions and tooling metadata.",
        },
        messages: {
            behaviorComment: "Replace behavior comments with clear names or control flow. JSDoc must immediately document a declaration or member.",
        },
        schema: [],
    },

    create(context) {
        return {
            Program() {
                for (const comment of context.sourceCode.getAllComments()) {
                    if (isDeclarationDocumentation(context.sourceCode, comment) || metadataCommentPattern.test(comment.value))
                        continue;

                    context.report({
                        loc: comment.loc,
                        messageId: "behaviorComment",
                    });
                }
            },
        };
    },
};
