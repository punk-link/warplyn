import { spawnSync } from "node:child_process";


export function runVerificationCheck(step, env = process.env) {
    console.log(`\nChecking ${step.name}\n`);
    const result = spawnSync(process.execPath, step.args, { stdio: "inherit", env });
    if (result.error)
        console.error(result.error.message);

    return result.status === 0;
}


function printResults(label, results) {
    console.log(`\n${label}:`);
    for (const result of results)
        console.log(`${result.passed ? "PASS" : "FAIL"} ${result.name}`);
}


export function runVerificationChecklist(staticChecks, tests, run = runVerificationCheck) {
    const results = staticChecks.map((step) => ({ name: step.name, passed: run(step) }));
    printResults("Static verification summary", results);
    if (!results.every((result) => result.passed)) {
        console.log("Tests not run because static checks failed. All static checks were attempted.");
        return false;
    }

    const testResults = tests.map((step) => ({ name: step.name, passed: run(step) }));
    printResults("Test verification summary", testResults);
    return testResults.every((result) => result.passed);
}
