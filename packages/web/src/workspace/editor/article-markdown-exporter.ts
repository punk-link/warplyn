import { $getRoot, $isParagraphNode, type NodeKey } from "lexical";
import type { Transformer } from "@lexical/markdown";
import { articleMarkdownTransformers, exportArticleMarkdown } from "./markdown.js";


/** Reuse unchanged top-level blocks while Lexical still owns Markdown formatting. */
export function createArticleMarkdownExporter() {
    const blocks = new Map<NodeKey, string>();
    const transformers = articleMarkdownTransformers.map((transformer): Transformer => {
        if ((transformer.type !== "element" && transformer.type !== "multiline-element") || !transformer.export)
            return transformer;

        const exportNode = transformer.export;
        const exportCached: typeof exportNode = (node, traverseChildren, selection) => {
            const topLevel = node.getParent()?.getType() === "root";
            const cached = topLevel ? blocks.get(node.getKey()) : undefined;
            if (cached !== undefined)
                return cached;

            // Plain paragraphs use Lexical's normal child exporter.
            const result = topLevel && $isParagraphNode(node) ? traverseChildren(node) : exportNode(node, traverseChildren, selection);
            if (topLevel && result !== null)
                blocks.set(node.getKey(), result);

            return result;
        };
        return { ...transformer, export: exportCached };
    });

    return {
        invalidate: (dirtyElements: ReadonlyMap<NodeKey, boolean>) => {
            // Restoring an EditorState (including undo) dirties only the root.
            if (dirtyElements.size === 1 && dirtyElements.has("root")) {
                blocks.clear();
                return;
            }

            for (const key of dirtyElements.keys())
                blocks.delete(key);
        },
        export: () => {
            const currentKeys = new Set($getRoot().getChildrenKeys());
            for (const key of blocks.keys()) {
                if (!currentKeys.has(key))
                    blocks.delete(key);
            }

            return exportArticleMarkdown(transformers);
        },
    };
}
