import type { MessageId } from "../../messages.js";


export const quickStartMessages = {
    "quickStart.addModelKey": "Añadir clave de modelo",
    "quickStart.assistant.description": (
        "Usa el panel derecho para ediciones, revisiones, traducciones y verificaciones de datos. Los cambios" +
        " de IA siguen siendo propuestas hasta que los aceptas, y las observaciones son orientativas."
    ),
    "quickStart.assistant.title": "Consulta al asistente.",
    "quickStart.close": "Cerrar guía rápida",
    "quickStart.modelKey.description": (
        "Una clave de modelo es una clave de API de un proveedor de IA. En la aplicación de escritorio, elige" +
        " un proveedor, pega la clave, guárdala en el almacén de credenciales del sistema operativo, actualiz" +
        "a los modelos y elige uno predeterminado. Warplyn nunca vuelve a mostrar una clave guardada."
    ),
    "quickStart.modelKey.title": "Añade una clave de modelo.",
    "quickStart.skip": "Omitir guía rápida",
    "quickStart.startWriting": "Empezar a escribir",
    "quickStart.title": "Te damos la bienvenida a Warplyn",
    "quickStart.write.description": (
        "Crea o abre un artículo en el panel izquierdo y escribe en el espacio central. Warplyn conserva el e" +
        "stado de recuperación del borrador y el historial de versiones guardadas."
    ),
    "quickStart.write.title": "Escribe un artículo.",
} satisfies Partial<Record<MessageId, string>>;
