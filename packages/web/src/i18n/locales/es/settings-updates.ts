import type { MessageId } from "../../messages.js";


export const settingsUpdatesMessages = {
    "settings.automaticUpdates": "Buscar actualizaciones automáticamente",
    "settings.automaticUpdatesHint": (
        "Consulta GitHub al iniciar Warplyn y después una vez al día mientras siga abierto. Las actualizaciones solo se" +
        " descargan cuando eliges Descargar."
    ),
    "settings.checkNow": "Comprobar ahora",
    "settings.restartAndUpdate": "Reiniciar y actualizar",
    "settings.updateChanges": "Cambios de {version}",
    "settings.updateChangesUnavailable": "Los detalles de la versión no están disponibles. Puedes actualizar igualmente.",
    "settings.updateNetworkAccess": "Permitir acceso a la red para actualizaciones",
    "settings.updateNetworkAccessHint": (
        "Permite que Warplyn contacte con GitHub para obtener información pública de versiones y descargar la" +
        "s actualizaciones que elijas. Nunca envía contenido de artículos, información de cuentas, identifica" +
        "dores del dispositivo ni analíticas."
    ),
    "settings.updateNetworkPermissionDescription": (
        "Warplyn se conectará a api.github.com para obtener información pública de versiones. No enviará cont" +
        "enido de artículos, información de cuentas, identificadores del dispositivo ni analíticas."
    ),
    "settings.updateNetworkPermissionTitle": "¿Permitir que Warplyn busque actualizaciones en GitHub?",
    "settings.updateRecovery": "Recuperación de actualizaciones",
    "settings.updateStatus": "Estado de las actualizaciones",
    "settings.updateStatusHint": "Versión actual: {version}",
    "settings.updateStatusUnavailableHint": "La configuración de actualizaciones se aplica cuando esta versión admite actualizaciones.",
    "settings.updates": "Actualizaciones",
    "settings.updatesAvailable": "La versión {version} está disponible.",
    "settings.updatesChecking": "Buscando actualizaciones…",
    "settings.updatesCurrent": "Tienes la última versión.",
    "settings.updatesError.apply_failed": "No se pudo preparar la actualización. Reintenta o abre Recuperación de actualizaciones para obtener ayuda.",
    "settings.updatesError.discovery_failed": "No se pudieron buscar actualizaciones. Inténtalo de nuevo.",
    "settings.updatesError.download_failed": "No se pudo descargar la actualización. Inténtalo de nuevo.",
    "settings.updatesNetworkAccessRequired": "Permite el acceso a la red para buscar actualizaciones.",
    "settings.updatesUnavailable": "Las actualizaciones no están disponibles en esta versión.",
    "settings.viewReleaseNotes": "Ver notas de la versión",
    "settings.windowsUpdateDownloadHint": (
        "Descargar una actualización también autoriza su instalación. Una vez descargada, se aplicará automát" +
        "icamente la próxima vez que abras Warplyn, incluso si cierras la aplicación de forma normal."
    ),
} satisfies Partial<Record<MessageId, string>>;
