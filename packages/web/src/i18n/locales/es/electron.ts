import type { MessageId } from "../../messages.js";


export const electronMessages = {
    "electron.articleFiles.docx": "Archivos Word",
    "electron.articleFiles.html": "Archivos HTML",
    "electron.articleFiles.load": "Cargar artículo desde un archivo",
    "electron.articleFiles.markdown": "Archivos Markdown",
    "electron.articleFiles.rtf": "Archivos de texto enriquecido",
    "electron.articleFiles.save": "Guardar artículo en un archivo",
    "electron.closeFailed.message": "El punto de control se guardó, pero la base de datos local no se cerró correctamente.",
    "electron.closeFailed.title": "Warplyn no pudo cerrarse correctamente",
    "electron.deleteData.backup": "Crear una copia de seguridad antes de eliminar",
    "electron.deleteData.cancel": "Cancelar",
    "electron.deleteData.delete": "Eliminar todos los datos locales",
    "electron.deleteData.detail": (
        "Warplyn se cerrará después de la eliminación. Puedes crear antes una copia de seguridad si has configurado una" +
        " carpeta para ello."
    ),
    "electron.deleteData.message": (
        "Esto elimina de forma permanente los artículos, puntos de control de borradores, versiones guardadas" +
        ", historial del asistente, datos de estilo, configuración y copias de seguridad locales de la carpet" +
        "a de datos de Warplyn."
    ),
    "electron.deleteData.title": "¿Eliminar todos los datos locales de Warplyn?",
    "electron.draftCheckpointFailed.detail": "Vuelve al artículo e inténtalo de nuevo, o sal sin los últimos cambios sin guardar.",
    "electron.draftCheckpointFailed.message": "Warplyn no pudo guardar el último punto de control del borrador.",
    "electron.draftCheckpointFailed.quit": "Salir sin el último punto de control",
    "electron.draftCheckpointFailed.return": "Volver al artículo",
    "electron.draftCheckpointFailed.title": "No se pudo guardar el punto de control",
    "electron.restoreBackup.cancel": "Cancelar",
    "electron.restoreBackup.detail": (
        "Warplyn guardará los últimos puntos de control, conservará una copia de recuperación de los datos ac" +
        "tivos y se reiniciará. Las conexiones de IA existentes permanecen locales. Se pueden restaurar refer" +
        "encias a variables de entorno; nunca se importan claves de API ni valores de variables. Esto no se p" +
        "uede deshacer desde la configuración."
    ),
    "electron.restoreBackup.message": "Esto sustituye los datos locales activos de Warplyn por la copia de seguridad seleccionada.",
    "electron.restoreBackup.restore": "Restaurar y reiniciar",
    "electron.restoreBackup.title": "¿Restaurar esta copia de seguridad?",
    "electron.restoreFailed.message": (
        "Cierra las otras ventanas de Warplyn o los servidores locales de desarrollo que usen estos datos e inténtalo d" +
        "e nuevo. Tus datos activos no han cambiado."
    ),
    "electron.restoreFailed.title": "No se pudo restaurar la copia de seguridad",
    "electron.spelling.addWord": "Añadir al diccionario",
    "electron.startFailed.message": "Comprueba que la carpeta de datos locales esté disponible e inténtalo de nuevo.",
    "electron.startFailed.title": "Warplyn no pudo iniciarse",
} satisfies Partial<Record<MessageId, string>>;
