import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { RuleTester } from "eslint";
import ts from "typescript";
import tseslint from "typescript-eslint";

import maxDataProperties from "../eslint-rules/max-data-properties.mjs";


const fields = (count, prefix = "field") => Array.from({ length: count }, (_, index) => `${prefix}${index}: string;`).join(" ");


test("data property ceiling covers nesting, inheritance, intersections, and class fields", () => {
    const directory = mkdtempSync(join(tmpdir(), "warplyn-property-rule-"));
    const basePath = join(directory, "base.ts");
    writeFileSync(basePath, `export interface Base { ${fields(6)} }`);
    let sequence = 0;


    function fixture(code, errors) {
        const filename = join(directory, `case-${sequence++}.ts`);
        writeFileSync(filename, code);
        const program = ts.createProgram([filename, basePath], { strict: true, noLib: true, target: ts.ScriptTarget.ESNext });
        return { code, filename, languageOptions: { parserOptions: { programs: [program] } }, ...errors && { errors } };
    }


    try {
        const tester = new RuleTester({ languageOptions: { parser: tseslint.parser } });
        tester.run("max-data-properties", maxDataProperties, {
            valid: [
                fixture(`interface Small { ${fields(9)} }`),
                fixture("type Tuple = [string, string, string, string, string, string, string, string, string, string];"),
                fixture(`class Small { ${fields(9)} method() {} }`),
                fixture(`const Small = class { ${fields(9)} method() {} };`),
                fixture(`export default class { ${fields(9)} }`),
                fixture(`interface Base { ${fields(6)} } interface Child extends Base { ${fields(6)} }`),
                fixture(`type Small = { ${fields(6)} } & { ${fields(6)} };`),
                fixture(`type Variant = { ${fields(6)} } | { ${fields(6, "other")} };`),
                fixture(`interface Grouped { article: { ${fields(6)} }; authorization: { ${fields(7)} }; }`),
            ],
            invalid: [
                fixture(`interface Large { ${fields(10)} }`, [{ messageId: "tooMany", data: { count: 10 } }]),
                fixture(`type Large = { ${fields(10)} };`, [{ messageId: "tooMany" }]),
                fixture(`class Large { ${fields(10)} }`, [{ messageId: "tooMany" }]),
                fixture(`class Large { ${fields(9)} private extra: string; }`, [{ messageId: "tooMany" }]),
                fixture(`interface Large { ${fields(9)} get extra(): string; method(): void; }`, [{ messageId: "tooMany" }]),
                fixture(`const Large = class { ${fields(10)} };`, [{ messageId: "tooMany" }]),
                fixture(`export default class { ${fields(10)} }`, [{ messageId: "tooMany" }]),
                fixture(`class Large { ${fields(6)} ${fields(4, "static extra")} }`, [{ messageId: "tooMany" }]),
                fixture(`class Base { ${fields(6, "static field")} } class Child extends Base { ${fields(4, "extra")} }`, [{ messageId: "tooMany" }]),
                fixture(`class Large { constructor(${fields(10).replaceAll(": string;", ": string,").replaceAll("field", "public field")}) {} }`, [{ messageId: "tooMany" }]),
                fixture(`interface Wrapper { context: { ${fields(10)} }; }`, [{ messageId: "tooMany" }]),
                fixture(`import { Base } from "./base"; interface Child extends Base { ${fields(4, "extra")} }`, [{ messageId: "tooMany", data: { count: 10 } }]),
                fixture(`type Large = { ${fields(6)} } & { ${fields(4, "extra")} };`, [{ messageId: "tooMany" }]),
                fixture(`class Base { ${fields(6)} } class Child extends Base { ${fields(4, "extra")} }`, [{ messageId: "tooMany" }]),
            ],
        });
        tester.run("max-params", tseslint.plugin.rules["max-params"], {
            valid: [{ code: "function small(a,b,c,d,e,f,g,h,i) {}", options: [{ max: 9 }] }],
            invalid: [{ code: "function large(a,b,c,d,e,f,g,h,i,j) {}", options: [{ max: 9 }], errors: [{ messageId: "exceed" }] }],
        });
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
});
