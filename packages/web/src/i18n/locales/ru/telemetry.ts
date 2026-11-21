import type { MessageId } from "../../messages.js";


export const telemetryMessages = {
    "telemetry.dismiss": "Закрыть",
    "telemetry.enable": "Включить отправку",
    "telemetry.invitation": "Включите телеметрию, чтобы помочь нам понять ваш опыт и улучшить Warplyn. Отправка добровольна и по умолчанию выключена.",
    "telemetry.learnMore": "Подробнее",
} satisfies Partial<Record<MessageId, string>>;
