import type { MessageId } from "../../messages.js";

export const quickStartMessages = {
    "quickStart.title": "Bem-vindo ao Warplyn",
    "quickStart.close": "Fechar início rápido",
    "quickStart.write.title": "Escreva um artigo.",
    "quickStart.write.description": (
        "Crie ou abra um artigo no painel esquerdo e escreva na área de trabalho central. Warplyn mantém o " +
        "estado de recuperação do rascunho e o histórico de versões salvas."
    ),
    "quickStart.assistant.title": "Pergunte ao assistente.",
    "quickStart.assistant.description": (
        "Use o painel direito para edições, revisões, traduções e verificações de fatos. As alterações de IA " +
        "permanecem propostas até que você as aceite, e os apontamentos permanecem consultivos."
    ),
    "quickStart.modelKey.title": "Adicione uma chave de modelo.",
    "quickStart.modelKey.description": (
        "Uma chave de modelo é uma chave de API de um provedor de IA. No aplicativo de desktop, escolha um " +
        "provedor, cole a chave, armazene-a no armazenamento de credenciais do sistema operacional, atualize " +
        "os modelos e escolha um modelo padrão. Warplyn nunca mais exibe uma chave armazenada."
    ),
    "quickStart.skip": "Pular início rápido",
    "quickStart.addModelKey": "Adicionar chave de modelo",
    "quickStart.startWriting": "Comece a escrever",
} satisfies Partial<Record<MessageId, string>>;
