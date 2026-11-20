import type { MessageId } from "../../messages.js";


export const typographyMessages = {
    "typography.add": "Añadir regla",
    "typography.applyPreset": "Aplicar convenciones",
    "typography.articlePreferences": "Solo este artículo",
    "typography.articleSaveHint": (
        "Las reglas del artículo sustituyen o desactivan las reglas heredadas del idioma. Guárdalas para usarlas en la " +
        "próxima revisión."
    ),
    "typography.articleSaved": "Preferencias tipográficas del artículo guardadas.",
    "typography.check": "Revisar tipografía",
    "typography.checkFailed": "No se pudo revisar la tipografía. Guarda reglas válidas e inténtalo de nuevo.",
    "typography.chooseLanguage": "Elegir un idioma",
    "typography.closeEditor": "Cerrar",
    "typography.closingMark": "Signo de cierre",
    "typography.contextual": "Instrucción tipográfica contextual",
    "typography.contextualSkipped": (
        "{count, plural, one {# regla contextual requiere una revisión de estilo completa.} other {# reglas contextuale" +
        "s requieren una revisión de estilo completa.}}"
    ),
    "typography.copyLegacy": "Copiar las reglas anteriores a este idioma",
    "typography.correction": "{source} → {replacement}",
    "typography.correctionsConflict": (
        "No se pudieron aplicar las correcciones tipográficas de forma coherente. Ajusta las reglas superpues" +
        "tas o repetidas y vuelve a revisar. El artículo no ha cambiado."
    ),
    "typography.customPair": "Par personalizado",
    "typography.dash": "Rayas en la prosa",
    "typography.deleted": "eliminado",
    "typography.earlierConvention": "Esta revisión usó preferencias anteriores de idioma o tipografía. Repítela para usar las convenciones actuales.",
    "typography.edit": "Editar",
    "typography.effectiveLanguage": "Revisando convenciones de {language}",
    "typography.ellipsis": "Puntos suspensivos",
    "typography.ellipsisSingle": "Un único carácter de puntos suspensivos, …",
    "typography.ellipsisThree": "Tres puntos, ...",
    "typography.empty": "No hay reglas tipográficas. Añade una convención para revisar la puntuación o el espaciado.",
    "typography.horizontal": "Espacios repetidos",
    "typography.horizontalHint": "Usa un espacio normal entre los elementos de la prosa. La sangría, los saltos de línea y el código no cambian.",
    "typography.inheritanceHint": "Editar sustituye una regla heredada; eliminar la desactiva. Restaura las reglas heredadas para borrar los cambios.",
    "typography.innerSpace": "Espacio dentro de las comillas",
    "typography.instruction": "Instrucción para la revisión de estilo completa",
    "typography.invalid": (
        "No se pudieron guardar o cargar las reglas tipográficas. Comprueba si hay reglas incompletas, duplic" +
        "adas o contradictorias e inténtalo de nuevo. Si no se pueden cargar las reglas guardadas, restaura u" +
        "na copia de seguridad en la configuración."
    ),
    "typography.kind": "Convención de la regla {number}",
    "typography.languageCode": "Idioma o variante regional",
    "typography.languageCodeHint": (
        "Introduce un nombre o una variante regional, como polaco o español de Argentina. También puedes usar códigos c" +
        "omo ja o es-AR."
    ),
    "typography.languageHint": "Guarda convenciones distintas para cada idioma de escritura. Esto no cambia el idioma del artículo ni de la interfaz.",
    "typography.languagePreferences": "Todos los artículos en este idioma",
    "typography.languageSaveFailed": "No se pudo guardar el idioma del artículo. Inténtalo de nuevo; el texto no ha cambiado.",
    "typography.languageScope": "Idioma de la tipografía",
    "typography.left": "Elemento izquierdo",
    "typography.legacyHint": "Se conservan las reglas globales anteriores. Cópialas a un idioma para usarlas en nuevas revisiones.",
    "typography.legacyReview": "Esta revisión anterior no tiene registrada ninguna convención de idioma.",
    "typography.literal": "Sustitución literal de puntuación",
    "typography.loadFailed": "No se pudieron cargar las preferencias tipográficas. Vuelve a intentarlo antes de editar o revisar.",
    "typography.localHint": (
        "Las revisiones mecánicas se ejecutan localmente. Las reglas contextuales requieren una revisión de e" +
        "stilo completa. El texto del artículo solo cambia al aceptar una propuesta."
    ),
    "typography.mark": "Signo preferido",
    "typography.missingLanguage": "Elige el idioma del artículo en la barra de estado antes de revisar la tipografía.",
    "typography.narrowNbsp": "Espacio estrecho de no separación, U+202F",
    "typography.nbsp": "Espacio de no separación, U+00A0",
    "typography.nested": "Comillas interiores",
    "typography.noConvention": "No hay reglas mecánicas aplicables. Elige una convención o añade y guarda reglas para este idioma.",
    "typography.noPreset": "Convenciones personalizadas",
    "typography.noViolations": "No se encontraron infracciones tipográficas mecánicas.",
    "typography.nonbreaking": "Par de elementos inseparables",
    "typography.olderProfile": (
        "Esta revisión usó la versión {version} del perfil de estilo. Las reglas han cambiado. Repite la revisión para " +
        "usar el perfil actual."
    ),
    "typography.openingMark": "Signo de apertura",
    "typography.ordinarySpace": "espacio",
    "typography.otherLanguage": "Otro idioma…",
    "typography.otherLanguageTitle": "Elegir otro idioma de escritura",
    "typography.outer": "Comillas exteriores",
    "typography.preset": "Convenciones predefinidas",
    "typography.presetPending": "{language}{separator}pendiente de revisión por un hablante nativo",
    "typography.presetReviewHint": (
        "Las convenciones predefinidas están pendientes de revisión por hablantes nativos. Puedes añadir tus " +
        "propias reglas abajo."
    ),
    "typography.punctuationMarks": "Signos de puntuación",
    "typography.punctuationSpacing": "Espaciado de la puntuación",
    "typography.quotes": "Comillas",
    "typography.remove": "Eliminar",
    "typography.replacement": "Puntuación de sustitución",
    "typography.required": "No se pudo revisar la tipografía. Elige el idioma del artículo y guarda reglas para ese idioma en el perfil de estilo.",
    "typography.resetInheritance": "Restaurar reglas heredadas",
    "typography.retryLoad": "Volver a cargar las preferencias",
    "typography.reviewLanguage": "Convenciones de revisión: {language}",
    "typography.reviewProposal": "Revisar propuesta",
    "typography.right": "Elemento derecho",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.ruleNumber": "Regla {number}",
    "typography.rulesOnly": (
        "No hay muestras de escritura incluidas. Añade muestras para deducir las características de tu voz, o" +
        " usa reglas tipográficas explícitas para las revisiones locales."
    ),
    "typography.save": "Guardar",
    "typography.saveDraftFirst": "Guarda el borrador actual antes de revisar la tipografía. La revisión local usa la versión guardada.",
    "typography.saveFailed": "No se pudieron guardar las reglas tipográficas. Tus cambios siguen aquí. Intenta guardarlos de nuevo.",
    "typography.saveHint": (
        "Al guardar se reconstruye el perfil localmente con las muestras incluidas y las reglas guardadas, in" +
        "cluidos los cambios pendientes en las muestras. Se excluyen los cambios sin guardar de otros formula" +
        "rios."
    ),
    "typography.saved": "Reglas tipográficas guardadas y perfil de estilo reconstruido.",
    "typography.savedRule": "Guardada",
    "typography.scope": "Aplicar reglas a",
    "typography.skipped": (
        "{count, plural, one {Se dejó sin cambiar # caso de comillas ambiguas.} other {Se dejaron sin cambiar # casos d" +
        "e comillas ambiguas.}} Revísalos en su contexto."
    ),
    "typography.source": "Puntuación que sustituir",
    "typography.source.article": "Regla del artículo",
    "typography.source.language": "Preferencia del idioma",
    "typography.source.preset": "Predefinidas",
    "typography.spaceBefore": "Espacio antes de la puntuación",
    "typography.spacing": "Espaciado",
    "typography.support": "Reglas tipográficas: {rules}",
    "typography.title": "Reglas tipográficas",
    "typography.unknownLanguage": "Idioma sin especificar",
    "typography.unsavedRule": "Sin guardar",
    "typography.useLanguage": "Usar idioma",
    "typography.validation.conflict": "Estas convenciones se contradicen. Ajusta o elimina una antes de guardar.",
    "typography.validation.duplicate": "Esta convención ya está en la lista. Edita o elimina el duplicado antes de guardar.",
    "typography.validation.invalid": "Completa los campos de esta regla antes de guardar.",
    "typography.validation.limit": "Conserva un máximo de 30 reglas antes de guardar.",
    "typography.withSpaces": "Con espacios",
    "typography.withoutSpaces": "Sin espacios",
} satisfies Partial<Record<MessageId, string>>;
