import type { useEditorialWorkspace } from "./state/use-editorial-workspace.js";
import { ArticleResponseSeenContext } from "./state/article-response-seen-context.js";
import { WorkspaceScreen } from "./components/WorkspaceScreen.js";
import { ArticleFileDialogs } from "./article-files/ArticleFileDialogs.js";
import { RestoreRevisionDialog } from "./components/RestoreRevisionDialog.js";
import { DraftConflictDialog } from "./components/DraftConflictDialog.js";


export function EditorialWorkspace({ model }: { model: ReturnType<typeof useEditorialWorkspace> }) {
    const { content, actions, environment, selection, markResponseSeen } = model;
    const { workspace, revisions, articleFiles } = content;
    return <ArticleResponseSeenContext.Provider value={markResponseSeen}>
        <WorkspaceScreen
            content={content}
            actions={actions}
            environment={{ ...environment, overlays: <>
                <ArticleFileDialogs state={articleFiles.dialogs} />
                <RestoreRevisionDialog
                    candidate={revisions.candidate}
                    hasUncommittedChanges={workspace.hasUncommittedChanges}
                    close={() => revisions.setCandidate(undefined)}
                    restore={revisions.restore} />
                <DraftConflictDialog
                    conflict={workspace.conflict}
                    open={Boolean(workspace.comparisonArticleId)}
                    close={workspace.closeComparison}
                    resolve={workspace.resolveConflict} />
            </> }}
            selection={selection} />
    </ArticleResponseSeenContext.Provider>;
}
