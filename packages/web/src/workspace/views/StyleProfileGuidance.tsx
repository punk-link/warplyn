import { useIntl } from "react-intl";
import { Button, TextareaField } from "../../ui/primitives.js";
import type { MessageId } from "../../i18n/messages.js";
import { StyleProfileDisclosure } from "./StyleProfileDisclosure.js";


interface StyleProfileGuidanceData {
    pendingAction: string | undefined;
    rules: string;
    savedRules: string;
    articleRules: string;
    savedArticleRules: string;
}


interface StyleProfileGuidanceActions {
    setRules: (value: string) => void;
    setArticleRules: (value: string) => void;
    onSaveRules: () => void;
    onSaveArticleRules: () => void;
    getRuleStatus: (draft: string, saved: string) => MessageId;
}


export function StyleProfileGuidance({ data, actions }: { data: StyleProfileGuidanceData; actions: StyleProfileGuidanceActions }) {
    const { pendingAction, rules, savedRules, articleRules, savedArticleRules } = data;
    const { setRules, setArticleRules, onSaveRules, onSaveArticleRules, getRuleStatus } = actions;
    const intl = useIntl();
    const unsaved = rules !== savedRules || articleRules !== savedArticleRules;
    let status: MessageId = "styleProfile.rulesNone";
    if (unsaved)
        status = "styleProfile.rulesUnsaved";
    else if (rules.trim() || articleRules.trim())
        status = "styleProfile.rulesApplied";

    return (
        <StyleProfileDisclosure label={intl.formatMessage({ id: "styleProfile.manualRules" })} summary={intl.formatMessage({ id: status })}>
            <label className="field-label mb-2" htmlFor="style-profile-global-rules">
                {intl.formatMessage({ id: "styleProfile.rules" })}
            </label>
            <TextareaField
                id="style-profile-global-rules"
                aria-label={intl.formatMessage({ id: "styleProfile.rules" })}
                className="min-h-36"
                placeholder={intl.formatMessage({ id: "styleProfile.rules" })}
                value={rules}
                onChange={(event) => setRules(event.target.value)}
            />
            <div className="mt-3 flex items-center gap-3">
                <Button
                    variant="secondary"
                    state={pendingAction === "rules" ? "loading" : "default"}
                    disabled={Boolean(pendingAction)}
                    onClick={onSaveRules}
                >
                    {intl.formatMessage({ id: "styleProfile.saveRules" })}
                </Button>
                <p className="text-xs text-muted" role="status">
                    {intl.formatMessage({ id: getRuleStatus(rules, savedRules) })}
                </p>
            </div>
            <label className="field-label mb-2 mt-5" htmlFor="style-profile-article-rules">
                {intl.formatMessage({ id: "styleProfile.thisArticle" })}
            </label>
            <TextareaField
                id="style-profile-article-rules"
                aria-label={intl.formatMessage({ id: "styleProfile.articleRules" })}
                className="min-h-28"
                placeholder={intl.formatMessage({ id: "styleProfile.articleRules" })}
                value={articleRules}
                onChange={(event) => setArticleRules(event.target.value)}
            />
            <div className="mt-3 flex items-center gap-3">
                <Button
                    variant="secondary"
                    state={pendingAction === "article-rules" ? "loading" : "default"}
                    disabled={Boolean(pendingAction)}
                    onClick={onSaveArticleRules}
                >
                    {intl.formatMessage({ id: "styleProfile.saveRules" })}
                </Button>
                <p className="text-xs text-muted" role="status">
                    {intl.formatMessage({ id: getRuleStatus(articleRules, savedArticleRules) })}
                </p>
            </div>
        </StyleProfileDisclosure>
    );
}

