---
description: "Crea y gestiona habilidades reutilizables para tus tareas de escritura y consulta sus versiones guardadas."
---

# Crear y gestionar habilidades

Las *habilidades* son instrucciones que Warplyn guarda en tu dispositivo en formato Markdown. Indican al asistente qué funciones editoriales usar y en qué orden. No conceden permisos ni modifican un *artículo*.

## Crear y gestionar tus propias habilidades

Pide al asistente, con tus propias palabras, que cree una *habilidad* para una tarea que haces a menudo. Explica en qué consiste y qué reglas o fuentes debe tener en cuenta. Si falta algún detalle que pueda cambiar la *habilidad*, el asistente hará una breve pregunta de seguimiento en vez de adivinar.

::: tip Ejemplo
Para revisar ficción con el estilo de una escena tranquila junto al río, pregunta: «Crea una *habilidad* llamada “Pulir escenas tranquilas”. Haz más concisas las frases de Ana y conserva su voz, el entorno del río y los acontecimientos de la escena. No añadas detalles; marca los pasajes que no estén claros». El asistente podrá reutilizar esas instrucciones cuando le pidas que pula otra escena.
:::

[![Asistente editorial de Warplyn con una solicitud para crear una habilidad de revisión de línea de ficción y Creador de habilidades seleccionado.](/images/skill-creator-example.png)](/images/skill-creator-example.png)

*Ejemplo de solicitud para crear una habilidad en el cuadro de mensaje. Conecta un proveedor antes de enviarla.*

Cuando se crea correctamente, la *habilidad* queda disponible de inmediato para nuevas solicitudes al asistente. La solicitud de creación no envía al modelo el cuerpo de tu *artículo* y no modifica el *artículo*, el *borrador*, la *propuesta* ni la *versión guardada*.

Cada *habilidad* creada tiene un historial local e inmutable de *versiones de habilidad*, independiente del historial de versiones de los *artículos*. También puedes editar directamente el paquete Markdown local. Warplyn actualiza el catálogo para la siguiente solicitud. Al eliminar el archivo `SKILL.md`, la *habilidad* deja de aparecer en la lista de *habilidades* disponibles.

Pide al asistente que revise o elimine una *habilidad* por su nombre. El asistente lee las instrucciones actuales y, antes de guardar los cambios, comprueba si alguien ha modificado el archivo desde entonces. Al revisar una *habilidad*, se conserva su ID y se añade una nueva *versión de habilidad*. Al eliminarla, deja de estar disponible para nuevas solicitudes, pero se conserva su historial.

Para recuperar instrucciones anteriores, pide al asistente las *versiones* de esa *habilidad* e indica cuál restaurar. La restauración crea una nueva versión activa y añade otra *versión de habilidad* al historial. También puedes restaurar así una *habilidad* eliminada. Para restaurar una *habilidad*, envía una solicitud aparte. Al restaurar un punto de control de la conversación, las *habilidades* quedan como estaban.
