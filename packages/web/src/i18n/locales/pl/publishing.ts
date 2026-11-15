import type { MessageId } from "../../messages.js";

export const publishing = {
    "publishing.defaultProfile": "Używany jest domyślny profil publikacji.",
    "publishing.charactersRemaining": "Pozostało {count} znaków (wskazówka)",
    "publishing.charactersOverGuidance": "{count} znaków powyżej wskazówki",
    "publishing.markdownCopied": "Skopiowano Markdown.",
    "publishing.plainTextCopied": "Skopiowano zwykły tekst.",
    "publishing.copyFailed": "Nie udało się skopiować. Spróbuj ponownie.",
    "publishing.profileSaveFailed": "Nie udało się zapisać profilu publikacji.",
    "publishing.default": "Domyślny",
    "publishing.linkedInPost": "Post na LinkedIn",
    "publishing.linkedInArticle": "Artykuł na LinkedIn",
    "publishing.noRestrictions": "Bez ograniczeń",
    "publishing.characterCount": "{count} znaków",
} satisfies Partial<Record<MessageId, string>>;
