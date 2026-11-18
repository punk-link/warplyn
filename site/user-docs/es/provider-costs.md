---
description: "Entiende qué influye en el coste de las solicitudes de IA en Warplyn, cómo funciona la facturación de API y dónde consultar los cargos de uso del proveedor."
---

# Costes de los proveedores de IA

La asistencia de IA es opcional. Warplyn no te cobra por las solicitudes. Tu proveedor de IA podría cobrar a tu cuenta cuando Warplyn envía una solicitud.

## Qué influye en el coste

Cada proveedor fija sus propias tarifas. El coste de una solicitud puede depender de:

- el proveedor y el modelo que elijas
- la cantidad de texto del *artículo* y el contexto de instrucciones que incluya la solicitud
- la cantidad de texto que genere el modelo

El texto cercano puede ayudar a interpretar una selección breve, pero se envía parte del texto que no seleccionaste. Las solicitudes con selección que necesitan texto del *artículo* envían el pasaje seleccionado y hasta 500 caracteres anteriores y 500 posteriores como contexto de solo lectura: como máximo, 1000 caracteres adicionales. Solo la selección es el objetivo de edición. Sin selección, la solicitud puede incluir el *artículo* completo y el contexto pertinente. Una solicitud más acotada puede costar menos, según las tarifas del proveedor.

::: tip Facturación de la API
Una suscripción al servicio de chat de un proveedor quizá no incluya el uso de la API. Antes de conectar una clave, consulta los precios actuales de la API y las condiciones de facturación del proveedor.
:::

Para tareas habituales, como mejorar el ritmo de un pasaje o hacer una revisión concreta, prueba primero con un modelo de menor coste. Usa un modelo más caro cuando los resultados indiquen que la tarea lo necesita.

## Consultar el uso

Revisa el uso, los cargos, las alertas y los límites de gasto en la cuenta de tu proveedor. Warplyn no muestra la factura del proveedor ni aplica límites de gasto. Para consultas sobre facturación, reembolsos o cargos de la cuenta, ponte en contacto con el proveedor.

El modelo usado en una solicitud afecta a su coste. En **Configuración** → **Asistente de IA**, elige un **Modelo predeterminado**, un **Modelo de la aplicación** y modelos para tareas específicas. Consulta [Proveedores y modelos de IA](providers.md) para configurarlos.

::: tip Puedes trabajar sin IA
Puedes escribir y gestionar *artículos* sin una conexión de IA. Editar, guardar *versiones* y usar copias de seguridad locales no envía solicitudes de IA.
:::
