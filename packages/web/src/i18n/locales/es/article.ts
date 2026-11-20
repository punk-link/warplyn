import type { MessageId } from "../../messages.js";


export const articleMessages = {
    "article.defaultTitle": "Artículo sin título",
    "article.titleContextRequired": "Añade más detalles y guarda otra versión, o cambia el título del artículo.",
    "article.titleGenerationFailed": "Versión guardada sin título del artículo",
    "article.titleGenerationNextStep": (
        "Cambia el título del artículo, o revisa el modelo de generación de texto en la configuración y guard" +
        "a otra versión."
    ),
} satisfies Partial<Record<MessageId, string>>;
