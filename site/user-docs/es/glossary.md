---
description: "Consulta las definiciones de artículos, borradores, versiones guardadas, propuestas, observaciones y habilidades de Warplyn."
---

# Glosario de Warplyn

Estos términos describen conceptos visibles para quienes escriben y el vocabulario de dominio utilizado en Warplyn.

## Artículos y versiones

- **Artículo**: unidad de trabajo editorial que puede recuperarse de forma independiente. Warplyn usa «artículo» en lugar de «documento».
- **Biblioteca de artículos**: colección local de *artículos* de la persona autora. El **artículo actual** está abierto en el espacio de trabajo; la **lista de artículos** muestra la colección.
- **Borrador**: texto de un *artículo* que se está editando y aún no se ha guardado como *versión guardada*.
- **Punto de control del borrador**: estado recuperable y modificable de un *borrador*, guardado localmente y vinculado a una *versión guardada* de base. No es una *versión guardada*. Un **borrador actual** se basa en la *versión guardada* actual del *artículo*; un **borrador obsoleto** se basa en una versión anterior.
- **Versión guardada**: instantánea inmutable de un *artículo* guardada de forma permanente.
- **Guardar una versión**: acción explícita de la persona autora para guardar un *borrador actual* como una nueva *versión guardada*. Solo elimina el punto de control correspondiente del *borrador*.
- **Propuesta**: contenido o cambios candidatos generados por IA que requieren la aprobación explícita de la persona autora.
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
- **Corpus de estilo**: muestras de escritura locales proporcionadas por la persona autora. Un **perfil de estilo** es su representación derivada y resumida.
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
Editorial Workspace
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Article Library Panel    │ Article Workspace            │ Editorial Assistant Panel│
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · New Article    │ Article Header               │ Assistant header         │
│ Collapse control         │ Title and Article metadata   │ Collapse control         │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Article search           │ Workspace Tab Bar            │ Conversation             │
├──────────────────────────┼──────────────────────────────┤ Request status           │
│ Article list             │ Workspace View               │ and activity             │
│                          │                              │                          │
│                          │ Article Editor               │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Writing surface          │ │                          │
│                          │ │                          │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Article Library          │                              │ Quick actions            │
│ utility area             │                              │ Composer                 │
│ Style Profile · Settings ├──────────────────────────────┤ Editorial guidance       │
│ Update, when relevant    │ Article Status Bar           │ and Send                 │
│ Language · Local         │ Save status · Metadata · Copy │                          │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

En la vista expandida, el pie del panel Library es el **área de utilidades de la Biblioteca de artículos**. Su fila inferior muestra el código de idioma del *artículo* actual y la etiqueta **Local**. La **Article Status Bar**, debajo de la vista central del artículo, muestra el estado de guardado.

### Términos de la interfaz

- **Editorial Workspace**: pantalla principal de escritura que contiene el Panel de biblioteca de artículos, Article Workspace y Panel del asistente editorial.
- **Panel de biblioteca de artículos**: incluye la búsqueda de artículos, la lista de artículos y los accesos al espacio de trabajo. Al contraerse, se convierte en la **Navigation Rail**; en pantallas pequeñas, aparece temporalmente como **Navigation Drawer**.
- **área de utilidades de la Biblioteca de artículos**: pie del Panel de biblioteca de artículos expandido. Contiene Perfil de estilo, Settings, un control de actualización cuando corresponde y el código de idioma del artículo actual con la etiqueta **Local**.
- **Save-state indicator**: estado de la Article Status Bar que indica si el *borrador* actual está guardado, se está guardando o requiere atención.
- **Article Workspace**: contiene Article Header, Workspace Tab Bar, la vista seleccionada del espacio de trabajo y Article Status Bar.
- **Article Header**: controles del título y los metadatos situados sobre Workspace Tab Bar.
- **Workspace Tab Bar**: pestañas que permiten seleccionar una vista del espacio de trabajo.
- **Workspace View**: editor de artículos seleccionado o vista de apoyo: Revisión de propuestas, Historial de versiones, Verificación de datos o Translations.
- **Perfil de estilo**: pantalla independiente con características detectadas, observaciones de revisión de estilo, reglas tipográficas, indicaciones manuales y muestras de escritura.
- **Article Editor**: vista de escritura. Su área principal de edición es el **writing surface**.
- **Article Status Bar**: barra bajo la vista seleccionada del espacio de trabajo. Muestra el estado y los metadatos del artículo, el idioma, las pautas del perfil de publicación y los controles Copy.
- **Panel del asistente editorial**: contiene las indicaciones editoriales, las acciones, el estado de las solicitudes y la actividad. En pantallas pequeñas, aparece temporalmente como **Assistant Drawer**.
- **Acciones rápidas**: menú desplegable sobre el compositor del asistente para insertar una habilidad integrada en una solicitud.
- **Composer**: campo de mensaje al pie del Panel del asistente editorial, donde la persona autora escribe indicaciones editoriales y envía una solicitud.
- **Application Navegación de configuración**: navegación entre **General**, **Atajos de teclado**, **Proveedores**, **Asistente de IA**, **Publicación**, **Idiomas**, **Ortografía**, **Datos y copias** y **Acerca de Warplyn**.
