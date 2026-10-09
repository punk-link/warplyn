import type { ArticleRevision } from "@skladno/shared";
import type { IntlShape } from "react-intl";
import type { Notifications } from "../../notifications/notifications.js";


export function notifyTitleGeneration(result: ArticleRevision["titleGeneration"], intl: IntlShape, notify: Notifications["notify"]) {
    if (result && result.status !== "generated")
        notify({
            tone: result.status === "insufficient-context" ? "info" : "warning",
            durationMs: 6000,
            title: intl.formatMessage({ id: "article.titleGenerationFailed" }),
            message: intl.formatMessage({ id: result.status === "insufficient-context" ? "article.titleContextRequired" : "article.titleGenerationNextStep" })
        });
}
