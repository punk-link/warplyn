import assert from "node:assert/strict";
import test from "node:test";
import { formatUiTerminologyTable } from "./format-ui-terminology-table.mjs";


test("English comes first and each locale keeps its corresponding values", () => {
    const table = formatUiTerminologyTable([
        { code: "de", messages: { save: "Speichern", help: "A | B\n<Beispiel>" } },
        { code: "en", messages: { save: "Save", help: "A & B" } },
        { code: "es", messages: { save: "Guardar", help: "Ayuda" } },
    ]);
    assert.equal(table, [
        "| Message ID | English | de | es |",
        "| --- | --- | --- | --- |",
        "| `save` | Save | Speichern | Guardar |",
        "| `help` | A &amp; B | A &#124; B<br>&lt;Beispiel&gt; | Ayuda |",
    ].join("\n"));
});


test("missing catalogs and translations fail instead of generating an incomplete table", () => {
    const missingEnglishPattern = /English catalog is missing/;
    const missingMessagePattern = /Missing message save in es/;
    assert.throws(() => formatUiTerminologyTable([]), missingEnglishPattern);
    assert.throws(() => formatUiTerminologyTable([
        { code: "en", messages: { save: "Save" } },
        { code: "es", messages: {} },
    ]), missingMessagePattern);
});
