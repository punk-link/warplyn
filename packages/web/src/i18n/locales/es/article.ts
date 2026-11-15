import type { MessageId } from "../../messages.js";

export const article = {
    "article.defaultTitle": "Artículo sin título",
    "article.titleGenerationFailed": "Versión guardada sin título del artículo",
    "article.titleContextRequired": "Añade más detalles y guarda otra versión, o cambia el título del artículo.",
    "article.titleGenerationNextStep": (
        "Cambia el título del artículo, o revisa el modelo de generación de texto en la configuración y " +
        "guarda otra versión."
    ),
} satisfies Partial<Record<MessageId, string>>;
