import type { MessageId } from "../../messages.js";


export const electronMessages = {
    "electron.articleFiles.docx": "Wordファイル",
    "electron.articleFiles.html": "HTMLファイル",
    "electron.articleFiles.load": "ファイルから記事を読み込む",
    "electron.articleFiles.markdown": "Markdownファイル",
    "electron.articleFiles.rtf": "リッチテキストファイル",
    "electron.articleFiles.save": "記事をファイルに保存",
    "electron.closeFailed.message": "下書きのチェックポイントは保存されましたが、ローカルデータベースを正常に閉じられませんでした。",
    "electron.closeFailed.title": "Warplynを正常に終了できませんでした",
    "electron.deleteData.backup": "削除前にバックアップを作成",
    "electron.deleteData.cancel": "キャンセル",
    "electron.deleteData.delete": "ローカルデータをすべて削除",
    "electron.deleteData.detail": "削除後にWarplynは終了します。バックアップフォルダーが設定されている場合は、先にバックアップを作成できます。",
    "electron.deleteData.message": "Warplynのデータフォルダー内の記事、下書きのチェックポイント、保存済みバージョン、アシスタントの履歴、文体データ、設定、ローカルバックアップを完全に削除します。",
    "electron.deleteData.title": "Warplynのローカルデータをすべて削除しますか？",
    "electron.draftCheckpointFailed.detail": "記事に戻って再試行するか、最新の未保存の変更を破棄して終了してください。",
    "electron.draftCheckpointFailed.message": "Warplynは下書きの最新チェックポイントを保存できませんでした。",
    "electron.draftCheckpointFailed.quit": "最新チェックポイントを保存せずに終了",
    "electron.draftCheckpointFailed.return": "記事に戻る",
    "electron.draftCheckpointFailed.title": "チェックポイントの保存に失敗しました",
    "electron.restoreBackup.cancel": "キャンセル",
    "electron.restoreBackup.detail": (
        "Warplynは下書きの最新チェックポイントを保存し、現在のデータの復旧用コピーを保持してから再起動します。既存のAI接続はローカルに残ります。環境変数への参照は復元できますが、APIキーや変数の値はインポートされません" +
        "。この操作は設定から取り消せません。"
    ),
    "electron.restoreBackup.message": "現在のWarplynのローカルデータを、選択したバックアップで置き換えます。",
    "electron.restoreBackup.restore": "復元して再起動",
    "electron.restoreBackup.title": "このバックアップを復元しますか？",
    "electron.restoreFailed.message": "このデータを使用している他のWarplynウィンドウやローカル開発サーバーを閉じて、もう一度お試しください。現在のデータは変更されていません。",
    "electron.restoreFailed.title": "バックアップを復元できませんでした",
    "electron.spelling.addWord": "辞書に追加",
    "electron.startFailed.message": "ローカルデータフォルダーが利用可能であることを確認して、もう一度お試しください。",
    "electron.startFailed.title": "Warplynを起動できませんでした",
} satisfies Partial<Record<MessageId, string>>;
