import type { MessageId } from "../../messages.js";

export const draftConflictMessages = {
    "draftConflict.banner": "Outra sessão do Warplyn alterou este artigo. Seu rascunho local foi mantido; compare-o antes de continuar.",
    "draftConflict.compare": "Compare e resolva",
    "draftConflict.heading": "Resolver conflito de rascunho",
    "draftConflict.description": "Seu rascunho local retido é mostrado ao lado do conteúdo salvo mais recente. Nada é substituído até que você escolha.",
    "draftConflict.cancel": "Cancelar",
    "draftConflict.keepMine": "Manter meu rascunho",
    "draftConflict.useDraft": "Usar o rascunho mais recente",
    "draftConflict.useRevision": "Usar a versão salva mais recente",
    "draftConflict.confirmDraft": "Substituir o texto local retido pelo último rascunho persistente?",
    "draftConflict.confirmRevision": "Descartar o rascunho persistente e substituir o texto local retido pela versão salva mais recente?",
} satisfies Partial<Record<MessageId, string>>;
