import { defaultPublishLimitProfileId, isArticleLanguage, isPublishLimitProfileId, type CreateArticleInput, type EditorialWorkspaceClient } from "@skladno/shared";


export async function createArticleWithDefaults(client: EditorialWorkspaceClient, create: EditorialWorkspaceClient["createArticle"], content: Pick<CreateArticleInput, "title" | "content">) {
    const settings = await client.getApplicationSettings();
    const { defaultProfileId } = await client.getPublishingSettings();
    const language = settings.general.defaultArticleLanguage;

    return create({
        ...content,
        language: isArticleLanguage(language) ? language : "en",
        publishingProfileId: isPublishLimitProfileId(defaultProfileId) ? defaultProfileId : defaultPublishLimitProfileId,
    });
}
