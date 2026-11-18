import type { MessageId } from "../../messages.js";

export const translationLanguagesMessages = {
    "translationLanguages.search": "Idioma ou variante regional",
    "translationLanguages.placeholder": "Digite um nome ou código de idioma",
    "translationLanguages.entryHint": (
        "Insira um nome ou variante regional, como polonês ou espanhol, Argentina. Códigos como ja ou es-AR " +
        "também funcionam."
    ),
    "translationLanguages.hint": "A qualidade da tradução depende do seu modelo e idioma de destino.",
    "translationLanguages.remove": "Remover {language}",
    "translationLanguages.add": "Adicionar",
    "translationLanguages.existing": "Tradução disponível",
} satisfies Partial<Record<MessageId, string>>;
