---
description: "Escribe y organiza artículos, entiende cómo se guardan los borradores y configura la ayuda ortográfica local."
---

# Escribir y organizar artículos

Un *artículo* es un texto de tu biblioteca de Warplyn. Mientras escribes, Warplyn guarda el *borrador* para que puedas recuperarlo. Una *versión guardada* conserva el texto tal como estaba en un momento concreto del historial.

## Guardar indicaciones junto a un pasaje {#editor-notes}

Las *notas editoriales* guardan instrucciones para futuras tareas del Asistente junto a un pasaje. Úsalas para conservar el punto de vista o evitar que una pista se revele demasiado pronto. Se guardan por separado del texto del artículo y no aparecen al copiarlo o exportarlo.

Selecciona el pasaje en el editor. Elige **Añadir nota editorial…** en la barra de formato o en el menú contextual. Escribe la instrucción en **Indicaciones para el Asistente** y elige **Guardar nota**. Guardar una nota no inicia una solicitud ni crea una versión guardada del artículo.

::: tip Ejemplo de El río al anochecer
Selecciona el párrafo donde Ana ve el bote: "Mantén la incertidumbre de Ana sobre quién es el dueño del bote. Conserva los sonidos del río y no reveles la identidad del pasajero." Más adelante, pide al Asistente que mejore el ritmo de ese pasaje.
:::

Abre **Notas editoriales** desde la barra de formato o desde un pequeño marcador numerado junto al texto. Al pasar el puntero sobre un marcador o enfocarlo con el teclado, el pasaje se resalta temporalmente. Elige la vista previa en la lista para localizarlo. Usa **Editar nota…** y después **Guardar nota** para cambiar las indicaciones. El botón de eliminar borra solo la nota.

Guarda los cambios antes de cerrar el diálogo o cambiar de nota. Si hay cambios sin guardar, puedes cancelar para seguir editando o elegir **Descartar cambios** para salir sin guardarlos.

Si aparece **Necesita vincularse de nuevo**, ya no se puede identificar el pasaje original. La nota se conserva, pero no orienta el trabajo hasta volver a adjuntarla. Cierra el diálogo, selecciona el nuevo pasaje y vuelve a abrir la nota desde **Notas editoriales** y **Editar nota…**. Elige **Adjuntar al texto seleccionado** y después **Guardar nota**.

Las notas adjuntas acompañan las solicitudes explícitas del Asistente que trabajan en sus pasajes. Si seleccionas texto, solo se envían las notas que coinciden con esa selección. Revisa **Notas que acompañan esta solicitud** en el cuadro de solicitud antes de enviar. Escribe allí la tarea inmediata y reserva la nota para indicaciones que quieras conservar.

Para procedimientos reutilizables, consulta [Skills](skills.md); para muestras de escritura y pautas generales, consulta [Perfil de estilo](style-profile.md).

## Escribir y guardar un artículo

Elige **Nuevo artículo** en la Biblioteca para empezar. Cambia el nombre del *artículo* desde el campo de título. Usa la barra de formato para aplicar encabezados, listas, énfasis, enlaces, citas y código. Al pegar texto con formato, Warplyn conserva los formatos compatibles y elimina las marcas no seguras o no compatibles. Guarda el *artículo* como Markdown, por lo que no se conservan los diseños de página complejos ni los elementos incrustados.

Warplyn guarda automáticamente el *borrador* actual mientras editas. Un punto de control es texto de trabajo recuperable, no una nueva entrada del Historial de versiones. Consulta el indicador de estado de guardado en la Barra de estado del artículo para saber si las ediciones recientes se han guardado como punto de control. Warplyn también guarda un punto de control pendiente cuando cambias de *artículo* o abres Configuración.

[![Espacio de escritura con «El río al anochecer» en el editor, barra de formato, Biblioteca e indicador de borrador guardado.](/images/writing-workspace.png)](/images/writing-workspace.png)

*Ejemplo de un artículo guardado como borrador en el espacio de escritura.*

Elige **Guardar versión** cuando quieras conservar el *borrador* actual como un punto identificado de su historial. Guardar una *versión guardada* no elimina las anteriores. Si el texto local y el *borrador* guardado ya no coinciden, consulta [Revisar artículos](reviewing-articles.md#recover-a-draft).

## Buscar y organizar artículos

Usa la búsqueda de la Biblioteca para encontrar *artículos*, incluidos los archivados. Elige **Artículos** para ver el trabajo fijado y reciente, o **Archivo** para consultar grupos de *artículos* archivados. La Barra de navegación contraída ofrece accesos directos a **Nuevo artículo**, **Buscar**, **Artículos** y **Archivo**. Fija un *artículo* original desde su menú de la Biblioteca para conservar un acceso directo en la barra. Usa **Subir** o **Bajar** para cambiar el orden de los *artículos* fijados. Fijarlos y reordenarlos no modifica su contenido. Cambia el nombre de un *artículo* desde su campo de título.

Elige **Archivar artículo** para retirar un grupo de *artículos* de la lista activa y conservarlo en **Archivo**. Selecciona el grupo archivado y elige **Desarchivar artículo** para recuperarlo. Para eliminar un *artículo* se necesita confirmación; se borran sus *versiones guardadas* y *borradores* recuperables. Al eliminar el original también se eliminan sus *traducciones* vinculadas; al eliminar una *traducción*, el *artículo* de origen permanece. Si solo quieres apartarlo, archívalo.

## Usar la ayuda ortográfica

El editor marca posibles errores ortográficos mediante la asistencia de tu dispositivo. En la aplicación de escritorio, haz clic con el botón derecho en una palabra marcada para elegir una sugerencia o **Añadir al diccionario**. Una corrección es una edición normal: se puede deshacer y pasa a formar parte del *borrador* actual. La revisión ortográfica permanece en tu dispositivo y no envía el texto del *artículo* a ningún proveedor de IA.

En **Configuración** → **Ortografía** de escritorio, usa **Filtrar idiomas** para encontrar uno, selecciónalo en **Preparar para escribir sin conexión** y elige **Descargar diccionarios**. Espera a que el estado indique **Descargado** antes de confiar en él sin conexión. **Disponible** significa que el idioma es compatible; no confirma que el diccionario haya terminado de descargarse. Elige **Desactivar** para dejar de usar un diccionario preparado durante esta sesión. Preparar diccionarios no cambia el idioma de un *artículo*. La descarga requiere conexión a Internet. En Windows, añadir o quitar palabras personales también afecta al diccionario del sistema operativo y puede afectar a otras aplicaciones.

En **Diccionario personal**, busca palabras guardadas o escribe una palabra o término técnico por línea en **Palabras para añadir** y elige **Añadir palabras**. Puedes añadir hasta 500 palabras a la vez. Quita las palabras guardadas si quieres que la ayuda ortográfica vuelva a marcarlas. La lista se comparte entre *artículos* e idiomas. La aplicación web usa la configuración ortográfica del navegador y no permite gestionar diccionarios.

Usa el **Modo de concentración** para ocultar los dos paneles auxiliares mientras escribes. Vuelve a seleccionarlo para mostrarlos. Usa el control de cada panel para contraerlo o abrirlo; arrastra el separador situado junto a un panel para cambiar su tamaño. En ventanas estrechas, los paneles pueden abrirse como cajones temporales sobre el editor.

Con el teclado, usa **Tab** y **Mayús + Tab** para recorrer la Biblioteca, el encabezado del artículo, las vistas, la barra de formato, el editor, la barra de estado y el asistente. Dentro del editor, la búsqueda y el cuadro de mensaje siguen funcionando las teclas habituales de edición de texto. Configuración tiene su propia navegación por teclado. En la barra lateral de escritorio, usa **Arriba**, **Abajo**, **Inicio** o **Fin** para moverte entre secciones y luego **Intro** o **Espacio** para abrir una.

Para importar o exportar un *artículo* completo desde Warplyn, consulta [Archivos de artículos](article-files.md). Para guardar copias de seguridad de todo el espacio de trabajo, consulta [Copias de seguridad y recuperación](backups-and-recovery.md).
