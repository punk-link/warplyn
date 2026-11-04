import { createContext } from "react";

export const ArticleResponseSeenContext = createContext<(articleId: string, response: string) => void>(() => undefined);
