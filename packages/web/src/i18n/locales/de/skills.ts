import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.recovery.title": "Wiederherstellung eigener Skills",
    "skills.recovery.message": (
        "Betroffene eigene Skills sind nicht verfügbar. Ihre Dateien und ihr Verlauf bleiben erhalten. Behebe " +
        "die Konflikte in den Skill-Dateien oder stelle eine Sicherung wieder her und versuche die " +
        "Wiederherstellung erneut. Artikel und integrierte Skills bleiben verfügbar."
    ),
    "skills.recovery.retry": "Wiederherstellung erneut versuchen",
    "skills.recovery.review": "Wiederherstellung prüfen",
    "skills.recovery.ready": "Eigene Skills sind verfügbar.",
    "skills.recovery.loadFailed": "Die Skill-Wiederherstellung konnte nicht geprüft werden. Versuche es erneut oder öffne Warplyn neu.",
    "skills.recovery.retryFailed": (
        "Die Skill-Wiederherstellung konnte nicht erneut ausgeführt werden. Deine Dateien bleiben erhalten. " +
        "Versuche es erneut oder stelle eine Sicherung wieder her."
    ),
    "skills.loadFailed": "Fähigkeiten konnten nicht geladen werden. Versuchen Sie es erneut oder öffnen Sie die KI-Einstellungen noch einmal.",
    "skills.validation.invalid_frontmatter": (
        "Der SKILL.md-Datei dieser Fähigkeit fehlt ein gültiger Metadatenblock am Anfang. Fügen Sie ID, Name," +
        " Beschreibung und Version hinzu und versuchen Sie es erneut."
    ),
    "skills.validation.invalid_instructions": (
        "Fügen Sie die Markdown-Anweisungen hinzu, denen diese Fähigkeit folgen soll. Halten Sie die unterstützte Größe" +
        " ein."
    ),
    "skills.validation.invalid_metadata": (
        "Prüfen Sie die Angaben dieser Fähigkeit. Verwenden Sie eine eindeutige ID in Kleinbuchstaben, einen " +
        "klaren Namen und eine Beschreibung, eine numerische Version sowie unterstützte Geltungsbereichs- und" +
        " Ausführungseinstellungen."
    ),
    "skills.validation.invalid_reference": (
        "Diese Fähigkeit nennt eine Referenz, die Warplyn nicht verwenden kann. Bewahren Sie Referenzen als M" +
        "arkdown-Dateien in ihrem Ordner references auf und halten Sie die unterstützte Größe ein."
    ),
    "skills.validation.package_too_large": (
        "Dieses Fähigkeitspaket ist zum Laden durch Warplyn zu groß. Kürzen Sie seine Anweisungen oder Referenzdateien " +
        "und versuchen Sie es erneut."
    ),
    "skills.validation.unsafe_package": (
        "Warplyn kann dieses Fähigkeitspaket nicht verwenden, weil es eine nicht unterstützte Datei oder eine" +
        "n nicht unterstützten Speicherort enthält. Behalten Sie nur SKILL.md und deklarierte Markdown-Refere" +
        "nzen."
    ),
} satisfies Partial<Record<MessageId, string>>;
