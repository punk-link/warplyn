import assert from "node:assert/strict";
import test from "node:test";
import { ESLint, RuleTester } from "eslint";
import tseslint from "typescript-eslint";
import noNestedConciseFunctions from "../eslint-rules/no-nested-concise-functions.mjs";


const tester = new RuleTester({ languageOptions: { parser: tseslint.parser } });

tester.run("no-nested-concise-functions", noNestedConciseFunctions, {
    valid: [
        "const titles = articles.map(article => article.title);",
        "function titles(articles) { return articles.map(article => article.title); }",
        "const titles = articles => { return articles.map(article => article.title); };",
        "function outer() { function helper() { return 1; } return helper(); }",
        "useEffect(() => { const handle = () => update(); return () => cleanup(handle); });",
        "const saveArticle = article => save(createFile);",
    ],
    invalid: [
        {
            code: 'const saveArticle = async (article: import("@skladno/shared").ArticleSummary | undefined = workspace.selectedArticle) => save(async () => ({ fileName: article?.title ?? "Article", content: article ? await workspace.getArticleContent(article) : workspace.content }));',
            errors: [{ messageId: "nested" }],
        },
        {
            code: "const outer = () => run(function () { return 1; });",
            errors: [{ messageId: "nested" }],
        },
        {
            code: "const outer = () => ({ run() { return items.map(item => item.id); } });",
            errors: [{ messageId: "nested" }],
        },
        {
            code: "const outer = () => () => () => 1;",
            errors: [{ messageId: "nested" }, { messageId: "nested" }],
        },
    ],
});


test("repository lint enables concise-function and callback-depth checks", async () => {
    const eslint = new ESLint();
    const [result] = await eslint.lintText(`
const save = article => write(() => article.content);
run(() => {
    run(() => {
        run(() => {
            run(() => finish());
        });
    });
});
`, { filePath: "scripts/function-nesting-fixture.mjs" });
    const nestingRules = result.messages
        .map(({ ruleId }) => ruleId)
        .filter((ruleId) => ruleId === "project-style/no-nested-concise-functions" || ruleId === "max-nested-callbacks");
    assert.deepEqual(nestingRules, ["project-style/no-nested-concise-functions", "max-nested-callbacks"]);
});
