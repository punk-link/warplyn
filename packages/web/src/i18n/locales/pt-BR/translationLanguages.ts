import type { MessageId } from "../../messages.js";


export const translationLanguagesMessages = {
    "translationLanguages.add": "Adicionar",
    "translationLanguages.entryHint": (
        "Insira um nome ou variante regional, como polonês ou espanhol, Argentina. Códigos como ja ou es-AR t" +
        "ambém funcionam."
    ),
    "translationLanguages.existing": "Tradução disponível",
    "translationLanguages.hint": "A qualidade da tradução depende do seu modelo e idioma de destino.",
    "translationLanguages.placeholder": "Digite um nome ou código de idioma",
    "translationLanguages.remove": "Remover {language}",
    "translationLanguages.search": "Idioma ou variante regional",
} satisfies Partial<Record<MessageId, string>>;
