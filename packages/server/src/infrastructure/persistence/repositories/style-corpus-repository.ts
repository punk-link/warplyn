import {
    APPLICATION_ERROR,
    HTTP_STATUS,
    isTypographyRules,
    type CreateStyleCorpusItemInput,
    type StyleCorpus,
    type StyleCorpusItem,
    type StyleProfile,
    type StyleProfileRules,
    type StyleTrait,
    type TypographyRule,
} from "@skladno/shared";
import { ApplicationServiceError } from "../../../application/errors/application-service-error.js";
import { decodeStyleProfile, decodeTypographyRules } from "./style-profile-decoder.js";

import type { SqliteDatabase } from "../database.js";
import { createId, getCurrentTimestamp, requireNonEmpty, type Row } from "./repository-utils.js";


function createStyleProfile(items: { id: string; content: string }[], rules: StyleProfileRules, version: number): StyleProfile {
    const content = items.map((item) => item.content).join("\n");
    const punctuationPattern = /[.!?]+/;
    const sentences = content.split(punctuationPattern).map((sentence) => sentence.trim()).filter(Boolean);
    const corpusWordPattern = /[\p{L}\p{N}]+(?:['’][\p{L}]+)?/gu;
    const words = content.match(corpusWordPattern) ?? [];
    const paragraphBoundaryPattern = /\n\s*\n/;
    const paragraphs = content.split(paragraphBoundaryPattern).map((paragraph) => paragraph.trim()).filter(Boolean);
    const averageSentenceWords = averageWordsPerSentence(words.length, sentences.length);
    const firstPersonPronounPattern = /\b(I|we|my|our|I’m|we’re|I’ve|we’ve)\b/giu;
    const firstPerson = (content.match(firstPersonPronounPattern) ?? []).length;
    const contractionPattern = /\b[\p{L}]+['’][\p{L}]+\b/gu;
    const contractions = (content.match(contractionPattern) ?? []).length;
    const howeverThereforeExamplePattern = /\b(however|therefore|for example|for instance|meanwhile|instead|because|although|finally|first|second)\b/giu;
    const transitionCount = (content.match(howeverThereforeExamplePattern) ?? []).length;
    // ponytail: O(n²) phrase counting is bounded by the local corpus; add a frequency map if profiles grow materially.
    const repeatedThreeWordPhrasePattern = /\b([\p{L}]+\s+[\p{L}]+\s+[\p{L}]+)\b/gu;
    const phrasesToAvoid = [...content.toLowerCase().matchAll(repeatedThreeWordPhrasePattern)]
        .map((match) => match[1]!)
        .filter((phrase, index, phrases) => phrases.indexOf(phrase) === index && phrases.filter((item) => item === phrase).length >= 2)
        .slice(0, 5);

    const traits: StyleTrait[] = [{
        id: "voice",
        label: firstPerson > 0 ? "personal author presence" : "impersonal explanatory voice",
        evidence: `${firstPerson} first-person references in the local corpus.`
    }, {
        id: "rhythm",
        label: getRhythmLabel(averageSentenceWords),
        evidence: `Average sentence length: ${Math.round(averageSentenceWords)} words across ${sentences.length} sentences.`
    }, {
        id: "structure",
        label: paragraphs.length >= 4 && paragraphs.length / Math.max(sentences.length, 1) >= .2 ? "frequent paragraph breaks" : "developed paragraphs",
        evidence: `${paragraphs.length} paragraphs across ${sentences.length} sentences.`
    }, {
        id: "vocabulary",
        label: contractions > 0 ? "conversational contractions" : "formal, expanded phrasing",
        evidence: `${contractions} contractions in the local corpus.`
    }, {
        id: "transitions",
        label: transitionCount > 0 ? "uses explicit transitions" : "uses few explicit transitions",
        evidence: `${transitionCount} transition markers in the local corpus.`
    }];
    const characterCount = content.length;

    const confidence = getProfileConfidence(items.length, characterCount);

    return {
        version,
        corpusItemCount: items.length,
        characterCount,
        confidence,
        traits: items.length ? traits : [],
        phrasesToAvoid,
        contributorIds: items.map((item) => item.id),
        rules,
        updatedAt: getCurrentTimestamp()
    };
}


function averageWordsPerSentence(words: number, sentences: number): number {
    return sentences === 0 ? 0 : words / sentences;
}


function getRhythmLabel(averageSentenceWords: number): string {
    if (averageSentenceWords <= 14)
        return "compact sentences";

    if (averageSentenceWords >= 24)
        return "long, developed sentences";

    return "moderate sentence length";
}


function getProfileConfidence(itemCount: number, characterCount: number): StyleProfile["confidence"] {
    if (itemCount >= 5 && characterCount >= 12_000)
        return "high";

    if (itemCount >= 2 && characterCount >= 3_000)
        return "medium";

    return "low";
}


function createExcerpt(content: string): string {
    const whitespacePattern = /\s+/g;
    const compact = content.trim().replace(whitespacePattern, " ");
    return compact.length <= 180 ? compact : `${compact.slice(0, 177)}…`;
}


export class StyleCorpusRepository {
    constructor(private readonly database: SqliteDatabase) { }


    getStyleCorpus(): StyleCorpus {
        const rows = this.database.prepare((`SELECT author_materials.*, style_corpus_items.included, style_corpus_items.origin, style_corpus_items.article_id, style_corpus_items.revision_id
            FROM style_corpus_items
            JOIN author_materials ON author_materials.id = style_corpus_items.author_material_id
            ORDER BY style_corpus_items.created_at, author_materials.id`)).all() as Row[];
        const rules = String((this.database.prepare("SELECT rules FROM style_corpus_settings WHERE id = 1").get() as Row | undefined)?.rules ?? "");
        const typographyRules = this.getTypographyRules();
        const profileRow = this.database.prepare("SELECT profile_json FROM style_profile_versions ORDER BY version DESC LIMIT 1").get() as Row | undefined;
        const profile = profileRow ? decodeStyleProfile(String(profileRow.profile_json)) : undefined;
        const includedIds = rows.filter((row) => Number(row.included) === 1).map((row) => String(row.id));
        let status: "empty" | "ready" | "outdated" = "outdated";
        if (includedIds.length === 0 && !rules.trim() && !typographyRules.length)
            status = "empty";
        else if (
            profile &&
            profile.rules.manual === rules &&
            JSON.stringify(profile.rules.typography) === JSON.stringify(typographyRules) &&
            profile.contributorIds.length === includedIds.length &&
            profile.contributorIds.every((id) => includedIds.includes(id))
        )
            status = "ready";

        const corpusTokenPattern = /[\p{L}\p{N}]+/gu;
        return {
            items: rows.map((row): StyleCorpusItem => ({
                id: String(row.id),
                name: String(row.name),
                characterCount: String(row.content).length,
                wordCount: String(row.content).match(corpusTokenPattern)?.length ?? 0,
                excerpt: createExcerpt(String(row.content)),
                createdAt: String(row.created_at),
                updatedAt: String(row.updated_at),
                included: Number(row.included) === 1,
                origin: String(row.origin) as StyleCorpusItem["origin"],
                ...(row.article_id ? { articleId: String(row.article_id) } : {}),
                ...(row.revision_id ? { revisionId: String(row.revision_id) } : {})
            })),
            ...(profile ? { profile } : {}), rules, typographyRules, status
        };
    }


    hasStyleCorpusContent(content: string): boolean {
        return Boolean(this.database.prepare("SELECT 1 FROM style_corpus_items JOIN author_materials ON author_materials.id = style_corpus_items.author_material_id WHERE author_materials.content = ?").get(content));
    }


    addStyleCorpusItem(input: CreateStyleCorpusItemInput & { name: string; origin?: "manual" | "import" | "article-revision"; articleId?: string; revisionId?: string }): StyleCorpus {
        const timestamp = getCurrentTimestamp();
        const materialId = createId();
        this.database.prepare("INSERT INTO author_materials (id, name, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)").run(materialId, requireNonEmpty(input.name, "Corpus item name"), requireNonEmpty(input.content, "Corpus item content"), timestamp, timestamp);
        this.database.prepare("INSERT INTO style_corpus_items (author_material_id, created_at, origin, article_id, revision_id) VALUES (?, ?, ?, ?, ?)").run(materialId, timestamp, input.origin ?? "manual", input.articleId ?? null, input.revisionId ?? null);

        return this.getStyleCorpus();
    }


    setStyleCorpusItemIncluded(id: string, included: boolean): StyleCorpus {
        if (this.database.prepare("UPDATE style_corpus_items SET included = ? WHERE author_material_id = ?").run(included ? 1 : 0, id).changes === 0)
            throw new Error("Style corpus item not found.");

        return this.getStyleCorpus();
    }


    setStyleCorpusRules(rules: string): StyleCorpus {
        this.database.prepare("UPDATE style_corpus_settings SET rules = ?, updated_at = ? WHERE id = 1").run(rules, getCurrentTimestamp());
        return this.getStyleCorpus();
    }


    private getTypographyRules(): TypographyRule[] {
        const row = this.database.prepare("SELECT typography_json FROM style_corpus_settings WHERE id = 1").get() as Row;
        return decodeTypographyRules(String(row.typography_json));
    }


    setTypographyRules(rules: TypographyRule[]): StyleCorpus {
        if (!isTypographyRules(rules))
            throw new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, HTTP_STATUS.BAD_REQUEST);

        this.database.exec("BEGIN IMMEDIATE;");
        try {
            const corpus = this.getStyleCorpus();
            const changed = JSON.stringify(corpus.typographyRules) !== JSON.stringify(rules);
            if (changed)
                this.database
                    .prepare("UPDATE style_corpus_settings SET typography_json = ?, updated_at = ? WHERE id = 1")
                    .run(JSON.stringify(rules), getCurrentTimestamp());

            if (changed || corpus.status === "outdated")
                this.rebuildStyleProfile();

            this.database.exec("COMMIT;");
        } catch (error) {
            this.database.exec("ROLLBACK;");
            throw error;
        }

        return this.getStyleCorpus();
    }


    rebuildStyleProfile(): StyleCorpus {
        const rows = this.database.prepare((`SELECT author_materials.id, author_materials.content
            FROM style_corpus_items
            JOIN author_materials ON author_materials.id = style_corpus_items.author_material_id
            WHERE style_corpus_items.included = 1
            ORDER BY style_corpus_items.created_at, author_materials.id`)).all() as Row[];
        const rules = String((this.database.prepare("SELECT rules FROM style_corpus_settings WHERE id = 1").get() as Row).rules);
        const typography = this.getTypographyRules();
        const version = Number((this.database.prepare("SELECT COALESCE(MAX(version), 0) + 1 AS version FROM style_profile_versions").get() as Row).version);
        const profile = createStyleProfile(rows.map((row) => ({ id: String(row.id), content: String(row.content) })), { manual: rules, typography }, version);
        this.database.prepare("INSERT INTO style_profile_versions (version, profile_json, created_at) VALUES (?, ?, ?)").run(version, JSON.stringify(profile), profile.updatedAt);

        return this.getStyleCorpus();
    }


    getArticleStyleRules(articleId: string): string {
        const row = this.database
            .prepare("SELECT rules FROM article_style_rules WHERE article_id = ?")
            .get(articleId) as Row | undefined;

        return row ? String(row.rules) : "";
    }


    setArticleStyleRules(articleId: string, rules: string): string {
        this.database.prepare((`INSERT INTO article_style_rules (article_id, rules, updated_at)
            VALUES (?, ?, ?)
            ON CONFLICT(article_id) DO UPDATE
            SET rules = excluded.rules, updated_at = excluded.updated_at`))
            .run(articleId, rules, getCurrentTimestamp());

        return rules;
    }


    removeStyleCorpusItem(id: string): void {
        if (this.database.prepare("DELETE FROM style_corpus_items WHERE author_material_id = ?").run(id).changes === 0)
            throw new Error("Style corpus item not found.");

        this.database.prepare("DELETE FROM author_materials WHERE id = ?").run(id);
    }
}
