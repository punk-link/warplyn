import type { MessageId } from "../../messages.js";


export const draftSaveMessages = {
    "draftSave.failure": "Não foi possível salvar. Seu rascunho completo ainda pode ser editado.",
    "draftSave.retry": "Tentar novamente",
} satisfies Partial<Record<MessageId, string>>;
