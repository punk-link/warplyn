---
description: "Migra de Skladno a Warplyn mediante una copia de seguridad y conserva la instalación y los textos originales para poder recuperarlos."
---

# Migrar de Skladno a Warplyn

Warplyn es una aplicación independiente. Conserva Skladno y sus datos hasta que hayas verificado el trabajo restaurado. No muevas a Warplyn la carpeta de datos activa de Skladno.

Descarga el instalador para Windows 11 x64 o el paquete Debian x64 desde la [última versión de Warplyn](https://github.com/punk-link/warplyn/releases/latest). Consulta [Instalación](installation.md) para ver las instrucciones de cada plataforma.

Antes de migrar, elige una **Carpeta de copias de seguridad** en **Configuración** → **Datos y copias de seguridad** y selecciona **Crear copia de seguridad**. Conserva cada copia `.sqlite` junto con la carpeta `.sqlite.skills` que la acompaña. Consulta [Copias de seguridad y recuperación](backups-and-recovery.md) para obtener más información.

## Procedimiento de migración

1. En Skladno, termina o cancela las tareas de IA activas. Después, cierra y vuelve a abrir la aplicación para guardar el punto de control más reciente. Evita hacer cambios externos en los archivos de *habilidades* del Author mientras se crea la copia de seguridad.
2. Crea una copia de seguridad manual desde Skladno mientras la aplicación está abierta, incluso si usa un directorio de datos personalizado. Conserva juntos el archivo `.sqlite` y la carpeta `.sqlite.skills` correspondiente, con sus nombres originales. Cierra Skladno cuando termine la copia.
3. Instala y abre Warplyn con su propio perfil vacío. No lo dirijas nunca al directorio de datos activo de Skladno.
4. En **Configuración** → **Datos y copias de seguridad**, selecciona la carpeta de la copia de migración y elige **Restaurar una copia de seguridad**. Selecciona la instantánea de Skladno, confirma el reemplazo y deja que Warplyn se reinicie. Si Warplyn ya contiene trabajo, crea antes una copia propia: la restauración reemplaza el trabajo y no combina las bases de datos.
5. Antes de escribir nada nuevo, comprueba los *artículos*, los *borradores* más recientes, el historial de *revisiones*, las conversaciones del asistente, la *configuración*, los perfiles de publicación y las *habilidades* del Author.
6. En **Configuración** → **Asistente de IA**, vuelve a añadir las conexiones y selecciona modelos para tus funciones. La restauración borra las conexiones guardadas y las selecciones de modelos porque las credenciales no forman parte de la copia. Las credenciales de Skladno no se modifican.
7. Para conexiones mediante variables de entorno, vuelve a añadir el nombre de la variable y confirma que exista en el entorno del proceso de Warplyn. Las copias nunca incluyen archivos `.env` ni sus valores.
8. Elige una carpeta independiente para las copias periódicas de Warplyn. Vuelve a configurar las preferencias de red para actualizaciones y de telemetría. La migración no copia las preferencias de la carpeta de copias, la identidad de telemetría, las actualizaciones preparadas ni los registros de recuperación pendientes.

Las copias nativas con una carpeta `.sqlite.skills` restauran las *habilidades* actuales del Author y el historial inmutable de *versiones de habilidad*. Las instantáneas antiguas que solo contienen una base de datos `.sqlite` restauran la base de datos y dejan intactas las *habilidades* del destino; no pueden restaurar archivos que nunca incluyeron. Los nombres de los archivos de base de datos y los formatos del manifiesto siguen siendo compatibles con Skladno.

## Recuperación

Mantén Skladno instalado hasta verificar la restauración. Las aplicaciones no sincronizan ni combinan las ediciones posteriores. Si vuelves a Skladno, seguirá en el estado que tenía antes de la migración.

Si la restauración falla, sigue usando Skladno y conserva el par de archivos original de la copia. Warplyn valida la copia y conserva una instantánea de recuperación del destino; si el inicio falla, vuelve a esa instantánea. Resuelve el problema indicado e inténtalo de nuevo. Consulta [Copias de seguridad y recuperación](backups-and-recovery.md) y [Recuperación tras actualizar la aplicación de escritorio](update-recovery.md).

Warplyn usa `~/.warplyn` de forma predeterminada y `WARPLYN_DATA_DIR` para una carpeta personalizada. Ignora `SKLADNO_DATA_DIR` para el almacenamiento activo y rechaza las rutas que se superponen con ubicaciones antiguas conocidas. Usa una carpeta independiente y vacía, y restaura una copia en vez de copiar una base de datos SQLite activa.
