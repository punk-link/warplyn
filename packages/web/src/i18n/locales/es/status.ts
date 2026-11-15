import type { MessageId } from "../../messages.js";

export const status = {
    "status.article": "Estado del artículo",
    "status.revision": "v{revisionNumber}",
    "status.revisionSelector": "Versión actual v{revisionNumber}. Elige una versión guardada.",
    "status.revisionMenu": "Versiones guardadas",
    "status.characterCount": "{characterCount} / {characterLimit} caracteres",
    "status.characterCount.ariaLabel": "Recuento de caracteres: {characterCount} de {characterLimit}. Elige un límite.",
    "status.characterLimitPresets": "Límites de caracteres predefinidos",
    "status.windowsUpdateReady": "Actualización descargada. Se aplicará automáticamente la próxima vez que abras Warplyn.",
    "status.windowsUpdateAvailable": "Descargar la actualización {version} y autorizar su instalación automática la próxima vez que abras Warplyn",
    "status.updateAvailable": "Actualización {version} disponible",
    "status.updateDownloading": "Descargando actualización",
    "status.updateReady": "Actualización lista para reiniciar",
    "status.updateFailed": "Falló la búsqueda de actualizaciones",
} satisfies Partial<Record<MessageId, string>>;
