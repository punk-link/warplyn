---
description: "Consulta qué datos de diagnóstico y uso comparte Warplyn, qué información es privada y cómo desactivar el envío desde Configuración."
---

# Compartir datos de diagnóstico y uso

Si activas el envío, la aplicación de escritorio de Warplyn para Windows o Linux comparte datos de fiabilidad y uso con PostHog Cloud, en Virginia (Estados Unidos). Los eventos se asocian a un identificador seudónimo. El envío está desactivado de forma predeterminada. Puedes cambiar esta opción en **Configuración** → **General** → **Privacidad y diagnóstico**.

Cuando desactivas el envío, Warplyn deja de recopilar datos y borra del dispositivo los eventos pendientes y el identificador de telemetría. Si vuelves a activarlo, Warplyn genera otro identificador. Los eventos ya enviados permanecen en PostHog Cloud.

Los eventos pendientes se guardan en el perfil local de la aplicación para que Warplyn pueda volver a enviarlos cuando se restablezca la conexión. La próxima vez que la aplicación revise la cola, descartará los eventos que tengan más de 24 horas. Al desactivar el envío, se elimina la cola.

[![Ajustes de privacidad y diagnóstico con el control para compartir datos y los controles del identificador de telemetría; el identificador está oculto.](/images/diagnostic-and-usage-data.png)](/images/diagnostic-and-usage-data.png)

*Ajustes de privacidad y diagnóstico en la aplicación de escritorio.*

## Qué recopila Warplyn

Los eventos abarcan:

- También se comparten los identificadores del proveedor y del modelo configurados tras operaciones de IA exitosas, solo si el envío estaba activado antes de la operación y sigue activado al finalizar. El uso del Asistente y de la generación de texto se registra por separado. Estos eventos no incluyen instrucciones, texto generado, cantidades de tokens ni identificadores de artículos o solicitudes.
- la verificación completada o fallida de una conexión, sin nombres de conexiones ni datos del proveedor
- el inicio de la aplicación y categorías seguras de fallos de inicio, del proceso de renderizado o de procesos secundarios
- las operaciones de IA completadas, fallidas o canceladas y sus etapas, incluida una categoría de error y el estado HTTP cuando está disponible
- las revisiones explícitas de *propuestas* y los puntos de control de *borradores* agregados
- los resultados de copias de seguridad y recuperaciones

Los eventos no incluyen texto de *artículos*, instrucciones, respuestas de IA ni claves API.

::: details Otros campos de los eventos
Cada evento incluye el origen de analítica de escritorio, la versión del esquema, la versión de la aplicación, la plataforma, la arquitectura, la versión del sistema operativo y una marca de tiempo. Los campos específicos de cada evento se limitan a categorías conocidas, contadores no negativos o duraciones acotadas.

Los eventos de operaciones y etapas de IA pueden incluir un identificador aleatorio que vincula los eventos de una misma operación. Es independiente de los identificadores de artículos y solicitudes.

Los eventos no incluyen identificadores ni títulos de *artículos* o *versiones guardadas*, valores de variables de entorno, rutas de archivos, URL, errores sin filtrar, detalles de salida de procesos ni cuerpos de solicitudes o respuestas.
:::

## Solicitar la eliminación

Para solicitar acceso, correcciones u otros asuntos de privacidad, consulta [solicitudes de datos](data-request.md).

1. En **Configuración** → **General** → **Privacidad y diagnóstico**, selecciona **Copiar ID**.
2. Envía ese identificador a [kirill.taran@punk.link](mailto:kirill.taran@punk.link) por correo electrónico y solicita su eliminación.
3. Desactiva **Compartir datos de diagnóstico y uso**.

Copia el identificador antes de desactivar el envío. Al desactivarlo, se borra el identificador de tu dispositivo. El responsable del proyecto elimina el registro seudónimo correspondiente y lo confirma por correo electrónico.

## Analítica del sitio web {#website-analytics}

Las páginas de inicio y de planes usan PostHog para medir las visitas, las fuentes de tráfico y las campañas, y los clics en enlaces de descarga. Los eventos de descarga de PostHog incluyen la ubicación del botón en la página. Google Analytics también registra un evento `download_clicked` cuando alguien abre el enlace a la versión más reciente desde la página de inicio, la página de planes o la guía de usuario. Estos clics no confirman que se haya descargado ni instalado la aplicación.

El seguimiento de PostHog en el sitio web no usa cookies ni almacenamiento del navegador, no crea perfiles de personas ni registra reproducciones de sesiones o actividad general de clics. PostHog estima el número de visitantes mediante un hash generado en el servidor. Los eventos del sitio web son independientes de los identificadores de telemetría de escritorio, y el control para compartir datos de la aplicación no modifica el seguimiento del sitio web.

Las páginas de inicio y la guía de usuario también usan Google Analytics, que puede utilizar cookies para medir visitas y fuentes de tráfico. Google Analytics y PostHog omiten el seguimiento cuando el navegador envía las señales Do Not Track o Global Privacy Control. La descripción del seguimiento sin cookies anterior se refiere a PostHog.
