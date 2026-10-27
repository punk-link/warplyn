const metadataCommentPattern = /^\s*(?:eslint(?:-|\s)|@vitest-environment\b|product(?::| scenarios?:)|ponytail:)/iu;


export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Keep behavior explanations in names and control flow; reserve comments for descriptions and tooling metadata.",
        },
        messages: {
            behaviorComment: "Replace behavior comments with clear names or control flow, or use a JSDoc-style description.",
        },
        schema: [],
    },

    create(context) {
        return {
            Program() {
                for (const comment of context.sourceCode.getAllComments()) {
                    if (comment.type === "Block" && comment.value.startsWith("*") || metadataCommentPattern.test(comment.value))
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
