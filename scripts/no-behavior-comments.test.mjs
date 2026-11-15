import test from "node:test";
import { RuleTester } from "eslint";
import projectStyle from "../eslint-rules/project-style.mjs";


test("JSDoc must document declarations rather than implementation steps", () => {
    const ruleTester = new RuleTester();
    ruleTester.run("no-behavior-comments", projectStyle.rules["no-behavior-comments"], {
        valid: [
            "/** Describes the exported operation. */ function saveArticle() {}",
            "/** Article operations. */ export function saveArticle() {}",
            "class Store { /** Saves an Article. */ save() {} }",
            "// eslint-disable-next-line no-console -- The CLI reports this result.",
            "// Product scenario: workspace.article.save",
            "// product: workspace.article.save",
            "// ponytail: Keep the bounded path until larger inputs need a different approach.",
            "// @vitest-environment node",
        ],
        invalid: [
            ...[
                "function saveArticle() { /** Persist the Article. */ save(); }",
                "function saveArticle() { /** Return the result. */ return true; }",
                "/** Detached description. */\n\nfunction saveArticle() {}",
                "/** Trailing description. */",
            ].map(code => ({ code, errors: [{ messageId: "behaviorComment" }] })),
            {
                code: "function saveArticle() { // Persist the Article before returning.\n}",
                errors: [{ messageId: "behaviorComment" }],
            }],
    });
});
