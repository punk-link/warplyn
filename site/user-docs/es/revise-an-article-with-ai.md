---
description: "Revisa un artículo con IA en Warplyn: formula una solicitud concreta, compara los cambios propuestos, aplica los que elijas y conserva las versiones anteriores."
---

# Revisar un artículo con IA y comprobar cada cambio

Si ya sabes qué ocurre en la escena, pero el ritmo aún no funciona, puedes pedir ayuda al asistente editorial. Trabaja sobre un pasaje o un *artículo* completo, compara las formulaciones propuestas y aplica los cambios que quieras conservar.

Warplyn es un espacio de escritura de código abierto y con almacenamiento local para Windows y Linux. Tus textos permanecen en tu ordenador. Para usar la IA necesitas conexión a Internet y una clave API de un proveedor compatible. Warplyn envía a ese proveedor el texto y el contexto necesarios para la solicitud. Se aplican sus tarifas y sus políticas de datos.

## Empieza con una solicitud concreta

Abre tu *artículo* y selecciona el pasaje que quieras revisar. En el cuadro de mensaje, describe qué debería mejorar y qué debe conservarse. Por ejemplo, al trabajar en «El río al anochecer»:

> Mejora el ritmo sin perder el punto de vista de Ana ni la atmósfera tranquila. No añadas acontecimientos.

Selecciona **Enviar solicitud editorial**. Warplyn envía la selección con hasta 500 caracteres a cada lado como contexto de solo lectura. Solo se puede sustituir el pasaje seleccionado. Si el texto contiene información sensible, lee el aviso del cuadro de mensaje. Ahí se indica qué texto se enviará. Para obtener más información, consulta [Asistente editorial](editorial-assistant.md).

[![cuadro de mensaje de Warplyn con una solicitud de revisión de ficción.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Ejemplo de una solicitud en el cuadro de mensaje. La captura muestra el nombre anterior de una habilidad.*

## Compara la redacción original y la propuesta

Cuando termine la solicitud, abre la **Revisión de propuestas** desde su tarjeta de resultado. Compara **Original** y **Propuesta** y comprueba que la revisión conserve los acontecimientos, el punto de vista y la voz de la escena.

[![Revisión de propuestas que compara los textos original y propuesto, muestra decisiones individuales y la opción Aplicar.](/images/proposal-review.png)](/images/proposal-review.png)

*Ejemplo de revisión de «El río al anochecer». La redacción generada varía según la solicitud y el modelo.*

Elige **Aceptar** o **Rechazar** para cada cambio. Puedes editar el texto de **Propuesta** antes de aplicarlo. Si Warplyn no puede dividir una *propuesta* de forma segura, te indicará que debes revisarla completa.

## Aplica los cambios y conserva el historial

Elige **Aplicar** después de decidir sobre todos los cambios. Warplyn conserva el texto con los cambios aceptados en una nueva *versión guardada*. Si rechazas todos los cambios, el *artículo* no cambia y no se crea ninguna *versión guardada*. Las decisiones por sí solas no modifican tu texto.

Abre el **Historial de versiones** para consultar versiones guardadas anteriores. Al restaurar una versión anterior, Warplyn crea otra *versión guardada* con ese texto. Las versiones intermedias quedan en el historial. Consulta [Revisar artículos](reviewing-articles.md) para conocer las opciones de recuperación y las *propuestas* obsoletas.

Las revisiones de IA pueden no reflejar tu intención o cambiar detalles que querías conservar. Revisa el resultado antes de aplicarlo y, si hace falta, vuelve a pedirlo con una solicitud más concreta. Una solicitud cancelada o fallida no modifica el *artículo*.

## Pruébalo con tus textos

[Descarga Warplyn](https://github.com/punk-link/warplyn/releases/latest), sigue la [guía de instalación](installation.md) y conecta un [proveedor de IA](providers.md) compatible. Los instaladores de Windows no están firmados; la guía de instalación explica la advertencia que podrías ver.
