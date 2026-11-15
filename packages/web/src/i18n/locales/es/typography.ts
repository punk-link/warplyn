import type { MessageId } from "../../messages.js";

export const typography = {
    "typography.customPair": "Par personalizado",
    "typography.articleSaved": "Preferencias tipográficas del artículo guardadas.",
    "typography.articleSaveHint": (
        "Las reglas del artículo sustituyen o desactivan las reglas heredadas del idioma. Guárdalas para " +
        "usarlas en la próxima revisión."
    ),
    "typography.reviewLanguage": "Convenciones de revisión: {language}",
    "typography.unknownLanguage": "Idioma sin especificar",
    "typography.otherLanguage": "Otro idioma…",
    "typography.otherLanguageTitle": "Elegir otro idioma de escritura",
    "typography.languageCode": "Idioma o variante regional",
    "typography.languageCodeHint": (
        "Introduce un nombre o una variante regional, como polaco o español de Argentina. También puedes usar " +
        "códigos como ja o es-AR."
    ),
    "typography.languageSaveFailed": "No se pudo guardar el idioma del artículo. Inténtalo de nuevo; el texto no ha cambiado.",
    "typography.useLanguage": "Usar idioma",
    "typography.loadFailed": "No se pudieron cargar las preferencias tipográficas. Vuelve a intentarlo antes de editar o revisar.",
    "typography.retryLoad": "Volver a cargar las preferencias",
    "typography.openingMark": "Signo de apertura",
    "typography.closingMark": "Signo de cierre",
    "typography.innerSpace": "Espacio dentro de las comillas",
    "typography.punctuationMarks": "Signos de puntuación",
    "typography.spaceBefore": "Espacio antes de la puntuación",
    "typography.punctuationSpacing": "Espaciado de la puntuación",
    "typography.languageScope": "Idioma de la tipografía",
    "typography.chooseLanguage": "Elegir un idioma",
    "typography.languageHint": (
        "Guarda convenciones distintas para cada idioma de escritura. Esto no cambia el idioma del artículo " +
        "ni de la interfaz."
    ),
    "typography.missingLanguage": "Elige el idioma del artículo en la barra de estado antes de revisar la tipografía.",
    "typography.scope": "Aplicar reglas a",
    "typography.languagePreferences": "Todos los artículos en este idioma",
    "typography.articlePreferences": "Solo este artículo",
    "typography.preset": "Convenciones predefinidas",
    "typography.noPreset": "Convenciones personalizadas",
    "typography.presetPending": "{language}{separator}pendiente de revisión por un hablante nativo",
    "typography.presetReviewHint": (
        "Las convenciones predefinidas están pendientes de revisión por hablantes nativos. Puedes añadir tus " +
        "propias reglas abajo."
    ),
    "typography.applyPreset": "Aplicar convenciones",
    "typography.legacyHint": "Se conservan las reglas globales anteriores. Cópialas a un idioma para usarlas en nuevas revisiones.",
    "typography.copyLegacy": "Copiar las reglas anteriores a este idioma",
    "typography.resetInheritance": "Restaurar reglas heredadas",
    "typography.inheritanceHint": (
        "Editar sustituye una regla heredada; eliminar la desactiva. Restaura las reglas heredadas para " +
        "borrar los cambios."
    ),
    "typography.noConvention": "No hay reglas mecánicas aplicables. Elige una convención o añade y guarda reglas para este idioma.",
    "typography.effectiveLanguage": "Revisando convenciones de {language}",
    "typography.earlierConvention": "Esta revisión usó preferencias anteriores de idioma o tipografía. Repítela para usar las convenciones actuales.",
    "typography.legacyReview": "Esta revisión anterior no tiene registrada ninguna convención de idioma.",
    "typography.source.preset": "Predefinidas",
    "typography.source.language": "Preferencia del idioma",
    "typography.source.article": "Regla del artículo",
    "typography.invalid": (
        "No se pudieron guardar o cargar las reglas tipográficas. Comprueba si hay reglas incompletas, " +
        "duplicadas o contradictorias e inténtalo de nuevo. Si no se pueden cargar las reglas guardadas, " +
        "restaura una copia de seguridad en la configuración."
    ),
    "typography.correctionsConflict": (
        "No se pudieron aplicar las correcciones tipográficas de forma coherente. Ajusta las reglas " +
        "superpuestas o repetidas y vuelve a revisar. El artículo no ha cambiado."
    ),
    "typography.required": "No se pudo revisar la tipografía. Elige el idioma del artículo y guarda reglas para ese idioma en el perfil de estilo.",
    "typography.title": "Reglas tipográficas",
    "typography.saveHint": (
        "Al guardar se reconstruye el perfil localmente con las muestras incluidas y las reglas guardadas, " +
        "incluidos los cambios pendientes en las muestras. Se excluyen los cambios sin guardar de otros " +
        "formularios."
    ),
    "typography.empty": "No hay reglas tipográficas. Añade una convención para revisar la puntuación o el espaciado.",
    "typography.add": "Añadir regla",
    "typography.remove": "Eliminar",
    "typography.save": "Guardar",
    "typography.edit": "Editar",
    "typography.closeEditor": "Cerrar",
    "typography.savedRule": "Guardada",
    "typography.unsavedRule": "Sin guardar",
    "typography.validation.invalid": "Completa los campos de esta regla antes de guardar.",
    "typography.validation.duplicate": "Esta convención ya está en la lista. Edita o elimina el duplicado antes de guardar.",
    "typography.validation.conflict": "Estas convenciones se contradicen. Ajusta o elimina una antes de guardar.",
    "typography.validation.limit": "Conserva un máximo de 30 reglas antes de guardar.",
    "typography.saveFailed": "No se pudieron guardar las reglas tipográficas. Tus cambios siguen aquí. Intenta guardarlos de nuevo.",
    "typography.check": "Revisar tipografía",
    "typography.saved": "Reglas tipográficas guardadas y perfil de estilo reconstruido.",
    "typography.localHint": (
        "Las revisiones mecánicas se ejecutan localmente. Las reglas contextuales requieren una revisión de " +
        "estilo completa. El texto del artículo solo cambia al aceptar una propuesta."
    ),
    "typography.kind": "Convención de la regla {number}",
    "typography.ruleNumber": "Regla {number}",
    "typography.quotes": "Comillas",
    "typography.dash": "Rayas en la prosa",
    "typography.ellipsis": "Puntos suspensivos",
    "typography.ellipsisSingle": "Un único carácter de puntos suspensivos, …",
    "typography.ellipsisThree": "Tres puntos, ...",
    "typography.nonbreaking": "Par de elementos inseparables",
    "typography.horizontal": "Espacios repetidos",
    "typography.literal": "Sustitución literal de puntuación",
    "typography.contextual": "Instrucción tipográfica contextual",
    "typography.outer": "Comillas exteriores",
    "typography.nested": "Comillas interiores",
    "typography.mark": "Signo preferido",
    "typography.spacing": "Espaciado",
    "typography.withSpaces": "Con espacios",
    "typography.withoutSpaces": "Sin espacios",
    "typography.left": "Elemento izquierdo",
    "typography.right": "Elemento derecho",
    "typography.nbsp": "Espacio de no separación, U+00A0",
    "typography.narrowNbsp": "Espacio estrecho de no separación, U+202F",
    "typography.source": "Puntuación que sustituir",
    "typography.replacement": "Puntuación de sustitución",
    "typography.instruction": "Instrucción para la revisión de estilo completa",
    "typography.horizontalHint": "Usa un espacio normal entre los elementos de la prosa. La sangría, los saltos de línea y el código no cambian.",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.support": "Reglas tipográficas: {rules}",
    "typography.noViolations": "No se encontraron infracciones tipográficas mecánicas.",
    "typography.skipped": (
        "{count, plural, one {Se dejó sin cambiar # caso de comillas ambiguas.} other {Se dejaron sin cambiar " +
        "# casos de comillas ambiguas.}} Revísalos en su contexto."
    ),
    "typography.contextualSkipped": (
        "{count, plural, one {# regla contextual requiere una revisión de estilo completa.} other {# reglas " +
        "contextuales requieren una revisión de estilo completa.}}"
    ),
    "typography.olderProfile": (
        "Esta revisión usó la versión {version} del perfil de estilo. Las reglas han cambiado. Repite la " +
        "revisión para usar el perfil actual."
    ),
    "typography.rulesOnly": (
        "No hay muestras de escritura incluidas. Añade muestras para deducir las características de tu voz, o " +
        "usa reglas tipográficas explícitas para las revisiones locales."
    ),
    "typography.checkFailed": "No se pudo revisar la tipografía. Guarda reglas válidas e inténtalo de nuevo.",
    "typography.saveDraftFirst": "Guarda el borrador actual antes de revisar la tipografía. La revisión local usa la versión guardada.",
    "typography.reviewProposal": "Revisar propuesta",
    "typography.correction": "{source} → {replacement}",
    "typography.ordinarySpace": "espacio",
    "typography.deleted": "eliminado",
} satisfies Partial<Record<MessageId, string>>;
