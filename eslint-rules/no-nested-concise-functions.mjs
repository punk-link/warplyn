export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Keep nested functions out of concise arrow expressions.",
        },
        schema: [],
        messages: {
            nested: "Use a block body with explicit steps or a named helper instead of nesting a function inside a concise arrow expression.",
        },
    },

    create(context) {
        const functions = [];


        function enter(node) {
            const enclosing = functions.at(-1);
            if (enclosing?.type === "ArrowFunctionExpression" && enclosing.expression)
                context.report({ node, messageId: "nested" });

            functions.push(node);
        }


        function leave() {
            functions.pop();
        }


        return {
            ArrowFunctionExpression: enter,
            "ArrowFunctionExpression:exit": leave,
            FunctionExpression: enter,
            "FunctionExpression:exit": leave,
            FunctionDeclaration: enter,
            "FunctionDeclaration:exit": leave,
        };
    },
};
