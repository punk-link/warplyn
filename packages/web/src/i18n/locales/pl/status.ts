import type { MessageId } from "../../messages.js";


export const statusMessages = {
    "status.article": "Stan artykułu",
    "status.characterCount": "{characterCount} / {characterLimit} znaków",
    "status.characterCount.ariaLabel": "Liczba znaków: {characterCount} z {characterLimit}. Wybierz limit znaków.",
    "status.characterLimitPresets": "Gotowe limity znaków",
    "status.revision": "v{revisionNumber}",
    "status.revisionMenu": "Zapisane wersje",
    "status.revisionSelector": "Obecna wersja v{revisionNumber}. Wybierz zapisaną wersję.",
    "status.updateAvailable": "Dostępna aktualizacja {version}",
    "status.updateDownloading": "Trwa pobieranie aktualizacji",
    "status.updateFailed": "Sprawdzanie aktualizacji nie powiodło się",
    "status.updateReady": "Aktualizacja gotowa do ponownego uruchomienia",
    "status.windowsUpdateAvailable": "Pobierz aktualizację {version} i zatwierdź automatyczną instalację przy następnym otwarciu Warplyn",
    "status.windowsUpdateReady": "Aktualizacja pobrana. Zostanie zastosowana automatycznie przy następnym otwarciu Warplyn.",
} satisfies Partial<Record<MessageId, string>>;
