import type { MessageId } from "../../messages.js";


export const quickStartMessages = {
    "quickStart.addModelKey": "モデルのキーを追加",
    "quickStart.assistant.description": "右のパネルで編集、レビュー、翻訳、ファクトチェックを依頼できます。AIによる変更は採用するまで提案のまま保持され、指摘事項は参考情報です。",
    "quickStart.assistant.title": "アシスタントに依頼しましょう。",
    "quickStart.close": "クイックスタートを閉じる",
    "quickStart.modelKey.description": (
        "モデルのキーとは、AIプロバイダーが発行するAPIキーです。デスクトップアプリでプロバイダーを選び、キーを貼り付けてOSの資格情報ストアに保存します。モデルの一覧を更新し、既定のモデルを選択してください。保存したキーはW" +
        "arplynに再表示されません。"
    ),
    "quickStart.modelKey.title": "モデルのキーを追加しましょう。",
    "quickStart.skip": "クイックスタートをスキップ",
    "quickStart.startWriting": "執筆を始める",
    "quickStart.title": "Warplynへようこそ",
    "quickStart.write.description": "左のパネルで記事を作成するか開いて、中央の作業スペースで執筆します。Warplynは下書きの復旧状態とバージョン履歴を保持します。",
    "quickStart.write.title": "記事を書きましょう。",
} satisfies Partial<Record<MessageId, string>>;
