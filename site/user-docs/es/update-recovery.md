---
description: "Recupérate de una actualización fallida de Warplyn para escritorio con la versión anterior y su copia de seguridad correspondiente."
---

# Recuperación tras actualizar la aplicación de escritorio

Las actualizaciones preliminares son opcionales. Si Warplyn no se abre después de actualizarlo, reinstala la versión preliminar anterior. Luego restaura la copia de seguridad que Warplyn guardó antes de esa actualización.

::: warning No abras la base de datos más reciente
No abras con una versión anterior una base de datos creada por una versión preliminar más reciente. Primero restaura la copia de seguridad guardada antes de la actualización.
:::

1. Descarga e instala de nuevo la versión preliminar anterior desde su [versión en GitHub](https://github.com/punk-link/warplyn/releases).
2. Restaura la copia de seguridad SQLite que Warplyn guardó antes de la actualización.
3. Inicia la versión preliminar anterior y comprueba tus *artículos*, *borradores*, *versiones guardadas* y ajustes.

## AppImage para Linux

Guarda el archivo AppImage en una carpeta en la que puedas escribir. Consulta [Instalar Warplyn](installation.md#linux-appimage) para ver los requisitos del sistema y aprender a abrir AppImage y añadirlo al menú de aplicaciones. Las pruebas de AppImage como aplicación de escritorio instalada aún no han terminado.

Después de permitir el acceso de actualización a GitHub, selecciona **Descargar** y luego **Reiniciar y actualizar**. Cerrar la aplicación normalmente no instala la actualización descargada. Los paquetes Debian siguen actualizándose con el gestor de paquetes.

Si Warplyn no se abre después de actualizar AppImage, cierra Warplyn. Encontrarás el ejecutable de la versión anterior junto a la imagen, con el sufijo `.previous`. Antes de abrir la versión anterior, restaura la copia de seguridad previa a la actualización que le corresponde y sigue la advertencia anterior. Conserva ambos ejecutables y la copia hasta que la recuperación termine correctamente. Si no tienes permiso para escribir en la carpeta de la imagen, muévela a una carpeta propia o descarga el reemplazo manualmente. No desactives el aislamiento de Electron para iniciar una imagen.
