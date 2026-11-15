import type { MessageId } from "../../messages.js";

export const settings4 = {
    "settings.backupAutomation": "Backup automatici",
    "settings.preferredAppearance": "Aspetto preferito",
    "settings.appearanceHint": "Scegli l'aspetto di Warplyn. Sistema segue la preferenza del dispositivo e si aggiorna mentre Warplyn è aperto.",
    "settings.system": "Sistema",
    "settings.light": "Chiaro",
    "settings.dark": "Scuro",
    "settings.applyAppearance": "Applica ora",
    "settings.interfaceLanguage": "Lingua dell'interfaccia",
    "settings.interfaceLanguageHint": "Cambia la lingua dei controlli e dei messaggi di Warplyn. Il contenuto degli articoli resta invariato.",
    "settings.dateFormat": "Formato della data",
    "settings.dateFormatHint": "Cambia come vengono mostrate le date in Warplyn. Non modifica date salvate o cronologia delle versioni.",
    "settings.systemDateFormat": "Formato data di sistema ({value})",
    "settings.resetDateFormat": "Usa formato data di sistema",
    "settings.dayFirstSlash": "GG/MM/AAAA",
    "settings.dayFirstDots": "GG.MM.AAAA",
    "settings.monthFirstSlash": "MM/GG/AAAA",
    "settings.isoDate": "AAAA-MM-GG",
    "settings.twelveHour": "12 ore",
    "settings.twentyFourHour": "24 ore",
    "settings.timeFormat": "Formato dell'ora",
    "settings.timeFormatHint": "Cambia come vengono mostrate le ore in Warplyn. Non modifica date salvate o cronologia delle versioni.",
    "settings.systemTimeFormat": "Formato ora di sistema ({value})",
    "settings.resetTimeFormat": "Usa formato ora di sistema",
    "settings.timeZone": "Fuso orario",
    "settings.timeZoneHint": (
        "Il fuso orario di sistema segue questo dispositivo. Scegli una regione per mantenerne l'ora quando v" +
        "iaggi. Cambiano solo le ore mostrate, non i timestamp salvati."
    ),
    "settings.systemTimeZone": "Fuso orario di sistema {timeZone}",
    "settings.localTimeZone": "ora locale",
    "settings.resetTimeZone": "Usa fuso orario di sistema",
    "settings.example": "Esempio: {value}",
    "settings.defaultArticleLanguage": "Lingua predefinita degli articoli",
    "settings.defaultArticleLanguageHint": "Usata per i nuovi articoli quando non scegli una lingua. Gli articoli esistenti non cambiano.",
    "settings.defaultTranslationLanguages": "Lingue di traduzione predefinite",
    "settings.defaultTranslationLanguagesHint": "Preselezionate quando inizi una nuova traduzione. Puoi cambiare le destinazioni prima di generare.",
    "settings.spelling": "Ortografia",
    "settings.assistantRequestTimeout": "Limite di tempo delle richieste",
    "settings.assistantRequestTimeoutHint": (
        "Interrompe le richieste dell'assistente dopo questo tempo. Si applica alle nuove richieste, compresi" +
        " i tentativi ripetuti. L'articolo resta invariato se scade il tempo."
    ),
    "settings.requestTimeoutMinutes": "{minutes, plural, one {# minuto} other {# minuti}}",
    "settings.requestTimeoutUnlimited": "Illimitato",
    "settings.animations": "Animazioni",
    "settings.animationsHint": (
        "Anima indicatori, messaggi dell'assistente ed effetti dell'interfaccia. Le preferenze del dispositiv" +
        "o per il movimento ridotto restano applicate."
    ),
    "settings.general.interfaceLocale.english": "English",
} satisfies Partial<Record<MessageId, string>>;
