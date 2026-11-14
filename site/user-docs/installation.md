---
description: "Install Warplyn on Windows 11 or Debian Linux, connect an AI provider, and start using the desktop writing workspace."
---

# Install Warplyn

Warplyn is available for Windows 11 x64 and Linux. Download the current installers from [Warplyn releases](https://github.com/punk-link/warplyn/releases). If you use Skladno, follow the [migration guide](migration.md) and keep its installation and backups until you verify your restored work.

## Windows

1. Open [Warplyn releases](https://github.com/punk-link/warplyn/releases).
2. Under **Assets**, download the Windows setup `.exe` and run it.
3. If Windows shows a SmartScreen warning, confirm that the installer came from this repository's release page. Releases are not digitally signed.
4. Open Warplyn from the Start menu.

For update controls and recovery, see [Windows preview update recovery](update-recovery.md).

::: info About digital signatures
A digital signature uses a code-signing certificate to identify the publisher and show whether an installer has changed since it was signed. It does not guarantee that software is safe. Warplyn has not yet established publisher signing, so Windows cannot verify the publisher from the installer. Download it only from the official release page.
:::

## Debian and Debian-based distributions

Ubuntu 22.04 x64 is the primary release-validation target. Full installed acceptance is still pending; other distribution versions are not guaranteed. Use an amd64 system with a graphical desktop session.

1. Open [Warplyn releases](https://github.com/punk-link/warplyn/releases).
2. Under **Assets**, download the `warplyn_VERSION_amd64.deb` package.
3. Open a terminal in the folder where you downloaded it. If the folder contains only that Warplyn package, install it with:

   ```sh
   sudo apt install ./warplyn_*.deb
   ```

4. Open Warplyn from your applications menu.

For a manual upgrade, download the newer `.deb` and run the same `sudo apt install` command with that file. The download does not configure an automatic package repository. Apt resolves declared dependencies; do not force installation if they cannot be satisfied.

Writing is stored in `~/.warplyn` by default. Back it up before upgrading. Reinstalling or removing the application should preserve this folder and credentials in your desktop keyring.

Managed API keys on Linux require an available, unlocked Secret Service, such as GNOME Keyring. See [AI providers and models](providers.md) for other connection options.

If a key cannot be saved or read, unlock your desktop keyring and retry. If your session has no Secret Service, enable one or use an environment-variable connection from that guide. Offline editing remains available. Do not disable the sandbox to work around startup failures; report the distribution, version, and error.

## After installation

To use AI features, add a provider connection in **Settings** → **AI assistant**. Choose a **Backup folder** in **Settings** → **Data & backups** to protect your *Articles*.

Warplyn stores *Articles* and *Draft* checkpoints on your computer. AI requests need an internet connection and send the relevant *Article* text and context to the provider you choose. The provider's data policies and pricing apply.
