import type { MessageId } from "../../messages.js";


export const settingsBackupsMessages = {
    "settings.automaticBackupFailed": (
        "Falló la copia de seguridad automática. Comprueba la carpeta en Datos y copias de seguridad y crea una copia m" +
        "anual. Tus artículos no han cambiado."
    ),
    "settings.automaticBackups": "Copias de seguridad automáticas",
    "settings.automaticBackupsHint": (
        "Al activarlas, crea una copia poco después de iniciar y cada 24 horas desde esa ejecución mientras W" +
        "arplyn siga abierto. Las copias manuales nunca se eliminan automáticamente."
    ),
    "settings.backupAutomation": "Copias de seguridad automáticas",
    "settings.backupCreateFailed": (
        "No se pudo crear la copia. Comprueba la carpeta seleccionada y los límites de tamaño del navegador e inténtalo" +
        " de nuevo. La sesión de edición no ha cambiado."
    ),
    "settings.backupCreateUnavailable": "Las copias de seguridad no están disponibles en esta sesión del navegador.",
    "settings.backupCreated": "Se creó {name}",
    "settings.backupCreating": "Creando copia de seguridad…",
    "settings.backupFolder": "Carpeta de copias de seguridad",
    "settings.backupFolderFailed": "No se pudo elegir esa carpeta. Inténtalo de nuevo.",
    "settings.backupFolderHint": "Elige una carpeta local para las copias de seguridad. Warplyn solo puede escribir en ella después de que la elijas.",
    "settings.backupFolderPermissionDenied": "Warplyn no puede acceder a esa carpeta. Elígela de nuevo y permite el acceso.",
    "settings.backupFolderRequired": "Elige primero una carpeta de copias de seguridad.",
    "settings.backupFolderSelected": "Usando {folderName}",
    "settings.backupFolderUnsupported": "Este navegador no permite elegir una carpeta de copias de seguridad.",
    "settings.backupSaveFailed": "No se pudo guardar la configuración de copias de seguridad. Se conserva la anterior. Inténtalo de nuevo.",
    "settings.backupStorage": "Almacenamiento de copias de seguridad",
    "settings.chooseBackup": "Elegir copia",
    "settings.chooseBackupFolder": "Elegir carpeta…",
    "settings.createBackup": "Crear copia",
    "settings.createBackupHint": (
        "Copia tus artículos, versiones guardadas, configuración, habilidades del autor e historial de habili" +
        "dades. En el navegador se admiten archivos de hasta 100 MB y 500 MB en total. Se excluyen las claves" +
        " de API."
    ),
    "settings.dataBackups": "Datos y copias",
    "settings.keepAllBackups": "Conservar todas las copias",
    "settings.keepBackups": "Conservar {count} copias",
    "settings.restoreBackup": "Restaurar copia",
    "settings.restoreBackupConfirm": "¿Restaurar {name}? Warplyn sustituirá los datos locales activos y se recargará.",
    "settings.restoreBackupFailed": (
        "No se pudo restaurar esa copia. Comprueba sus archivos y los límites del navegador o elige otra. Tus datos act" +
        "ivos no han cambiado."
    ),
    "settings.restoreBackupHint": (
        "Elige una copia de la carpeta seleccionada. Warplyn comprueba sus archivos, conserva una copia de re" +
        "cuperación y restaura sus artículos, versiones guardadas, configuración y habilidades guardadas. Las" +
        " conexiones de IA existentes permanecen locales. Se pueden restaurar referencias a variables de ento" +
        "rno; nunca se importan claves de API ni valores de variables. Las copias antiguas de solo base de da" +
        "tos conservan tus habilidades actuales."
    ),
    "settings.restoreBackupUnavailable": "No se puede restaurar esa copia.",
    "settings.retention": "Conservación de copias automáticas",
    "settings.retentionHint": "Controla cuántas copias automáticas conserva Warplyn. Las copias manuales nunca se eliminan automáticamente.",
    "settings.revealBackupFolder": "Mostrar carpeta",
} satisfies Partial<Record<MessageId, string>>;
