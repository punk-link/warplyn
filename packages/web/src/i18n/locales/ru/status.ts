import type { MessageId } from "../../messages.js";


export const statusMessages = {
    "status.article": "Состояние статьи",
    "status.characterCount": "{characterCount} / {characterLimit} символов",
    "status.characterCount.ariaLabel": "Количество символов: {characterCount} из {characterLimit}. Выберите лимит символов.",
    "status.characterLimitPresets": "Готовые лимиты символов",
    "status.revision": "v{revisionNumber}",
    "status.revisionMenu": "Сохранённые версии",
    "status.revisionSelector": "Текущая сохранённая версия v{revisionNumber}. Выберите сохранённую версию.",
    "status.updateAvailable": "Доступно обновление {version}",
    "status.updateDownloading": "Обновление скачивается",
    "status.updateFailed": "Не удалось проверить обновления",
    "status.updateReady": "Обновление готово к перезапуску",
    "status.windowsUpdateAvailable": "Скачать обновление {version} и разрешить автоматическую установку при следующем открытии Warplyn",
    "status.windowsUpdateReady": "Обновление скачано и автоматически установится при следующем открытии Warplyn.",
} satisfies Partial<Record<MessageId, string>>;
