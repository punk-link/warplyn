import type { MessageId } from "../../messages.js";


export const notesMessages = {
    "notes.add": "Dodaj notatkę redakcyjną…",
    "notes.count": "Notatki redakcyjne{separator}{count}",
    "notes.detached": "Wymaga ponownego przypisania",
    "notes.edit": "Edytuj notatkę…",
    "notes.empty": "Brak notatek redakcyjnych.",
    "notes.failed": "Nie udało się zmienić notatki. Zachowaj wskazówki, otwórz artykuł ponownie i spróbuj jeszcze raz.",
    "notes.guidance": "Wskazówki dla Asystenta",
    "notes.help": "Dołączone notatki kierują pracą Asystenta nad fragmentami. Są przechowywane oddzielnie od tekstu artykułu.",
    "notes.included": "Notatki dołączone do tego żądania",
    "notes.marker": "Notatka redakcyjna {number}",
    "notes.markers": "Notatki redakcyjne {numbers}",
    "notes.reattach": "Dołącz do zaznaczonego tekstu",
    "notes.reattachHelp": "Zaznacz nowy fragment w edytorze, a następnie otwórz ponownie tę notatkę, aby ją dołączyć.",
    "notes.remove": "Usuń notatkę",
    "notes.save": "Zapisz notatkę",
    "notes.select": "Zaznacz tekst, aby dołączyć notatkę.",
    "notes.title": "Notatki redakcyjne",
} satisfies Partial<Record<MessageId, string>>;
