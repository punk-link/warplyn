import type { MessageId } from "../../messages.js";


export const settingsBackupsMessages = {
    "settings.automaticBackupFailed": (
        "Automatyczna kopia zapasowa nie powiodła się. Sprawdź folder w sekcji Dane i kopie zapasowe, a następnie utwór" +
        "z ręczną kopię. Artykuły nie uległy zmianie."
    ),
    "settings.automaticBackups": "Automatyczne kopie zapasowe",
    "settings.automaticBackupsHint": (
        "Po włączeniu tworzy kopię zapasową krótko po uruchomieniu i co 24 godziny od tej operacji, gdy Warpl" +
        "yn pozostaje otwarty. Ręczne kopie nigdy nie są usuwane automatycznie."
    ),
    "settings.backupAutomation": "Automatyczne kopie zapasowe",
    "settings.backupCreateFailed": (
        "Nie udało się utworzyć kopii. Sprawdź folder i limity rozmiaru w przeglądarce, a następnie spróbuj ponownie. S" +
        "esja edycji nie uległa zmianie."
    ),
    "settings.backupCreateUnavailable": "Kopie zapasowe są niedostępne w tej sesji przeglądarki.",
    "settings.backupCreated": "Utworzono {name}",
    "settings.backupCreating": "Tworzenie kopii zapasowej…",
    "settings.backupFolder": "Folder kopii zapasowych",
    "settings.backupFolderFailed": "Nie udało się wybrać tego folderu. Spróbuj ponownie.",
    "settings.backupFolderHint": "Wybierz lokalny folder na kopie zapasowe. Warplyn może tam zapisywać dopiero po jego wybraniu.",
    "settings.backupFolderPermissionDenied": "Warplyn nie ma dostępu do tego folderu. Wybierz go ponownie i zezwól na dostęp.",
    "settings.backupFolderRequired": "Najpierw wybierz folder kopii zapasowych.",
    "settings.backupFolderSelected": "Używany: {folderName}",
    "settings.backupFolderUnsupported": "Ta przeglądarka nie pozwala wybrać folderu kopii zapasowych.",
    "settings.backupSaveFailed": "Nie udało się zapisać ustawień kopii zapasowych. Poprzednie ustawienia nie uległy zmianie. Spróbuj ponownie.",
    "settings.backupStorage": "Przechowywanie kopii zapasowych",
    "settings.chooseBackup": "Wybierz kopię",
    "settings.chooseBackupFolder": "Wybierz folder…",
    "settings.createBackup": "Utwórz kopię",
    "settings.createBackupHint": (
        "Tworzy kopię artykułów, zapisanych wersji, ustawień, umiejętności autora i ich historii. Kopie w prz" +
        "eglądarce obsługują pliki do 100 MB i 500 MB łącznie. Klucze API są wykluczone."
    ),
    "settings.dataBackups": "Dane i kopie",
    "settings.keepAllBackups": "Zachowaj wszystkie kopie",
    "settings.keepBackups": "Zachowaj {count} kopii zapasowych",
    "settings.restoreBackup": "Przywróć kopię",
    "settings.restoreBackupConfirm": "Przywrócić {name}? Warplyn zastąpi aktywne dane lokalne i załaduje się ponownie.",
    "settings.restoreBackupFailed": (
        "Nie udało się przywrócić tej kopii. Sprawdź pliki i limity przeglądarki lub wybierz inną kopię. Aktywne dane n" +
        "ie uległy zmianie."
    ),
    "settings.restoreBackupHint": (
        "Wybierz kopię z wybranego folderu. Warplyn sprawdza pliki, zachowuje kopię odzyskiwania i przywraca " +
        "artykuły, zapisane wersje, ustawienia i umiejętności. Istniejące połączenia AI pozostają lokalne. Mo" +
        "żna przywrócić odwołania do zmiennych środowiskowych; klucze API i wartości zmiennych nigdy nie są i" +
        "mportowane. Starsze kopie samej bazy danych zachowują obecne umiejętności."
    ),
    "settings.restoreBackupUnavailable": "Nie można przywrócić tej kopii.",
    "settings.retention": "Przechowywanie automatycznych kopii",
    "settings.retentionHint": "Określa liczbę automatycznych kopii zachowywanych przez Warplyn. Ręczne kopie nigdy nie są usuwane automatycznie.",
    "settings.revealBackupFolder": "Pokaż folder",
} satisfies Partial<Record<MessageId, string>>;
