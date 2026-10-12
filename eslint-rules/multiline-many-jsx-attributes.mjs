const minimumAttributes = 4;


export default {
    meta: {
        type: "layout",
        docs: {
            description: "Put JSX attributes on separate lines when an opening element has many attributes.",
        },
        fixable: "whitespace",
        messages: {
            multilineAttributes: "Put each attribute on its own line when a JSX element has four or more attributes.",
        },
        schema: [],
    },

    create(context) {
        const sourceCode = context.sourceCode;


        function getIndentation(node) {
            const lineStart = sourceCode.text.lastIndexOf("\n", node.range[0] - 1) + 1;
            const punctuationPattern = /^[ \t]*/u;
            const currentIndentation = punctuationPattern.exec(sourceCode.text.slice(lineStart, node.range[0]))?.[0] ?? "";
            return `${currentIndentation}    `;
        }


        function needsLineBreaks(node) {
            if (node.attributes.length < minimumAttributes)
                return false;

            let previous = node.name;
            for (const attribute of node.attributes) {
                if (previous.loc.end.line === attribute.loc.start.line)
                    return true;

                previous = attribute;
            }

            return false;
        }


        function addLineBreaks(fixer, node) {
            const indentation = getIndentation(node);
            const newline = sourceCode.text.includes("\r\n") ? "\r\n" : "\n";
            const fixes = [];
            let previous = node.name;

            for (const attribute of node.attributes) {
                if (previous.loc.end.line === attribute.loc.start.line)
                    fixes.push(fixer.replaceTextRange([previous.range[1], attribute.range[0]], `${newline}${indentation}`));

                previous = attribute;
            }

            return fixes;
        }


        return {
            JSXOpeningElement(node) {
                if (!needsLineBreaks(node))
                    return;

                context.report({
                    node,
                    messageId: "multilineAttributes",
                    fix: (fixer) => addLineBreaks(fixer, node),
                });
            },
        };
    },
};
