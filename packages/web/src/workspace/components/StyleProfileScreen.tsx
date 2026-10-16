import type { GeneralSettings } from "@skladno/shared";
import { useLayoutEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { settingsFocusAreas, useFocusAreaNavigation } from "../../ui/focus-area-navigation.js";
import type { ArticleWorkspaceState } from "../state/article-workspace-state.js";
import type { ArticleRevisionsState } from "../state/article-revisions-state.js";
import type { EditorialProposalState } from "../state/editorial-proposal-state.js";
import type { StyleCorpusState } from "../state/style-corpus-state.js";
import { StyleProfileView } from "../views/StyleProfileView.js";
import { StyleProfileNavigation } from "./StyleProfileNavigation.js";
import type { StyleProfileSection } from "../style-profile-sections.js";


interface StyleProfileScreenContent {
    workspace: ArticleWorkspaceState;
    editorial: EditorialProposalState;
    revisions: ArticleRevisionsState;
    corpus: StyleCorpusState;
    generalSettings: GeneralSettings;
    requestActive: boolean;
}


export function StyleProfileScreen({ content, back, openProposal }: {
    content: StyleProfileScreenContent;
    back: () => void;
    openProposal: () => void;
}) {
    const { workspace, editorial, revisions, corpus, generalSettings, requestActive } = content;
    const article = workspace.selectedArticle;
    const intl = useIntl();
    const focusAreas = useFocusAreaNavigation(settingsFocusAreas);
    const [section, setSection] = useState<StyleProfileSection>("profile");
    const sectionContent = useRef<HTMLElement>(null);
    useLayoutEffect(() => {
        if (sectionContent.current)
            sectionContent.current.scrollTop = 0;
    }, [section]);

    return <main
        ref={focusAreas.ref}
        onFocusCapture={focusAreas.onFocusCapture}
        onKeyDownCapture={focusAreas.onKeyDownCapture}
        className="fixed inset-0 flex flex-col overflow-clip bg-surface text-ink md:flex-row">
        <StyleProfileNavigation section={section} setSection={setSection} back={back} />
        <section
            ref={sectionContent}
            data-focus-area="settings-content"
            data-focus-area-native-tab
            tabIndex={-1}
            aria-label={intl.formatMessage({ id: "views.styleProfile" })}
            className={"min-h-0 min-w-0 flex-1 overflow-y-auto p-4 md:p-8 " +
                "[scrollbar-color:var(--color-border-strong)_transparent] [scrollbar-width:thin] " +
                "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-button]:hidden " +
                "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-strong"}>
            <StyleProfileView data={{
                section,
                corpus: corpus.corpus,
                findings: editorial.styleReview,
                findingsStale: editorial.styleReviewStale,
                articleId: article?.id,
                language: article?.language,
                revisions: revisions.revisions,
                generalSettings,
                typographyStatus: {
                    busy: editorial.state === "streaming" || requestActive,
                    message: editorial.message,
                    hasProposal: Boolean(editorial.review?.changes.length),
                },
            }} actions={{
                add: corpus.add,
                remove: corpus.remove,
                setIncluded: corpus.setIncluded,
                setRules: corpus.setRules,
                rebuild: corpus.rebuild,
                getArticleRules: corpus.getArticleRules,
                setArticleRules: corpus.setArticleRules,
                snapshotArticleRevision: corpus.snapshotArticleRevision,
                scopedTypography: { save: corpus.setTypographyConfiguration, getArticle: corpus.getArticleTypography },
                typography: { save: corpus.setTypographyRules, check: editorial.checkTypography, openProposal },
            }} />
        </section>
    </main>;
}
