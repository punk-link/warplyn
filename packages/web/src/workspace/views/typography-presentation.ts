import type { IntlShape } from "react-intl";
import { typographyRuleLabel, type TypographyDefinition, type TypographyRule } from "@skladno/shared";
import type { MessageId } from "../../i18n/messages.js";

export const typographyKindMessages: Record<TypographyDefinition["kind"], MessageId> = {
    quotes: "typography.quotes", dash: "typography.dash", ellipsis: "typography.ellipsis",
    "nonbreaking-space": "typography.nonbreaking", "horizontal-space": "typography.horizontal", literal: "typography.literal", contextual: "typography.contextual",
};


export function formatTypographyRule(rule: TypographyRule, intl: IntlShape): string {
    return intl.formatMessage({ id: "typography.ruleDescription" }, {
        kind: intl.formatMessage({ id: typographyKindMessages[rule.definition.kind] }),
        value: typographyRuleLabel(rule),
    });
}


export function formatTypographyText(text: string, intl: IntlShape): string {
    if (!text)
        return intl.formatMessage({ id: "typography.deleted" });

    return text.replaceAll(" ", `[${intl.formatMessage({ id: "typography.ordinarySpace" })}]`)
        .replaceAll("\u00a0", `[${intl.formatMessage({ id: "typography.nbsp" })}]`)
        .replaceAll("\u202f", `[${intl.formatMessage({ id: "typography.narrowNbsp" })}]`);
}


export function defaultTypographyDefinition(kind: string): TypographyDefinition {
    switch (kind) {
        case "quotes":
            return { kind, outer: "curly", nested: "guillemets" };
        case "dash":
            return { kind, mark: "—", spacing: "space" };
        case "ellipsis":
            return { kind, form: "…" };
        case "nonbreaking-space":
            return { kind, left: "", right: "", space: "\u00a0" };
        case "horizontal-space":
            return { kind };
        case "literal":
            return { kind, source: "", replacement: "" };
        default:
            return { kind: "contextual", instruction: "" };
    }
}
