import { getSourceChangeComparison } from "./source-change-comparison.mjs";
import { runVerificationChecklist } from "./verification-checklist.mjs";


if (!process.env.npm_execpath)
    throw new Error("Run this gate through npm run verify:core.");

const comparison = getSourceChangeComparison();
console.log(`Core verification comparison: ${comparison.description}`);
const staticChecks = [
    { name: "Product model", args: ["scripts/product-model.mjs", "check"] },
    { name: "Complexity and file length", args: ["scripts/complexity-check.mjs"] },
    { name: "Changed source line length", args: ["scripts/check-line-length.mjs"] },
    { name: "Import boundaries", args: ["scripts/web-import-boundaries.mjs"] },
    { name: "ESLint", args: ["node_modules/eslint/bin/eslint.js", ".", "--max-warnings", "0"] },
    { name: "Changed data properties", args: ["scripts/check-data-properties.mjs"] },
    { name: "Typecheck", args: ["node_modules/typescript/bin/tsc", "-b"] },
];
const tests = [{ name: "Script and workspace tests", args: [process.env.npm_execpath, "test"] }];
process.exitCode = runVerificationChecklist(staticChecks, tests) ? 0 : 1;
