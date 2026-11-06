// @vitest-environment node
import { createIntl } from "react-intl";
import { expect, it } from "vitest";
import type { EditorialProposalState } from "../state/editorial-proposal-state.js";
import { createWorkspaceBadges } from "./ArticleWorkspace.js";

it.each([{ findings: [] }, { findings: [{ resolution: "dismissed" }] }])("hides stale attention with resolved findings: %j", ({ findings }) => {
    const editorial = { factCheck: { findings }, factCheckStale: true } as EditorialProposalState;
    const intl = createIntl({ locale: "en", onError: () => undefined });
    expect(createWorkspaceBadges(editorial, intl)["fact-check"]).toBeUndefined();
    editorial.factCheck!.findings = [{ resolution: undefined }] as NonNullable<EditorialProposalState["factCheck"]>["findings"];
    expect(createWorkspaceBadges(editorial, intl)["fact-check"]?.tone).toBe("warning");
});
