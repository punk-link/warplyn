import type { MessageId } from "../../messages.js";

export const notificationsMessages = {
    "notifications.viewport": "알림",
    "notifications.errorTitle": "문제가 발생했습니다",
    "notifications.dismiss": "알림 닫기: {title}",
} satisfies Partial<Record<MessageId, string>>;
