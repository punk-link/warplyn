import { useIntl } from "react-intl";
import type { TypographyDefinition, TypographyIssue, TypographyRule } from "@skladno/shared";
import { Badge, Button, Select } from "../../ui/primitives.js";
import { defaultTypographyDefinition, formatTypographyRule, typographyKindMessages } from "./typography-presentation.js";
import { TypographyRuleFields } from "./TypographyRuleFields.js";


export function TypographyRuleRow({ rule, number, editing, unsaved, pending, issue, change, toggle, remove }: {
    rule: TypographyRule;
    number: number;
    editing: boolean;
    unsaved: boolean;
    pending: boolean;
    issue?: TypographyIssue["reason"];
    change: (definition: TypographyDefinition) => void;
    toggle: () => void;
    remove: () => void;
}) {
    const intl = useIntl();
    const status = unsaved ? "typography.unsavedRule" : "typography.savedRule";
    return (
        <li className="py-2.5 text-sm">
            <fieldset disabled={pending} className="flex min-w-0 flex-wrap items-center gap-x-3">
                <legend className="sr-only">{intl.formatMessage({ id: "typography.ruleNumber" }, { number })}</legend>
                <div className={editing ? "flex w-full flex-wrap items-center gap-3" : "contents"}>
                    <p className="min-w-0 flex-1 break-words text-ink">{formatTypographyRule(rule, intl)}</p>
                    <Badge className="shrink-0" tone={unsaved ? "warning" : undefined}>
                        {intl.formatMessage({ id: status })}
                    </Badge>
                </div>
                {editing && (
                    <div className="mt-3 w-full space-y-3 border-l border-border-strong pl-4">
                        <Select
                            data-typography-kind
                            aria-label={intl.formatMessage({ id: "typography.kind" }, { number })}
                            value={rule.definition.kind}
                            onChange={(event) => change(defaultTypographyDefinition(event.target.value))}
                        >
                            {Object.entries(typographyKindMessages).map(([kind, message]) => (
                                <option key={kind} value={kind}>
                                    {intl.formatMessage({ id: message })}
                                </option>
                            ))}
                        </Select>
                        <TypographyRuleFields definition={rule.definition} change={change} />
                    </div>
                )}
                {issue && (
                    <p className={`mt-2 w-full text-xs text-muted ${editing ? "" : "order-last"}`}>
                        {intl.formatMessage({ id: `typography.validation.${issue}` })}
                    </p>
                )}
                <div className={`flex flex-wrap gap-2 ${editing ? "mt-3 w-full" : "shrink-0"}`}>
                    <Button
                        variant="quiet"
                        className="shrink-0 whitespace-nowrap"
                        aria-expanded={editing}
                        onClick={toggle}>
                        {intl.formatMessage({ id: editing ? "typography.closeEditor" : "typography.edit" })}
                    </Button>
                    <Button variant="quiet" className="shrink-0 whitespace-nowrap" onClick={remove}>
                        {intl.formatMessage({ id: "typography.remove" })}
                    </Button>
                </div>
            </fieldset>
        </li>
    );
}
