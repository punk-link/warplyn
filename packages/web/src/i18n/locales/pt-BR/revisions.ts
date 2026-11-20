import type { MessageId } from "../../messages.js";


export const revisionsMessages = {
    "revisions.acceptedProposal": "Proposta aceita",
    "revisions.articleContent": "Conteúdo do artigo salvo",
    "revisions.assistantEdit": "Edição do assistente",
    "revisions.author": "Versão salva do autor",
    "revisions.characterCount": "{count} caracteres",
    "revisions.count": "{count, plural, =0 {Sem versões salvas} one {# versão salva} other {# versões salvas}}",
    "revisions.current": "Atual",
    "revisions.currentExplanation": "Esta é a versão salva atual.",
    "revisions.currentRevision": "Versão salva Atual",
    "revisions.empty": "Versão salva Vazia",
    "revisions.emptyContent": "Esta Versão salva não possui texto de Artigo salvo.",
    "revisions.heading": "Histórico de versões salvas",
    "revisions.historyNavigation": "Histórico de versões salvas",
    "revisions.inactive": "Inativo",
    "revisions.initial": "Versão salva Inicial",
    "revisions.restore": "Restaurar esta versão salva",
    "revisions.restored": "Versão salva Restaurada",
    "revisions.restoredFromEarlier": "Restaurado de uma versão salva anterior",
    "revisions.restoredTarget": "Versão salva Restaurada #{number}",
    "revisions.restoredTargetDescribed": "Versão salva restaurada #{number}: {description}",
    "revisions.revision": "Versão salva",
    "revisions.saved": "Versão salva",
    "revisions.select": "Selecione uma versão salva",
} satisfies Partial<Record<MessageId, string>>;
