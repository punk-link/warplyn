---
description: "Guarda o carga artículos completos como archivos Markdown, HTML, DOCX o RTF."
---

# Archivos de artículos

Usa **Guardar en archivo** y **Cargar desde archivo** para trasladar *artículos* completos entre Warplyn y otras herramientas de escritura. Estas acciones están disponibles en la aplicación de escritorio y en la web.

## Guardar en archivo

1. Abre el *artículo* que quieras guardar.
2. En el encabezado del artículo, elige **Guardar en archivo** junto a **Guardar versión**. También puedes hacer clic con el botón derecho en un *artículo* de la Biblioteca y elegir **Guardar en archivo…** sin abrirlo.
3. En la ventana para guardar de la aplicación de escritorio, selecciona Markdown, HTML, DOCX o RTF en el menú de tipo de archivo y elige un nombre y una ubicación. Conserva la extensión correspondiente. En la aplicación web, selecciona **Formato de archivo**, luego **Descargar** y usa los controles de descarga del navegador.

El archivo contiene todo el *borrador* actual, incluidas las ediciones sin guardar. Aunque selecciones un fragmento, el archivo incluirá todo el *borrador*. Esta acción no crea una *versión guardada*. Para añadir el *borrador* al historial, elige **Guardar versión**.

::: tip ¿Necesitas una copia portátil de tu espacio de trabajo?
Los archivos de *artículo* solo contienen texto. Para conservar el historial, el trabajo del asistente, las *habilidades* y la configuración, crea una [copia de seguridad](backups-and-recovery.md).
:::

La aplicación web informa **Se ha iniciado la descarga del artículo** cuando entrega el archivo al navegador. Comprueba las descargas del navegador para confirmar que terminó o detectar errores.

## Cargar desde archivo

1. En el encabezado del artículo, elige **Cargar desde archivo** junto a **Guardar versión**, o haz clic con el botón derecho en un *artículo* de la Biblioteca y elige **Cargar desde archivo…**. Si la biblioteca está vacía, selecciona **Crear** primero.
2. Selecciona un archivo `.md`, `.html`, `.htm`, `.docx` o `.rtf`.
3. Para HTML, DOCX y RTF, marca **Revisar artículo importado** y selecciona **Importar**. Puedes cancelar la revisión. Los archivos Markdown se abren directamente.
4. Warplyn abre el texto importado como un *artículo* independiente. El *artículo* anterior y su *borrador*, que puedes recuperar, siguen disponibles en la Biblioteca.

Si el texto empieza con un encabezado de nivel uno, Warplyn lo usa como título. Si no, toma el nombre del archivo sin la extensión. El encabezado se conserva en el cuerpo del *artículo*. Si vuelves a cargar el mismo archivo, se crea otro *artículo* independiente.

::: warning La importación crea un artículo independiente
Cargar un archivo no reemplaza el *artículo* desde el que abriste el selector. Revisa el *artículo* importado y, si hace falta, mueve o elimina cualquiera de los dos.
:::

Elige un archivo de hasta 10 MiB. Markdown y HTML deben usar UTF-8. DOCX y RTF funcionan sin tener Microsoft Office instalado.

Warplyn conserva párrafos, encabezados, listas anidadas y numeración editables, negrita, cursiva, tachado, enlaces seguros, citas, código y texto Unicode cuando el formato de origen lo permite. Es posible que omita o simplifique la disposición de página, las fuentes, imágenes, objetos incrustados y funciones complejas propias del formato. El texto de las tablas pasa a ser contenido normal del *artículo*. Comprueba la vista previa de importación antes de continuar. Las extensiones de Markdown no compatibles también pueden perder formato en el editor.

Puedes cancelar el selector de archivos sin importar nada. Si no se puede guardar el *borrador* actual para recuperarlo, corrige el error de guardado e intenta cargar el archivo de nuevo.

## Guardar una versión en un archivo

1. Abre **Versiones**.
2. Abre la *versión guardada* que quieras exportar.
3. Elige **Guardar en archivo** junto a sus detalles.

El archivo contiene el *artículo* completo de esa *versión guardada*, independientemente del *borrador* actual. Exportar no restaura la *versión* ni cambia el historial. El nombre de archivo sugerido incluye el número de *versión*.

La exportación de archivos también tiene un límite de 10 MiB. Si falla el guardado desde la aplicación de escritorio, elige una ubicación donde puedas escribir e inténtalo de nuevo. Si Warplyn no logra reemplazar un archivo existente, ese archivo queda intacto.

Los archivos exportados contienen el texto del *artículo*, no el historial completo, las conversaciones ni la configuración. Para proteger todo el espacio de trabajo, consulta [Copias de seguridad y recuperación](backups-and-recovery.md).
