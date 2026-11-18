---
description: "Conecta un proveedor de IA con Warplyn, guarda tu clave API, elige modelos y conoce las comprobaciones de conexión y las funciones compatibles."
---

# Proveedores y modelos de IA

Warplyn envía solicitudes de IA al proveedor que configures en **Configuración** → **Asistente de IA**. Necesitas una cuenta y una clave API de ese proveedor. Es posible que cobre por el uso de la API.

## Añadir una conexión

En la aplicación de escritorio, abre **Configuración** → **Asistente de IA**. En **¿Cómo quieres proporcionar tu clave?**, elige **Añadir una clave API** o **Variable de entorno**.

- **Añadir una clave API:** Elige un proveedor, asigna un nombre a la conexión e introduce la clave. Warplyn la guarda en el Administrador de credenciales de Windows o en Linux Secret Service. No volverá a mostrar la clave ni la guardará en la base de datos de Warplyn o en las copias de seguridad.
- **Variable de entorno:** Elige un proveedor, asigna un nombre a la conexión e introduce el nombre de la variable que contiene la clave. Warplyn guarda el nombre, no su valor. El servicio de la aplicación debe iniciarse con esa variable definida.

::: tip Sobre las credenciales
Las claves API gestionadas requieren la aplicación de escritorio y un servicio de credenciales del sistema operativo disponible. En Linux, Secret Service debe estar desbloqueado. La aplicación web admite conexiones mediante variables de entorno, pero no puede gestionar credenciales del sistema operativo. El instalador no crea ni importa archivos `.env`.
:::

Al añadir una conexión con clave API, se comprueba la clave con el proveedor. Al añadir una conexión mediante variable de entorno, solo se guardan sus ajustes. Warplyn vuelve a contactar con el proveedor cuando actualizas los modelos o envías una solicitud de IA. Estas comprobaciones no incluyen contenido del *artículo*.

Las conexiones aparecen en **Configuración** → **Asistente de IA**. Usa **Activa**, **Activar** o **Desactivar** para decidir qué conexiones puede usar Warplyn en solicitudes nuevas. Elige **Cambiar nombre** para modificar el nombre local que se muestra, o selecciona **Quitar** y confirma para eliminar la conexión de Warplyn. Quitar una conexión mediante variable de entorno no elimina la variable ni su clave.

::: tip Si falla la actualización de modelos
Comprueba que la conexión esté **Activa**, que la clave guardada sea válida o que el servicio de la aplicación tenga disponible la variable de entorno, y que la cuenta del proveedor pueda acceder a su API.
:::

## Elegir proveedores y modelos

Warplyn admite OpenAI, OpenCode Zen, Anthropic, Google Gemini API, xAI Grok y DeepSeek. El catálogo de OpenCode Zen también ofrece modelos de otros proveedores.

En **Configuración** → **Asistente de IA**, selecciona **Actualizar modelos disponibles** y luego elige un **Modelo predeterminado**. Para usar otro modelo con una *habilidad* concreta, selecciónalo en **Modelos para tareas específicas**. Las tareas configuradas como **Usar modelo predeterminado** utilizan ese modelo.

Actualiza la lista después de cambiar conexiones o cuando quieras consultar el catálogo actual de un proveedor. Usa **Buscar modelos**, **Filtrar modelos por proveedor** y **Favoritos** para acotar la lista. La selección de modelos se aplica a solicitudes futuras. Usa el **Nivel de razonamiento** cuando aparezca para un modelo de OpenAI; los niveles más altos pueden tardar más. El **Modelo de la aplicación**, opcional en los ajustes de IA, es independiente del modelo predeterminado y gestiona tareas auxiliares de Warplyn, como resúmenes y títulos.

::: tip Disponibilidad de modelos
Las operaciones editoriales disponibles varían según el modelo. Algunos no admiten verificación de datos con fuentes, salida estructurada ni controles de razonamiento. Los modelos de OpenCode Zen dependen de las funciones y la disponibilidad de su catálogo.
:::

[![Ajustes del asistente de IA con conexiones de proveedores configuradas, opciones de claves y controles de modelo.](/images/ai-providers-and-models.png)](/images/ai-providers-and-models.png)

*Ajustes del asistente de IA con conexiones de proveedores y controles de modelo.*

### Modelo de la aplicación

El **Modelo de la aplicación** gestiona tareas auxiliares breves, como los resúmenes de *propuestas*, los títulos y la interpretación de la intención de una solicitud al asistente. Si no lo configuras, Warplyn usa el modelo predeterminado.

Elige un modelo de texto eficiente y de menor coste. **GPT-6 Luna** es una opción de OpenAI para estas tareas concretas ([detalles del modelo](https://developers.openai.com/api/docs/models/gpt-6-luna)). Si usas otro proveedor, elige un modelo comparable. Si los resultados no son suficientemente buenos, prueba con un modelo más potente.
