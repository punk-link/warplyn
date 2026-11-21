import { useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ArticleEditorContents } from "./ArticleEditorContents.js";
import { articleEditorNodes, articleEditorTheme } from "./article-editor-config.js";
import type { AssistantSelectionSnapshot } from "./ArticleEditorPlugins.js";
import { ArticleSpellingPlugin } from "./ArticleSpellingPlugin.js";
import { isSpellingLanguage } from "@skladno/shared";
import { EditorNotesProvider } from "./EditorNotesProvider.js";
import type { EditorNotesBinding } from "./editor-notes-binding.js";


export { articleEditorNodes, articleEditorTheme } from "./article-editor-config.js";


export function ArticleRichEditor({ articleId, content, setContent, onSelectionChange, assistantSelection, language, notes }: {
    articleId: string; content: string; setContent: (value: string) => void;
    onSelectionChange?: (value: AssistantSelectionSnapshot | undefined) => void;
    assistantSelection?: string; language?: string; notes?: EditorNotesBinding;
}) {
    const config = useMemo(() => ({
        namespace: `skladno-article-${articleId}`,
        nodes: articleEditorNodes,
        theme: articleEditorTheme,
        onError: (error: Error) => {
            throw error;
        }
    }),
    [articleId]
    );

    return <LexicalComposer key={articleId} initialConfig={config}>
        <EditorNotesProvider binding={notes} content={content}>
            <ArticleSpellingPlugin language={language} />
            <div data-article-editor-shell className="flex h-full min-h-0 flex-col">
                <ArticleEditorContents
                    content={content}
                    onChange={setContent}
                    onSelectionChange={onSelectionChange}
                    assistantSelection={assistantSelection}
                    language={isSpellingLanguage(language) ? language : undefined} />
            </div>
        </EditorNotesProvider>
    </LexicalComposer>;
}
