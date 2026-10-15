import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { RuleTester } from "eslint";
import ts from "typescript";
import tseslint from "typescript-eslint";

import maxDataProperties from "../eslint-rules/max-data-properties.mjs";


const fields = (count, prefix = "field") => Array.from({ length: count }, (_, index) => `${prefix}${index}: string;`).join(" ");
const values = (count, prefix = "field") => Array.from({ length: count }, (_, index) => `${prefix}${index}: ${index}`).join(", ");
const keys = (count) => Array.from({ length: count }, (_, index) => `"field${index}"`).join(" | ");
const methods = (count) => Array.from({ length: count }, (_, index) => `method${index}: () => undefined`).join(", ");


test("data property ceiling covers declarations, inferred objects, spreads, and explicit lookup tables", () => {
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
                fixture(`interface Small { ${fields(20)} }`),
                fixture("type Tuple = [string, string, string, string, string, string, string, string, string, string];"),
                fixture(`class Small { ${fields(20)} method() {} }`),
                fixture(`const Small = class { ${fields(20)} method() {} };`),
                fixture(`export default class { ${fields(20)} }`),
                fixture(`interface Base { ${fields(6)} } interface Child extends Base { ${fields(6)} }`),
                fixture(`type Small = { ${fields(6)} } & { ${fields(6)} };`),
                fixture(`type Variant = { ${fields(6)} } | { ${fields(6, "other")} };`),
                fixture(`interface Grouped { article: { ${fields(6)} }; authorization: { ${fields(7)} }; }`),
                fixture(`function result() { return { ${values(20)} }; }`),
                fixture(`const source = { ${values(20)} }; const result = { ...source, field0: 42 };`),
                fixture(`const result = { article: { ${values(6)} }, review: { ${values(7)} } };`),
                fixture(`const result = { ${values(20)}, execute() {} };`),
                fixture(`const result = { ${values(20)}, ${methods(25)} };`),
                fixture(`const actions = { ${methods(17)} }; const result = { ${values(20)}, ...actions };`),
                fixture(`class Small { ${fields(20)} execute = () => undefined; }`),
                fixture(`interface Small { ${fields(20)} execute?: () => void; }`),
                fixture(`interface Small { ${fields(20)} execute: (() => void) | null; }`),
                fixture(`const execute = function() {}; const result = { ${values(20)}, execute };`),
                fixture(`const table: { [key: string]: number } = { ${values(30)} };`),
                fixture(`const table = { ${values(30)} } satisfies { [key: string]: number };`),
                fixture(`type Keys = ${keys(30)};
                    type Table = { [Key in Keys]: number }; const table: Table = { ${values(30)} };`),
                fixture(`type Partial<T> = { [Key in keyof T]?: T[Key] };
                    type Table = { [Key in ${keys(30)}]: number };
                    const table: Partial<Table> = { ${values(30)} };`),
            ],
            invalid: [
                fixture(`interface Large { ${fields(21)} }`, [{ messageId: "tooMany", data: { count: 21 } }]),
                fixture(`type Large = { ${fields(21)} };`, [{ messageId: "tooMany" }]),
                fixture(`class Large { ${fields(21)} }`, [{ messageId: "tooMany" }]),
                fixture(`class Large { ${fields(20)} private extra: string; }`, [{ messageId: "tooMany" }]),
                fixture(`interface Large { ${fields(20)} get extra(): string; method(): void; }`, [{ messageId: "tooMany" }]),
                fixture(`const Large = class { ${fields(21)} };`, [{ messageId: "tooMany" }]),
                fixture(`export default class { ${fields(21)} }`, [{ messageId: "tooMany" }]),
                fixture(`class Large { ${fields(12)} ${fields(9, "static extra")} }`, [{ messageId: "tooMany" }]),
                fixture(`class Base { ${fields(12, "static field")} } class Child extends Base { ${fields(9, "extra")} }`, [{ messageId: "tooMany" }]),
                fixture(`class Large { constructor(${fields(21).replaceAll(": string;", ": string,").replaceAll("field", "public field")}) {} }`,
                    [{ messageId: "tooMany" }]),
                fixture(`interface Wrapper { context: { ${fields(21)} }; }`, [{ messageId: "tooMany" }]),
                fixture(`import { Base } from "./base"; interface Child extends Base { ${fields(15, "extra")} }`,
                    [{ messageId: "tooMany", data: { count: 21 } }]),
                fixture(`type Large = { ${fields(12)} } & { ${fields(9, "extra")} };`, [{ messageId: "tooMany" }]),
                fixture(`class Base { ${fields(12)} } class Child extends Base { ${fields(9, "extra")} }`, [{ messageId: "tooMany" }]),
                fixture(`function result() { return { ${values(21)} }; }`, [{ messageId: "tooMany", data: { count: 21 } }]),
                fixture(`const result = { ${values(21)} };`, [{ messageId: "tooMany", data: { count: 21 } }]),
                fixture(`const result = { ${values(21)}, ${methods(25)} };`, [{ messageId: "tooMany", data: { count: 21 } }]),
                fixture(`interface Large { ${fields(20)} mixed: string | (() => void); }`, [{ messageId: "tooMany", data: { count: 21 } }]),
                fixture(`consume({ ${values(21)} });`, [{ messageId: "tooMany", data: { count: 21 } }]),
                fixture(`const source = { ${values(12)} }; function result() { return { ...source, ${values(9, "extra")} }; }`,
                    [{ messageId: "tooMany", data: { count: 21 } }]),
                fixture(`const result = { article: { ${values(21)} } };`, [{ messageId: "tooMany", data: { count: 21 } }]),
                fixture(`const actions = { ${values(17, "action")} }; function result() { return { ${values(20)}, ...actions }; }`,
                    [{ messageId: "tooMany", data: { count: 37 } }]),
                fixture(`const result = {\n${values(21)}\n};\ntype Result = typeof result;`, [
                    { messageId: "tooMany", line: 1, endLine: 3 },
                    { messageId: "tooMany", line: 4 },
                ]),
                fixture(
                    `type Partial<T> = { [Key in keyof T]?: T[Key] };
                    interface Structured { ${fields(21)} } const result: Partial<Structured> = { ${values(21)} };`,
                    [{ messageId: "tooMany" }, { messageId: "tooMany" }],
                ),
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
