import type { MessageId } from "../../messages.js";


export const telemetryMessages = {
    "telemetry.dismiss": "닫기",
    "telemetry.enable": "공유 활성화",
    "telemetry.invitation": "사용 경험을 이해하고 Warplyn을 개선할 수 있도록 원격 측정을 활성화해 주세요. 공유는 선택 사항이며 기본적으로 꺼져 있습니다.",
    "telemetry.learnMore": "자세히 알아보기",
} satisfies Partial<Record<MessageId, string>>;
