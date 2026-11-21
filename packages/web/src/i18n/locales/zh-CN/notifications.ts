import type { MessageId } from "../../messages.js";


export const notificationsMessages = {
    "notifications.dismiss": "关闭通知：{title}",
    "notifications.errorTitle": "发生了问题",
    "notifications.viewport": "通知",
} satisfies Partial<Record<MessageId, string>>;
