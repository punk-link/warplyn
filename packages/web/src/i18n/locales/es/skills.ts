import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.recovery.title": "Recuperación de Skills del Autor",
    "skills.recovery.message": (
        "Los Skills del Autor afectados no están disponibles. Sus archivos e historial se conservan. Resolvé " +
        "los conflictos en los archivos de Skills o restaurá una copia de seguridad y volvé a intentar la " +
        "recuperación. Tus Artículos y los Skills incluidos siguen disponibles."
    ),
    "skills.recovery.retry": "Reintentar recuperación",
    "skills.recovery.review": "Revisar recuperación",
    "skills.recovery.ready": "Los Skills del Autor están disponibles.",
    "skills.recovery.loadFailed": "No se pudo comprobar la recuperación de Skills. Intentá de nuevo o volvé a abrir Warplyn.",
    "skills.recovery.retryFailed": (
        "No se pudo reintentar la recuperación de Skills. Tus archivos se conservan. Intentá de nuevo o " +
        "restaurá una copia de seguridad."
    ),
    "skills.loadFailed": "No se pudieron cargar las habilidades. Vuelve a cargarlas o abre de nuevo la configuración de IA.",
    "skills.validation.invalid_frontmatter": (
        "El archivo SKILL.md de esta habilidad no tiene un bloque de detalles válido al inicio. Añade su ID, nombre, de" +
        "scripción y versión e inténtalo de nuevo."
    ),
    "skills.validation.invalid_instructions": (
        "Añade las instrucciones en Markdown que debe seguir esta habilidad. Mantén las instrucciones dentro del tamaño" +
        " admitido."
    ),
    "skills.validation.invalid_metadata": (
        "Revisa los detalles de esta habilidad. Usa un ID único en minúsculas, un nombre y una descripción cl" +
        "aros, una versión numérica y opciones de alcance y ejecución compatibles."
    ),
    "skills.validation.invalid_reference": (
        "Esta habilidad nombra una referencia que Warplyn no puede usar. Mantén las referencias como archivos" +
        " Markdown en su carpeta references y dentro del tamaño admitido."
    ),
    "skills.validation.package_too_large": (
        "Este paquete de habilidad es demasiado grande para cargarlo en Warplyn. Acorta sus instrucciones o archivos de" +
        " referencia e inténtalo de nuevo."
    ),
    "skills.validation.unsafe_package": (
        "Warplyn no puede usar este paquete de habilidad porque incluye un archivo o ubicación no admitidos. " +
        "Conserva solo SKILL.md y las referencias Markdown declaradas."
    ),
} satisfies Partial<Record<MessageId, string>>;
