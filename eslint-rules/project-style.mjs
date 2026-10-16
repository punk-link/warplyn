import multilineManyJsxAttributes from "./multiline-many-jsx-attributes.mjs";
import multilineJsxOpeningTag from "./multiline-jsx-opening-tag.mjs";
import multilineLongStrings from "./multiline-long-strings.mjs";
import maxDataProperties from "./max-data-properties.mjs";
import namedUnicodeCharacters from "./named-unicode-characters.mjs";
import sqlQueryLayout from "./sql-query-layout.mjs";


const unicodeLetterPattern = /\p{L}/u;
const indentationPattern = /^[ \t]*/u;
const whitespaceOnlyPattern = /^[ \t]*$/u;
const globalOrStickyRegexFlagsPattern = /[gy]/u;
const regexWordPattern = /[\p{L}]{3,}/giu;
const combiningMarkPattern = /\p{M}/gu;
const patternSuffixPattern = /Pattern$/u;
const statelessRegexMethods = new Set(["match", "matchAll", "replace", "search", "split"]);
const regexNameStopWords = new Set(["http", "https", "and", "with", "from", "that", "this", "the", "for", "not", "only", "match", "test", "replace", "true", "false"]);


const conditionalBraces = {
    meta: {
        type: "layout",
        docs: {
            description: "Omit braces for concise conditionals and require them consistently for multi-statement branches.",
        },
        fixable: "whitespace",
        messages: {
            omitBraces: "Omit braces around a single-statement conditional body.",
            requireBraces: "Use braces for every branch when an if/else branch contains multiple statements.",
        },
        schema: [],
    },

    create(context) {
        const sourceCode = context.sourceCode;
        const unsafeWithoutBlock = new Set([
            "BlockStatement",
            "ClassDeclaration",
            "FunctionDeclaration",
            "IfStatement",
            "LexicalDeclaration",
            "VariableDeclaration",
        ]);


        function branchesFor(node) {
            const branches = [];
            let current = node;

            while (current.type === "IfStatement") {
                branches.push(current.consequent);

                if (!current.alternate)
                    return branches;

                current = current.alternate;
            }

            branches.push(current);

            return branches;
        }


        function canOmitBraces(branch) {
            return branch.type !== "BlockStatement" ||
                (
                    branch.body.length === 1 &&
                    !unsafeWithoutBlock.has(branch.body[0].type)
                );
        }


        function removeBraces(fixer, branch) {
            if (sourceCode.getCommentsInside(branch).length > 0)
                return null;

            const statement = branch.body[0];
            const openingBrace = sourceCode.getFirstToken(branch);
            const closingBrace = sourceCode.getLastToken(branch);
            const whitespace = sourceCode.text.slice(openingBrace.range[1], statement.range[0]);

            return [
                fixer.replaceTextRange(
                    [openingBrace.range[0], statement.range[0]],
                    whitespace,
                ),
                fixer.removeRange([statement.range[1], closingBrace.range[1]]),
            ];
        }


        return {
            IfStatement(node) {
                if (node.parent.type === "IfStatement" && node.parent.alternate === node)
                    return;

                const branches = branchesFor(node);
                const requiresBraces = branches.some((branch) => !canOmitBraces(branch));

                for (const branch of branches) {
                    if (requiresBraces && branch.type === "BlockStatement")
                        continue;

                    if (!requiresBraces && branch.type !== "BlockStatement")
                        continue;

                    context.report({
                        node: branch,
                        messageId: requiresBraces ? "requireBraces" : "omitBraces",
                        fix: requiresBraces
                            ? undefined
                            : (fixer) => removeBraces(fixer, branch),
                    });
                }
            },
        };
    },
};


const namedRegex = {
    meta: {
        type: "suggestion",
        fixable: "code",
        docs: {
            description: "Require regular expressions to be assigned to purpose-named variables.",
        },
        messages: {
            unnamedRegex: "Assign this regular expression to a purpose-named variable before using it.",
        },
        schema: [],
    },

    create(context) {
        const sourceCode = context.sourceCode;


        function extractionStatement(node) {
            const ancestors = sourceCode.getAncestors(node);

            for (let index = ancestors.length - 1; index >= 0; index--) {
                const ancestor = ancestors[index];
                if (ancestor.type !== "Program" && ancestor.type !== "BlockStatement")
                    continue;

                const statement = ancestors[index + 1];

                if (statement?.parent !== ancestor || statement.type === "Program")
                    continue;

                if (["ForStatement", "ForInStatement", "ForOfStatement", "WhileStatement", "DoWhileStatement"].includes(statement.type))
                    return null;

                const lineStart = sourceCode.text.lastIndexOf("\n", statement.range[0] - 1) + 1;
                const indentation = sourceCode.text.slice(lineStart, statement.range[0]);
                if (!whitespaceOnlyPattern.test(indentation))
                    return null;

                return { indentation, lineStart, statement };
            }

            return null;
        }


        function suggestedName(node) {
            const pattern = node.regex.pattern;
            const context = sourceCode.getAncestors(node).reverse().find((ancestor) => ancestor.type === "CallExpression");
            const callee = context?.callee;
            const methodName = callee?.type === "MemberExpression" && !callee.computed && callee.property.type === "Identifier"
                ? callee.property.name
                : undefined;

            return purposeName(pattern, methodName);
        }


        function uniqueName(name, node) {
            const scope = sourceCode.getScope(node);
            let uniqueNameCandidate = name;
            let suffix = 2;

            while (scope.set.has(uniqueNameCandidate)) {
                uniqueNameCandidate = `${name}${suffix}`;
                suffix++;
            }

            return uniqueNameCandidate;
        }


        function canSafelyExtract(node) {
            if (!node.regex || !globalOrStickyRegexFlagsPattern.test(node.regex.flags))
                return !!node.regex;

            const ancestors = sourceCode.getAncestors(node).reverse();
            const call = ancestors.find((ancestor) => ancestor.type === "CallExpression");
            const callee = call?.callee;
            const methodName = callee?.type === "MemberExpression" && !callee.computed && callee.property.type === "Identifier"
                ? callee.property.name
                : undefined;

            return methodName !== undefined && statelessRegexMethods.has(methodName);
        }


        function reportUnlessNamed(node) {
            const parent = node.parent;

            if (parent.type === "VariableDeclarator" && parent.init === node && parent.id.type === "Identifier")
                return;

            context.report({
                node,
                messageId: "unnamedRegex",
                fix(fixer) {
                    if (!canSafelyExtract(node))
                        return null;

                    const extraction = extractionStatement(node);
                    if (!extraction)
                        return null;

                    const name = uniqueName(suggestedName(node), node);
                    const declaration = `${extraction.indentation}const ${name} = ${sourceCode.getText(node)};\n`;

                    return [
                        fixer.insertTextBeforeRange([extraction.lineStart, extraction.lineStart], declaration),
                        fixer.replaceText(node, name),
                    ];
                },
            });
        }


        function isRegExpConstructor(node) {
            return node.callee.type === "Identifier" && node.callee.name === "RegExp";
        }


        return {
            Literal(node) {
                if (node.regex)
                    reportUnlessNamed(node);
            },

            CallExpression(node) {
                if (isRegExpConstructor(node))
                    reportUnlessNamed(node);
            },

            NewExpression(node) {
                if (isRegExpConstructor(node))
                    reportUnlessNamed(node);
            },
        };
    },
};


function purposeName(pattern, methodName) {
    const source = pattern.toLowerCase();
    const purpose = patternPurpose(source);
    if (purpose)
        return purpose;

    const words = [...pattern.matchAll(regexWordPattern)]
        .map((match) => match[0].normalize("NFD").replace(combiningMarkPattern, "").toLowerCase())
        .filter((word) => !regexNameStopWords.has(word));
    const semanticWords = [...new Set(words)].slice(0, 3);

    if (semanticWords.length > 0) {
        const patternName = `${semanticWords[0]}${semanticWords.slice(1).map((word) => word[0].toUpperCase() + word.slice(1)).join("")}Pattern`;
        return methodName === "getByRole" || methodName === "getByText"
            ? patternName.replace(patternSuffixPattern, "NamePattern")
            : patternName;
    }

    if (source.includes("\\s"))
        return methodName === "split" ? "whitespaceSeparatorPattern" : "whitespacePattern";

    if (source.includes("\\d") || source.includes("[0-9]"))
        return "numberPattern";

    if (source.includes("\\p{l}"))
        return "letterPattern";

    return "punctuationPattern";
}


function patternPurpose(source) {
    if (source.includes("\\b(i|we|my|our"))
        return "firstPersonPronounPattern";

    if (source.includes("button|div"))
        return "clickableElementPattern";

    if (source.includes("\\r") || source.includes("\\n")) {
        if (source.includes("\\s*\\n") || source.includes("\\n\\s*\\n"))
            return "paragraphBoundaryPattern";

        if (source.includes("\\r?\\n") || source.includes("\\r\\n?"))
            return "lineBreakPattern";

        return "lineEndingPattern";
    }

    if (source.includes("https?:\\/\\/"))
        return "urlPattern";

    if (source.includes("\\p{script=han}") || source.includes("\\p{script=hiragana}") || source.includes("\\p{script=katakana}"))
        return "ideographPattern";

    if (source.includes("\\p{l}"))
        return "letterPattern";

    if (source.includes("\\s") && source.startsWith("^"))
        return "whitespacePrefixPattern";

    if (source.includes("\\.test\\."))
        return "testFilenamePattern";

    if (source.includes("\\.md"))
        return "markdownExtensionPattern";

    if (source.includes("[\\d") || source.includes("\\d+"))
        return "numberPattern";

    if (source.includes("[a-z]") && source.includes("[a-z0-9"))
        return "lowercaseIdentifierPattern";

    if (source.includes("\\s*delete"))
        return "deleteStatementPattern";

    return undefined;
}


function literalString(node) {
    if (node?.type === "Literal" && typeof node.value === "string")
        return node.value;

    if (node?.type === "TemplateLiteral" && node.expressions.length === 0)
        return node.quasis[0]?.value.cooked ?? "";

    return undefined;
}


const noUntranslatedUiCopy = {
    meta: {
        type: "problem",
        docs: {
            description: "Require application-owned visible and accessible copy to resolve through the ICU catalog.",
        },
        messages: {
            untranslatedCopy: "Move application-owned UI copy to the typed ICU catalog and format it with a semantic message ID.",
        },
        schema: [{
            type: "object",
            properties: {
                allowedLiterals: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                    uniqueItems: true,
                },
            },
            additionalProperties: false,
        }],
    },

    create(context) {
        const allowedLiterals = new Set(context.options[0]?.allowedLiterals ?? []);
        const visibleAttributes = new Set([
            "alt",
            "aria-label",
            "description",
            "hint",
            "label",
            "message",
            "placeholder",
            "title",
        ]);


        function isApplicationCopy(value) {
            const copy = value.trim();

            return unicodeLetterPattern.test(copy) && !allowedLiterals.has(copy);
        }


        function reportIfApplicationCopy(node, value) {
            if (isApplicationCopy(value))
                context.report({
                    node,
                    messageId: "untranslatedCopy",
                });
        }


        return {
            JSXText(node) {
                reportIfApplicationCopy(node, node.value);
            },

            JSXExpressionContainer(node) {
                if (node.parent.type === "JSXAttribute")
                    return;

                const value = literalString(node.expression);

                if (value !== undefined)
                    reportIfApplicationCopy(node, value);
            },

            JSXAttribute(node) {
                if (node.name.type !== "JSXIdentifier" || !visibleAttributes.has(node.name.name) || !node.value)
                    return;

                if (node.value.type === "Literal") {
                    const value = literalString(node.value);

                    if (value !== undefined)
                        reportIfApplicationCopy(node.value, value);

                    return;
                }

                if (node.value.type !== "JSXExpressionContainer")
                    return;

                const value = literalString(node.value.expression);

                if (value !== undefined)
                    reportIfApplicationCopy(node.value, value);
            },
        };
    },
};


const noProductionIntlProvider = {
    meta: {
        type: "problem",
        docs: {
            description: "Keep production components on the application-level locale provider.",
        },
        messages: {
            nestedProvider: "Production components must consume the application I18nProvider instead of creating another IntlProvider.",
        },
        schema: [],
    },

    create(context) {
        return {
            JSXOpeningElement(node) {
                if (node.name.type === "JSXIdentifier" && node.name.name === "IntlProvider")
                    context.report({
                        node,
                        messageId: "nestedProvider",
                    });
            },
        };
    },
};


const noAccessibleLabelSelector = {
    meta: {
        type: "problem",
        docs: {
            description: "Prevent localized accessible names from becoming DOM selectors.",
        },
        messages: {
            localizedSelector: "Use a ref or stable data attribute instead of selecting an element by its localized accessible label.",
        },
        schema: [],
    },

    create(context) {
        const selectorMethods = new Set([
            "closest",
            "matches",
            "querySelector",
            "querySelectorAll",
        ]);

        return {
            CallExpression(node) {
                if (node.callee.type !== "MemberExpression" || node.callee.computed || node.callee.property.type !== "Identifier" || !selectorMethods.has(node.callee.property.name))
                    return;

                const selector = literalString(node.arguments[0]);

                if (selector?.includes("aria-label"))
                    context.report({
                        node: node.arguments[0],
                        messageId: "localizedSelector",
                    });
            },
        };
    },
};


const switchCaseBodyNewline = {
    meta: {
        type: "layout",
        docs: {
            description: "Put switch case statements on a new line after the case label.",
        },
        fixable: "whitespace",
        messages: {
            bodyNewline: "Put the switch case statement on a new line.",
        },
        schema: [],
    },

    create(context) {
        const sourceCode = context.sourceCode;

        return {
            SwitchCase(node) {
                const statement = node.consequent[0];
                if (!statement || statement.type === "BlockStatement")
                    return;

                const colon = sourceCode.getTokenAfter(node.test ?? sourceCode.getFirstToken(node));
                if (colon?.value !== ":" || colon.loc.end.line !== statement.loc.start.line)
                    return;

                const comments = sourceCode.getTokensBetween(colon, statement, { includeComments: true })
                    .filter((token) => token.type === "Line" || token.type === "Block");

                context.report({
                    node: statement,
                    messageId: "bodyNewline",
                    fix(fixer) {
                        const lastComment = comments.at(-1);
                        const bodyStart = lastComment?.range[1] ?? colon.range[1];
                        const caseIndent = indentationPattern.exec(sourceCode.lines[colon.loc.start.line - 1])?.[0] ?? "";
                        const newline = sourceCode.text.includes("\r\n") ? "\r\n" : "\n";

                        return fixer.replaceTextRange(
                            [bodyStart, statement.range[0]],
                            `${newline}${caseIndent}    `,
                        );
                    },
                });
            },
        };
    },
};


const twoBlankLinesBetweenDeclarations = {
    meta: {
        type: "layout",
        docs: {
            description: "Require two blank lines around functions, interfaces, classes, and class members.",
        },
        fixable: "whitespace",
        messages: {
            twoBlankLines: "Expected two blank lines between declarations.",
        },
        schema: [],
    },

    create(context) {
        const sourceCode = context.sourceCode;
        const declarationTypes = new Set([
            "ClassDeclaration",
            "FunctionDeclaration",
            "TSDeclareFunction",
            "TSInterfaceDeclaration",
        ]);
        const memberTypes = new Set([
            "MethodDefinition",
            "PropertyDefinition",
            "TSAbstractMethodDefinition",
            "TSAbstractPropertyDefinition",
        ]);


        function unwrap(node) {
            return node.type === "ExportNamedDeclaration" || node.type === "ExportDefaultDeclaration"
                ? node.declaration ?? node
                : node;
        }


        function needsPadding(previous, next, members = false) {
            if (members)
                return true;

            const previousDeclaration = unwrap(previous);
            const nextDeclaration = unwrap(next);
            if (previousDeclaration.type === "VariableDeclaration" && nextDeclaration.type === "VariableDeclaration" && previousDeclaration.kind === "const" && nextDeclaration.kind === "const")
                return false;

            return declarationTypes.has(previousDeclaration.type) || declarationTypes.has(nextDeclaration.type);
        }


        function checkPairs(nodes, members = false) {
            for (let index = 0; index < nodes.length - 1; index++) {
                const previous = nodes[index];
                const next = nodes[index + 1];
                if (!memberTypes.has(previous.type) && !memberTypes.has(next.type) && !needsPadding(previous, next, members))
                    continue;

                const previousToken = sourceCode.getLastToken(previous);
                const nextToken = sourceCode.getFirstToken(next);
                const comments = sourceCode.getTokensBetween(previousToken, nextToken, { includeComments: true }).filter((token) => token.type === "Block" || token.type === "Line");
                const boundaryToken = comments[0]?.loc.start.line > previousToken.loc.end.line ? comments[0] : nextToken;
                const blankLines = boundaryToken.loc.start.line - previousToken.loc.end.line - 1;
                if (blankLines === 2)
                    continue;

                context.report({
                    node: next,
                    messageId: "twoBlankLines",
                    fix(fixer) {
                        if (boundaryToken === nextToken && comments.length > 0)
                            return null;

                        const lineStart = sourceCode.text.lastIndexOf("\n", boundaryToken.range[0] - 1) + 1;
                        const indentation = indentationPattern.exec(sourceCode.text.slice(lineStart, boundaryToken.range[0]))?.[0] ?? "";
                        const newline = sourceCode.text.includes("\r\n") ? "\r\n" : "\n";
                        return fixer.replaceTextRange(
                            [previousToken.range[1], boundaryToken.range[0]],
                            `${newline}${newline}${newline}${indentation}`,
                        );
                    },
                });
            }
        }


        return {
            Program(node) {
                checkPairs(node.body);
            },

            BlockStatement(node) {
                checkPairs(node.body);
            },

            ClassBody(node) {
                checkPairs(node.body, true);
            },
        };
    },
};


export default {
    rules: {
        "max-data-properties": maxDataProperties,
        "conditional-braces": conditionalBraces,
        "no-accessible-label-selector": noAccessibleLabelSelector,
        "no-production-intl-provider": noProductionIntlProvider,
        "named-regex": namedRegex,
        "no-untranslated-ui-copy": noUntranslatedUiCopy,
        "multiline-long-strings": multilineLongStrings,
        "multiline-many-jsx-attributes": multilineManyJsxAttributes,
        "multiline-jsx-opening-tag": multilineJsxOpeningTag,
        "named-unicode-characters": namedUnicodeCharacters,
        "sql-query-layout": sqlQueryLayout,
        "switch-case-body-newline": switchCaseBodyNewline,
        "two-blank-lines-between-declarations": twoBlankLinesBetweenDeclarations,
    },
};
