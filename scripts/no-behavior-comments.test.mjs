import test from "node:test";
import { RuleTester } from "eslint";
import projectStyle from "../eslint-rules/project-style.mjs";


test("behavior comments require names or JSDoc-style descriptions", () => {
    const ruleTester = new RuleTester();
    ruleTester.run("no-behavior-comments", projectStyle.rules["no-behavior-comments"], {
        valid: [
            "/** Describes the exported operation. */ function saveArticle() {}",
            "// eslint-disable-next-line no-console -- The CLI reports this result.",
            "// Product scenario: workspace.article.save",
            "// product: workspace.article.save",
            "// ponytail: Keep the bounded path until larger inputs need a different approach.",
            "// @vitest-environment node",
        ],
        invalid: [{
            code: "function saveArticle() { // Persist the Article before returning.\n}",
            errors: [{ messageId: "behaviorComment" }],
        }],
    });
});
