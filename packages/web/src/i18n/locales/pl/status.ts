import type { MessageId } from "../../messages.js";

export const status = {
    "status.windowsUpdateReady": "Aktualizacja pobrana. Zostanie zastosowana automatycznie przy następnym otwarciu Warplyn.",
    "status.windowsUpdateAvailable": "Pobierz aktualizację {version} i zatwierdź automatyczną instalację przy następnym otwarciu Warplyn",
    "status.updateAvailable": "Dostępna aktualizacja {version}",
    "status.updateDownloading": "Trwa pobieranie aktualizacji",
    "status.updateReady": "Aktualizacja gotowa do ponownego uruchomienia",
    "status.updateFailed": "Sprawdzanie aktualizacji nie powiodło się",
    "status.article": "Stan artykułu",
    "status.revision": "v{revisionNumber}",
    "status.revisionSelector": "Obecna wersja v{revisionNumber}. Wybierz zapisaną wersję.",
    "status.revisionMenu": "Zapisane wersje",
    "status.characterCount": "{characterCount} / {characterLimit} znaków",
    "status.characterCount.ariaLabel": "Liczba znaków: {characterCount} z {characterLimit}. Wybierz limit znaków.",
    "status.characterLimitPresets": "Gotowe limity znaków",
} satisfies Partial<Record<MessageId, string>>;
