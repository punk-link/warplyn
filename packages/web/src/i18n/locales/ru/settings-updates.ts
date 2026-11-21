import type { MessageId } from "../../messages.js";


export const settingsUpdatesMessages = {
    "settings.automaticUpdates": "Автоматически проверять обновления",
    "settings.automaticUpdatesHint": (
        "Проверяет GitHub при запуске Warplyn и затем ежедневно, пока приложение открыто. Обновления скачиваются только" +
        " после выбора команды «Скачать»."
    ),
    "settings.checkNow": "Проверить сейчас",
    "settings.restartAndUpdate": "Перезапустить и обновить",
    "settings.updateChanges": "Изменения в {version}",
    "settings.updateChangesUnavailable": "Сведения о выпуске недоступны. Обновление по-прежнему возможно.",
    "settings.updateNetworkAccess": "Разрешить доступ к сети для обновлений",
    "settings.updateNetworkAccessHint": (
        "Разрешает Warplyn обращаться к GitHub за общедоступными сведениями о выпусках и выбранными вами обно" +
        "влениями. Текст статей, данные учётной записи, идентификаторы устройства и аналитика никогда не отпр" +
        "авляются."
    ),
    "settings.updateNetworkPermissionDescription": (
        "Warplyn обратится к api.github.com за общедоступными сведениями о выпусках. Текст статей, данные учё" +
        "тной записи, идентификаторы устройства и аналитика не отправляются."
    ),
    "settings.updateNetworkPermissionTitle": "Разрешить Warplyn проверять обновления на GitHub?",
    "settings.updateRecovery": "Восстановление обновлений",
    "settings.updateStatus": "Состояние обновления",
    "settings.updateStatusHint": "Текущая версия: {version}",
    "settings.updateStatusUnavailableHint": "Настройки обновлений действуют, если эта версия поддерживает обновления.",
    "settings.updates": "Обновления",
    "settings.updatesAvailable": "Доступна версия {version}.",
    "settings.updatesChecking": "Проверка обновлений…",
    "settings.updatesCurrent": "Установлен последний выпуск.",
    "settings.updatesError.apply_failed": "Не удалось подготовить обновление. Повторите попытку или откройте справку по восстановлению обновлений.",
    "settings.updatesError.discovery_failed": "Не удалось проверить обновления. Повторите попытку.",
    "settings.updatesError.download_failed": "Не удалось скачать обновление. Повторите попытку.",
    "settings.updatesNetworkAccessRequired": "Разрешите доступ к сети для проверки обновлений.",
    "settings.updatesUnavailable": "В этой версии обновления недоступны.",
    "settings.viewReleaseNotes": "Что нового",
    "settings.windowsUpdateDownloadHint": (
        "Скачивание обновления также разрешает установку. После скачивания оно автоматически установится при " +
        "следующем открытии Warplyn, в том числе после обычного закрытия приложения."
    ),
} satisfies Partial<Record<MessageId, string>>;
