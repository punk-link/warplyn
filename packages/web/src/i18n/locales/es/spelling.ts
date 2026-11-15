import type { MessageId } from "../../messages.js";

export const spelling = {
    "spelling.desktopOnly": (
        "Usa la aplicación de escritorio para descargar diccionarios de idiomas y gestionar tu diccionario " +
        "personal. En el navegador, la ortografía sigue la configuración del navegador."
    ),
    "spelling.localHint": (
        "Las revisiones ortográficas y las palabras personales permanecen en este dispositivo. Descargar " +
        "diccionarios requiere internet y se conecta a la CDN de diccionarios de Google."
    ),
    "spelling.dictionaries": "Diccionarios de idiomas",
    "spelling.preload": "Preparar la escritura sin conexión",
    "spelling.preloadHint": "Selecciona los idiomas para escribir sin conexión. El idioma del artículo no cambia.",
    "spelling.download": "Descargar diccionarios",
    "spelling.languageVariant": "{language} ({code})",
    "spelling.filterLanguages": "Filtrar idiomas",
    "spelling.noLanguages": "No hay idiomas que coincidan.",
    "spelling.unverified": "Disponible",
    "spelling.unloaded": "Descargado de memoria",
    "spelling.unload": "Descargar de memoria",
    "spelling.unloadLanguage": "Descargar de memoria el diccionario de {language}",
    "spelling.preparing": "Preparando",
    "spelling.ready": "Descargado",
    "spelling.failed": "No disponible. Reintenta la descarga.",
    "spelling.personal": "Diccionario personal",
    "spelling.personalHint": (
        "Conserva términos técnicos como PostgreSQL y gRPC en un diccionario personal compartido entre " +
        "artículos e idiomas de corrección."
    ),
    "spelling.systemHint": (
        "Añadir o eliminar una palabra también modifica el diccionario personalizado del sistema operativo y " +
        "puede afectar a otras aplicaciones."
    ),
    "spelling.addWords": "Palabras que añadir",
    "spelling.wordsHint": (
        "Introduce una palabra o término técnico por línea, de hasta 128 caracteres. Puedes añadir hasta 500 " +
        "palabras a la vez. Las entradas fallidas permanecen aquí para corregirlas o reintentarlas."
    ),
    "spelling.add": "Añadir palabras",
    "spelling.remove": "Eliminar",
    "spelling.removeWord": "Eliminar {word} del diccionario personal",
    "spelling.savedWords": "Palabras guardadas",
    "spelling.search": "Buscar en el diccionario personal",
    "spelling.searchHint": "Busca los términos guardados y elimina las palabras que quieras que el corrector vuelva a revisar.",
    "spelling.noWords": "No hay palabras personales que coincidan.",
    "spelling.persistenceHint": (
        "Los diccionarios y las palabras personales pertenecen a esta instalación. Las copias de seguridad y " +
        "las restauraciones de artículos no los incluyen. Eliminar los datos de artículos no elimina palabras " +
        "del diccionario del sistema operativo; elimínalas aquí."
    ),
    "spelling.loading": "Cargando configuración ortográfica…",
    "spelling.loaded": "Configuración ortográfica cargada.",
    "spelling.loadFailed": "No se pudo cargar la configuración ortográfica. Vuelve a intentarlo.",
    "spelling.retry": "Reintentar",
    "spelling.working": "Actualizando configuración ortográfica…",
    "spelling.updated": "Configuración ortográfica actualizada.",
    "spelling.partial": "No se pudieron añadir algunas palabras. Corrige o reintenta las entradas de Palabras que añadir.",
    "spelling.operationFailed": (
        "No se pudo actualizar la configuración ortográfica. Reintenta el cambio. Para las descargas, " +
        "comprueba tu conexión a internet."
    ),
    "spelling.invalidWords": "Introduce hasta 500 palabras, una por línea, con un máximo de 128 caracteres cada una y 64 KiB en total.",
    "spelling.wordFailed": "No se pudo añadir esta palabra al diccionario personal. Abre la configuración de ortografía e inténtalo de nuevo.",
    "spelling.correctionFailed": (
        "No se pudo aplicar esta corrección ortográfica. Abre de nuevo el menú de sugerencias o escribe la " +
        "corrección en el artículo."
    ),
    "spelling.languageFailed": (
        "No se pudo activar la corrección para el idioma de este artículo. Reintenta la selección del idioma " +
        "o prepara su diccionario en la configuración de ortografía."
    ),
} satisfies Partial<Record<MessageId, string>>;
