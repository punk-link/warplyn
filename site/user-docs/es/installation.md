---
description: "Instala Warplyn en Windows o Linux y configura la aplicación. Para Linux puedes usar un paquete Debian o un archivo AppImage."
---

# Instalar Warplyn

Warplyn está disponible para Windows 11 x64 y Linux. Descarga los instaladores actuales desde [versiones de Warplyn](https://github.com/punk-link/warplyn/releases). Si usas Skladno, sigue la [guía de migración](migration.md) y conserva la instalación y las copias de seguridad hasta verificar que el trabajo se haya restaurado correctamente.

## Windows

1. Abre [versiones de Warplyn](https://github.com/punk-link/warplyn/releases).
2. En **Assets**, descarga el instalador de Windows `.exe` y ejecútalo.
3. Si Windows muestra una advertencia de SmartScreen, confirma que el instalador proviene de la página de versiones de este repositorio. Las versiones no están firmadas digitalmente.
4. Abre Warplyn desde el menú Inicio.

Consulta [Recuperación tras actualizar la aplicación de escritorio](update-recovery.md) para conocer los controles de actualización y las opciones de recuperación.

::: info Sobre las firmas digitales
Una firma digital usa un certificado de firma de código para identificar al editor y mostrar si el instalador se ha modificado desde que se firmó. No garantiza que el software sea seguro. El instalador de Warplyn aún no lleva firma digital, así que Windows no puede comprobar quién lo publicó. Descárgalo únicamente desde la página oficial de versiones.
:::

## Debian y distribuciones basadas en Debian

El paquete Debian se ha probado principalmente en Ubuntu 22.04 x64. La compatibilidad con otras versiones o distribuciones puede variar. Usa un sistema amd64 con entorno gráfico.

1. Abre [versiones de Warplyn](https://github.com/punk-link/warplyn/releases).
2. En **Assets**, descarga el paquete `warplyn_VERSION_amd64.deb`.
3. Abre una terminal en la carpeta donde lo descargaste. Si la carpeta solo contiene ese paquete de Warplyn, instálalo con:

   ```sh
   sudo apt install ./warplyn_*.deb
   ```

4. Abre Warplyn desde el menú de aplicaciones.

Para actualizar manualmente, descarga el `.deb` más reciente y ejecuta el mismo comando `sudo apt install` con ese archivo. La descarga no añade un repositorio de paquetes. Apt instala las dependencias que necesita Warplyn. Si no puede instalarlas, no fuerces la instalación.

De forma predeterminada, los datos de escritura se guardan en `~/.warplyn`. Haz una copia de seguridad antes de actualizar. Reinstalar o desinstalar la aplicación debería conservar esta carpeta y las credenciales del llavero del escritorio.

Las claves API gestionadas en Linux requieren un Secret Service disponible y desbloqueado, como GNOME Keyring. Consulta [Proveedores y modelos de IA](providers.md) para ver otras opciones de conexión.

Si no se puede guardar o leer una clave, desbloquea el llavero del escritorio e inténtalo de nuevo. Si la sesión no tiene Secret Service, habilita uno o usa una conexión mediante variable de entorno según esa guía. La edición sin conexión sigue disponible. No desactives el entorno aislado para resolver fallos de inicio; informa de la distribución, la versión y el error.

### AppImage para Linux {#linux-appimage}

Si una versión incluye un archivo `.AppImage` x64, guárdalo en una carpeta en la que puedas escribir. Descárgalo desde [versiones de Warplyn](https://github.com/punk-link/warplyn/releases), márcalo como ejecutable en el gestor de archivos y ejecútalo. También puedes ejecutar `chmod +x Warplyn-*-linux-x64.AppImage` en la carpeta de descargas. Linux necesita compatibilidad con FUSE y acceso a `/dev/fuse`, las bibliotecas de escritorio de Electron y un llavero Secret Service para gestionar credenciales. AppImage no incluye una sesión de escritorio ni un llavero.

En Ubuntu 22.04, para ejecutar Warplyn se necesitan, entre otros, estos paquetes: `libgtk-3-0`, `libnss3`, `libasound2`, `libatk-bridge2.0-0`, `libdrm2`, `libgbm1`, `libxkbcommon0`, `libnotify4`, `libxcb-dri3-0` y `xdg-utils`. GNOME Keyring proporciona Secret Service. Una instalación habitual de GNOME incluye la mayoría de estos paquetes. Otras distribuciones usan nombres de paquete distintos y requieren sus propias comprobaciones de compatibilidad.

La integración con el escritorio es opcional: crea un lanzador que apunte a la ruta completa de la imagen. Mantén la misma ruta al actualizar. AppImage se validó en Ubuntu 22.04 x64 con GNOME. También se comprobó la compatibilidad con Ubuntu 24.04 x64 y Fedora 43 x64, ambos con GNOME.

Consulta [Recuperación tras actualizar la aplicación de escritorio](update-recovery.md) para ver los pasos de descarga, reinicio y recuperación.

Para añadir una entrada al menú de aplicaciones, puedes cambiar el nombre de la imagen a `Warplyn.AppImage` y guardarla en una carpeta `Applications` dentro de tu carpeta personal. Si no existe, crea `~/.local/share/applications` y guarda allí lo siguiente como `warplyn.desktop`. Sustituye `YOUR_USER` por tu nombre de usuario de Linux, o usa la ruta completa donde guardaste la imagen:

```ini
[Desktop Entry]
Type=Application
Name=Warplyn
Exec="/home/YOUR_USER/Applications/Warplyn.AppImage" %U
Terminal=false
Categories=Office;
StartupWMClass=Warplyn
```

La entrada del menú seguirá funcionando porque las actualizaciones desde la aplicación reemplazan la imagen en la misma ruta. Para añadir el icono de Warplyn, ejecuta `./Warplyn.AppImage --appimage-extract warplyn.png` junto a la imagen, guarda el PNG extraído en una ubicación permanente y añade `Icon=` seguido de su ruta completa al archivo del lanzador.

## Después de la instalación

Para usar las funciones de IA, añade una conexión de proveedor en **Configuración** → **Asistente de IA**. Elige una **Carpeta de copias de seguridad** en **Configuración** → **Datos y copias de seguridad** para proteger tus *artículos*.

Warplyn guarda los *artículos* y los puntos de control de *borrador* en tu ordenador. Las solicitudes de IA necesitan conexión a Internet y envían el texto y el contexto pertinentes del *artículo* al proveedor que elijas. Se aplican las políticas de datos y los precios del proveedor.
