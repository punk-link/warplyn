import { APPLICATION_ERROR, isTypographyRules, resolveTypography, type ArticleTypography, type StyleProfile } from "@skladno/shared";
import { failure, success, type ApplicationResult } from "../../errors/application-result.js";
import { unwrapApplicationResult } from "../../errors/unwrap-application-result.js";


export function captureStyleTypography(profile: StyleProfile, language: string | undefined, article?: ArticleTypography): StyleProfile {
    return unwrapApplicationResult(prepareStyleTypography(profile, language, article));
}


export function prepareStyleTypography(
    profile: StyleProfile, language: string | undefined, article?: ArticleTypography,
): ApplicationResult<StyleProfile> {
    const capture = resolveTypography(language, profile.rules.typographyConfiguration, article);
    if (!isTypographyRules(capture.rules))
        return failure(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID);

    return success({
        ...profile,
        rules: { manual: profile.rules.manual, typography: capture.rules, typographyCapture: capture },
    });
}
