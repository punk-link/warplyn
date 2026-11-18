import type { MessageId } from "../../messages.js";

export const skillsMessages = {
    "skills.loadFailed": "Fähigkeiten konnten nicht geladen werden. Versuchen Sie es erneut oder öffnen Sie die KI-Einstellungen noch einmal.",
    "skills.validation.invalid_frontmatter": (
        "Der SKILL.md-Datei dieser Fähigkeit fehlt ein gültiger Metadatenblock am Anfang. Fügen Sie ID, Name, " +
        "Beschreibung und Version hinzu und versuchen Sie es erneut."
    ),
    "skills.validation.invalid_metadata": (
        "Prüfen Sie die Angaben dieser Fähigkeit. Verwenden Sie eine eindeutige ID in Kleinbuchstaben, einen " +
        "klaren Namen und eine Beschreibung, eine numerische Version sowie unterstützte Geltungsbereichs- und " +
        "Ausführungseinstellungen."
    ),
    "skills.validation.invalid_instructions": (
        "Fügen Sie die Markdown-Anweisungen hinzu, denen diese Fähigkeit folgen soll. Halten Sie die " +
        "unterstützte Größe ein."
    ),
    "skills.validation.invalid_reference": (
        "Diese Fähigkeit nennt eine Referenz, die Warplyn nicht verwenden kann. Bewahren Sie Referenzen als " +
        "Markdown-Dateien in ihrem Ordner references auf und halten Sie die unterstützte Größe ein."
    ),
    "skills.validation.unsafe_package": (
        "Warplyn kann dieses Fähigkeitspaket nicht verwenden, weil es eine nicht unterstützte Datei oder " +
        "einen nicht unterstützten Speicherort enthält. Behalten Sie nur SKILL.md und deklarierte " +
        "Markdown-Referenzen."
    ),
    "skills.validation.package_too_large": (
        "Dieses Fähigkeitspaket ist zum Laden durch Warplyn zu groß. Kürzen Sie seine Anweisungen oder " +
        "Referenzdateien und versuchen Sie es erneut."
    ),
} satisfies Partial<Record<MessageId, string>>;
