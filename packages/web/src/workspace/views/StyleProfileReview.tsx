import { useIntl } from "react-intl";
import type { StyleReview } from "@skladno/shared";
import { Banner } from "../../ui/primitives.js";
import { formatTypographyRule, formatTypographyText } from "./typography-presentation.js";


export function StyleProfileReview({ findings, stale }: { findings: StyleReview | undefined; stale: boolean }) {
    const intl = useIntl();
    if (!findings && !stale)
        return null;

    const findingSupport = (finding: StyleReview["findings"][number]) => finding.traitIds.map((id) => {
        const rule = findings?.typography?.rules.find((item) => `typography-rule:${item.id}` === id);
        return rule ? formatTypographyRule(rule, intl) : findings?.traitLabels?.[id] ?? id;
    }).join(", ");

    return (
        <section className="mb-7">
            {findings && <h3 className="mb-3 text-base font-semibold">{intl.formatMessage({ id: "styleProfile.review" })}</h3>}
            {stale && (
                <Banner className="mb-3" tone="warning" role="alert">
                    {intl.formatMessage({ id: "styleProfile.staleReview" })}
                </Banner>
            )}
            {findings?.findings.map((finding, index) => (
                <div key={`${finding.divergence}:${index}`} className="mt-3 text-sm">
                    <p>
                        {finding.typographyOccurrence
                            ? intl.formatMessage(
                                { id: "typography.correction" },
                                {
                                    source: formatTypographyText(finding.divergence, intl),
                                    replacement: formatTypographyText(finding.suggestion, intl),
                                },
                            )
                            : `${finding.divergence}: ${finding.suggestion}`}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                        {intl.formatMessage({ id: "styleProfile.reviewEvidence" }, { sources: findingSupport(finding) })}
                    </p>
                </div>
            ))}
        </section>
    );
}

