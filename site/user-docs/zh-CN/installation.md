---
description: "在 Windows 或 Linux 上使用 Debian 或 AppImage 软件包安装 Warplyn，并设置写作工作区。"
---

# 安装 Warplyn

Warplyn 支持 Windows 11 x64 和 Linux。请从 [Warplyn 发布页](https://github.com/punk-link/warplyn/releases)下载当前安装包。如果你正在使用 Skladno，请按照[迁移指南](migration.md)操作；在确认恢复的内容无误前，请保留原安装和备份。

## Windows

1. 打开 [Warplyn 发布页](https://github.com/punk-link/warplyn/releases)。
2. 在 **Assets** 下下载 Windows 安装程序 `.exe` 并运行。
3. 如果 Windows 显示 SmartScreen 警告，请确认安装程序来自此代码库的发布页。当前发布版本尚未进行数字签名。
4. 从“开始”菜单打开 Warplyn。

有关更新控件和恢复步骤，请参阅[桌面版更新恢复](update-recovery.md)。

::: info 关于数字签名
数字签名使用代码签名证书标识发布者，并显示安装程序在签名后是否被修改。它不能保证软件安全。Warplyn 尚未建立发布者签名，因此 Windows 无法通过安装程序验证发布者。请仅从官方发布页下载。
:::

## Debian 及基于 Debian 的发行版

Ubuntu 22.04 x64 是主要验证的 Debian 目标环境；不保证其他发行版版本兼容。请使用带图形桌面会话的 amd64 系统。

1. 打开 [Warplyn 发布页](https://github.com/punk-link/warplyn/releases)。
2. 在 **Assets** 下下载 `warplyn_VERSION_amd64.deb` 软件包。
3. 在下载目录中打开终端。如果该目录只包含此 Warplyn 软件包，请运行以下命令安装：

   ```sh
   sudo apt install ./warplyn_*.deb
   ```

4. 从应用程序菜单打开 Warplyn。

若要手动升级，请下载较新的 `.deb` 文件，并使用该文件运行相同的 `sudo apt install` 命令。下载不会配置自动软件包仓库。Apt 会解析声明的依赖；如果无法满足依赖，请勿强制安装。

写作数据默认存储在 `~/.warplyn`。升级前请备份。重新安装或卸载应用应会保留此目录以及桌面密钥环中的凭据。

在 Linux 上使用托管 API 密钥需要可用且已解锁的 Secret Service，例如 GNOME Keyring。其他连接选项请参阅 [AI 提供商和模型](providers.md)。

如果无法保存或读取密钥，请解锁桌面密钥环并重试。如果当前会话没有 Secret Service，请启用该服务，或使用指南中介绍的环境变量连接。离线编辑仍然可用。请勿通过禁用沙盒来规避启动失败；请报告发行版、版本和错误信息。

### Linux AppImage {#linux-appimage}

对于包含 x64 `.AppImage` 文件的发布版本，请将其放在可写目录中。从 [Warplyn 发布页](https://github.com/punk-link/warplyn/releases)下载文件，在文件管理器中将其设为可执行，然后启动。也可以在下载目录中运行 `chmod +x Warplyn-*-linux-x64.AppImage`。Linux 需要支持 FUSE 并可访问 `/dev/fuse`，还需要 Electron 桌面库以及用于托管凭据的 Secret Service 密钥环。AppImage 不附带桌面会话或密钥环。

在 Ubuntu 22.04 目标环境中，桌面依赖包括 `libgtk-3-0`、`libnss3`、`libasound2`、`libatk-bridge2.0-0`、`libdrm2`、`libgbm1`、`libxkbcommon0`、`libnotify4`、`libxcb-dri3-0` 和 `xdg-utils`。GNOME Keyring 提供 Secret Service。常规 GNOME 安装通常包含其中大部分软件包。其他发行版使用不同的软件包名称，需要单独进行兼容性检查。

桌面集成是可选的：创建一个指向映像完整路径的启动器。更新时请保持路径不变。AppImage 桌面版验收仍未完成。Ubuntu 22.04 x64 是主要验证目标；Ubuntu 24.04 x64 和 Fedora 43 x64 是其他兼容性目标。这些目标并不代表支持所有 Linux 发行版。

有关明确的下载、重启和恢复步骤，请参阅[桌面版更新恢复](update-recovery.md)。

若要在应用程序菜单中添加入口，可将映像重命名为 `Warplyn.AppImage`，并放入主目录下的 `Applications` 文件夹。如果 `~/.local/share/applications` 不存在，请先创建，然后在其中将以下内容保存为 `warplyn.desktop`。将 `YOUR_USER` 替换为你的 Linux 用户名，或使用映像所在位置的完整路径：

```ini
[Desktop Entry]
Type=Application
Name=Warplyn
Exec="/home/YOUR_USER/Applications/Warplyn.AppImage" %U
Terminal=false
Categories=Office;
StartupWMClass=Warplyn
```

应用内更新会在同一路径替换映像，因此菜单入口会继续有效。若要添加 Warplyn 图标，请在映像旁运行 `./Warplyn.AppImage --appimage-extract warplyn.png`，将提取的 PNG 存放在长期保留的位置，并在启动器文件中添加 `Icon=`，后接其完整路径。

## 安装后

若要使用 AI 功能，请前往 **设置** → **AI助理** 添加提供商连接。在 **设置** → **数据与备份** 中选择 **备份文件夹**，以保护你的*文章*。

Warplyn 会在你的电脑上存储*文章*和*草稿*检查点。AI 请求需要互联网连接，并会将相关的*文章*文本和上下文发送给你所选的提供商。该提供商的数据政策和收费标准适用。
