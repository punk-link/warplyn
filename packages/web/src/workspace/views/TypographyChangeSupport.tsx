import { useIntl } from "react-intl";
import type { TypographyReview } from "@skladno/shared";
import { formatTypographyRule } from "./typography-presentation.js";


export function TypographyChangeSupport({ typography, changeId }: { typography: TypographyReview; changeId: string }) {
    const intl = useIntl();
    const ids = typography.changes.find((change) => change.changeId === changeId)?.ruleIds ?? [];
    const rules = typography.rules.filter((rule) => ids.includes(rule.id)).map((rule) => formatTypographyRule(rule, intl));

    return <p>{intl.formatMessage({ id: "typography.support" }, { rules: rules.join("; ") })}</p>;
}
