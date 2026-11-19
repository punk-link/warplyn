---
description: "Usa el asistente editorial de Warplyn para redactar, revisar, verificar datos, revisar el estilo y traducir. Comprueba los cambios generados antes de aceptarlos."
---

# Asistente editorial

Usa el asistente editorial cuando necesites ayuda para redactar, revisar, verificar datos, analizar el estilo o preparar una traducción. Cuando eliges una *habilidad* en **Acciones rápidas**, Warplyn la añade al cuadro de mensaje. La solicitud empieza cuando seleccionas **Enviar solicitud editorial**.

Seleccionar texto permite limitar los cambios a ese pasaje. Las definiciones y los rasgos de estilo de las frases cercanas pueden ayudar al asistente a entender un pasaje breve. Para ello, el proveedor puede recibir parte del texto que queda fuera de la selección. Si la solicitud necesita texto del *artículo*, Warplyn envía el pasaje seleccionado y hasta 500 caracteres a cada lado. El texto de alrededor solo sirve como contexto. Solo se puede sustituir el pasaje seleccionado. El cuadro de mensaje lo explica antes del envío; no envíes la solicitud si el texto cercano es sensible. Los consejos generales y la gestión de *habilidades* no necesitan este texto. Warplyn nunca amplía silenciosamente el contexto al *artículo* completo. Si el contexto no basta, incluye explícitamente el pasaje pertinente o vuelve a preguntar con otra selección.

::: tip Ejemplo
Al revisar un relato, selecciona un pasaje y pregunta: «Mejora el ritmo sin perder el punto de vista de Ana ni la atmósfera tranquila. No añadas acontecimientos». El asistente prepara una *propuesta* para la **Revisión de propuestas**. También puedes pedirle que busque cambios entre pasado y presente en un capítulo; las *observaciones* de la revisión de estilo aparecen en el **Perfil de estilo**.
:::

[![Asistente editorial de Warplyn con una solicitud de revisión de ficción y una habilidad seleccionada.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Ejemplo de solicitud en el cuadro de mensaje. Conecta un proveedor antes de enviarla. La captura muestra el nombre anterior de una habilidad.*

Mientras trabaja, el asistente muestra un mensaje breve sobre el estado de la solicitud. Elige **Detener solicitud** para cancelar una tarea que esté tardando demasiado. Una solicitud cancelada o fallida no modifica el *artículo*; elige **Reintentar** si quieres volver a ejecutarla. El asistente no muestra prompts, entradas privadas, credenciales ni errores del proveedor. Cuando el resultado esté listo, ábrelo desde la tarjeta correspondiente:

- **Revisión de propuestas** para texto generado o revisado.
- **Verificación de datos** para *observaciones* orientativas.
- **Perfil de estilo** para *observaciones* de la revisión de estilo.
- **Traducciones** para una *propuesta* de traducción.

Abrir un resultado no modifica el *artículo*. Revisa una *propuesta* antes de aceptar sus cambios. Las *observaciones* siguen siendo orientativas, y las traducciones permanecen como *artículos* vinculados e independientes. Consulta [Revisar artículos](reviewing-articles.md) para obtener información sobre propuestas, historial, recuperación y verificación de datos. Consulta [Traducciones](translations.md) para comparar y usar los resultados de traducción.

Para revisar específicamente términos técnicos, elige **Verificar términos técnicos** en **Acciones rápidas**. Sus *observaciones* con fuentes aparecen en **Verificación de datos**. Consulta [Verificar términos técnicos](built-in-skills/check-technical-terms.md) para conocer los pasos y los límites de esa revisión.

En la **Revisión de propuestas**, edita el texto de **Propuesta** directamente tanto en la vista **En paralelo** como en **Apilada**. **Original** permanece en modo de solo lectura. Al editar se conserva la decisión **Aceptar** o **Rechazar** de cada cambio. Decide sobre cada cambio y luego selecciona **Aplicar** para finalizar la revisión. El texto aceptado crea una nueva *versión guardada*. Si se rechazan todas las sugerencias, **Aplicar** cierra la revisión sin modificar el *artículo* ni crear una *versión guardada*. Para aceptar todos los cambios, elige **Marcar todos como aceptados** en **Establecer todas las decisiones…** y luego aplica. **Marcar todos como rechazados** deja el *artículo* sin cambios. **Restablecer todas las decisiones** devuelve cada sugerencia a Pendiente y conserva tus ediciones del texto propuesto. Elige **Descartar propuesta** para cerrar la revisión.

Las ediciones aún no aplicadas se conservan al cambiar de diseño o de vista del espacio de trabajo. Al recargar, cambiar de *artículo*, descartar la *propuesta* o generar otra, se borran esas ediciones. Si la aplicación de cambios falla, se conservan para que puedas volver a intentarlo. Mantén sin cambios los números, enlaces, código y términos técnicos propuestos. Las *propuestas* obsoletas, poco fiables y ya aceptadas son de solo lectura. Si editas el texto de una corrección factual, sus *observaciones* siguen siendo orientativas tras aplicarla.

Las *habilidades* ayudan a definir una solicitud, pero no añaden permisos. Si no eliges una *habilidad*, el asistente busca las que encajen con tu solicitud. No dirige las solicitudes comunes por un flujo de edición predeterminado. Warplyn no ejecuta tareas en segundo plano, no publica directamente ni modifica un *artículo* sin tu aprobación.

Pide al asistente que cree una [habilidad](skills.md) reutilizable si quieres volver a disponer de un procedimiento. Si el propósito, los pasos o las referencias no están claros, puede hacer una breve pregunta de seguimiento. La *habilidad* creada está disponible de inmediato y tiene su propio historial local de *versiones de habilidad*. Crearla no lee el cuerpo de tu *artículo* ni modifica su *borrador*, *propuesta* o *versión guardada*.

Puedes pedir al asistente editorial que examine el **Historial de versiones**, el trabajo editorial guardado, las indicaciones de publicación o el estado del corpus de estilo. Si se lo pides expresamente, puede añadir la *versión guardada* e inmutable actual al corpus de estilo local y volver a generar el perfil. No puede aceptar *propuestas*, restaurar *versiones guardadas*, resolver *observaciones*, editar *borradores*, eliminar muestras de estilo ni publicar.

Para consultar muestras de escritura, indicaciones reutilizables o reglas tipográficas, abre el [Perfil de estilo](style-profile.md). Las *observaciones* de revisión de estilo aparecen allí y permanecen separadas del *artículo*.
