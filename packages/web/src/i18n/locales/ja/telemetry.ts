import type { MessageId } from "../../messages.js";


export const telemetryMessages = {
    "telemetry.dismiss": "閉じる",
    "telemetry.enable": "共有を有効にする",
    "telemetry.invitation": "Warplynの利用体験の把握と改善のため、テレメトリーを有効にしてください。共有は任意で、初期設定ではオフです。",
    "telemetry.learnMore": "詳細を見る",
} satisfies Partial<Record<MessageId, string>>;
