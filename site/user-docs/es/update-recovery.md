---
description: "Recupérate de una actualización fallida de Warplyn para escritorio con la versión anterior y su copia de seguridad correspondiente."
---

# Recuperación tras actualizar la aplicación de escritorio

Las actualizaciones preliminares son opcionales. Si Warplyn no puede iniciarse después de una actualización, vuelve a instalar la versión preliminar anterior y restaura la copia de seguridad previa a la actualización que le corresponde.

::: warning No abras la base de datos más reciente
No abras con una versión anterior una base de datos creada por una versión preliminar más reciente. Primero restaura la copia de seguridad guardada antes de la actualización.
:::

1. Descarga e instala de nuevo la versión preliminar anterior desde su [versión en GitHub](https://github.com/punk-link/warplyn/releases).
2. Restaura la copia de seguridad SQLite previa a la actualización que Warplyn guardó antes de actualizar.
3. Inicia la versión preliminar anterior y comprueba tus *artículos*, *borradores*, *versiones guardadas* y ajustes.

## AppImage para Linux

Guarda el archivo AppImage en una carpeta en la que puedas escribir. Consulta [Instalar Warplyn](installation.md#linux-appimage) para ver los requisitos de ejecución, cómo abrirlo y la integración opcional con el escritorio. La aceptación de AppImage para escritorio está pendiente.

Después de permitir el acceso de actualización a GitHub, selecciona **Descargar** y luego **Reiniciar y actualizar**. Cerrar la aplicación normalmente no instala la actualización descargada. Los paquetes Debian siguen actualizándose con el gestor de paquetes.

Si una actualización de AppImage no se inicia, cierra Warplyn. El ejecutable anterior se conserva junto a la imagen con el sufijo `.previous`. Antes de abrir la versión anterior, restaura la copia de seguridad previa a la actualización que le corresponde y sigue la advertencia anterior. Conserva ambos ejecutables y la copia hasta que la recuperación termine correctamente. Si no tienes permiso para escribir en la carpeta de la imagen, muévela a una carpeta propia o descarga el reemplazo manualmente. No desactives el aislamiento de Electron para iniciar una imagen.
