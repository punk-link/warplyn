import type { MessageId } from "../../messages.js";

export const articleMessages = {
    "article.defaultTitle": "Artigo sem título",
    "article.titleGenerationFailed": "Versão salva sem título de artigo",
    "article.titleContextRequired": "Adicione mais detalhes e salve outra versão salva ou renomeie o artigo você mesmo.",
    "article.titleGenerationNextStep": (
        "Renomeie você mesmo o artigo ou verifique o modelo de geração de texto em configurações e salve " +
        "outra versão salva."
    ),
} satisfies Partial<Record<MessageId, string>>;
