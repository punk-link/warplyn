import { useEffect, useId, useRef, useState } from "react";
import { useIntl } from "react-intl";
import {
    articleLanguages, normalizeTypographyLanguage, resolveTypography, type ArticleTypography, type StyleCorpus,
    type StyleReview, type TypographyConfigurationUpdate,
} from "@skladno/shared";
import { Button, Select, Banner } from "../../ui/primitives.js";
import { TypographyScopeEditor } from "./TypographyScopeEditor.js";


export function ScopedTypographyPanel({ data, actions }: {
    data: { corpus?: StyleCorpus; articleId: string; language?: string; findings?: StyleReview; busy?: boolean };
    actions: {
        save: (input: TypographyConfigurationUpdate) => Promise<void>;
        getArticle: (articleId: string) => Promise<ArticleTypography | undefined>;
        check: () => Promise<void>;
    };
}) {
    const intl = useIntl();
    const languageHelpId = useId();
    const articleLanguage = normalizeTypographyLanguage(data.language);
    const [language, setLanguage] = useState(articleLanguage ?? "");
    const [scope, setScope] = useState("language");
    const [visited, setVisited] = useState<string[]>(articleLanguage ? [`language:${articleLanguage}`] : []);
    const [article, setArticle] = useState<ArticleTypography>();
    const [loaded, setLoaded] = useState(false);
    const [loadFailed, setLoadFailed] = useState(false);
    const [loadAttempt, setLoadAttempt] = useState(0);
    const [saving, setSaving] = useState(false);
    const savingRef = useRef(false);
    const languageNames = new Intl.DisplayNames([intl.locale], { type: "language" });
    const languages = [...new Set([
        ...articleLanguages,
        ...Object.keys(data.corpus?.typographyConfiguration?.languages ?? {}), ...(articleLanguage ? [articleLanguage] : []),
    ])];
    const getArticle = actions.getArticle;
    useEffect(() => {
        let active = true;
        setLoaded(false);
        setLoadFailed(false);
        void getArticle(data.articleId).then((next) => {
            if (active) {
                setArticle(next);
                setLoaded(true);
            }
        }, () => {
            if (active)
                setLoadFailed(true);
        });
        return () => {
            active = false;
        };
    }, [data.articleId, getArticle, loadAttempt]);
    const activate = (nextScope: string, nextLanguage: string) => {
        setScope(nextScope);
        setLanguage(nextLanguage);
        const key = `${nextScope}:${nextLanguage}`;
        setVisited((keys) => keys.includes(key) ? keys : [...keys, key]);
    };
    const save = async (input: TypographyConfigurationUpdate) => {
        if (savingRef.current)
            throw new Error("A typography save is already in progress.");

        savingRef.current = true;
        setSaving(true);
        try {
            await actions.save(input);
            if (input.articleId)
                setArticle({ language: input.language, preferences: input.preferences });
        } finally {
            savingRef.current = false;
            setSaving(false);
        }
    };
    const current = resolveTypography(data.language, data.corpus?.typographyConfiguration, article);
    const previous = data.findings?.typography?.capture;

    return <div className="mb-7 space-y-3">
        <label className="block text-xs text-muted">
            {intl.formatMessage({ id: "typography.languageScope" })}
            <Select
                value={language}
                disabled={saving}
                aria-describedby={languageHelpId}
                onChange={(event) => activate(scope, event.target.value)}>
                {!language && <option value="">{intl.formatMessage({ id: "typography.chooseLanguage" })}</option>}
                {languages.map((tag) => <option key={tag} value={tag}>{languageNames.of(tag) ?? tag}</option>)}
            </Select>
        </label>
        <p id={languageHelpId} className="text-xs text-muted">{intl.formatMessage({ id: "typography.languageHint" })}</p>
        {!articleLanguage && <p role="status">{intl.formatMessage({ id: "typography.missingLanguage" })}</p>}
        {articleLanguage && <p className="text-xs text-muted">{intl.formatMessage({ id: "typography.effectiveLanguage" }, { language: articleLanguage })}</p>}
        <label className="block text-xs text-muted">
            {intl.formatMessage({ id: "typography.scope" })}
            <Select value={scope} disabled={saving} onChange={(event) => activate(event.target.value, language)}>
                <option value="language">{intl.formatMessage({ id: "typography.languagePreferences" })}</option>
                <option value="article">{intl.formatMessage({ id: "typography.articlePreferences" })}</option>
            </Select>
        </label>
        {loadFailed && (
            <Banner tone="error" role="alert">
                {intl.formatMessage({ id: "typography.loadFailed" })}
                <Button onClick={() => setLoadAttempt((attempt) => attempt + 1)}>
                    {intl.formatMessage({ id: "typography.retryLoad" })}
                </Button>
            </Banner>
        )}
        {visited.map((key) => {
            const [editorScope, editorLanguage] = key.split(":");
            if (!editorLanguage)
                return null;

            return <div key={key} hidden={key !== `${scope}:${language}`}>
                <TypographyScopeEditor data={{
                    language: editorLanguage, articleLanguage, articleId: editorScope === "article" ? data.articleId : undefined,
                    configuration: data.corpus?.typographyConfiguration, article, legacy: data.corpus?.typographyRules,
                    busy: data.busy || !loaded || saving,
                    checkAvailable: current.rules.some((rule) => rule.definition.kind !== "contextual"),
                }} actions={{ save, check: actions.check }} />
            </div>;
        })}
        {data.findings?.typography && !previous && <p className="text-xs text-muted">{intl.formatMessage({ id: "typography.legacyReview" })}</p>}
        {loaded && previous && previous.fingerprint !== current.fingerprint && (
            <Banner tone="warning">
                {intl.formatMessage({ id: "typography.earlierConvention" })}
            </Banner>
        )}
    </div>;
}
