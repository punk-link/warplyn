import type { MessageId } from "../../messages.js";


export const statusMessages = {
    "status.article": "Estado del artículo",
    "status.characterCount": "{characterCount} / {characterLimit} caracteres",
    "status.characterCount.ariaLabel": "Recuento de caracteres: {characterCount} de {characterLimit}. Elige un límite.",
    "status.characterLimitPresets": "Límites de caracteres predefinidos",
    "status.revision": "v{revisionNumber}",
    "status.revisionMenu": "Versiones guardadas",
    "status.revisionSelector": "Versión actual v{revisionNumber}. Elige una versión guardada.",
    "status.updateAvailable": "Actualización {version} disponible",
    "status.updateDownloading": "Descargando actualización",
    "status.updateFailed": "Falló la búsqueda de actualizaciones",
    "status.updateReady": "Actualización lista para reiniciar",
    "status.windowsUpdateAvailable": "Descargar la actualización {version} y autorizar su instalación automática la próxima vez que abras Warplyn",
    "status.windowsUpdateReady": "Actualización descargada. Se aplicará automáticamente la próxima vez que abras Warplyn.",
} satisfies Partial<Record<MessageId, string>>;
