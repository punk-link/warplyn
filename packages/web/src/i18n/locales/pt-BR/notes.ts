import type { MessageId } from "../../messages.js";


export const notesMessages = {
    "notes.add": "Adicionar nota editorial…",
    "notes.count": "Notas editoriais{separator}{count}",
    "notes.detached": "Precisa ser anexada novamente",
    "notes.edit": "Editar nota…",
    "notes.empty": "Ainda não há notas editoriais.",
    "notes.failed": "Não foi possível atualizar a nota. Preserve suas orientações, reabra o artigo e tente novamente.",
    "notes.guidance": "Orientações para o Assistente",
    "notes.help": "As notas anexadas orientam o Assistente ao trabalhar nos trechos. Elas ficam separadas do texto do artigo.",
    "notes.included": "Notas que acompanham esta solicitação",
    "notes.marker": "Nota editorial {number}",
    "notes.markers": "Notas editoriais {numbers}",
    "notes.reattach": "Anexar ao texto selecionado",
    "notes.reattachHelp": "Selecione o novo trecho no editor e reabra esta nota para anexá-la.",
    "notes.remove": "Remover nota",
    "notes.save": "Salvar nota",
    "notes.select": "Selecione o texto para anexar uma nota.",
    "notes.title": "Notas editoriais",
} satisfies Partial<Record<MessageId, string>>;
