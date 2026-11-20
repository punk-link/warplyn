import type { MessageId } from "../../messages.js";


export const telemetryMessages = {
    "telemetry.dismiss": "关闭",
    "telemetry.enable": "启用分享",
    "telemetry.invitation": "请启用遥测，帮助我们了解您的使用体验并改进Warplyn。分享完全自愿，默认关闭。",
    "telemetry.learnMore": "了解更多",
} satisfies Partial<Record<MessageId, string>>;
