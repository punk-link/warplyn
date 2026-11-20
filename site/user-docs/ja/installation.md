---
description: "Windows または Linux に Warplyn をインストールして、執筆環境をセットアップします。Debian と AppImage のパッケージに対応しています。"
---

# Warplyn のインストール

Warplyn は Windows 11 x64 と Linux で利用できます。最新のインストーラーは [Warplyn のリリース一覧](https://github.com/punk-link/warplyn/releases)からダウンロードしてください。Skladno をお使いの場合は、[移行ガイド](migration.md)に従い、復元したデータを確認できるまで Skladno をアンインストールせず、バックアップも保管してください。

## Windows

1. [Warplyn のリリース一覧](https://github.com/punk-link/warplyn/releases)を開きます。
2. **Assets** から Windows 用セットアップ `.exe` をダウンロードして実行します。
3. Windows に SmartScreen の警告が表示されたら、インストーラーがこのリポジトリのリリースページから取得されたことを確認してください。リリースにはデジタル署名がありません。
4. スタートメニューから Warplyn を開きます。

更新方法と復旧については、[デスクトップ更新の復旧](update-recovery.md)を参照してください。

::: info デジタル署名について
デジタル署名はコード署名証明書を使って発行元を示し、署名後にインストーラーが変更されていないか確認するものです。ソフトウェアの安全性を保証するものではありません。Warplyn ではまだ発行元の署名を導入していないため、Windows はインストーラーから発行元を確認できません。必ず公式リリースページからダウンロードしてください。
:::

## Debian および Debian ベースのディストリビューション

Ubuntu 22.04 x64 を主な検証対象としています。ほかのディストリビューションのバージョンでの動作は保証されません。amd64 システムとグラフィカルなデスクトップセッションを使用してください。

1. [Warplyn のリリース一覧](https://github.com/punk-link/warplyn/releases)を開きます。
2. **Assets** から `warplyn_VERSION_amd64.deb` パッケージをダウンロードします。
3. ダウンロードしたフォルダーでターミナルを開きます。フォルダーに Warplyn のパッケージだけがある場合は、次のコマンドでインストールします。

   ```sh
   sudo apt install ./warplyn_*.deb
   ```

4. アプリケーションメニューから Warplyn を開きます。

手動でアップグレードするには、新しい `.deb` をダウンロードし、そのファイルを指定して同じ `sudo apt install` コマンドを実行します。ダウンロードによって自動更新用のパッケージリポジトリが設定されることはありません。Apt は Warplyn に必要なパッケージもインストールします。必要なパッケージを用意できない場合は、インストールを強行しないでください。

執筆データは、既定では `~/.warplyn` に保存されます。アップグレード前にバックアップしてください。アプリケーションを再インストールまたは削除しても、このフォルダーとデスクトップのキーリングに保存された認証情報は保持されます。

Linux で管理対象の API キーを使うには、GNOME Keyring などの Secret Service が利用可能で、ロック解除されている必要があります。ほかの接続方法については、[AI プロバイダーとモデル](providers.md)を参照してください。

キーを保存または読み込めない場合は、デスクトップのキーリングをロック解除して再試行してください。セッションに Secret Service がない場合は、有効化するか、同ガイドの環境変数を使う接続方法を利用してください。オフラインでも編集できます。起動エラーへの対処としてサンドボックスを無効にしないでください。ディストリビューション、バージョン、エラーを報告してください。

### Linux AppImage {#linux-appimage}

x64 の `.AppImage` が含まれるリリースでは、書き込み可能なフォルダーにファイルを置いてください。[Warplyn のリリース一覧](https://github.com/punk-link/warplyn/releases)からダウンロードし、ファイルマネージャーで実行可能にしてから起動します。ダウンロードフォルダーで `chmod +x Warplyn-*-linux-x64.AppImage` を実行する方法もあります。Linux では FUSE と `/dev/fuse` へのアクセス、Electron のデスクトップライブラリ、管理対象の認証情報に使う Secret Service のキーリングが必要です。AppImage にはデスクトップセッションやキーリングは含まれません。

Ubuntu 22.04 の検証環境で必要なデスクトップ用依存パッケージは、`libgtk-3-0`、`libnss3`、`libasound2`、`libatk-bridge2.0-0`、`libdrm2`、`libgbm1`、`libxkbcommon0`、`libnotify4`、`libxcb-dri3-0`、`xdg-utils` です。GNOME Keyring が Secret Service を提供します。通常の GNOME 環境には、これらのパッケージの大半が含まれます。ほかのディストリビューションではパッケージ名が異なるため、それぞれ互換性の確認が必要です。

デスクトップとの統合は任意です。イメージのフルパスを指定するランチャーを作成してください。更新後も同じパスを使います。AppImage は Ubuntu 22.04 x64 の GNOME 環境で検証済みです。Ubuntu 24.04 x64 と Fedora 43 x64 でも、GNOME 環境で互換性を確認しました。

ダウンロード、再起動、復旧の手順は[デスクトップ更新の復旧](update-recovery.md)を参照してください。

アプリケーションメニューに登録する場合は、イメージの名前を `Warplyn.AppImage` に変更し、ホームフォルダー内の `Applications` フォルダーに置きます。`~/.local/share/applications` が存在しない場合は作成し、その中に `warplyn.desktop` として次の内容を保存してください。`YOUR_USER` を Linux のユーザー名に置き換えるか、イメージを保存したフルパスを指定します。

```ini
[Desktop Entry]
Type=Application
Name=Warplyn
Exec="/home/YOUR_USER/Applications/Warplyn.AppImage" %U
Terminal=false
Categories=Office;
StartupWMClass=Warplyn
```

アプリ内更新では同じパスのイメージが置き換わるため、メニューの項目はそのまま使えます。Warplyn のアイコンを追加するには、イメージと同じフォルダーで `./Warplyn.AppImage --appimage-extract warplyn.png` を実行します。展開した PNG を消えない場所に保存し、ランチャーファイルに `Icon=` を追加して、その後ろに PNG のフルパスを指定してください。

## インストール後

AI 機能を使うには、**設定** → **AIアシスタント** でプロバイダー接続を追加します。*記事*を保護するには、**設定** → **データとバックアップ** で **バックアップフォルダー** を選択してください。

Warplyn は *記事* とチェックポイントをコンピューターに保存します。AI リクエストにはインターネット接続が必要です。また、選択したプロバイダーに、関連する *記事*のテキストとコンテキストが送信されます。プロバイダーのデータポリシーと料金が適用されます。
