import { useEffect, useRef, useState } from "react";
import type { ArticleFileFormat, ArticleMarkdownFile } from "@skladno/shared";


type ArticleFileDialog =
    | { kind: "format"; resolve: (format: ArticleFileFormat | null) => void }
    | { kind: "review"; file: ArticleMarkdownFile; resolve: (accepted: boolean) => void };


export function useArticleFileDialogs() {
    const [dialog, setDialog] = useState<ArticleFileDialog>();
    const active = useRef<ArticleFileDialog>();


    function close(): void {
        const current = active.current;
        active.current = undefined;
        setDialog(undefined);
        if (current?.kind === "format")
            current.resolve(null);
        else
            current?.resolve(false);
    }


    useEffect(() => () => {
        if (active.current?.kind === "format")
            active.current.resolve(null);
        else
            active.current?.resolve(false);
    }, []);


    return {
        dialog, close,
        chooseFormat: () => new Promise<ArticleFileFormat | null>((resolve) => {
            active.current = { kind: "format", resolve };
            setDialog(active.current);
        }),
        review: (file: ArticleMarkdownFile) => new Promise<boolean>((resolve) => {
            active.current = { kind: "review", file, resolve };
            setDialog(active.current);
        }),
        confirm: (format: ArticleFileFormat) => {
            const current = active.current;
            active.current = undefined;
            setDialog(undefined);
            
            if (current?.kind === "format")
                current.resolve(format);
            else
                current?.resolve(true);
        },
    };
}
