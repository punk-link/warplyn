import type { ArticleTypography, StyleCorpus, TypographyConfigurationUpdate, TypographyRule } from "@skladno/shared";
import { ScopedTypographyPanel } from "./ScopedTypographyPanel.js";
import { TypographyRulesBlock } from "./TypographyRulesBlock.js";


export function StyleProfileTypography({ data, actions }: {
    data: { corpus?: StyleCorpus; articleId: string; language?: string; findings?: import("@skladno/shared").StyleReview; busy?: boolean };
    actions: {
        typography?: { save: (rules: TypographyRule[]) => Promise<void>; check: () => Promise<void> };
        scoped?: { save: (input: TypographyConfigurationUpdate) => Promise<void>; getArticle: (id: string) => Promise<ArticleTypography | undefined> };
    };
}) {
    if (!actions.typography)
        return null;

    if (actions.scoped)
        return <ScopedTypographyPanel key={data.articleId} data={data} actions={{ ...actions.scoped, check: actions.typography.check }} />;

    return <TypographyRulesBlock
        rules={data.corpus?.typographyRules}
        save={actions.typography.save}
        check={actions.typography.check}
        busy={data.busy} />;
}
