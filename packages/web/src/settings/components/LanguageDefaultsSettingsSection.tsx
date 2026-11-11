import { articleLanguages, type GeneralSettings } from "@skladno/shared";
import { useIntl } from "react-intl";
import { Select } from "../../ui/primitives.js";
import { TranslationLanguagePicker } from "../../ui/TranslationLanguagePicker.js";
import { SettingRow } from "./SettingRow.js";

const languageMessageIds = {
    en: "languages.english", es: "languages.spanish", pt: "languages.portuguese", ru: "languages.russian",
    fr: "languages.french", de: "languages.german", it: "languages.italian",
} as const;


export function LanguageDefaultsSettingsSection({ general, save }: {
    general: GeneralSettings;
    save: (next: GeneralSettings) => Promise<void>;
}) {
    const intl = useIntl();

    return <div className="mt-2">
        <SettingRow label={intl.formatMessage({ id: "settings.defaultArticleLanguage" })}
            hint={intl.formatMessage({ id: "settings.defaultArticleLanguageHint" })}>
            <Select aria-label={intl.formatMessage({ id: "settings.defaultArticleLanguage" })}
                value={general.defaultArticleLanguage} onChange={(event) => {
                    const language = event.target.value;
                    void save({
                        ...general, defaultArticleLanguage: language,
                        defaultTranslationLanguages: general.defaultTranslationLanguages.filter((item) => item !== language),
                    });
                }}>
                {articleLanguages.map((language) => (
                    <option key={language} value={language}>
                        {intl.formatMessage({ id: languageMessageIds[language] })}
                    </option>
                ))}
            </Select>
        </SettingRow>
        <SettingRow
            className="mt-4 border-none"
            layout="stacked"
            label={intl.formatMessage({ id: "settings.defaultTranslationLanguages" })}
            hint={intl.formatMessage({ id: "settings.defaultTranslationLanguagesHint" })}>
            <div role="group" aria-label={intl.formatMessage({ id: "settings.defaultTranslationLanguages" })}>
                <TranslationLanguagePicker selected={general.defaultTranslationLanguages} sourceLanguage={general.defaultArticleLanguage}
                    change={(languages) => void save({ ...general, defaultTranslationLanguages: languages })} />
            </div>
        </SettingRow>
    </div>;
}
