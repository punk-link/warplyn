import { ArticleRichEditor } from "../editor/ArticleRichEditor.js";
import type { AssistantSelectionSnapshot } from "../editor/ArticleEditorPlugins.js";
import type { EditorNotesBinding } from "../editor/editor-notes-binding.js";


export function ArticleEditorView({ articleId, content, setContent, onSelectionChange, assistantSelection, language, notes }: {
    articleId: string;
    content: string;
    setContent: (value: string) => void;
    onSelectionChange?: (value: AssistantSelectionSnapshot | undefined) => void;
    assistantSelection?: string;
    language?: string;
    notes?: EditorNotesBinding;
}) {
    return <ArticleRichEditor
        articleId={articleId}
        content={content}
        setContent={setContent}
        onSelectionChange={onSelectionChange}
        assistantSelection={assistantSelection}
        language={language}
        notes={notes} />;
}
