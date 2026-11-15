import type { MessageId } from "../../messages.js";

export const settings2 = {
    "settings.specificModelHint": "Pozostaw Użyj modelu domyślnego, chyba że zadanie wymaga innego modelu.",
    "settings.publishingProfile": "Profil limitu znaków",
    "settings.publishingProfileHint": "Pokazuje, kiedy tekst zbliża się do tej długości. Limit jest wskazówką i nigdy nie blokuje kopiowania.",
    "settings.publishingProfileNote": "Ten profil jest używany przez pasek stanu artykułu i opcję kopiowania. Edytowalne własne profile rozwiną te podstawy.",
    "settings.profileCharacters": "{label}: {count} znaków",
    "settings.customProfileName": "Nazwa własnego profilu",
    "settings.customProfileNameHint": "Lokalna nazwa własnego limitu publikacji.",
    "settings.customProfileLimit": "Własny limit znaków",
    "settings.customProfileLimitHint": "Nieujemny limit orientacyjny. Nigdy nie blokuje kopiowania.",
    "settings.customProfileInvalid": "Wpisz nazwę i nieujemny całkowity limit znaków.",
    "settings.saveCustomProfile": "Zapisz profil",
    "settings.customProfiles": "Własne profile",
    "settings.customProfilesHint": "Dodaj tyle lokalnych profili limitów znaków, ile potrzebujesz.",
    "settings.addCustomProfile": "Dodaj profil",
    "settings.remove": "Usuń",
    "settings.removeCustomProfile": "Usuń {name}",
    "settings.removeCustomProfileTitle": "Usunąć własny profil?",
    "settings.removeCustomProfileDescription": "Usunąć <profile>{name}</profile> z lokalnych profili publikacji?",
    "settings.removeCustomDefaultDescription": "Usunąć <profile>{name}</profile>? Domyślny profil publikacji wróci do wartości Domyślny.",
    "settings.backupFolder": "Folder kopii zapasowych",
    "settings.backupFolderHint": "Wybierz lokalny folder na kopie zapasowe. Warplyn może tam zapisywać dopiero po jego wybraniu.",
    "settings.chooseBackupFolder": "Wybierz folder…",
    "settings.revealBackupFolder": "Pokaż folder",
    "settings.managedCredential": "Zarządzane poświadczenie",
    "settings.backupFolderSelected": "Używany: {folderName}",
    "settings.backupFolderFailed": "Nie udało się wybrać tego folderu. Spróbuj ponownie.",
    "settings.backupFolderRequired": "Najpierw wybierz folder kopii zapasowych.",
    "settings.backupFolderPermissionDenied": "Warplyn nie ma dostępu do tego folderu. Wybierz go ponownie i zezwól na dostęp.",
    "settings.backupFolderUnsupported": "Ta przeglądarka nie pozwala wybrać folderu kopii zapasowych.",
    "settings.automaticBackups": "Automatyczne kopie zapasowe",
    "settings.automaticBackupsHint": (
        "Po włączeniu tworzy kopię zapasową krótko po uruchomieniu i co 24 godziny od tej operacji, gdy Warpl" +
        "yn pozostaje otwarty. Ręczne kopie nigdy nie są usuwane automatycznie."
    ),
    "settings.automaticBackupFailed": (
        "Automatyczna kopia zapasowa nie powiodła się. Sprawdź folder w sekcji Dane i kopie zapasowe, a nastę" +
        "pnie utwórz ręczną kopię. Artykuły nie uległy zmianie."
    ),
    "settings.off": "Wyłączone",
    "settings.daily": "Codziennie",
    "settings.retention": "Przechowywanie automatycznych kopii",
    "settings.retentionHint": "Określa liczbę automatycznych kopii zachowywanych przez Warplyn. Ręczne kopie nigdy nie są usuwane automatycznie.",
    "settings.keepBackups": "Zachowaj {count} kopii zapasowych",
    "settings.keepAllBackups": "Zachowaj wszystkie kopie",
    "settings.createBackup": "Utwórz kopię",
    "settings.createBackupHint": (
        "Tworzy kopię artykułów, zapisanych wersji, ustawień, umiejętności autora i ich historii. Kopie w prz" +
        "eglądarce obsługują pliki do 100 MB i 500 MB łącznie. Klucze API są wykluczone."
    ),
    "settings.backupCreating": "Tworzenie kopii zapasowej…",
    "settings.backupCreated": "Utworzono {name}",
    "settings.backupCreateFailed": (
        "Nie udało się utworzyć kopii. Sprawdź folder i limity rozmiaru w przeglądarce, a następnie spróbuj p" +
        "onownie. Sesja edycji nie uległa zmianie."
    ),
    "settings.backupCreateUnavailable": "Kopie zapasowe są niedostępne w tej sesji przeglądarki.",
    "settings.restoreBackup": "Przywróć kopię",
    "settings.restoreBackupHint": (
        "Wybierz kopię z wybranego folderu. Warplyn sprawdza pliki, zachowuje kopię odzyskiwania i przywraca " +
        "artykuły, zapisane wersje, ustawienia i umiejętności. Istniejące połączenia AI pozostają lokalne. Mo" +
        "żna przywrócić odwołania do zmiennych środowiskowych; klucze API i wartości zmiennych nigdy nie są i" +
        "mportowane. Starsze kopie samej bazy danych zachowują obecne umiejętności."
    ),
    "settings.restoreBackupFailed": (
        "Nie udało się przywrócić tej kopii. Sprawdź pliki i limity przeglądarki lub wybierz inną kopię. Akty" +
        "wne dane nie uległy zmianie."
    ),
    "settings.restoreBackupUnavailable": "Nie można przywrócić tej kopii.",
    "settings.chooseBackup": "Wybierz kopię",
    "settings.restoreBackupConfirm": "Przywrócić {name}? Warplyn zastąpi aktywne dane lokalne i załaduje się ponownie.",
    "settings.deleteData": "Usuń dane lokalne",
    "settings.deleteLocalData": "Usuń wszystkie dane lokalne",
    "settings.deleteLocalDataHint": (
        "Trwale usuwa artykuły, punkty kontrolne szkiców, zapisane wersje, historię asystenta, dane stylu, us" +
        "tawienia i lokalne kopie zapasowe z folderu danych Warplyn. W oknie potwierdzenia możesz najpierw ut" +
        "worzyć zweryfikowaną kopię."
    ),
    "settings.deleteLocalDataFailed": "Nie udało się usunąć danych lokalnych. Nie zgłoszono pełnego usunięcia.",
    "settings.loading": "Wczytywanie ustawień…",
    "settings.privacyAndDiagnostics": "Prywatność i diagnostyka",
    "settings.telemetry": "Udostępniaj dane diagnostyczne i dane użycia",
    "settings.telemetryHint": (
        "Pomóż ulepszać Warplyn, wysyłając do PostHog pseudonimowe zdarzenia niezawodności i użycia. Tekst ar" +
        "tykułów, prompty, odpowiedzi AI i klucze API nigdy nie są uwzględniane."
    ),
    "settings.telemetryDisclosure": (
        "Telemetria jest domyślnie wyłączona. Włącz udostępnianie, aby pomóc nam zrozumieć Twoje doświadczeni" +
        "a i ulepszać Warplyn. Możesz je wyłączyć w każdej chwili; zatrzyma to dalsze zbieranie danych, ale n" +
        "ie wycofa już wysłanych."
    ),
    "settings.telemetryDetails": "Szczegóły telemetrii",
    "settings.telemetryIdentifier": "Identyfikator telemetrii",
    "settings.telemetryIdentifierHint": (
        "Podaj ten identyfikator przy żądaniu usunięcia danych. Skopiuj go przed wyłączeniem telemetrii, poni" +
        "eważ wyłączenie go usuwa."
    ),
    "settings.copyTelemetryIdentifier": "Kopiuj ID",
    "settings.telemetryIdentifierCopied": "Skopiowano identyfikator telemetrii.",
    "settings.telemetrySaveFailed": "Nie udało się zapisać tego wyboru. Poprzednie ustawienie pozostaje bez zmian. Spróbuj ponownie.",
    "settings.telemetryUnavailable": "Telemetria jest dostępna tylko w skonfigurowanej, spakowanej aplikacji.",
    "settings.saved": "Zapisano",
    "settings.loadingFailed": "Nie udało się wczytać Ustawień. Zapisane ustawienia nie uległy zmianie. Odśwież i spróbuj ponownie.",
    "settings.saving": "Zapisywanie…",
    "settings.saveFailed": "Nie udało się zapisać Ustawień. Poprzednie ustawienia nie uległy zmianie. Spróbuj ponownie.",
    "settings.modelSaveFailed": "Nie udało się zapisać preferencji modeli. Poprzednie ustawienia nie uległy zmianie. Spróbuj ponownie.",
    "settings.backupSaveFailed": "Nie udało się zapisać ustawień kopii zapasowych. Poprzednie ustawienia nie uległy zmianie. Spróbuj ponownie.",
    "settings.updates": "Aktualizacje",
    "settings.updateNetworkAccess": "Zezwól na dostęp do sieci w celu aktualizacji",
    "settings.updateNetworkAccessHint": (
        "Pozwala Warplyn kontaktować się z GitHub w celu pobrania publicznych informacji o wydaniach i wybran" +
        "ych aktualizacji. Nigdy nie wysyła treści artykułów, informacji o koncie, identyfikatorów urządzenia" +
        " ani analityki."
    ),
} satisfies Partial<Record<MessageId, string>>;
