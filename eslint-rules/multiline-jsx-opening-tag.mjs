const leadingWhitespacePattern = /^\s*/u;


const multilineJsxOpeningTag = {
    meta: {
        type: "layout",
        docs: {
            description: "Parenthesize multiline JSX returned by arrow functions, logical expressions, and conditional branches.",
        },
        fixable: "whitespace",
        messages: {
            ownLine: "Start this multiline JSX element on its own indented line.",
        },
        schema: [],
    },

    create(context) {
        const sourceCode = context.sourceCode;
        const lineBreak = sourceCode.text.includes("\r\n") ? "\r\n" : "\n";
        const logicalOperators = new Set(["&&", "||", "??"]);


        function containsMultilineJsx(node) {
            if (!node || typeof node !== "object")
                return false;

            if (node.type === "JSXElement") {
                const openingElement = node.openingElement;
                const closingElement = node.closingElement;
                if (
                    openingElement.loc.start.line !== openingElement.loc.end.line ||
                    (closingElement && closingElement.loc.start.line !== openingElement.loc.start.line)
                )
                    return true;
            }

            return Object.entries(node)
                .filter(([key]) => key !== "parent")
                .some(([, value]) => Array.isArray(value)
                    ? value.some(containsMultilineJsx)
                    : containsMultilineJsx(value));
        }


        return {
            ArrowFunctionExpression(node) {
                if (node.body.type === "BlockStatement" || !containsMultilineJsx(node.body))
                    return;

                const arrowToken = sourceCode.getTokenBefore(node.body);
                if (arrowToken?.value !== "=>")
                    return;

                const betweenArrowAndBody = sourceCode.text.slice(arrowToken.range[1], node.body.range[0]);
                if (betweenArrowAndBody.includes("("))
                    return;

                const arrowLineStart = sourceCode.text.lastIndexOf("\n", arrowToken.range[0] - 1) + 1;
                const arrowPrefix = sourceCode.text.slice(arrowLineStart, arrowToken.range[0]);
                const arrowIndentation = leadingWhitespacePattern.exec(arrowPrefix)?.[0] ?? "";
                const openingIndentation = `${arrowIndentation}    `;
                context.report({
                    node,
                    messageId: "ownLine",
                    fix(fixer) {
                        return [
                            fixer.replaceTextRange(
                                [arrowToken.range[1], node.body.range[0]],
                                ` (\n${openingIndentation}`,
                            ),
                            fixer.insertTextAfter(node.body, `${lineBreak}${arrowIndentation})`),
                        ];
                    },
                });
            },

            JSXOpeningElement(node) {
                const element = node.parent;
                const closingElement = element.closingElement ?? (node.selfClosing ? node : undefined);
                const openingTagIsSingleLine = node.loc.start.line === node.loc.end.line;
                if (
                    !closingElement ||
                    (!node.selfClosing && element.closingElement.loc.start.line === node.loc.start.line) ||
                    (node.selfClosing && openingTagIsSingleLine)
                )
                    return;

                const previousToken = sourceCode.getTokenBefore(node);
                if (!previousToken)
                    return;

                const interveningTokens = sourceCode.getTokensBetween(previousToken, node, { includeComments: true });
                if (interveningTokens.length > 0)
                    return;

                const conditionalExpression = element.parent;
                let conditionalOperator;
                if (conditionalExpression.type === "ConditionalExpression") {
                    if (conditionalExpression.consequent === element)
                        conditionalOperator = "?";
                    else if (conditionalExpression.alternate === element)
                        conditionalOperator = ":";
                }

                if (conditionalOperator) {
                    if (previousToken.value !== conditionalOperator)
                        return;

                    const operatorLineStart = sourceCode.text.lastIndexOf("\n", previousToken.range[0] - 1) + 1;
                    const operatorPrefix = sourceCode.text.slice(operatorLineStart, previousToken.range[0]);
                    const operatorIndentation = leadingWhitespacePattern.exec(operatorPrefix)?.[0] ?? "";
                    const openingIndentation = `${operatorIndentation}    `;
                    context.report({
                        node,
                        messageId: "ownLine",
                        fix(fixer) {
                            return [
                                fixer.replaceTextRange(
                                    [previousToken.range[1], node.range[0]],
                                    ` (\n${openingIndentation}`,
                                ),
                                fixer.insertTextAfter(closingElement, `${lineBreak}${operatorIndentation})`),
                            ];
                        },
                    });
                    return;
                }

                if (!logicalOperators.has(previousToken.value))
                    return;

                const logicalExpression = element.parent;
                if (logicalExpression.type !== "LogicalExpression" || logicalExpression.right !== element)
                    return;

                const operatorLineStart = sourceCode.text.lastIndexOf("\n", previousToken.range[0] - 1) + 1;
                const operatorPrefix = sourceCode.text.slice(operatorLineStart, previousToken.range[0]);
                const operatorIndentation = leadingWhitespacePattern.exec(operatorPrefix)?.[0] ?? "";
                const openingIndentation = `${operatorIndentation}    `;
                context.report({
                    node,
                    messageId: "ownLine",
                    fix(fixer) {
                        return [
                            fixer.replaceTextRange(
                                [previousToken.range[1], node.range[0]],
                                ` (\n${openingIndentation}`,
                            ),
                            fixer.insertTextAfter(closingElement, `${lineBreak}${operatorIndentation})`),
                        ];
                    },
                });
            },
        };
    },
};


export default multilineJsxOpeningTag;
