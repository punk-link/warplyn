import type { MessageId } from "../../messages.js";


export const notesMessages = {
    "notes.add": "編集メモを追加…",
    "notes.count": "編集メモ{separator}{count}",
    "notes.detached": "再添付が必要です",
    "notes.edit": "メモを編集…",
    "notes.empty": "編集メモはまだありません。",
    "notes.failed": "メモを更新できませんでした。指示を控えてから記事を開き直し、もう一度お試しください。",
    "notes.guidance": "アシスタントへの指示",
    "notes.help": "添付したメモは、その箇所に対するアシスタントの作業の指針になります。記事の本文とは別に保存されます。",
    "notes.included": "このリクエストに添付するメモ",
    "notes.marker": "編集メモ {number}",
    "notes.markers": "編集メモ {numbers}",
    "notes.reattach": "選択したテキストに添付",
    "notes.reattachHelp": "エディターで新しい箇所を選択してから、このメモを開き直して添付してください。",
    "notes.remove": "メモを削除",
    "notes.save": "メモを保存",
    "notes.select": "メモを添付するテキストを選択してください。",
    "notes.title": "編集メモ",
} satisfies Partial<Record<MessageId, string>>;
