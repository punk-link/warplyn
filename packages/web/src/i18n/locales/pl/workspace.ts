import type { MessageId } from "../../messages.js";

export const workspace = {
    "workspace.loadingArticles": "Wczytywanie lokalnych artykułów…",
    "workspace.serviceUnavailable": "Usługa lokalna jest niedostępna. Uruchom ją i spróbuj ponownie.",
    "workspace.aiConnectionRequired": "Pisanie lokalne jest dostępne. Skonfiguruj model, aby użyć asystenta.",
    "workspace.addModelKey": "Dodaj klucz modelu",
    "workspace.aiConnectionCapabilities": (
        "Nadal możesz pisać, zapisywać, porządkować i kopiować artykuły oraz sprawdzać typografię lokalnie. Ż" +
        "ądania asystenta, tłumaczenia, weryfikacja faktów i pełne przeglądy stylu wymagają skonfigurowanego " +
        "połączenia z modelem, w tym obsługiwanego modelu lokalnego."
    ),
    "workspace.saveFailed": "Nie udało się zapisać tego szkicu. Ostatnie zmiany nadal są w edytorze. Spróbuj zapisać ponownie.",
    "workspace.revisionHistoryFailed": "Nie udało się wczytać historii wersji. Artykuł nie uległ zmianie. Odśwież i spróbuj ponownie.",
    "workspace.createArticleFailed": "Nie udało się utworzyć artykułu. Spróbuj ponownie.",
    "workspace.updateArticleFailed": "Nie udało się zaktualizować artykułu. Ostatnie zmiany nadal są w edytorze. Spróbuj ponownie.",
    "workspace.renameArticleFailed": "Nie udało się zmienić tytułu artykułu. Poprzedni tytuł jest nadal zapisany. Spróbuj ponownie.",
    "workspace.deleteArticleFailed": "Nie udało się usunąć artykułu. Nadal jest dostępny. Spróbuj ponownie.",
    "workspace.restoreRevisionFailed": "Nie udało się przywrócić wersji. Artykuł nie uległ zmianie. Spróbuj ponownie.",
    "workspace.styleCorpusLoadFailed": "Nie udało się wczytać Profilu stylu. Odśwież i spróbuj ponownie.",
    "workspace.styleCorpusAddFailed": "Nie udało się dodać tekstu do Profilu stylu. Profil nie uległ zmianie. Spróbuj ponownie.",
    "workspace.styleCorpusRemoveFailed": "Nie udało się usunąć tekstu z Profilu stylu. Profil nie uległ zmianie. Spróbuj ponownie.",
    "workspace.styleCorpusUpdateFailed": "Nie udało się zaktualizować Profilu stylu. Poprzedni profil jest nadal zapisany. Spróbuj ponownie.",
    "workspace.styleCorpusRebuildFailed": "Nie udało się przebudować Profilu stylu. Poprzedni profil jest nadal dostępny. Spróbuj ponownie.",
    "workspace.styleRulesLoadFailed": "Nie udało się wczytać reguł Profilu stylu. Odśwież i spróbuj ponownie.",
    "workspace.styleRulesSaveFailed": "Nie udało się zapisać reguł Profilu stylu. Poprzednie reguły są nadal zapisane. Spróbuj ponownie.",
    "workspace.styleCorpusSnapshotFailed": "Nie udało się dodać wersji do Profilu stylu. Profil nie uległ zmianie. Spróbuj ponownie.",
    "workspace.resolveFindingFailed": "Nie udało się zaktualizować uwagi. Artykuł nie uległ zmianie. Spróbuj ponownie.",
    "workspace.createTranslationFailed": "Nie udało się utworzyć artykułu z tłumaczeniem. Oryginalny artykuł nie uległ zmianie. Spróbuj ponownie.",
    "workspace.acceptProposalFailed": "Nie udało się zaakceptować propozycji. Artykuł nie uległ zmianie. Spróbuj ponownie.",
    "workspace.tabs.write": "Pisz",
    "workspace.tabs.proposal": "Propozycje",
    "workspace.tabs.revisions": "Wersje",
    "workspace.tabs.factCheck": "Fakty",
    "workspace.tabs.styleProfile": "Styl",
    "workspace.tabs.translations": "Tłumaczenia",
    "workspace.tabs.ariaLabel": "Widoki obszaru roboczego artykułu",
    "workspace.badges.review": "Do przeglądu",
    "workspace.badges.stale": "Nieaktualne",
    "workspace.badges.findings": "{count, plural, =0 {Brak uwag} one {# uwaga} few {# uwagi} other {# uwag}}",
    "workspace.badges.ready": "Gotowe",
    "workspace.badges.nearLimit": "Blisko limitu",
    "workspace.badges.overLimit": "Powyżej limitu",
} satisfies Partial<Record<MessageId, string>>;
