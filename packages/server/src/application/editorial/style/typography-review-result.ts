import type { EditorialArtifact, StyleReview, TypographyReviewResult } from "@skladno/shared";


export function typographyReviewResult(artifact: EditorialArtifact | undefined): TypographyReviewResult | undefined {
    if (!artifact)
        return undefined;

    const metadata: unknown = JSON.parse(artifact.content);
    if (
        !metadata ||
        typeof metadata !== "object" ||
        !("baseContent" in metadata) ||
        typeof metadata.baseContent !== "string" ||
        !("proposal" in metadata) ||
        typeof metadata.proposal !== "string" ||
        !("styleReview" in metadata)
    )
        return undefined;

    const review = metadata.styleReview;
    if (!review || typeof review !== "object" || !("findings" in review) || !Array.isArray(review.findings) || !("typography" in review))
        return undefined;

    return {
        articleId: artifact.articleId,
        baseRevisionId: artifact.revisionId,
        editorialArtifactId: artifact.id,
        baseContent: metadata.baseContent,
        proposal: metadata.proposal,
        styleReview: review as StyleReview,
        createdAt: artifact.createdAt,
    };
}
