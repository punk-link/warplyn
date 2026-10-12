export const publishSettingsPath = "/api/settings/publish-limit-profile";

export const PUBLISH_LIMIT_PROFILE = {
    DEFAULT: "default",
    LINKEDIN_POST: "linkedin-post",
    LINKEDIN_ARTICLE: "linkedin-article",
    NO_RESTRICTIONS: "no-restrictions",
} as const;

type BuiltInPublishLimitProfileId = typeof PUBLISH_LIMIT_PROFILE[keyof typeof PUBLISH_LIMIT_PROFILE];
export type PublishLimitProfileId = BuiltInPublishLimitProfileId | `custom-${string}`;


export interface PublishLimitProfile {
    id: PublishLimitProfileId;
    characterLimit?: number;
    warningThreshold?: number;
}


export const publishLimitProfiles: readonly PublishLimitProfile[] = [
    {
        id: PUBLISH_LIMIT_PROFILE.NO_RESTRICTIONS,
    },
    {
        id: PUBLISH_LIMIT_PROFILE.DEFAULT,
        characterLimit: 3_000,
        warningThreshold: 2_100,
    },
    {
        id: PUBLISH_LIMIT_PROFILE.LINKEDIN_POST,
        characterLimit: 3_000,
        warningThreshold: 2_100,
    },
    {
        id: PUBLISH_LIMIT_PROFILE.LINKEDIN_ARTICLE,
        characterLimit: 125_000,
        warningThreshold: 87_500,
    },
];

export const defaultPublishLimitProfileId = PUBLISH_LIMIT_PROFILE.DEFAULT;


export interface PublishingSettings {
    defaultProfileId: PublishLimitProfileId;
    customProfiles: CustomPublishLimitProfile[];
}


export interface CustomPublishLimitProfile {
    id: `custom-${string}`;
    name: string;
    characterLimit: number;
}


export const defaultPublishingSettings: PublishingSettings = {
    defaultProfileId: defaultPublishLimitProfileId,
    customProfiles: [],
};


export function isPublishLimitProfileId(value: unknown): value is PublishLimitProfileId {
    const customPattern = /^custom-[0-9a-f-]{36}$/i;
    return publishLimitProfiles.some((profile) => profile.id === value) || (typeof value === "string" && customPattern.test(value));
}


export function getPublishLimitProfile(id: PublishLimitProfileId, settings = defaultPublishingSettings): PublishLimitProfile {
    const custom = settings.customProfiles.find((profile) => profile.id === id);
    return custom
        ? { id, characterLimit: custom.characterLimit, warningThreshold: Math.floor(custom.characterLimit * .7) }
        : publishLimitProfiles.find((profile) => profile.id === id) ?? publishLimitProfiles.find((profile) => profile.id === PUBLISH_LIMIT_PROFILE.DEFAULT)!;
}


export function preparePlainTextForPublishing(content: string): string {
    const codeFenceMarkerPattern = /```/g;
    const escapedNewlinePattern = /\\\n/g;
    const boldMarkdownPattern = /(\*\*|__)(.+?)\1/g;
    const asteriskEmphasisPattern = /(?<!\*)\*([^*\n]+)\*(?!\*)/g;
    const underscoreEmphasisPattern = /(?<!_)_([^_\n]+)_(?!_)/g;
    const strikethroughPattern = /~~(.+?)~~/g;
    const excessBlankLinesPattern = /\n{3,}/g;
    const lineBreakPattern = /\r\n?/g;
    const markdownImagePattern = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+[^)]*)?\)/g;
    const markdownLinkPattern = /\[([^\]]+)\]\(([^)\s]+)(?:\s+[^)]*)?\)/g;
    const urlPattern = /<((?:https?:\/\/|mailto:)[^>]+)>/g;
    const markdownHeadingMarkerPattern = /^[ \t]{0,3}#{1,6}[ \t]+/gm;
    const markdownBlockquoteMarkerPattern = /^[ \t]{0,3}>[ \t]?/gm;
    const markdownListMarkerPattern = /^[ \t]*(?:[-+*]|\d+[.)])[ \t]+/gm;
    const markdownHorizontalRulePattern = /^[ \t]{0,3}([-*_])(?:[ \t]*\1){2,}[ \t]*$/gm;
    const codeFenceOpeningPattern = /^[ \t]*```[^\n]*\n?/gm;
    const inlineCodePattern = /`([^`]+)`/g;
    return content
        .replace(lineBreakPattern, "\n")
        .replace(markdownImagePattern, "$1 ($2)")
        .replace(markdownLinkPattern, "$1 ($2)")
        .replace(urlPattern, "$1")
        .replace(markdownHeadingMarkerPattern, "")
        .replace(markdownBlockquoteMarkerPattern, "")
        .replace(markdownListMarkerPattern, "")
        .replace(markdownHorizontalRulePattern, "")
        .replace(codeFenceOpeningPattern, "")
        .replace(inlineCodePattern, "$1")
        .replace(codeFenceMarkerPattern, "")
        .replace(escapedNewlinePattern, "\n")
        .replace(boldMarkdownPattern, "$2")
        .replace(asteriskEmphasisPattern, "$1")
        .replace(underscoreEmphasisPattern, "$1")
        .replace(strikethroughPattern, "$1")
        .replace(excessBlankLinesPattern, "\n\n")
        .trim();
}


export function countPublishingCharacters(content: string): number {
    return Array.from(content).length;
}


export type PublishingLengthState = "within-limit" | "near-limit" | "over-limit";


export interface PublishingLength {
    count: number;
    remaining?: number;
    state: PublishingLengthState;
}


/** Resolves advisory publishing guidance without restricting any Article action. */
export function getPublishingLength(content: string, profile: PublishLimitProfile): PublishingLength {
    const count = countPublishingCharacters(content);
    if (profile.characterLimit === undefined)
        return { count, state: "within-limit" };

    const remaining = profile.characterLimit - count;

    return {
        count,
        remaining,
        state: remaining < 0
            ? "over-limit"
            : count >= (profile.warningThreshold ?? profile.characterLimit)
                ? "near-limit"
                : "within-limit",
    };
}


export interface PublishingClient {
    getPublishingSettings(): Promise<PublishingSettings>;
    setPublishingSettings(settings: PublishingSettings): Promise<PublishingSettings>;
}
