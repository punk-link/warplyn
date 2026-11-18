// @vitest-environment node
import { expect, it } from "vitest";
import { getDisplayLanguageName } from "./display-language-name.js";


it("preserves custom names and formats language tags", () => {
    expect(getDisplayLanguageName("Spanish, Argentina", "en")).toBe("Spanish, Argentina");
    expect(getDisplayLanguageName("es-AR", "en")).toBe("Spanish (Argentina)");
    expect(getDisplayLanguageName("en", "en")).toBe("English");
});
