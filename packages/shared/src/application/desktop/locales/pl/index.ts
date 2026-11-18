import type { ElectronMessages } from "../../electron-messages.js";

export const pl: ElectronMessages = {
    "electron.spelling.addWord": "Dodaj do słownika",
    "electron.articleFiles.markdown": "Pliki Markdown",
    "electron.articleFiles.html": "Pliki HTML",
    "electron.articleFiles.docx": "Pliki Word",
    "electron.articleFiles.rtf": "Pliki Rich Text",
    "electron.articleFiles.load": "Wczytaj artykuł z pliku",
    "electron.articleFiles.save": "Zapisz artykuł do pliku",
    "electron.draftCheckpointFailed.title": "Nie udało się zapisać punktu kontrolnego szkicu",
    "electron.draftCheckpointFailed.message": "Warplyn nie mógł zapisać najnowszego punktu kontrolnego szkicu.",
    "electron.draftCheckpointFailed.detail": "Wróć do artykułu i spróbuj ponownie albo zakończ bez najnowszych niezapisanych zmian.",
    "electron.draftCheckpointFailed.return": "Wróć do artykułu",
    "electron.draftCheckpointFailed.quit": "Zakończ bez najnowszego punktu kontrolnego",
    "electron.closeFailed.title": "Warplyn nie mógł zakończyć pracy prawidłowo",
    "electron.closeFailed.message": "Zapisano punkt kontrolny szkicu, ale lokalna baza danych nie została prawidłowo zamknięta.",
    "electron.startFailed.title": "Nie udało się uruchomić Warplyn",
    "electron.startFailed.message": "Sprawdź dostępność lokalnego folderu danych i spróbuj ponownie.",
    "electron.deleteData.title": "Usunąć wszystkie lokalne dane Warplyn?",
    "electron.deleteData.message": "Spowoduje to trwałe usunięcie artykułów, punktów kontrolnych szkiców, zapisanych wersji, " +
        "historii asystenta, danych stylu, ustawień i lokalnych kopii zapasowych z folderu danych Warplyn.",
    "electron.deleteData.detail": "Po usunięciu Warplyn zakończy pracę. Jeśli skonfigurowano folder kopii zapasowych, można najpierw utworzyć kopię.",
    "electron.deleteData.backup": "Utwórz kopię zapasową przed usunięciem",
    "electron.deleteData.delete": "Usuń wszystkie lokalne dane",
    "electron.deleteData.cancel": "Anuluj",
    "electron.restoreBackup.title": "Przywrócić tę kopię zapasową?",
    "electron.restoreBackup.message": "Zastąpi to aktywne lokalne dane Warplyn wybraną kopią zapasową.",
    "electron.restoreBackup.detail": "Warplyn zapisze najnowsze punkty kontrolne szkiców, zachowa kopię odzyskiwania aktywnych danych " +
        "i uruchomi się ponownie. Istniejące połączenia AI pozostaną lokalne. Odwołania do zmiennych środowiskowych można przywrócić; " +
        "klucze API i wartości zmiennych nigdy nie są importowane. Tej operacji nie można cofnąć w ustawieniach.",
    "electron.restoreBackup.restore": "Przywróć i uruchom ponownie",
    "electron.restoreBackup.cancel": "Anuluj",
    "electron.restoreFailed.title": "Nie udało się przywrócić kopii zapasowej",
    "electron.restoreFailed.message": "Zamknij inne okna Warplyn lub lokalne serwery deweloperskie korzystające z tych danych " +
        "i spróbuj ponownie. Aktywne dane nie zostały zmienione.",
};
