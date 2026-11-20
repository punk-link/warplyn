import type { MessageId } from "../../messages.js";


export const publishingMessages = {
    "publishing.characterCount": "{count} znaków",
    "publishing.charactersOverGuidance": "{count} znaków powyżej wskazówki",
    "publishing.charactersRemaining": "Pozostało {count} znaków (wskazówka)",
    "publishing.copyFailed": "Nie udało się skopiować. Spróbuj ponownie.",
    "publishing.default": "Domyślny",
    "publishing.defaultProfile": "Używany jest domyślny profil publikacji.",
    "publishing.linkedInArticle": "Artykuł na LinkedIn",
    "publishing.linkedInPost": "Post na LinkedIn",
    "publishing.markdownCopied": "Skopiowano Markdown.",
    "publishing.noRestrictions": "Bez ograniczeń",
    "publishing.plainTextCopied": "Skopiowano zwykły tekst.",
    "publishing.profileSaveFailed": "Nie udało się zapisać profilu publikacji.",
} satisfies Partial<Record<MessageId, string>>;
