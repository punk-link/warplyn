import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { typographyIssues, type TypographyDefinition, type TypographyRule } from "@skladno/shared";
import { Banner, Button } from "../../ui/primitives.js";
import { defaultTypographyDefinition } from "./typography-presentation.js";
import { TypographyRuleRow } from "./TypographyRuleRow.js";

const emptyRules: TypographyRule[] = [];


export function TypographyRulesBlock({ rules = emptyRules, save, check, busy = false }: {
    rules?: TypographyRule[];
    save: (rules: TypographyRule[]) => Promise<void>;
    check: () => Promise<void>;
    busy?: boolean;
}) {
    const intl = useIntl();
    const [draft, setDraft] = useState(rules);
    const [editingId, setEditingId] = useState<string>();
    const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const addButton = useRef<HTMLButtonElement>(null);
    const saveButton = useRef<HTMLButtonElement>(null);
    const container = useRef<HTMLElement>(null);
    const focusAdded = useRef(false);
    const savedRules = useRef(JSON.stringify(rules));
    const issues = typographyIssues(draft);
    const dirty = JSON.stringify(draft) !== JSON.stringify(rules);
    useEffect(() => {
        const previous = savedRules.current;
        setDraft((current) => JSON.stringify(current) === previous ? rules : current);
        savedRules.current = JSON.stringify(rules);
    }, [rules]);
    useEffect(() => {
        if (state === "saved" || state === "error")
            saveButton.current?.focus();
    }, [state]);
    useEffect(() => {
        if (focusAdded.current) {
            const addedControl = container.current?.querySelectorAll<HTMLSelectElement>("[data-typography-kind]");
            addedControl?.[addedControl.length - 1]?.focus();
            focusAdded.current = false;
        }
    }, [draft.length]);
    const change = (id: string, definition: TypographyDefinition) => {
        setDraft((items) => items.map((item) => item.id === id ? { ...item, definition } : item));
        setState("idle");
    };
    const submit = async () => {
        setState("saving");
        try {
            await save(draft);
            setEditingId(undefined);
            setState("saved");
        } catch {
            setState("error");
        }
    };
    const pending = busy || state === "saving";
    let statusMessage: import("../../i18n/messages.js").MessageId = "typography.localHint";
    if (dirty)
        statusMessage = "styleProfile.rulesUnsaved";
    else if (state === "saved")
        statusMessage = "typography.saved";

    return <section ref={container} className="mb-7" aria-labelledby="typography-heading">
        <h3 id="typography-heading" className="mb-3 text-base font-semibold">{intl.formatMessage({ id: "typography.title" })}</h3>
        <div className="border-l border-border-strong pl-4">
            <p id="typography-help" className="mb-3 text-xs text-muted">{intl.formatMessage({ id: "typography.saveHint" })}</p>
            {!draft.length && <p className="mb-3 text-sm text-muted">{intl.formatMessage({ id: "typography.empty" })}</p>}
            {draft.length > 0 && <ul className="divide-y divide-border border-y border-border">
                {draft.map((rule, index) => <TypographyRuleRow
                    key={rule.id}
                    rule={rule}
                    number={index + 1}
                    editing={editingId === rule.id}
                    pending={pending}
                    unsaved={JSON.stringify(rule) !== JSON.stringify(rules.find((saved) => saved.id === rule.id))}
                    issue={issues.find((issue) => issue.index === index)?.reason}
                    change={(definition) => change(rule.id, definition)}
                    toggle={() => setEditingId((current) => current === rule.id ? undefined : rule.id)}
                    remove={() => {
                        setDraft((items) => items.filter((item) => item.id !== rule.id));
                        if (editingId === rule.id)
                            setEditingId(undefined);

                        setState("idle");
                        addButton.current?.focus();
                    }} />)}
            </ul>}
            <div className="mt-6 flex flex-wrap gap-2">
                <Button
                    ref={addButton}
                    variant="quiet"
                    disabled={pending || draft.length >= 30}
                    onClick={() => {
                        focusAdded.current = true;
                        const id = crypto.randomUUID();
                        setEditingId(id);
                        setDraft((items) => [...items, { id, definition: defaultTypographyDefinition("ellipsis") }]);
                        setState("idle");
                    }}>{intl.formatMessage({ id: "typography.add" })}</Button><Button
                    ref={saveButton}
                    variant="primary"
                    state={state === "saving" ? "loading" : "default"}
                    disabled={pending || issues.length > 0}
                    aria-describedby="typography-help"
                    onClick={() => void submit()}>{intl.formatMessage({ id: "typography.save" })}</Button>
                <Button variant="secondary" disabled={pending || dirty || !rules.some((rule) => rule.definition.kind !== "contextual")} onClick={() => void check()}>{intl.formatMessage({ id: "typography.check" })}</Button>
            </div>
            <p className="mt-2 text-xs text-muted" role="status">{intl.formatMessage({ id: statusMessage })}</p>
            {state === "error" && <Banner tone="error" role="alert">{intl.formatMessage({ id: "typography.saveFailed" })}</Banner>}
        </div>
    </section>;
}
