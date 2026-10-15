import { useIntl } from "react-intl";
import { NARROW_NO_BREAK_SPACE, NO_BREAK_SPACE, type TypographyDefinition } from "@skladno/shared";
import { Field, Select, TextareaField } from "../../ui/primitives.js";

const quoteForms = ["curly", "guillemets", "straight"] as const;
const quoteExamples = { curly: "“…”", guillemets: "«…»", straight: '"…"' };


export function TypographyRuleFields({ definition, change }: { definition: TypographyDefinition; change: (next: TypographyDefinition) => void }) {
    const intl = useIntl();
    switch (definition.kind) {
        case "quotes":
            return <div className="grid gap-2 sm:grid-cols-2">{(["outer", "nested"] as const).map((level) => <label key={level} className="text-xs text-muted">{intl.formatMessage({ id: level === "outer" ? "typography.outer" : "typography.nested" })}<Select value={definition[level]} onChange={(event) => {
                const form = quoteForms.find((value) => value === event.target.value);
                if (form)
                    change({ ...definition, [level]: form });
            }}>{quoteForms.map((form) => <option key={form} value={form}>{quoteExamples[form]}</option>)}</Select></label>)}</div>;
        case "dash":
            return <div className="grid gap-2 sm:grid-cols-2"><label className="text-xs text-muted">{intl.formatMessage({ id: "typography.mark" })}<Select value={definition.mark} onChange={(event) => change({ ...definition, mark: event.target.value === "–" ? "–" : "—" })}><option value="—">—</option><option value="–">–</option></Select></label><label className="text-xs text-muted">{intl.formatMessage({ id: "typography.spacing" })}<Select value={definition.spacing} onChange={(event) => change({ ...definition, spacing: event.target.value === "none" ? "none" : "space" })}><option value="space">{intl.formatMessage({ id: "typography.withSpaces" })}</option><option value="none">{intl.formatMessage({ id: "typography.withoutSpaces" })}</option></Select></label></div>;
        case "ellipsis":
            return <label className="text-xs text-muted">{intl.formatMessage({ id: "typography.mark" })}<Select value={definition.form} onChange={(event) => change({ ...definition, form: event.target.value === "..." ? "..." : "…" })}><option value="…">{intl.formatMessage({ id: "typography.ellipsisSingle" })}</option><option value="...">{intl.formatMessage({ id: "typography.ellipsisThree" })}</option></Select></label>;
        case "nonbreaking-space":
            return <div className="grid gap-2 sm:grid-cols-3"><label className="text-xs text-muted">{intl.formatMessage({ id: "typography.left" })}<Field value={definition.left} maxLength={40} onChange={(event) => change({ ...definition, left: event.target.value })} /></label><label className="text-xs text-muted">{intl.formatMessage({ id: "typography.right" })}<Field value={definition.right} maxLength={40} onChange={(event) => change({ ...definition, right: event.target.value })} /></label><label className="text-xs text-muted">{intl.formatMessage({ id: "typography.spacing" })}<Select value={definition.space} onChange={(event) => change({ ...definition, space: event.target.value === NARROW_NO_BREAK_SPACE ? NARROW_NO_BREAK_SPACE : NO_BREAK_SPACE })}><option value={NO_BREAK_SPACE}>{intl.formatMessage({ id: "typography.nbsp" })}</option><option value={NARROW_NO_BREAK_SPACE}>{intl.formatMessage({ id: "typography.narrowNbsp" })}</option></Select></label></div>;
        case "literal":
            return <div className="grid gap-2 sm:grid-cols-2"><label className="text-xs text-muted">{intl.formatMessage({ id: "typography.source" })}<Field value={definition.source} maxLength={30} onChange={(event) => change({ ...definition, source: event.target.value })} /></label><label className="text-xs text-muted">{intl.formatMessage({ id: "typography.replacement" })}<Field value={definition.replacement} maxLength={30} onChange={(event) => change({ ...definition, replacement: event.target.value })} /></label></div>;
        case "contextual":
            return <label className="text-xs text-muted">{intl.formatMessage({ id: "typography.instruction" })}<TextareaField value={definition.instruction} maxLength={1000} onChange={(event) => change({ ...definition, instruction: event.target.value })} /></label>;
        case "horizontal-space":
            return <p className="text-xs text-muted">{intl.formatMessage({ id: "typography.horizontalHint" })}</p>;
    }
}
