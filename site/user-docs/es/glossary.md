---
description: "Consulta las definiciones de artículos, borradores, versiones guardadas, propuestas, observaciones y habilidades de Warplyn."
---

# Glosario de Warplyn

Aquí encontrarás los términos que aparecen en Warplyn y en esta guía.

## Artículos y versiones

- **Artículo**: texto de tu biblioteca que puedes recuperar por separado. Warplyn usa «artículo» en lugar de «documento».
- **Biblioteca de artículos**: colección local de *artículos* de la persona autora. El **artículo actual** está abierto en el espacio de trabajo; la **lista de artículos** muestra la colección.
- **Borrador**: texto de un *artículo* que se está editando y aún no se ha guardado como *versión guardada*.
- **Punto de control del borrador**: estado recuperable y modificable de un *borrador*, guardado localmente y vinculado a una *versión guardada* de base. No es una *versión guardada*. Un **borrador actual** se basa en la *versión guardada* actual del *artículo*; un **borrador obsoleto** se basa en una versión anterior.
- **Versión guardada**: texto de un *artículo* tal como estaba al guardarlo. Una vez guardada, esa versión ya no cambia.
- **Guardar una versión**: acción explícita de la persona autora para guardar un *borrador actual* como una nueva *versión guardada*. Solo elimina el punto de control correspondiente del *borrador*.
- **Propuesta**: texto o cambios que sugiere la IA y que la persona autora debe aprobar para incorporarlos al *artículo*.
- **Versión de base de la propuesta**: *versión guardada* que se revisó para generar una *propuesta*. La *propuesta* queda obsoleta cuando deja de coincidir con la *versión guardada* actual.
- **Selección de cambios**: parte de una *propuesta* que la persona autora decide aceptar. La aceptación crea una nueva *versión guardada*.
- **Observación**: resultado informativo, como una comprobación de datos o una revisión de estilo, que no modifica un *artículo*.
- **Artículo de origen** y **artículo traducido**: *artículos* vinculados que pueden recuperarse por separado. Una traducción nunca es una *versión guardada* de su artículo de origen.

## Trabajo editorial

- **Capacidad editorial**: operación validada de Warplyn que declara qué contexto del *artículo* puede usar, cuáles son sus requisitos previos y qué resultado produce. Las vistas del espacio de trabajo y las habilidades del asistente pueden invocar la misma capacidad.
- **Habilidad**: paquete de instrucciones reutilizable que ayuda al asistente a elegir y ordenar capacidades editoriales para una solicitud. Una *habilidad* no concede capacidades ni permisos. Una **habilidad integrada** se incluye con Warplyn. Una **habilidad creada por la persona autora** es un paquete Markdown local creado en el chat del asistente y tiene su propio historial de *versiones de habilidad*.
- **Operación editorial**: actividad del asistente solicitada por la persona autora, como redactar, mejorar la fluidez, comprobar datos, revisar el estilo o traducir.
- **Solicitud editorial**: una ejecución de una operación editorial.
- **Sesión editorial**: secuencia de interacciones e historial de actividad de las solicitudes editoriales.
- **Indicaciones editoriales**: instrucciones o contexto que la persona autora proporciona con una solicitud editorial.
- **Corpus de estilo**: muestras de escritura locales proporcionadas por la persona autora. El **perfil de estilo** resume los rasgos de escritura que Warplyn identifica en esas muestras.
- **Etapa del flujo de trabajo**: orientación opcional sobre el progreso, elegida por la persona autora. No ejecuta IA ni modifica el contenido de un *artículo*.

## Publicación y ajustes

- **Perfil de publicación**: pautas configurables para una plataforma, incluido un límite de caracteres. El perfil predeterminado solo se aplica a *artículos* nuevos.
- **Texto para publicar**: Markdown o texto sin formato que se copia explícitamente del *artículo* actual mediante la barra de estado del artículo. Warplyn no incluye una vista del espacio de trabajo llamada Vista previa de publicación.
- **Ajustes de la aplicación**: preferencias del espacio de trabajo, configuración de IA, perfiles de publicación y gestión de datos locales. Los ajustes nunca forman parte del historial de *versiones guardadas* de un *artículo*.
- **Conexión de IA**: configuración de proveedor con nombre en el servidor y un origen de credenciales. La **conexión de IA activa** se usa para las nuevas solicitudes editoriales.
- **Origen de credenciales**: origen privado que utiliza una conexión de IA. Puede ser una referencia a una variable de entorno o una credencial administrada.
- **Credencial administrada**: clave API guardada en el almacén de credenciales del sistema operativo. Warplyn conserva los metadatos de la conexión, pero nunca escribe la clave en SQLite ni en una copia de seguridad.
- **Preferencia de modelo**: identificador del modelo predeterminado o una excepción específica para una operación editorial.
- **Idioma de la interfaz**: idioma de la interfaz de Warplyn, distinto de los idiomas de los *artículos* y de las traducciones.
- **Idioma predeterminado de los artículos**: idioma que se asigna a un *artículo* nuevo cuando no se especifica ninguno.
- **Idiomas de traducción predeterminados**: idiomas ordenados que se ofrecen primero para las solicitudes de traducción. Nunca inician traducciones automáticamente.
- **Destino de las copias de seguridad**: carpeta local donde Warplyn guarda las copias de seguridad.
- **Instantánea de copia de seguridad**: copia coherente de los datos locales en un momento concreto, separada de la base de datos activa y sin credenciales.
- **Ubicación de datos**: carpeta local activa que contiene los datos SQLite de Warplyn.
- **Cambio de ubicación de datos**: copia y reinicio confirmados por la persona autora que cambian Warplyn a una nueva ubicación de datos y conservan la copia anterior para recuperarla.
- **Instantánea de recuperación**: copia de seguridad que Warplyn conserva antes de reemplazar los datos activos durante una restauración.
- **Actualización de la aplicación**: versión empaquetada más reciente de Warplyn que el cliente de escritorio puede buscar, descargar y aplicar solo mediante pasos controlados por la persona autora. Una actualización no modifica por sí sola el contenido de los *artículos*.
- **Actualización de seguridad**: actualización de la aplicación cuya etiqueta de versión termina en `.security`. Warplyn muestra un aviso, pero nunca fuerza la búsqueda, la descarga ni el reinicio.
- **Actualización preparada**: actualización de la aplicación ya descargada que espera a que la persona autora elija **Reiniciar y actualizar**. Cerrar la aplicación normalmente no la instala.
- **Instantánea previa a la actualización**: copia de seguridad de los datos locales creada antes de que Warplyn aplique una actualización preparada. Para restaurarla se necesita la versión anterior correspondiente de la aplicación.
- **Evento de diagnóstico**: registro local del servicio, con datos redactados, que se escribe en los registros del proceso anfitrión para ayudar con el inicio o con fallos recuperables. Nunca incluye contenido privado de *artículos*, cuerpos de modelos ni valores de variables de entorno.

## Interfaz

### Mapa del espacio de trabajo

Esquema de la aplicación de escritorio con los dos paneles laterales abiertos y el editor de artículos seleccionado. Los recuadros muestran ubicación y agrupación, no las dimensiones exactas.

```text
Espacio de trabajo editorial
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Panel de biblioteca de   │ Espacio de trabajo del       │ Panel del asistente     │
│ artículos                │ artículo                     │ editorial               │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · Artículo nuevo │ Encabezado del artículo      │ Encabezado del asistente │
│ Control para contraer    │ Título y metadatos artículo │ Control para contraer    │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Búsqueda de artículos    │ Pestañas del espacio        │ Conversación             │
├──────────────────────────┼──────────────────────────────┤ Estado de solicitud      │
│ Lista de artículos       │ Vista del espacio de trabajo│ y actividad              │
│                          │                              │                          │
│                          │ Editor de artículos          │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Área de escritura         │ │                          │
│                          │ │                          │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Biblioteca de artículos  │                              │ Acciones rápidas         │
│ Área de utilidades       │                              │ Campo de mensaje        │
│ Perfil de estilo ·       ├──────────────────────────────┤ Indicaciones editoriales │
│ Actualización · Idioma   │ Barra estado del artículo   │ y Enviar                 │
│ Idioma · Local           │ Guardado · Metadatos · Copiar │                          │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

En la parte inferior del panel de la biblioteca desplegado está el **área de utilidades de la Biblioteca de artículos**. Su fila inferior muestra el código de idioma del *artículo* actual y la etiqueta **Local**. La **barra de estado del artículo**, debajo de la vista central, muestra el estado de guardado.

### Términos de la interfaz

- **Nota editorial**: indicaciones del autor adjuntas a un pasaje del *artículo* y guardadas por separado de su texto. Las notas adjuntas pertinentes orientan al asistente cuando el autor le pide trabajar en ese pasaje. No se incluyen al copiar o exportar el texto del artículo. Si no se puede identificar el pasaje, la nota debe adjuntarse de nuevo.
- **Espacio de trabajo editorial**: pantalla principal de escritura que contiene el Panel de biblioteca de artículos, el espacio de trabajo del artículo y el Panel del asistente editorial.
- **Panel de biblioteca de artículos**: incluye la búsqueda de artículos, la lista de artículos y los accesos al espacio de trabajo. Al contraerse, se convierte en la **barra de navegación**; en pantallas pequeñas, aparece temporalmente como **cajón de navegación**.
- **Área de utilidades de la Biblioteca de artículos**: pie del Panel de biblioteca de artículos expandido. Contiene Perfil de estilo, Configuración, un control de actualización cuando corresponde y el código de idioma del artículo actual con la etiqueta **Local**.
- **Indicador de estado de guardado**: estado de la barra de estado del artículo que indica si el *borrador* actual está guardado, se está guardando o requiere atención.
- **Espacio de trabajo del artículo**: contiene el encabezado del artículo, las pestañas del espacio de trabajo, la vista seleccionada y la barra de estado del artículo.
- **Encabezado del artículo**: controles del título y los metadatos situados sobre las pestañas del espacio de trabajo.
- **Pestañas del espacio de trabajo**: pestañas que permiten seleccionar una vista del espacio de trabajo.
- **Vista del espacio de trabajo**: editor de artículos seleccionado o vista de apoyo: Revisión de propuestas, Historial de versiones, Verificación de datos o Traducciones.
- **Perfil de estilo**: pantalla independiente con características detectadas, observaciones de revisión de estilo, reglas tipográficas, indicaciones manuales y muestras de escritura.
- **Editor de artículos**: vista de escritura. Su área principal de edición es el **área de escritura**.
- **Barra de estado del artículo**: barra bajo la vista seleccionada del espacio de trabajo. Muestra el estado y los metadatos del artículo, el idioma, las pautas del perfil de publicación y los controles de copia.
- **Panel del asistente editorial**: contiene las indicaciones editoriales, las acciones, el estado de las solicitudes y la actividad. En pantallas pequeñas, aparece temporalmente como **cajón del asistente**.
- **Acciones rápidas**: menú desplegable sobre el compositor del asistente para insertar una habilidad integrada en una solicitud.
- **Campo de mensaje del asistente**: campo al pie del Panel del asistente editorial, donde la persona autora escribe indicaciones editoriales y envía una solicitud.
- **Navegación por la configuración de la aplicación**: navegación entre **General**, **Atajos de teclado**, **Proveedores**, **Asistente de IA**, **Publicación**, **Idiomas**, **Ortografía**, **Datos y copias** y **Acerca de Warplyn**.
