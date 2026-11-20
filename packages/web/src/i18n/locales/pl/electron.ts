import type { MessageId } from "../../messages.js";


export const electronMessages = {
    "electron.articleFiles.docx": "Pliki Word",
    "electron.articleFiles.html": "Pliki HTML",
    "electron.articleFiles.load": "Wczytaj artykuł z pliku",
    "electron.articleFiles.markdown": "Pliki Markdown",
    "electron.articleFiles.rtf": "Pliki Rich Text",
    "electron.articleFiles.save": "Zapisz artykuł do pliku",
    "electron.closeFailed.message": "Zapisano punkt kontrolny szkicu, ale lokalna baza danych nie została prawidłowo zamknięta.",
    "electron.closeFailed.title": "Warplyn nie mógł zakończyć pracy prawidłowo",
    "electron.deleteData.backup": "Utwórz kopię zapasową przed usunięciem",
    "electron.deleteData.cancel": "Anuluj",
    "electron.deleteData.delete": "Usuń wszystkie lokalne dane",
    "electron.deleteData.detail": "Po usunięciu Warplyn zakończy pracę. Jeśli skonfigurowano folder kopii zapasowych, można najpierw utworzyć kopię.",
    "electron.deleteData.message": (
        "Spowoduje to trwałe usunięcie artykułów, punktów kontrolnych szkiców, zapisanych wersji, historii as" +
        "ystenta, danych stylu, ustawień i lokalnych kopii zapasowych z folderu danych Warplyn."
    ),
    "electron.deleteData.title": "Usunąć wszystkie lokalne dane Warplyn?",
    "electron.draftCheckpointFailed.detail": "Wróć do artykułu i spróbuj ponownie albo zakończ bez najnowszych niezapisanych zmian.",
    "electron.draftCheckpointFailed.message": "Warplyn nie mógł zapisać najnowszego punktu kontrolnego szkicu.",
    "electron.draftCheckpointFailed.quit": "Zakończ bez najnowszego punktu kontrolnego",
    "electron.draftCheckpointFailed.return": "Wróć do artykułu",
    "electron.draftCheckpointFailed.title": "Nie udało się zapisać punktu kontrolnego szkicu",
    "electron.restoreBackup.cancel": "Anuluj",
    "electron.restoreBackup.detail": (
        "Warplyn zapisze najnowsze punkty kontrolne szkiców, zachowa kopię odzyskiwania aktywnych danych i ur" +
        "uchomi się ponownie. Istniejące połączenia AI pozostaną lokalne. Odwołania do zmiennych środowiskowy" +
        "ch można przywrócić; klucze API i wartości zmiennych nigdy nie są importowane. Tej operacji nie możn" +
        "a cofnąć w ustawieniach."
    ),
    "electron.restoreBackup.message": "Zastąpi to aktywne lokalne dane Warplyn wybraną kopią zapasową.",
    "electron.restoreBackup.restore": "Przywróć i uruchom ponownie",
    "electron.restoreBackup.title": "Przywrócić tę kopię zapasową?",
    "electron.restoreFailed.message": (
        "Zamknij inne okna Warplyn lub lokalne serwery deweloperskie korzystające z tych danych i spróbuj ponownie. Akt" +
        "ywne dane nie zostały zmienione."
    ),
    "electron.restoreFailed.title": "Nie udało się przywrócić kopii zapasowej",
    "electron.spelling.addWord": "Dodaj do słownika",
    "electron.startFailed.message": "Sprawdź dostępność lokalnego folderu danych i spróbuj ponownie.",
    "electron.startFailed.title": "Nie udało się uruchomić Warplyn",
} satisfies Partial<Record<MessageId, string>>;
