import type { MessageId } from "../../messages.js";


export const notificationsMessages = {
    "notifications.dismiss": "通知を閉じる：{title}",
    "notifications.errorTitle": "問題が発生しました",
    "notifications.viewport": "通知",
} satisfies Partial<Record<MessageId, string>>;
