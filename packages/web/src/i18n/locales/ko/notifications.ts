import type { MessageId } from "../../messages.js";


export const notificationsMessages = {
    "notifications.dismiss": "알림 닫기: {title}",
    "notifications.errorTitle": "문제가 발생했습니다",
    "notifications.viewport": "알림",
} satisfies Partial<Record<MessageId, string>>;
