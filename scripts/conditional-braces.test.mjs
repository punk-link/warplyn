import test from "node:test";
import { RuleTester } from "eslint";
import projectStyle from "../eslint-rules/project-style.mjs";


test("conditional brace fixes preserve whitespace across lines", () => {
    const ruleTester = new RuleTester();
    ruleTester.run("conditional-braces", projectStyle.rules["conditional-braces"], {
        valid: ["if (stored)\n    try {} catch {}"],
        invalid: [
            ...["\n", "\r\n"].map((newline) => ({
                code: `if (stored) {${newline}    try {} catch {}${newline}}`,
                output: `if (stored) ${newline}    try {} catch {}`,
                errors: [{ messageId: "omitBraces" }],
            })),
            {
                code: "if (stored) { restore(); }",
                output: "if (stored)  restore();",
                errors: [{ messageId: "omitBraces" }],
            },
        ],
    });
});
