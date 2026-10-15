import { useId, useState } from "react";
import { useIntl } from "react-intl";
import { typographyPresets } from "@skladno/shared";
import { Button, Select } from "../../ui/primitives.js";


export function TypographyPresetPicker({ language, saved, disabled, apply }: {
    language: string;
    saved?: { id: string; version: number };
    disabled?: boolean;
    apply: (selection: { id: string; version: number }) => Promise<void>;
}) {
    const intl = useIntl();
    const helpId = useId();
    const [preview, setPreview] = useState<string>();
    const savedKey = saved ? `${saved.id}@${saved.version}` : "";
    const selected = preview ?? savedKey;
    const preset = typographyPresets.find((item) => `${item.id}@${item.version}` === selected);
    const awaitingReview = preset?.review.status === "pending";
    const description = awaitingReview ? helpId : undefined;

    return <div>
        <label className="flex flex-col gap-2 text-xs font-semibold">
            {intl.formatMessage({ id: "typography.preset" })}
            <Select value={selected} aria-describedby={description} onChange={(event) => setPreview(event.target.value)}>
                <option value="">{intl.formatMessage({ id: "typography.noPreset" })}</option>
                {typographyPresets.filter((item) => item.language.split("-")[0] === language.split("-")[0]).map((item) => (
                    <option key={`${item.id}@${item.version}`} value={`${item.id}@${item.version}`}>
                        {item.review.status === "pending" ? intl.formatMessage({ id: "typography.presetPending" }, { language: item.language }) : item.language}
                    </option>
                ),
                )}
            </Select>
        </label>
        {preset && (
            <div className="my-2 space-y-2 text-sm">
                <p>{preset.preview}</p>
                {awaitingReview && (
                    <p id={helpId} className="text-xs text-muted">
                        {intl.formatMessage({ id: "typography.presetReviewHint" })}
                    </p>
                )}
                <Button disabled={disabled || awaitingReview} aria-describedby={description}
                    onClick={() => void apply({ id: preset.id, version: preset.version })}>
                    {intl.formatMessage({ id: "typography.applyPreset" })}
                </Button>
            </div>
        )}
    </div>;
}
