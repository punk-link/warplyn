

export const spellingMessages = {
    "spelling.add": "Add words",
    "spelling.addWords": "Words to add",
    "spelling.correctionFailed": "Couldn't apply this spelling correction. Reopen the suggestion menu or type the correction in your Article.",
    "spelling.desktopOnly": (
        "Use the desktop app to download language dictionaries and manage your personal dictionary. In the browser, spe" +
        "lling follows your browser settings."
    ),
    "spelling.dictionaries": "Language dictionaries",
    "spelling.download": "Download dictionaries",
    "spelling.failed": "Unavailable. Retry download.",
    "spelling.filterLanguages": "Filter languages",
    "spelling.invalidWords": "Enter up to 500 words, one per line, with at most 128 characters each and 64 KiB in total.",
    "spelling.languageFailed": (
        "Couldn't enable spelling for this Article language. Retry the language selection or prepare its dictionary in " +
        "Spelling Settings."
    ),
    "spelling.languageVariant": "{language} ({code})",
    "spelling.loadFailed": "Couldn't load spelling settings. Retry loading them.",
    "spelling.loaded": "Spelling settings loaded.",
    "spelling.loading": "Loading spelling settings…",
    "spelling.localHint": (
        "Spelling checks and personal words stay on this device. Downloading language dictionaries needs internet acces" +
        "s and contacts Google's dictionary CDN."
    ),
    "spelling.noLanguages": "No matching languages.",
    "spelling.noWords": "No matching personal words.",
    "spelling.operationFailed": "Couldn't update spelling settings. Retry the change. For downloads, check your internet connection.",
    "spelling.partial": "Some words couldn't be added. Correct or retry the entries in Words to add.",
    "spelling.persistenceHint": (
        "Dictionaries and personal words belong to this installation. Article backups and restores do not inc" +
        "lude them. Deleting Article data does not remove operating system dictionary words; remove those wor" +
        "ds here."
    ),
    "spelling.personal": "Personal dictionary",
    "spelling.personalHint": "Keep technical terms such as PostgreSQL and gRPC in one personal dictionary shared across Articles and spelling languages.",
    "spelling.preload": "Prepare for offline writing",
    "spelling.preloadHint": "Select languages to prepare for offline writing. Your Article language stays the same.",
    "spelling.preparing": "Preparing",
    "spelling.ready": "Downloaded",
    "spelling.remove": "Remove",
    "spelling.removeWord": "Remove {word} from personal dictionary",
    "spelling.retry": "Retry",
    "spelling.savedWords": "Saved words",
    "spelling.search": "Search personal dictionary",
    "spelling.searchHint": "Search your saved terms and remove words you want the spell checker to check again.",
    "spelling.systemHint": "Adding or removing a word also changes your operating system's custom dictionary and may affect other apps.",
    "spelling.unload": "Unload",
    "spelling.unloadLanguage": "Unload {language} dictionary",
    "spelling.unloaded": "Unloaded",
    "spelling.unverified": "Available",
    "spelling.updated": "Spelling settings updated.",
    "spelling.wordFailed": "Couldn't add this word to the personal dictionary. Open Spelling Settings and try adding it again.",
    "spelling.wordsHint": (
        "Enter one word or technical term per line, up to 128 characters each. Add up to 500 words at a time. Failed en" +
        "tries stay here for correction or retry."
    ),
    "spelling.working": "Updating spelling settings…",
} satisfies Record<string, string>;
