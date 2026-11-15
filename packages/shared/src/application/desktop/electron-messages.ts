import { defaultInterfaceLocale, INTERFACE_LOCALE, type InterfaceLocale } from "../../settings/settings.js";
import { es } from "./locales/es.js";
import { ptBR } from "./locales/pt-BR.js";
import { fr } from "./locales/fr.js";
import { de } from "./locales/de.js";
import { ru } from "./locales/ru.js";
import { ja } from "./locales/ja.js";
import { zhCN } from "./locales/zh-CN.js";
import { it } from "./locales/it.js";
import { pl } from "./locales/pl.js";
import { ko } from "./locales/ko.js";


const englishElectronMessages = {
    "electron.spelling.addWord": "Add to dictionary",
    "electron.articleFiles.markdown": "Markdown files",
    "electron.articleFiles.html": "HTML files",
    "electron.articleFiles.docx": "Word files",
    "electron.articleFiles.rtf": "Rich text files",
    "electron.articleFiles.load": "Load Article from file",
    "electron.articleFiles.save": "Save Article to file",
    "electron.draftCheckpointFailed.title": "Draft checkpoint failed",
    "electron.draftCheckpointFailed.message": "Warplyn could not save the latest Draft checkpoint.",
    "electron.draftCheckpointFailed.detail": "Return to the Article and try again, or quit without the latest unsaved changes.",
    "electron.draftCheckpointFailed.return": "Return to Article",
    "electron.draftCheckpointFailed.quit": "Quit without latest checkpoint",
    "electron.closeFailed.title": "Warplyn could not close cleanly",
    "electron.closeFailed.message": "The Draft checkpoint completed, but the local database did not close cleanly.",
    "electron.startFailed.title": "Warplyn could not start",
    "electron.startFailed.message": "Check that the local data directory is available, then try again.",
    "electron.deleteData.title": "Delete all local Warplyn data?",
    "electron.deleteData.message": "This permanently removes Articles, Draft checkpoints, Revisions, Assistant history, style data, settings, and local backups in Warplyn’s data directory.",
    "electron.deleteData.detail": "Warplyn will close after deletion. A backup can be created first when a backup folder is configured.",
    "electron.deleteData.backup": "Create a backup before deletion",
    "electron.deleteData.delete": "Delete all local data",
    "electron.deleteData.cancel": "Cancel",
    "electron.restoreBackup.title": "Restore this backup?",
    "electron.restoreBackup.message": "This replaces your active local Warplyn data with the selected backup.",
    "electron.restoreBackup.detail": ("Warplyn will save the latest Draft checkpoints, keep a recovery copy of the active data, then restart. " +
        "Existing AI connections stay local. Environment-variable references can be restored; API keys and variable values are never imported. " +
        "This cannot be undone from Settings."),
    "electron.restoreBackup.restore": "Restore and restart",
    "electron.restoreBackup.cancel": "Cancel",
    "electron.restoreFailed.title": "Couldn’t restore the backup",
    "electron.restoreFailed.message": "Close any other Warplyn windows or local development servers using this data, then try again. Your active data is unchanged.",
} as const satisfies Record<string, string>;


export type ElectronMessages = Record<keyof typeof englishElectronMessages, string>;


const electronCatalogs = {
    [INTERFACE_LOCALE.EN]: englishElectronMessages,
    [INTERFACE_LOCALE.ES]: es,
    [INTERFACE_LOCALE.PT_BR]: ptBR,
    [INTERFACE_LOCALE.FR]: fr,
    [INTERFACE_LOCALE.DE]: de,
    [INTERFACE_LOCALE.RU]: ru,
    [INTERFACE_LOCALE.JA]: ja,
    [INTERFACE_LOCALE.ZH_CN]: zhCN,
    [INTERFACE_LOCALE.IT]: it,
    [INTERFACE_LOCALE.PL]: pl,
    [INTERFACE_LOCALE.KO]: ko,
} satisfies Record<InterfaceLocale, ElectronMessages>;


export function getElectronMessagesFor(locale: InterfaceLocale = defaultInterfaceLocale): ElectronMessages {
    return electronCatalogs[locale];
}
