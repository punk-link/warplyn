import {
    APPLICATION_ERROR, HTTP_STATUS, emptyTypographyConfiguration, isArticleTypography, isTypographyConfiguration,
    isTypographyConfigurationUpdate, isTypographyRules, resolveTypography,
    type ArticleTypography, type TypographyConfiguration, type TypographyConfigurationUpdate,
} from "@skladno/shared";
import { ApplicationServiceError } from "../../../application/errors/application-service-error.js";
import type { SqliteDatabase } from "../database.js";
import { getCurrentTimestamp, type Row } from "./repository-utils.js";


function invalidTypography(): never {
    throw new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, HTTP_STATUS.BAD_REQUEST);
}


function readStoredJson(json: string): unknown {
    try {
        return JSON.parse(json);
    } catch {
        return invalidTypography();
    }
}


export class TypographySettingsRepository {
    constructor(private readonly database: SqliteDatabase) { }


    get(): TypographyConfiguration {
        const row = this.database.prepare("SELECT typography_configuration_json FROM style_corpus_settings WHERE id = 1").get() as Row;
        const value = readStoredJson(String(row.typography_configuration_json));
        if (!isTypographyConfiguration(value))
            return invalidTypography();

        return value;
    }


    getArticle(articleId: string): ArticleTypography | undefined {
        const row = this.database.prepare("SELECT typography_json FROM article_style_rules WHERE article_id = ?").get(articleId) as Row | undefined;
        if (!row?.typography_json)
            return undefined;

        const value = readStoredJson(String(row.typography_json));
        if (!isArticleTypography(value))
            return invalidTypography();

        return value;
    }


    save(input: TypographyConfigurationUpdate): boolean {
        if (!isTypographyConfigurationUpdate(input))
            return invalidTypography();

        const configuration = this.get();
        if (input.articleId)
            return this.saveArticle(input, configuration);

        const next: TypographyConfiguration = {
            ...emptyTypographyConfiguration, languages: { ...configuration.languages, [input.language]: input.preferences },
        };

        if (!isTypographyConfiguration(next))
            return invalidTypography();

        if (JSON.stringify(next) === JSON.stringify(configuration))
            return false;

        this.validateArticleInheritance(next, input.language);
        this.database.prepare("UPDATE style_corpus_settings SET typography_configuration_json = ?, updated_at = ? WHERE id = 1")
            .run(JSON.stringify(next), getCurrentTimestamp());

        return true;
    }


    private validateArticleInheritance(configuration: TypographyConfiguration, language: string): void {
        const rows = this.database.prepare("SELECT article_id FROM article_style_rules WHERE typography_json IS NOT NULL").all() as Row[];
        for (const row of rows) {
            const article = this.getArticle(String(row.article_id));
            if (article?.language === language && !isTypographyRules(resolveTypography(language, configuration, article).rules))
                invalidTypography();
        }
    }


    private saveArticle(input: TypographyConfigurationUpdate, configuration: TypographyConfiguration): boolean {
        if (!this.database.prepare("SELECT 1 FROM articles WHERE id = ?").get(input.articleId!))
            throw new ApplicationServiceError(APPLICATION_ERROR.ARTICLE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

        const next: ArticleTypography = { language: input.language, preferences: input.preferences };
        if (!isTypographyRules(resolveTypography(input.language, configuration, next).rules))
            return invalidTypography();

        if (JSON.stringify(this.getArticle(input.articleId!)) === JSON.stringify(next))
            return false;

        this.database.prepare(`INSERT INTO article_style_rules (article_id, rules, typography_json, updated_at)
            VALUES (?, '', ?, ?)
            ON CONFLICT(article_id) DO UPDATE
            SET typography_json = excluded.typography_json, updated_at = excluded.updated_at`)
            .run(input.articleId!, JSON.stringify(next), getCurrentTimestamp());

        return true;
    }
}
