---
description: "Crea y gestiona habilidades reutilizables para tus tareas de escritura y consulta sus versiones guardadas."
---

# Crear y gestionar habilidades

Las *habilidades* son paquetes locales de instrucciones en Markdown. Ayudan al asistente a elegir y ordenar funciones editoriales. No conceden permisos ni modifican un *artículo*.

## Crear y gestionar tus propias habilidades

Pide al asistente con lenguaje sencillo que cree una *habilidad* reutilizable. Explica la tarea recurrente y las reglas o referencias que necesita. Si falta algún detalle que pueda cambiar la *habilidad*, el asistente hará una breve pregunta de seguimiento en vez de adivinar.

::: tip Ejemplo
Para revisar ficción con el estilo de una escena tranquila junto al río, pregunta: «Crea una *habilidad* llamada “Revisión de línea para ficción tranquila”. Haz más concisas las frases de Ana y conserva su voz, el entorno del río y los acontecimientos de la escena. No añadas detalles; marca los pasajes que no estén claros». El asistente podrá reutilizar esas instrucciones cuando le pidas una revisión de línea.
:::

[![Asistente editorial de Warplyn con una solicitud para crear una habilidad de revisión de línea de ficción y Creador de habilidades seleccionado.](/images/skill-creator-example.png)](/images/skill-creator-example.png)

*Ejemplo de solicitud para crear una habilidad en el Composer. Conecta un proveedor antes de enviarla.*

Cuando se crea correctamente, la *habilidad* queda disponible de inmediato para nuevas solicitudes al asistente. La solicitud de creación no envía al modelo el cuerpo de tu *artículo* y no modifica el *artículo*, el *borrador*, la *propuesta* ni la *versión guardada*.

Cada *habilidad* creada tiene un historial local e inmutable de *versiones de habilidad*, independiente del historial de versiones de los *artículos*. También puedes editar directamente el paquete Markdown local. Warplyn actualiza el catálogo para la siguiente solicitud. Al eliminar el archivo `SKILL.md`, la *habilidad* deja de aparecer en la lista de *habilidades* disponibles.

Pide al asistente que revise o elimine una *habilidad* por su nombre. Antes de cambiarla, lee el paquete actual y comprueba si el archivo se modificó mientras tanto. Al revisar una *habilidad*, se conserva su ID y se añade una nueva *versión de habilidad*. Al eliminarla, deja de estar disponible para nuevas solicitudes, pero se conserva su historial.

Para recuperar instrucciones anteriores, pide al asistente las *versiones* de esa *habilidad* e indica cuál restaurar. La restauración crea una nueva versión activa y añade otra *versión de habilidad* al historial. También puedes restaurar así una *habilidad* eliminada. Restaurar un punto de control de una conversación con el asistente no restaura ni modifica ninguna *habilidad*; restaurarla requiere una solicitud independiente.
