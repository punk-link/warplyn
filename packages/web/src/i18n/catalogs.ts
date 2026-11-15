import { INTERFACE_LOCALE, type InterfaceLocale } from "@skladno/shared";
import { en } from "./locales/en/index.js";
import { es } from "./locales/es/index.js";
import { ptBR } from "./locales/pt-BR/index.js";
import { fr } from "./locales/fr/index.js";
import { de } from "./locales/de/index.js";
import { ru } from "./locales/ru/index.js";
import { ja } from "./locales/ja/index.js";
import { zhCN } from "./locales/zh-CN/index.js";
import { it } from "./locales/it/index.js";
import { pl } from "./locales/pl/index.js";
import { ko } from "./locales/ko/index.js";


export interface InstalledLocaleCatalog {
    code: InterfaceLocale;
    nativeName: string;
    messages: typeof en;
}


export const installedLocaleCatalogs: readonly InstalledLocaleCatalog[] = [
    { code: INTERFACE_LOCALE.DE, nativeName: "Deutsch", messages: de },
    {
        code: INTERFACE_LOCALE.EN,
        nativeName: "English",
        messages: en,
    },
    { code: INTERFACE_LOCALE.ES, nativeName: "Español", messages: es },
    { code: INTERFACE_LOCALE.FR, nativeName: "Français", messages: fr },
    { code: INTERFACE_LOCALE.IT, nativeName: "Italiano", messages: it },
    { code: INTERFACE_LOCALE.JA, nativeName: "日本語", messages: ja },
    { code: INTERFACE_LOCALE.KO, nativeName: "한국어", messages: ko },
    { code: INTERFACE_LOCALE.PL, nativeName: "Polski", messages: pl },
    { code: INTERFACE_LOCALE.PT_BR, nativeName: "Português (Brasil)", messages: ptBR },
    { code: INTERFACE_LOCALE.RU, nativeName: "Русский", messages: ru },
    { code: INTERFACE_LOCALE.ZH_CN, nativeName: "简体中文", messages: zhCN },
];

export const catalogByLocale: ReadonlyMap<InterfaceLocale, InstalledLocaleCatalog> = new Map(installedLocaleCatalogs.map((catalog) => [catalog.code, catalog]));
