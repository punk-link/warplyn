import type { MessageId } from "../../messages.js";


export const statusMessages = {
    "status.article": "記事の状態",
    "status.characterCount": "{characterCount} / {characterLimit}文字",
    "status.characterCount.ariaLabel": "文字数：{characterLimit}文字中{characterCount}文字。文字数の上限を選択してください。",
    "status.characterLimitPresets": "文字数上限のプリセット",
    "status.revision": "v{revisionNumber}",
    "status.revisionMenu": "保存済みバージョン",
    "status.revisionSelector": "現在の保存済みバージョンはv{revisionNumber}です。保存済みバージョンを選択してください。",
    "status.updateAvailable": "更新{version}が利用できます",
    "status.updateDownloading": "更新をダウンロード中",
    "status.updateFailed": "更新の確認に失敗しました",
    "status.updateReady": "更新の準備ができました。再起動できます",
    "status.windowsUpdateAvailable": "更新{version}をダウンロードし、次回Warplynを開く際の自動インストールを承認",
    "status.windowsUpdateReady": "更新をダウンロードしました。次回Warplynを開くと自動的に適用されます。",
} satisfies Partial<Record<MessageId, string>>;
