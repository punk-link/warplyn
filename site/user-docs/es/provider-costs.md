---
description: "Entiende qué influye en el coste de las solicitudes de IA en Warplyn, cómo funciona la facturación de API y dónde consultar los cargos de uso del proveedor."
---

# Costes de los proveedores de IA

La asistencia de IA es opcional. Warplyn no te cobra por las solicitudes. Cuando Warplyn envía una solicitud, el proveedor de IA puede cobrarte por procesarla.

## Qué influye en el coste

Cada proveedor fija sus propias tarifas. El coste de una solicitud puede depender de:

- el proveedor y el modelo que elijas
- la cantidad de texto del *artículo* y las indicaciones adicionales que incluya la solicitud
- la cantidad de texto que genere el modelo

El texto cercano puede ayudar a interpretar una selección breve, pero se envía parte del texto que no seleccionaste. Si seleccionas un pasaje y la solicitud necesita texto del *artículo*, Warplyn envía ese pasaje y hasta 500 caracteres a cada lado. Esos 1000 caracteres adicionales como máximo sirven solo como contexto. El asistente solo puede proponer cambios para el pasaje seleccionado. Sin selección, la solicitud puede incluir el *artículo* completo y el contexto pertinente. Una solicitud más acotada puede costar menos, según las tarifas del proveedor.

::: tip Facturación de la API
Una suscripción al servicio de chat de un proveedor quizá no incluya el uso de la API. Antes de configurar tu clave API, consulta los precios actuales de la API y las condiciones de facturación del proveedor.
:::

Para tareas habituales, como mejorar el ritmo de un pasaje o hacer una revisión concreta, prueba primero con un modelo de menor coste. Usa un modelo más caro cuando los resultados indiquen que la tarea lo necesita.

## Consultar el uso

Revisa el uso, los cargos, las alertas y los límites de gasto en la cuenta de tu proveedor. Warplyn no muestra la factura del proveedor ni aplica límites de gasto. Para consultas sobre facturación, reembolsos o cargos de la cuenta, ponte en contacto con el proveedor.

El modelo usado en una solicitud afecta a su coste. En **Configuración** → **Asistente de IA**, elige un **Modelo predeterminado**, un **Modelo de la aplicación** y modelos para tareas específicas. Consulta [Proveedores y modelos de IA](providers.md) para configurarlos.

::: tip Puedes trabajar sin IA
Puedes escribir y gestionar *artículos* sin una conexión de IA. Puedes editar, guardar *versiones* y usar copias de seguridad locales sin enviar solicitudes de IA.
:::
