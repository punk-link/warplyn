import type { MessageId } from "../../messages.js";


export const settingsUpdatesMessages = {
    "settings.automaticUpdates": "Automatycznie sprawdzaj aktualizacje",
    "settings.automaticUpdatesHint": (
        "Sprawdza GitHub przy uruchomieniu Warplyn, a następnie codziennie, gdy aplikacja pozostaje otwarta. Aktualizac" +
        "je pobierają się tylko po wybraniu Pobierz."
    ),
    "settings.checkNow": "Sprawdź teraz",
    "settings.restartAndUpdate": "Uruchom ponownie i zaktualizuj",
    "settings.updateChanges": "Zmiany w {version}",
    "settings.updateChangesUnavailable": "Szczegóły wydania są niedostępne. Nadal możesz zaktualizować aplikację.",
    "settings.updateNetworkAccess": "Zezwól na dostęp do sieci w celu aktualizacji",
    "settings.updateNetworkAccessHint": (
        "Pozwala Warplyn kontaktować się z GitHub w celu pobrania publicznych informacji o wydaniach i wybran" +
        "ych aktualizacji. Nigdy nie wysyła treści artykułów, informacji o koncie, identyfikatorów urządzenia" +
        " ani analityki."
    ),
    "settings.updateNetworkPermissionDescription": (
        "Warplyn połączy się z api.github.com w celu pobrania publicznych informacji o wydaniach. Nie wyśle t" +
        "reści artykułów, informacji o koncie, identyfikatorów urządzenia ani analityki."
    ),
    "settings.updateNetworkPermissionTitle": "Zezwolić Warplyn na sprawdzanie aktualizacji w GitHub?",
    "settings.updateRecovery": "Odzyskiwanie aktualizacji",
    "settings.updateStatus": "Stan aktualizacji",
    "settings.updateStatusHint": "Obecna wersja: {version}",
    "settings.updateStatusUnavailableHint": "Ustawienia aktualizacji obowiązują, gdy ta wersja obsługuje aktualizacje.",
    "settings.updates": "Aktualizacje",
    "settings.updatesAvailable": "Dostępna jest wersja {version}.",
    "settings.updatesChecking": "Sprawdzanie aktualizacji…",
    "settings.updatesCurrent": "Masz najnowsze wydanie.",
    "settings.updatesError.apply_failed": (
        "Nie udało się przygotować aktualizacji. Spróbuj ponownie lub otwórz Odzyskiwanie aktualizacji, aby u" +
        "zyskać pomoc."
    ),
    "settings.updatesError.discovery_failed": "Nie udało się sprawdzić aktualizacji. Spróbuj ponownie.",
    "settings.updatesError.download_failed": "Nie udało się pobrać aktualizacji. Spróbuj ponownie.",
    "settings.updatesNetworkAccessRequired": "Zezwól na dostęp do sieci, aby sprawdzić aktualizacje.",
    "settings.updatesUnavailable": "Aktualizacje są niedostępne w tej wersji.",
    "settings.viewReleaseNotes": "Zobacz informacje o wydaniu",
    "settings.windowsUpdateDownloadHint": (
        "Pobranie aktualizacji zatwierdza również instalację. Po pobraniu zostanie zastosowana automatycznie " +
        "przy następnym otwarciu Warplyn, także po zwykłym zamknięciu aplikacji."
    ),
} satisfies Partial<Record<MessageId, string>>;
