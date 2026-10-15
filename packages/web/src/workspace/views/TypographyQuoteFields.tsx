import { useIntl } from "react-intl";
import { NARROW_NO_BREAK_SPACE, NO_BREAK_SPACE, typographyQuotePair, type TypographyDefinition, type TypographyQuoteForm } from "@skladno/shared";
import { Field, Select } from "../../ui/primitives.js";

const quoteForms = ["curly", "guillemets", "straight", "custom"] as const;
const examples = { curly: "“…”", guillemets: "«…»", straight: '"…"' };


export function TypographyQuoteFields({ definition, change }: {
    definition: Extract<TypographyDefinition, { kind: "quotes" }>;
    change: (next: TypographyDefinition) => void;
}) {
    const intl = useIntl();
    return <div className="grid gap-3 sm:grid-cols-2">
        {(["outer", "nested"] as const).map((level) => {
            const form = definition[level];
            const pair = typographyQuotePair(form);
            const update = (next: TypographyQuoteForm) => change({ ...definition, [level]: next });
            return <div key={level} className="space-y-2">
                <label className="field-label">
                    {intl.formatMessage({ id: level === "outer" ? "typography.outer" : "typography.nested" })}
                    <Select value={typeof form === "string" ? form : "custom"} onChange={(event) => {
                        const selected = quoteForms.find((item) => item === event.target.value);
                        if (selected)
                            update(selected === "custom" ? pair : selected);
                    }}>
                        {quoteForms.map((item) => (
                            <option key={item} value={item}>
                                {item === "custom" ? intl.formatMessage({ id: "typography.customPair" }) : examples[item]}
                            </option>
                        ))}
                    </Select>
                </label>
                {typeof form !== "string" && <>
                    <label className="field-label">
                        {intl.formatMessage({ id: "typography.openingMark" })}
                        <Field value={pair.open} maxLength={1} onChange={(event) => update({ ...pair, open: event.target.value })} />
                    </label>
                    <label className="field-label">
                        {intl.formatMessage({ id: "typography.closingMark" })}
                        <Field value={pair.close} maxLength={1} onChange={(event) => update({ ...pair, close: event.target.value })} />
                    </label>
                    <label className="field-label">
                        {intl.formatMessage({ id: "typography.innerSpace" })}
                        <Select value={pair.space ?? ""} onChange={(event) => {
                            const space = event.target.value;
                            if (space === " " || space === NO_BREAK_SPACE || space === NARROW_NO_BREAK_SPACE)
                                update({ ...pair, space });
                            else
                                update({ open: pair.open, close: pair.close });
                        }}>
                            <option value="">{intl.formatMessage({ id: "typography.withoutSpaces" })}</option>
                            <option value=" ">{intl.formatMessage({ id: "typography.ordinarySpace" })}</option>
                            <option value={NO_BREAK_SPACE}>{intl.formatMessage({ id: "typography.nbsp" })}</option>
                            <option value={NARROW_NO_BREAK_SPACE}>{intl.formatMessage({ id: "typography.narrowNbsp" })}</option>
                        </Select>
                    </label>
                </>}
            </div>;
        })}
    </div>;
}
