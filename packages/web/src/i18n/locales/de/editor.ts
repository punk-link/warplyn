import type { MessageId } from "../../messages.js";


export const editorMessages = {
    "editor.addLink": "Link…",
    "editor.added": "Hinzugefügt: ",
    "editor.apply": "Anwenden",
    "editor.articleDraft": "Artikelentwurf",
    "editor.blockQuote": "Zitatblock",
    "editor.blockStyle": "Blockstil",
    "editor.bold": "Fett",
    "editor.bulletedList": "Aufzählungsliste",
    "editor.cancel": "Abbrechen",
    "editor.clipboardFailed": (
        "Einfügen fehlgeschlagen. Erlauben Sie den Zugriff auf die Zwischenablage oder verwenden Sie die Tast" +
        "enkombination zum Einfügen."
    ),
    "editor.codeBlock": "Codeblock",
    "editor.contextMenu": "Bearbeitungsaktionen",
    "editor.editLink": "Link bearbeiten…",
    "editor.formatting": "Artikelformatierung",
    "editor.heading": "Überschrift {level}",
    "editor.inlineCode": "Inline-Code",
    "editor.italic": "Kursiv",
    "editor.link": "Link",
    "editor.linkText": "Linktext",
    "editor.lists": "Listen",
    "editor.moreTextFormatting": "Formatierung",
    "editor.noOriginalText": "Kein Originaltext",
    "editor.noProposedText": "Kein vorgeschlagener Text",
    "editor.numberedList": "Nummerierte Liste",
    "editor.openLink": "Link öffnen: {url}",
    "editor.original": "Original",
    "editor.paragraph": "Absatz",
    "editor.paragraphStyle": "Absatzstil",
    "editor.placeholder": "Schreiben Sie Ihren Artikel…",
    "editor.proposed": "Vorschlag",
    "editor.proposedChange": "Vorgeschlagene Textänderung",
    "editor.removeLink": "Link entfernen",
    "editor.removed": "Entfernt: ",
    "editor.skills": "Fähigkeiten",
    "editor.strikethrough": "Durchgestrichen",
    "editor.url": "URL",
} satisfies Partial<Record<MessageId, string>>;
