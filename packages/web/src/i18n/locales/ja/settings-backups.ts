import type { MessageId } from "../../messages.js";


export const settingsBackupsMessages = {
    "settings.automaticBackupFailed": "自動バックアップに失敗しました。「データとバックアップ」でフォルダーを確認し、手動でバックアップを作成してください。記事は変更されていません。",
    "settings.automaticBackups": "自動バックアップ",
    "settings.automaticBackupsHint": "有効にすると、起動後まもなくバックアップを作成し、Warplynが開いている間はその時点から24時間ごとに作成します。手動のバックアップは自動削除されません。",
    "settings.backupAutomation": "自動バックアップ",
    "settings.backupCreateFailed": "バックアップを作成できませんでした。選択したフォルダーとブラウザーのサイズ上限を確認し、再試行してください。編集中の状態は変わりません。",
    "settings.backupCreateUnavailable": "このブラウザーセッションではバックアップを利用できません。",
    "settings.backupCreated": "{name}を作成しました",
    "settings.backupCreating": "バックアップを作成中…",
    "settings.backupFolder": "バックアップフォルダー",
    "settings.backupFolderFailed": "フォルダーを選択できませんでした。もう一度お試しください。",
    "settings.backupFolderHint": "バックアップを保存するローカルフォルダーを選択します。選択するまでWarplynは書き込めません。",
    "settings.backupFolderPermissionDenied": "バックアップフォルダーにアクセスできません。もう一度選択してアクセスを許可してください。",
    "settings.backupFolderRequired": "先にバックアップフォルダーを選択してください。",
    "settings.backupFolderSelected": "保存先：{folderName}",
    "settings.backupFolderUnsupported": "このブラウザーではバックアップフォルダーを選択できません。",
    "settings.backupSaveFailed": "バックアップの設定を保存できませんでした。以前の設定は変わりません。もう一度お試しください。",
    "settings.backupStorage": "バックアップの保存先",
    "settings.chooseBackup": "バックアップを選択",
    "settings.chooseBackupFolder": "フォルダーを選択…",
    "settings.createBackup": "バックアップを作成",
    "settings.createBackupHint": "記事、保存済みバージョン、設定、著者のスキル、スキルの履歴を保存します。ブラウザーでは1ファイル100 MB、合計500 MBまで対応します。APIキーは含まれません。",
    "settings.dataBackups": "データとバックアップ",
    "settings.keepAllBackups": "すべてのバックアップを保持",
    "settings.keepBackups": "{count}件のバックアップを保持",
    "settings.restoreBackup": "バックアップを復元",
    "settings.restoreBackupConfirm": "{name}を復元しますか？現在のローカルデータを置き換え、Warplynを再読み込みします。",
    "settings.restoreBackupFailed": "バックアップを復元できませんでした。ファイルとブラウザーのサイズ上限を確認するか、別のバックアップを選んでください。現在のデータは変わりません。",
    "settings.restoreBackupHint": (
        "選択したフォルダーからバックアップを選びます。Warplynはファイルを確認し、復旧用コピーを保持してから記事、保存済みバージョン、設定、保存したスキルを復元します。既存のAI接続はローカルに残ります" +
        "。環境変数への参照は復元できますが、APIキーや変数の値はインポートされません。古いデータベースのみのバックアップでは現在のスキルを維持します。"
    ),
    "settings.restoreBackupUnavailable": "このバックアップは復元できません。",
    "settings.retention": "自動バックアップの保持数",
    "settings.retentionHint": "保持する自動バックアップの数を設定します。手動のバックアップは自動削除されません。",
    "settings.revealBackupFolder": "フォルダーを開く",
} satisfies Partial<Record<MessageId, string>>;
