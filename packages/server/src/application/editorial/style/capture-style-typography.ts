import { APPLICATION_ERROR, HTTP_STATUS, isTypographyRules, resolveTypography, type ArticleTypography, type StyleProfile } from "@skladno/shared";
import { ApplicationServiceError } from "../../errors/application-service-error.js";


export function captureStyleTypography(profile: StyleProfile, language: string | undefined, article?: ArticleTypography): StyleProfile {
    const capture = resolveTypography(language, profile.rules.typographyConfiguration, article);
    if (!isTypographyRules(capture.rules))
        throw new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, HTTP_STATUS.BAD_REQUEST);

    return {
        ...profile,
        rules: { manual: profile.rules.manual, typography: capture.rules, typographyCapture: capture },
    };
}
