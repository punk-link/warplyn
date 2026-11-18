---
description: "Crea copias de seguridad automáticas o manuales de Warplyn, restaura tus textos y habilidades y recupérate de forma segura si algo falla."
---

# Copias de seguridad y recuperación

## Crear una copia de seguridad

En **Configuración** → **Datos y copias de seguridad**, elige una **Carpeta de copias de seguridad** y selecciona **Crear copia de seguridad**. En los navegadores compatibles, Warplyn solicita permiso para guardar copias solo en esa carpeta.

[![Ajustes de datos y copias de seguridad con los controles de carpeta, crear y restaurar copias, y opciones de copia automática.](/images/backups-and-recovery.png)](/images/backups-and-recovery.png)

*Ajustes de datos y copias de seguridad en la aplicación de escritorio.*

::: tip Contenido de una copia de seguridad
Una nueva copia `.skladno` incluye la base de datos, las *habilidades* actuales del Author, su historial de *versiones de habilidad* y un manifiesto de archivos. Las copias no incluyen archivos `.env` ni claves API.
:::

::: tip Límites de las copias desde el navegador
Las transferencias de copias en el navegador admiten archivos de hasta 100 MB cada uno y 500 MB en total. Para datos locales más grandes, usa la aplicación de escritorio.
:::

En la aplicación de escritorio, cada instantánea de la base de datos tiene al lado una carpeta `.sqlite.skills` con las *habilidades* actuales del Author, su historial de *versiones de habilidad*, tus palabras personales de ortografía y un manifiesto. Al copiar o restaurar una instantánea, conserva juntos el archivo `.sqlite` y la carpeta `.sqlite.skills`. Las copias del navegador no incluyen las palabras personales de ortografía.

Las copias antiguas `.sqlite` solo contienen la base de datos. Al restaurar una, se conservan los archivos y el historial actuales de tus *habilidades*.

## Copias de seguridad automáticas

Configura **Copias de seguridad automáticas** como **Diarias** para crear una instantánea poco después de iniciar Warplyn y, luego, cada 24 horas mientras siga abierta. En el navegador, Warplyn necesita permiso para usar la carpeta elegida. Si falla una copia automática, comprueba la carpeta y crea una manual; el siguiente intento programado seguirá activado.

**Retención de copias automáticas** controla cuántas instantáneas automáticas conserva Warplyn. Solo elimina las instantáneas automáticas más antiguas; las copias que creaste manualmente siempre se conservan.

## Restaurar una copia de seguridad

1. En **Configuración** → **Datos y copias de seguridad**, selecciona **Restaurar una copia de seguridad**.
2. Elige la copia que quieres restaurar. Warplyn comprueba sus archivos y guarda una copia de recuperación local de la base de datos y los archivos de *habilidades* actuales.
3. Cuando termine la restauración, comprueba tus *artículos* y *versiones guardadas*.

Restaurar una copia `.skladno` o una instantánea de escritorio junto con su carpeta asociada reemplaza la base de datos y las *habilidades* guardadas. Restaurar una copia `.sqlite` antigua que solo contiene la base de datos reemplaza únicamente esa base de datos.

Al restaurar una copia de escritorio, también se añaden al diccionario las palabras personales de ortografía que contenía. Las palabras existentes se conservan. Las copias antiguas sin palabras personales no modifican tu diccionario. No se incluyen diccionarios de idiomas descargados ni las preferencias de precarga ortográfica.

::: warning Ajustes de IA después de restaurar
La restauración conserva las conexiones de IA, credenciales y selecciones de modelos que ya tenga esta instalación. Si no hay conexiones configuradas, Warplyn recupera de la copia los nombres y las referencias de variables de entorno, pero nunca las claves API ni los valores de esas variables. Define en este ordenador las variables que falten y luego elige modelos en **Configuración** → **Asistente de IA**. Las conexiones que usan claves API guardadas no se importan a una instalación nueva; añádelas desde Configuración. Los demás ajustes sí se restauran. Si la restauración falla y se revierte, la configuración de IA anterior se conserva.
:::

## Recuperar manualmente una copia que solo contiene la base de datos

Sigue estos pasos únicamente para una copia antigua `.sqlite`. Mantén Warplyn cerrado hasta que la base de datos vuelva a estar en su sitio.

1. Haz una copia de la base de datos local actual.
2. Copia la copia de seguridad sobre `skladno.sqlite` en la carpeta de datos configurada de Warplyn.
3. Inicia Warplyn y verifica tus *artículos* y *versiones guardadas*.

Para restaurar una copia que incluya *habilidades*, usa **Restaurar una copia de seguridad** en **Configuración**. Así Warplyn también podrá comprobar y recuperar el manifiesto y el historial de *versiones de habilidad*.

## Si no se puede crear una copia de seguridad

Warplyn deja intactas la base de datos activa y la sesión de edición. Comprueba que exista la carpeta de destino y que tu cuenta tenga permiso para escribir en ella; luego vuelve a intentarlo.

## Permisos de archivos

De forma predeterminada, el servicio local guarda la base de datos en `~/.warplyn`. Define `WARPLYN_DATA_DIR` para elegir otra carpeta. Warplyn ignora `SKLADNO_DATA_DIR` y no usa una carpeta que se superponga con la ubicación de datos antigua de Skladno. Si migras desde Skladno, elige una carpeta distinta para Warplyn y restaura una copia de seguridad.

En sistemas POSIX, Warplyn restringe el acceso a la carpeta de datos y a los archivos SQLite a tu cuenta, también después de una actualización. En Windows se aplican los permisos del sistema de archivos administrados por Windows. Los archivos de copia creados desde el navegador usan los permisos de la carpeta elegida; guárdalos en una carpeta privada y revisa las opciones de uso compartido antes de usar una ubicación compartida o sincronizada.
