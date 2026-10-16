import { useMemo, useState } from "react";
import { useIntl } from "react-intl";
import {
    resolveTypography, findTypographyPreset, type ArticleTypography, type TypographyConfiguration,
    type TypographyConfigurationUpdate, type TypographyPreferences, type TypographyRule,
} from "@skladno/shared";
import { Button } from "../../ui/primitives.js";
import { TypographyRulesBlock } from "./TypographyRulesBlock.js";
import { TypographyPresetPicker } from "./TypographyPresetPicker.js";

const emptyPreferences: TypographyPreferences = { rules: [], disabled: [] };


export function TypographyScopeEditor({ data, actions }: {
    data: {
        language: string; articleId?: string; articleLanguage?: string; configuration?: TypographyConfiguration;
        article?: ArticleTypography; legacy?: TypographyRule[]; busy?: boolean; checkAvailable?: boolean;
    };
    actions: { save: (input: TypographyConfigurationUpdate) => Promise<void>; check: () => Promise<void> };
}) {
    const intl = useIntl();
    const [resetVersion, setResetVersion] = useState(0);
    let preferences = data.configuration?.languages[data.language] ?? emptyPreferences;
    if (data.articleId)
        preferences = data.article?.language === data.language ? data.article.preferences : emptyPreferences;

    const capture = useMemo(() => resolveTypography(data.language, data.configuration, data.articleId ? data.article : undefined),
        [data.language, data.configuration, data.articleId, data.article]);
    const save = async (rules: TypographyRule[]) => {
        let base: TypographyRule[] = [];
        if (data.articleId)
            base = resolveTypography(data.language, data.configuration, {
                language: data.language, preferences: { ...preferences, rules: [], disabled: [] },
            }).rules;
        else if (preferences.preset)
            base = findTypographyPreset(preferences.preset)?.rules ?? [];

        await actions.save({
            language: data.language, articleId: data.articleId, preferences: {
                ...preferences,
                rules: rules.filter((rule) => JSON.stringify(rule) !== JSON.stringify(base.find((item) => item.id === rule.id))),
                disabled: base.filter((rule) => !rules.some((item) => item.id === rule.id)).map((rule) => rule.id),
            }
        });
    };

    const [error, setError] = useState(false);
    const perform = async (operation: () => Promise<void>) => {
        setError(false);
        try {
            await operation();
            setResetVersion((version) => version + 1);
        } catch {
            setError(true);
        }
    };

    return <div>
        <TypographyPresetPicker
            language={data.language}
            saved={preferences.preset}
            disabled={data.busy}
            apply={(preset) => perform(() => actions.save({
                language: data.language, articleId: data.articleId, preferences: { preset, rules: [], disabled: [] },
            }))} />
        <p className="my-2 text-xs text-muted">{intl.formatMessage({ id: "typography.inheritanceHint" })}</p>
        <div className="my-3">
            {Boolean(data.legacy?.length) && (
                <p className="mb-2 text-xs text-muted">{intl.formatMessage({ id: "typography.legacyHint" })}</p>
            )}
            <div className="flex flex-wrap items-center gap-2">
                {Boolean(data.legacy?.length) && (
                    <Button variant="quiet" disabled={data.busy} onClick={() => void perform(() => save(data.legacy ?? []))}>
                        {intl.formatMessage({ id: "typography.copyLegacy" })}
                    </Button>
                )}
                <Button variant="quiet" disabled={data.busy} onClick={() => void perform(() => actions.save({
                    language: data.language, articleId: data.articleId,
                    preferences: { ...(!data.articleId && preferences.preset ? { preset: preferences.preset } : {}), rules: [], disabled: [] },
                }))}>{intl.formatMessage({ id: "typography.resetInheritance" })}
                </Button>
            </div>
        </div>
        {error && <p role="alert" className="text-sm text-error">{intl.formatMessage({ id: "typography.saveFailed" })}</p>}
        {!capture.rules.some((rule) => rule.definition.kind !== "contextual") &&
            <p className="my-2 text-xs text-muted">{intl.formatMessage({ id: "typography.noConvention" })}</p>}
        <TypographyRulesBlock
            key={resetVersion}
            rules={capture.rules}
            sources={capture.sources}
            save={save}
            savedMessage={data.articleId ? "typography.articleSaved" : undefined}
            saveHint={data.articleId ? "typography.articleSaveHint" : undefined}
            check={actions.check}
            checkDisabled={data.language !== data.articleLanguage || !data.checkAvailable}
            busy={data.busy} />
    </div>;
}
