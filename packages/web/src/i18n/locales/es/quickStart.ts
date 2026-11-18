import type { MessageId } from "../../messages.js";

export const quickStart = {
    "quickStart.title": "Te damos la bienvenida a Warplyn",
    "quickStart.close": "Cerrar guía rápida",
    "quickStart.write.title": "Escribe un artículo.",
    "quickStart.write.description": (
        "Crea o abre un artículo en el panel izquierdo y escribe en el espacio central. Warplyn conserva el " +
        "estado de recuperación del borrador y el historial de versiones guardadas."
    ),
    "quickStart.assistant.title": "Consulta al asistente.",
    "quickStart.assistant.description": (
        "Usa el panel derecho para ediciones, revisiones, traducciones y verificaciones de datos. Los cambios " +
        "de IA siguen siendo propuestas hasta que los aceptas, y las observaciones son orientativas."
    ),
    "quickStart.modelKey.title": "Añade una clave de modelo.",
    "quickStart.modelKey.description": (
        "Una clave de modelo es una clave de API de un proveedor de IA. En la aplicación de escritorio, elige " +
        "un proveedor, pega la clave, guárdala en el almacén de credenciales del sistema operativo, actualiza " +
        "los modelos y elige uno predeterminado. Warplyn nunca vuelve a mostrar una clave guardada."
    ),
    "quickStart.skip": "Omitir guía rápida",
    "quickStart.addModelKey": "Añadir clave de modelo",
    "quickStart.startWriting": "Empezar a escribir",
} satisfies Partial<Record<MessageId, string>>;
