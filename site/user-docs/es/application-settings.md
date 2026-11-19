---
description: "Configura el aspecto de Warplyn, las preferencias de escritura, el comportamiento del asistente, las indicaciones de publicación y las actualizaciones de escritorio."
---

# Configuración de la aplicación

La configuración de la aplicación controla el aspecto y el comportamiento de Warplyn. No forma parte del historial de *versiones guardadas* de un *artículo*. Abre **Configuración** desde el **área de utilidades de la Biblioteca de artículos**. Algunas opciones solo están disponibles en la aplicación de escritorio; se indican a continuación.

## Configurar el aspecto y el idioma

En **General** → **Aspecto e idioma**, elige **Sistema**, **Claro** u **Oscuro** en **Aspecto preferido**. Con **Sistema**, Warplyn usa el aspecto de tu dispositivo y se adapta si lo cambias mientras la aplicación está abierta. Elige un **Idioma de la interfaz** para los menús y mensajes. Por ahora, el inglés es el único idioma de interfaz completo. Estas opciones no cambian el idioma de escritura ni las reglas tipográficas de un *artículo*.

En **Fecha y hora**, elige el formato de fecha, el reloj de 12 o 24 horas y la zona horaria. Las opciones del sistema siguen las de tu dispositivo. Estas preferencias cambian cómo se muestran las horas guardadas en Warplyn, no las horas almacenadas.

## Configurar las preferencias de escritura

En **Idiomas predeterminados**, configura el **Idioma predeterminado de los artículos** para los nuevos *artículos*. Define los **Idiomas predeterminados de traducción** para que esos idiomas aparezcan primero al solicitar una *traducción*. Introduce el nombre de un idioma, una variante regional o un código y selecciona **Añadir**. Warplyn seguirá pidiéndote que confirmes cada solicitud de traducción.

## Configurar el comportamiento del asistente

En **Asistente de IA**, elige **Proponer ediciones para revisar** como opción predeterminada para las conversaciones nuevas sobre *artículos*, o activa **Aplicar ediciones directamente** para los cambios solicitados expresamente. Esta preferencia no modifica las conversaciones existentes; los demás resultados generados también requieren revisión.

El **Límite de tiempo de las solicitudes** se aplica a cada solicitud nueva y a cada reintento. El valor predeterminado es de dos minutos. Elige un límite mayor o **Sin límite** para tareas que requieran más tiempo. Si una solicitud agota el tiempo, el *artículo* no cambia.

Elige **Intro** o **Ctrl + Intro** como tecla para enviar mensajes al asistente. Puedes cambiar otros atajos de la aplicación en **Atajos de teclado**. Warplyn detecta conflictos antes de guardar un atajo.

## Configurar las indicaciones de publicación

En **Publicación**, elige un perfil predeterminado para los *artículos* nuevos. Perfiles como **Publicación de LinkedIn** y **Artículo de LinkedIn** muestran indicaciones de caracteres en la **Barra de estado del artículo**. También puedes elegir **Sin restricciones** o añadir un perfil personalizado con un nombre y un límite de caracteres entero. El valor predeterminado afecta a los *artículos* nuevos; los existentes pueden conservar su propio perfil. Los límites son orientativos y nunca impiden copiar. En la **Barra de estado del artículo**, elige **Copiar Markdown** o abre su menú y selecciona **Copiar texto sin formato**. Warplyn copia el texto cuando se lo pides; no publica directamente.

## Revisar las opciones de modelos de IA

En **Asistente de IA**, puedes guardar varias conexiones con proveedores, activar solo las que quieras usar y asignar modelos distintos al trabajo general del asistente y a *habilidades* concretas. El **Modelo predeterminado** se usa para las tareas de IA salvo que una tarea tenga una opción propia. El **Modelo de la aplicación**, opcional, gestiona tareas de Warplyn como resúmenes y títulos; si no se configura, usa el modelo predeterminado. Usa **Favoritos**, la búsqueda o el filtro de proveedores para encontrar un modelo. El **Nivel de razonamiento** aparece para los modelos de OpenAI compatibles. Las tareas y controles disponibles dependen del modelo. Consulta [Proveedores y modelos de IA](providers.md) para configurar conexiones y conocer los límites de los proveedores.

En **Atajos de teclado**, elige un atajo junto a una acción y pulsa la combinación deseada. Puedes asignar atajos para guardar una *versión guardada*, cambiar de vista o activar el modo de concentración. Warplyn indica qué acción ya usa un atajo en conflicto; elige otra combinación. **Enviar con** controla si **Intro** o **Ctrl + Intro** envía una solicitud al asistente. Cambiar los atajos no modifica el contenido del *artículo*.

## Buscar actualizaciones de escritorio

Las aplicaciones de escritorio instaladas pueden buscar versiones nuevas en **Configuración** → **Acerca de Warplyn** → **Actualizaciones**. Primero activa **Permitir acceso a la red para las actualizaciones**. Así Warplyn puede contactar con GitHub para consultar información pública de las versiones y descargar las actualizaciones que elijas. Después configura **Buscar actualizaciones automáticamente** y si quieres **Incluir versiones preliminares**. Selecciona **Buscar ahora** para hacer una comprobación en cualquier momento. Si hay una versión nueva, Warplyn muestra sus notas. Las instalaciones de Windows y Linux AppImage ofrecen **Descargar** y **Reiniciar y actualizar**. Las instalaciones Debian usan **Ver notas de la versión** y luego una actualización desde el gestor de paquetes o un instalador `.deb` más reciente. Si una actualización impide que la aplicación se inicie, consulta [Recuperación tras actualizar la aplicación de escritorio](update-recovery.md).

## Eliminar datos locales

En la aplicación de escritorio, **Eliminar datos locales** borra de forma permanente los datos activos de Warplyn, incluidos *artículos*, *versiones guardadas*, puntos de control de *borradores*, el historial del asistente, los datos de estilo, la configuración y las copias locales almacenadas dentro de esa carpeta de datos. Si hay una carpeta de copias configurada, la confirmación ofrece **Crear una copia de seguridad antes de eliminar**. Warplyn debe terminar esa copia antes de borrar ningún dato. La aplicación se cierra cuando la eliminación se completa. Una desinstalación normal no elimina tus textos. Las palabras personales guardadas en el diccionario del sistema operativo permanecen allí; si también quieres eliminarlas, hazlo por separado en **Configuración** → **Ortografía**.

Abre **Configuración** → **Acerca de Warplyn** para encontrar la guía de usuario, el repositorio de código fuente, el gestor de incidencias y la licencia. Elige **Abrir inicio rápido** para volver a la introducción del primer inicio.
