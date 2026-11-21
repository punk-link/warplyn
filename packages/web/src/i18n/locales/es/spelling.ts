import type { MessageId } from "../../messages.js";


export const spellingMessages = {
    "spelling.add": "Añadir palabras",
    "spelling.addWords": "Palabras que añadir",
    "spelling.correctionFailed": (
        "No se pudo aplicar esta corrección ortográfica. Abre de nuevo el menú de sugerencias o escribe la co" +
        "rrección en el artículo."
    ),
    "spelling.desktopOnly": (
        "Usa la aplicación de escritorio para descargar diccionarios de idiomas y gestionar tu diccionario pe" +
        "rsonal. En el navegador, la ortografía sigue la configuración del navegador."
    ),
    "spelling.dictionaries": "Diccionarios de idiomas",
    "spelling.download": "Descargar diccionarios",
    "spelling.failed": "No disponible. Reintenta la descarga.",
    "spelling.filterLanguages": "Filtrar idiomas",
    "spelling.invalidWords": "Introduce hasta 500 palabras, una por línea, con un máximo de 128 caracteres cada una y 64 KiB en total.",
    "spelling.languageFailed": (
        "No se pudo activar la corrección para el idioma de este artículo. Reintenta la selección del idioma o prepara " +
        "su diccionario en la configuración de ortografía."
    ),
    "spelling.languageVariant": "{language} ({code})",
    "spelling.loadFailed": "No se pudo cargar la configuración ortográfica. Vuelve a intentarlo.",
    "spelling.loaded": "Configuración ortográfica cargada.",
    "spelling.loading": "Cargando configuración ortográfica…",
    "spelling.localHint": (
        "Las revisiones ortográficas y las palabras personales permanecen en este dispositivo. Descargar dicc" +
        "ionarios requiere internet y se conecta a la CDN de diccionarios de Google."
    ),
    "spelling.noLanguages": "No hay idiomas que coincidan.",
    "spelling.noWords": "No hay palabras personales que coincidan.",
    "spelling.operationFailed": (
        "No se pudo actualizar la configuración ortográfica. Reintenta el cambio. Para las descargas, comprueba tu cone" +
        "xión a internet."
    ),
    "spelling.partial": "No se pudieron añadir algunas palabras. Corrige o reintenta las entradas de Palabras que añadir.",
    "spelling.persistenceHint": (
        "Los diccionarios y las palabras personales pertenecen a esta instalación. Las copias de seguridad y " +
        "las restauraciones de artículos no los incluyen. Eliminar los datos de artículos no elimina palabras" +
        " del diccionario del sistema operativo; elimínalas aquí."
    ),
    "spelling.personal": "Diccionario personal",
    "spelling.personalHint": (
        "Conserva términos técnicos como PostgreSQL y gRPC en un diccionario personal compartido entre artícu" +
        "los e idiomas de corrección."
    ),
    "spelling.preload": "Preparar la escritura sin conexión",
    "spelling.preloadHint": "Selecciona los idiomas para escribir sin conexión. El idioma del artículo no cambia.",
    "spelling.preparing": "Preparando",
    "spelling.ready": "Descargado",
    "spelling.remove": "Eliminar",
    "spelling.removeWord": "Eliminar {word} del diccionario personal",
    "spelling.retry": "Reintentar",
    "spelling.savedWords": "Palabras guardadas",
    "spelling.search": "Buscar en el diccionario personal",
    "spelling.searchHint": "Busca los términos guardados y elimina las palabras que quieras que el corrector vuelva a revisar.",
    "spelling.systemHint": (
        "Añadir o eliminar una palabra también modifica el diccionario personalizado del sistema operativo y puede afec" +
        "tar a otras aplicaciones."
    ),
    "spelling.unload": "Descargar de memoria",
    "spelling.unloadLanguage": "Descargar de memoria el diccionario de {language}",
    "spelling.unloaded": "Descargado de memoria",
    "spelling.unverified": "Disponible",
    "spelling.updated": "Configuración ortográfica actualizada.",
    "spelling.wordFailed": "No se pudo añadir esta palabra al diccionario personal. Abre la configuración de ortografía e inténtalo de nuevo.",
    "spelling.wordsHint": (
        "Introduce una palabra o término técnico por línea, de hasta 128 caracteres. Puedes añadir hasta 500 " +
        "palabras a la vez. Las entradas fallidas permanecen aquí para corregirlas o reintentarlas."
    ),
    "spelling.working": "Actualizando configuración ortográfica…",
} satisfies Partial<Record<MessageId, string>>;
