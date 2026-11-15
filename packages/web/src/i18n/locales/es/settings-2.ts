import type { MessageId } from "../../messages.js";

export const settings2 = {
    "settings.searchModels": "Buscar modelos",
    "settings.clearModelSearch": "Borrar búsqueda de modelos",
    "settings.modelVendorFilters": "Filtrar modelos por proveedor",
    "settings.modelVendor.openai": "OpenAI",
    "settings.modelVendor.other": "Otros",
    "settings.addFavoriteModel": "Añadir {model} a favoritos",
    "settings.removeFavoriteModel": "Quitar {model} de favoritos",
    "settings.noMatchingModels": "No hay modelos que coincidan con este filtro.",
    "settings.refreshModels": "Actualizar modelos disponibles",
    "settings.specificModels": "Modelos para tareas concretas",
    "settings.specificModelsHint": "Elige un modelo para una tarea o usa el predeterminado. Solo afecta a futuras solicitudes de IA.",
    "settings.useDefaultModel": "Usar modelo predeterminado",
    "settings.specificModelHint": "Mantén Usar modelo predeterminado salvo que esta tarea necesite otro modelo.",
    "settings.publishingProfile": "Perfil de límite de caracteres",
    "settings.publishingProfileHint": "Muestra cuándo el texto se acerca a esta longitud. El límite es orientativo y nunca impide copiar.",
    "settings.publishingProfileNote": (
        "La barra de estado del artículo y el control de copia usan este perfil. Los perfiles personalizados " +
        "editables ampliarán estas funciones básicas."
    ),
    "settings.profileCharacters": "{label}: {count} caracteres",
    "settings.backupFolder": "Carpeta de copias de seguridad",
    "settings.backupFolderHint": (
        "Elige una carpeta local para las copias de seguridad. Warplyn solo puede escribir en ella después de " +
        "que la elijas."
    ),
    "settings.chooseBackupFolder": "Elegir carpeta de copias de seguridad",
    "settings.revealBackupFolder": "Mostrar carpeta",
    "settings.managedCredential": "Credencial gestionada",
    "settings.backupFolderSelected": "Usando {folderName}",
    "settings.backupFolderFailed": "No se pudo elegir esa carpeta. Inténtalo de nuevo.",
    "settings.backupFolderRequired": "Elige primero una carpeta de copias de seguridad.",
    "settings.backupFolderPermissionDenied": "Warplyn no puede acceder a esa carpeta. Elígela de nuevo y permite el acceso.",
    "settings.backupFolderUnsupported": "Este navegador no permite elegir una carpeta de copias de seguridad.",
    "settings.automaticBackups": "Copias de seguridad automáticas",
    "settings.automaticBackupsHint": (
        "Al activarlas, crea una copia poco después de iniciar y cada 24 horas desde esa ejecución mientras " +
        "Warplyn siga abierto. Las copias manuales nunca se eliminan automáticamente."
    ),
    "settings.automaticBackupFailed": (
        "Falló la copia de seguridad automática. Comprueba la carpeta en Datos y copias de seguridad y crea " +
        "una copia manual. Tus artículos no han cambiado."
    ),
    "settings.off": "Desactivado",
    "settings.daily": "Diaria",
    "settings.retention": "Conservación de copias automáticas",
    "settings.retentionHint": "Controla cuántas copias automáticas conserva Warplyn. Las copias manuales nunca se eliminan automáticamente.",
    "settings.keepBackups": "Conservar {count} copias",
    "settings.keepAllBackups": "Conservar todas las copias",
    "settings.createBackup": "Crear copia de seguridad",
    "settings.createBackupHint": (
        "Copia tus artículos, versiones guardadas, configuración, habilidades del autor e historial de " +
        "habilidades. En el navegador se admiten archivos de hasta 100 MB y 500 MB en total. Se excluyen las " +
        "claves de API."
    ),
    "settings.backupCreating": "Creando copia de seguridad…",
    "settings.backupCreated": "Se creó {name}",
    "settings.backupCreateFailed": (
        "No se pudo crear la copia. Comprueba la carpeta seleccionada y los límites de tamaño del navegador e " +
        "inténtalo de nuevo. La sesión de edición no ha cambiado."
    ),
    "settings.backupCreateUnavailable": "Las copias de seguridad no están disponibles en esta sesión del navegador.",
    "settings.restoreBackup": "Restaurar una copia de seguridad",
    "settings.restoreBackupHint": (
        "Elige una copia de la carpeta seleccionada. Warplyn comprueba sus archivos, conserva una copia de " +
        "recuperación y restaura sus artículos, versiones guardadas, configuración y habilidades guardadas. " +
        "Las conexiones de IA existentes permanecen locales. Se pueden restaurar referencias a variables de " +
        "entorno; nunca se importan claves de API ni valores de variables. Las copias antiguas de solo base " +
        "de datos conservan tus habilidades actuales."
    ),
    "settings.restoreBackupFailed": (
        "No se pudo restaurar esa copia. Comprueba sus archivos y los límites del navegador o elige otra. Tus " +
        "datos activos no han cambiado."
    ),
    "settings.restoreBackupUnavailable": "No se puede restaurar esa copia.",
    "settings.chooseBackup": "Elegir una copia de seguridad",
    "settings.restoreBackupConfirm": "¿Restaurar {name}? Warplyn sustituirá los datos locales activos y se recargará.",
    "settings.deleteData": "Eliminar datos locales",
    "settings.deleteLocalData": "Eliminar todos los datos locales",
    "settings.deleteLocalDataHint": (
        "Elimina de forma permanente los artículos, puntos de control, versiones guardadas, historial del " +
        "asistente, datos de estilo, configuración y copias locales de la carpeta de datos de Warplyn. Puedes " +
        "crear primero una copia verificada en la confirmación."
    ),
    "settings.deleteLocalDataFailed": "No se pudieron eliminar los datos locales. No se ha informado de una eliminación completa.",
    "settings.loading": "Cargando configuración…",
    "settings.privacyAndDiagnostics": "Privacidad y diagnóstico",
    "settings.telemetry": "Compartir datos de diagnóstico y uso",
    "settings.telemetryHint": (
        "Ayúdanos a mejorar Warplyn enviando eventos seudónimos de fiabilidad y uso a PostHog. Nunca se " +
        "incluye texto de artículos, instrucciones, respuestas de IA ni claves de API."
    ),
    "settings.telemetryDisclosure": (
        "La telemetría está desactivada por defecto. Actívala para ayudarnos a entender tu experiencia y " +
        "mejorar Warplyn. Puedes desactivarla en cualquier momento; esto detiene la recopilación futura, pero " +
        "no retira los datos ya enviados."
    ),
    "settings.telemetryDetails": "Detalles de telemetría",
    "settings.telemetryIdentifier": "ID de telemetría",
    "settings.telemetryIdentifierHint": (
        "Incluye este ID al solicitar la eliminación. Cópialo antes de desactivar la telemetría, ya que al " +
        "desactivarla se elimina el ID."
    ),
    "settings.copyTelemetryIdentifier": "Copiar ID de telemetría",
    "settings.telemetryIdentifierCopied": "ID de telemetría copiado.",
    "settings.telemetrySaveFailed": "No se pudo guardar esta elección. Se conserva la configuración anterior. Inténtalo de nuevo.",
    "settings.telemetryUnavailable": "La telemetría solo está disponible en una aplicación empaquetada y configurada.",
    "settings.saved": "Guardado",
    "settings.loadingFailed": "No se pudo cargar la configuración. La configuración guardada no ha cambiado. Recarga e inténtalo de nuevo.",
    "settings.saving": "Guardando…",
    "settings.saveFailed": "No se pudo guardar la configuración. Se conserva la anterior. Inténtalo de nuevo.",
    "settings.modelSaveFailed": "No se pudieron guardar las preferencias de modelos. Se conserva la configuración anterior. Inténtalo de nuevo.",
    "settings.backupSaveFailed": "No se pudo guardar la configuración de copias de seguridad. Se conserva la anterior. Inténtalo de nuevo.",
    "settings.updates": "Actualizaciones",
    "settings.updateNetworkAccess": "Permitir acceso a la red para actualizaciones",
    "settings.updateNetworkAccessHint": (
        "Permite que Warplyn contacte con GitHub para obtener información pública de versiones y descargar " +
        "las actualizaciones que elijas. Nunca envía contenido de artículos, información de cuentas, " +
        "identificadores del dispositivo ni analíticas."
    ),
    "settings.updateNetworkPermissionTitle": "¿Permitir que Warplyn busque actualizaciones en GitHub?",
    "settings.updateNetworkPermissionDescription": (
        "Warplyn se conectará a api.github.com para obtener información pública de versiones. No enviará " +
        "contenido de artículos, información de cuentas, identificadores del dispositivo ni analíticas."
    ),
    "settings.allowNetworkAccess": "Permitir",
    "settings.automaticUpdates": "Buscar actualizaciones automáticamente",
    "settings.automaticUpdatesHint": (
        "Consulta GitHub al iniciar Warplyn y después una vez al día mientras siga abierto. Las " +
        "actualizaciones solo se descargan cuando eliges Descargar."
    ),
    "settings.windowsUpdateDownloadHint": (
        "Descargar una actualización también autoriza su instalación. Una vez descargada, se aplicará " +
        "automáticamente la próxima vez que abras Warplyn, incluso si cierras la aplicación de forma normal."
    ),
    "settings.includePrereleaseUpdates": "Incluir versiones preliminares",
    "settings.includePrereleaseUpdatesHint": "Si está desactivado, Warplyn solo ofrece versiones estables.",
    "settings.updateStatus": "Estado de las actualizaciones",
    "settings.updateStatusHint": "Versión actual: {version}",
    "settings.updateStatusUnavailableHint": "La configuración de actualizaciones se aplica cuando esta versión admite actualizaciones.",
    "settings.updatesChecking": "Buscando actualizaciones…",
    "settings.updatesCurrent": "Tienes la última versión.",
    "settings.updatesNetworkAccessRequired": "Permite el acceso a la red para buscar actualizaciones.",
    "settings.updatesUnavailable": "Las actualizaciones no están disponibles en esta versión.",
    "settings.updatesAvailable": "La versión {version} está disponible.",
    "settings.updatesError.discovery_failed": "No se pudieron buscar actualizaciones. Inténtalo de nuevo.",
    "settings.updatesError.download_failed": "No se pudo descargar la actualización. Inténtalo de nuevo.",
    "settings.updatesError.apply_failed": (
        "No se pudo preparar la actualización. Reintenta o abre Recuperación de actualizaciones para obtener " +
        "ayuda."
    ),
    "settings.checkNow": "Comprobar ahora",
    "settings.viewReleaseNotes": "Ver notas de la versión",
    "settings.updateChanges": "Cambios de {version}",
    "settings.securityUpdate": "Actualización de seguridad",
    "settings.updateChangesUnavailable": "Los detalles de la versión no están disponibles. Puedes actualizar igualmente.",
    "settings.downloadUpdate": "Descargar",
    "settings.restartAndUpdate": "Reiniciar y actualizar",
    "settings.retry": "Reintentar",
    "settings.updateRecovery": "Recuperación de actualizaciones",
    "settings.on": "Activado",
    "settings.modelsLoadFailed": "No se pudieron cargar los modelos disponibles. La configuración no ha cambiado. Inténtalo de nuevo.",
    "settings.connectionAddFailed": (
        "No se pudo añadir esa conexión de IA. La configuración no ha cambiado. Comprueba los datos e " +
        "inténtalo de nuevo."
    ),
    "settings.connectionUpdateFailed": "No se pudo actualizar esa conexión de IA. Se conserva la configuración anterior. Inténtalo de nuevo.",
    "settings.connectionRemoveFailed": "No se pudo eliminar esa conexión de IA. Sigue disponible en la configuración. Inténtalo de nuevo.",
    "settings.publishingSaveFailed": "No se pudo guardar la configuración de publicación. Se conserva la anterior. Inténtalo de nuevo.",
    "settings.customProfileName": "Nombre del perfil personalizado",
    "settings.customProfileNameHint": "El nombre local de tu límite de publicación personalizado.",
    "settings.customProfileLimit": "Límite personalizado de caracteres",
    "settings.customProfileLimitHint": "Un límite orientativo no negativo. Nunca impide copiar.",
    "settings.customProfileInvalid": "Introduce un nombre y un límite de caracteres entero no negativo.",
    "settings.saveCustomProfile": "Guardar perfil personalizado",
    "settings.customProfiles": "Perfiles personalizados",
    "settings.customProfilesHint": "Añade todos los perfiles locales de límite de caracteres que necesites.",
    "settings.addCustomProfile": "Añadir perfil personalizado",
    "settings.remove": "Eliminar",
    "settings.removeCustomProfile": "Eliminar {name}",
    "settings.removeCustomProfileTitle": "¿Eliminar perfil personalizado?",
    "settings.removeCustomProfileDescription": "¿Eliminar <profile>{name}</profile> de tus perfiles locales de publicación?",
    "settings.removeCustomDefaultDescription": (
        "¿Eliminar <profile>{name}</profile>? El perfil de publicación predeterminado volverá a " +
        "Predeterminado."
    ),
    "settings.defaultAssistantEditMode": "Modo de edición predeterminado del asistente",
    "settings.defaultAssistantEditModeHint": (
        "Las conversaciones de artículos nuevos usan este modo; las existentes conservan el suyo. El modo " +
        "directo omite la revisión de propuestas solo en las ediciones que solicitas explícitamente. Las " +
        "demás propuestas siguen necesitando revisión."
    ),
    "settings.assistantBehavior": "Edición y solicitudes",
    "settings.showExecutionProgress": "Mostrar progreso de ejecución",
    "settings.showExecutionProgressHint": "Muestra la acción actual y un historial de actividad desplegable en el chat del asistente.",
} satisfies Partial<Record<MessageId, string>>;
