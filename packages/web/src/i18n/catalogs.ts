import { INTERFACE_LOCALE, type InterfaceLocale } from "@skladno/shared";
import { en } from "./locales/en.js";
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


export interface InstalledLocaleCatalog {
    code: InterfaceLocale;
    nativeName: string;
    messages: typeof en;
}


export const installedLocaleCatalogs: readonly InstalledLocaleCatalog[] = [{
    code: INTERFACE_LOCALE.EN,
    nativeName: "English",
    messages: en,
},
{ code: INTERFACE_LOCALE.ES, nativeName: "Español", messages: es },
{ code: INTERFACE_LOCALE.PT_BR, nativeName: "Português (Brasil)", messages: ptBR },
{ code: INTERFACE_LOCALE.FR, nativeName: "Français", messages: fr },
{ code: INTERFACE_LOCALE.DE, nativeName: "Deutsch", messages: de },
{ code: INTERFACE_LOCALE.RU, nativeName: "Русский", messages: ru },
{ code: INTERFACE_LOCALE.JA, nativeName: "日本語", messages: ja },
{ code: INTERFACE_LOCALE.ZH_CN, nativeName: "简体中文", messages: zhCN },
{ code: INTERFACE_LOCALE.IT, nativeName: "Italiano", messages: it },
{ code: INTERFACE_LOCALE.PL, nativeName: "Polski", messages: pl },
{ code: INTERFACE_LOCALE.KO, nativeName: "한국어", messages: ko },
];

export const catalogByLocale: ReadonlyMap<InterfaceLocale, InstalledLocaleCatalog> = new Map(installedLocaleCatalogs.map((catalog) => [catalog.code, catalog]));
