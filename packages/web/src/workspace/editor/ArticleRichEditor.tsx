import { useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ArticleEditorContents } from "./ArticleEditorContents.js";
import { articleEditorNodes, articleEditorTheme } from "./article-editor-config.js";
import type { AssistantSelectionSnapshot } from "./ArticleEditorPlugins.js";
import { ArticleSpellingPlugin } from "./ArticleSpellingPlugin.js";
import { isSpellingLanguage } from "@skladno/shared";


export { articleEditorNodes, articleEditorTheme } from "./article-editor-config.js";


export function ArticleRichEditor({ articleId, content, setContent, onSelectionChange, assistantSelection, language }: { articleId: string; content: string; setContent: (value: string) => void; onSelectionChange?: (value: AssistantSelectionSnapshot | undefined) => void; assistantSelection?: string; language?: string }) {
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
        <ArticleSpellingPlugin language={language} />
        <div className="flex h-full min-h-0 flex-col">
            <ArticleEditorContents content={content} onChange={setContent} onSelectionChange={onSelectionChange} assistantSelection={assistantSelection} language={isSpellingLanguage(language) ? language : undefined} />
        </div>
    </LexicalComposer>;
}
