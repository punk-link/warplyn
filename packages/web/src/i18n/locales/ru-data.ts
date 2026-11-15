import type { MessageId } from "../messages.js";

export const ruData = {
    "settings.backupFolder": "Папка резервных копий",
    "settings.backupFolderHint": "Выберите локальную папку для резервных копий. Warplyn сможет записывать в неё только после вашего выбора.",
    "settings.chooseBackupFolder": "Выбрать папку резервных копий",
    "settings.revealBackupFolder": "Открыть папку",
    "settings.managedCredential": "Сохранённые учётные данные",
    "settings.backupFolderSelected": "Используется {folderName}",
    "settings.backupFolderFailed": "Не удалось выбрать папку. Повторите попытку.",
    "settings.backupFolderRequired": "Сначала выберите папку резервных копий.",
    "settings.backupFolderPermissionDenied": "Warplyn не может получить доступ к папке резервных копий. Выберите её снова и разрешите доступ.",
    "settings.backupFolderUnsupported": "В этом браузере нельзя выбрать папку резервных копий.",
    "settings.automaticBackups": "Автоматические резервные копии",
    "settings.automaticBackupsHint":
        "Создаёт резервную копию вскоре после запуска и затем каждые 24 часа, пока Warplyn открыт. Ручные " +
        "копии никогда не удаляются автоматически.",
    "settings.automaticBackupFailed":
        "Не удалось создать автоматическую копию. Проверьте папку в разделе «Данные и резервные копии» и " +
        "создайте копию вручную. Статьи не изменены.",
    "settings.off": "Выключено",
    "settings.daily": "Ежедневно",
    "settings.retention": "Хранение автоматических копий",
    "settings.retentionHint": "Определяет количество автоматических копий. Ручные копии никогда не удаляются автоматически.",
    "settings.keepBackups": "Хранить копии: {count}",
    "settings.keepAllBackups": "Хранить все копии",
    "settings.createBackup": "Создать резервную копию",
    "settings.createBackupHint":
        "Сохраняет статьи, версии, настройки, авторские навыки и их историю. В браузере поддерживаются файлы " +
        "до 100 МБ и суммарно до 500 МБ. Ключи API не включаются.",
    "settings.backupCreating": "Создание резервной копии…",
    "settings.backupCreated": "Создана копия {name}",
    "settings.backupCreateFailed":
        "Не удалось создать резервную копию. Проверьте выбранную папку и ограничения браузера на размер, " +
        "затем повторите попытку. Сеанс редактирования не изменён.",
    "settings.backupCreateUnavailable": "Резервные копии недоступны в этом сеансе браузера.",
    "settings.restoreBackup": "Восстановить резервную копию",
    "settings.restoreBackupHint":
        "Выберите копию из указанной папки. Warplyn проверит файлы, сохранит копию для восстановления, затем " +
        "восстановит статьи, версии, настройки и навыки. Существующие подключения к ИИ останутся локальными. " +
        "Ссылки на переменные окружения можно восстановить; ключи API и значения переменных никогда не " +
        "импортируются. Старые копии только базы данных сохраняют текущие навыки.",
    "settings.restoreBackupFailed": "Не удалось восстановить копию. Проверьте её файлы и ограничения браузера или выберите другую. Текущие данные не изменены.",
    "settings.restoreBackupUnavailable": "Эту резервную копию нельзя восстановить.",
    "settings.chooseBackup": "Выбрать резервную копию",
    "settings.restoreBackupConfirm": "Восстановить {name}? Warplyn заменит текущие локальные данные и перезагрузится.",
    "settings.deleteData": "Удалить локальные данные",
    "settings.deleteLocalData": "Удалить все локальные данные",
    "settings.deleteLocalDataHint":
        "Навсегда удаляет статьи, чекпоинты, сохранённые версии, историю помощника, данные стиля, настройки и " +
        "локальные резервные копии в папке данных Warplyn. В окне подтверждения можно сначала создать " +
        "проверенную резервную копию.",
    "settings.deleteLocalDataFailed": "Не удалось удалить локальные данные. Полное удаление не подтверждено.",
    "settings.loading": "Загрузка настроек…",
    "settings.privacyAndDiagnostics": "Конфиденциальность и диагностика",
    "settings.telemetry": "Отправлять данные диагностики и использования",
    "telemetry.invitation": "Включите телеметрию, чтобы помочь нам понять ваш опыт и улучшить Warplyn. Отправка добровольна и по умолчанию выключена.",
    "telemetry.enable": "Включить отправку",
    "telemetry.learnMore": "Подробнее",
    "telemetry.dismiss": "Закрыть",
    "settings.telemetryHint":
        "Помогите улучшить Warplyn, отправляя в PostHog псевдонимные события надёжности и использования. " +
        "Текст статей, запросы, ответы ИИ и ключи API никогда не включаются.",
    "settings.telemetryDisclosure":
        "Телеметрия по умолчанию выключена. Включите отправку, чтобы помочь понять ваш опыт и улучшить " +
        "Warplyn. Её можно выключить в любой момент: сбор прекратится, но уже отправленные данные не будут " +
        "отозваны.",
    "settings.telemetryDetails": "Подробнее о телеметрии",
    "settings.telemetryIdentifier": "Идентификатор телеметрии",
    "settings.telemetryIdentifierHint":
        "Укажите этот идентификатор при запросе удаления. Скопируйте его до выключения телеметрии: при " +
        "выключении он удаляется.",
    "settings.copyTelemetryIdentifier": "Копировать идентификатор телеметрии",
    "settings.telemetryIdentifierCopied": "Идентификатор телеметрии скопирован.",
    "settings.telemetrySaveFailed": "Не удалось сохранить выбор. Предыдущая настройка не изменена. Повторите попытку.",
    "settings.telemetryUnavailable": "Телеметрия доступна только в настроенной сборке приложения.",
    "settings.saved": "Сохранено",
    "settings.loadingFailed": "Не удалось загрузить настройки. Сохранённые настройки не изменены. Обновите страницу и повторите попытку.",
    "settings.saving": "Сохранение…",
    "settings.saveFailed": "Не удалось сохранить настройки. Предыдущие настройки не изменены. Повторите попытку.",
    "settings.modelSaveFailed": "Не удалось сохранить выбор моделей. Предыдущие настройки не изменены. Повторите попытку.",
    "settings.backupSaveFailed": "Не удалось сохранить настройки резервных копий. Предыдущие настройки не изменены. Повторите попытку.",
    "settings.updates": "Обновления",
    "settings.updateNetworkAccess": "Разрешить доступ к сети для обновлений",
    "settings.updateNetworkAccessHint":
        "Разрешает Warplyn обращаться к GitHub за общедоступными сведениями о выпусках и выбранными вами " +
        "обновлениями. Текст статей, данные учётной записи, идентификаторы устройства и аналитика никогда не " +
        "отправляются.",
    "settings.updateNetworkPermissionTitle": "Разрешить Warplyn проверять обновления на GitHub?",
    "settings.updateNetworkPermissionDescription":
        "Warplyn обратится к api.github.com за общедоступными сведениями о выпусках. Текст статей, данные " +
        "учётной записи, идентификаторы устройства и аналитика не отправляются.",
    "settings.allowNetworkAccess": "Разрешить",
    "settings.automaticUpdates": "Автоматически проверять обновления",
    "settings.automaticUpdatesHint":
        "Проверяет GitHub при запуске Warplyn и затем ежедневно, пока приложение открыто. Обновления " +
        "скачиваются только после выбора команды «Скачать».",
    "settings.windowsUpdateDownloadHint":
        "Скачивание обновления также разрешает установку. После скачивания оно автоматически установится при " +
        "следующем открытии Warplyn, в том числе после обычного закрытия приложения.",
    "status.windowsUpdateReady": "Обновление скачано и автоматически установится при следующем открытии Warplyn.",
    "status.windowsUpdateAvailable": "Скачать обновление {version} и разрешить автоматическую установку при следующем открытии Warplyn",
    "settings.includePrereleaseUpdates": "Включать предварительные выпуски",
    "settings.includePrereleaseUpdatesHint": "Если выключено, Warplyn предлагает только стабильные выпуски.",
    "settings.updateStatus": "Состояние обновления",
    "settings.updateStatusHint": "Текущая версия: {version}",
    "settings.updateStatusUnavailableHint": "Настройки обновлений действуют, если эта версия поддерживает обновления.",
    "settings.updatesChecking": "Проверка обновлений…",
    "settings.updatesCurrent": "Установлен последний выпуск.",
    "settings.updatesNetworkAccessRequired": "Разрешите доступ к сети для проверки обновлений.",
    "settings.updatesUnavailable": "В этой версии обновления недоступны.",
    "settings.updatesAvailable": "Доступна версия {version}.",
    "settings.updatesError.discovery_failed": "Не удалось проверить обновления. Повторите попытку.",
    "settings.updatesError.download_failed": "Не удалось скачать обновление. Повторите попытку.",
    "settings.updatesError.apply_failed": "Не удалось подготовить обновление. Повторите попытку или откройте справку по восстановлению обновлений.",
    "settings.checkNow": "Проверить сейчас",
    "settings.viewReleaseNotes": "Посмотреть примечания к выпуску",
    "settings.updateChanges": "Изменения в {version}",
    "settings.securityUpdate": "Обновление безопасности",
    "settings.updateChangesUnavailable": "Сведения о выпуске недоступны. Обновление по-прежнему возможно.",
    "settings.downloadUpdate": "Скачать",
    "settings.restartAndUpdate": "Перезапустить и обновить",
    "settings.retry": "Повторить",
    "settings.updateRecovery": "Восстановление обновлений",
    "settings.on": "Включено",
    "status.updateAvailable": "Доступно обновление {version}",
    "status.updateDownloading": "Обновление скачивается",
    "status.updateReady": "Обновление готово к перезапуску",
    "status.updateFailed": "Не удалось проверить обновления",
    "workspace.loadingArticles": "Загрузка локальных статей…",
    "workspace.serviceUnavailable": "Локальный сервис недоступен. Запустите его и повторите попытку.",
    "assistant.setupRequired": "Настройте подключение модели для работы с помощником. Локальное письмо доступно.",
    "workspace.aiConnectionRequired": "Локальное письмо доступно. Настройте модель для работы с помощником.",
    "workspace.addModelKey": "Добавить ключ модели",
    "workspace.aiConnectionCapabilities":
        "Вы можете писать, сохранять, упорядочивать и копировать статьи, а также локально проверять " +
        "типографику. Запросы к помощнику, переводы, проверка фактов и полная проверка стиля требуют " +
        "настроенного подключения модели, в том числе поддерживаемой локальной модели.",
    "workspace.saveFailed": "Не удалось сохранить черновик. Последние изменения остаются в редакторе. Повторите сохранение.",
    "workspace.revisionHistoryFailed": "Не удалось загрузить историю версий. Статья не изменена. Обновите страницу и повторите попытку.",
    "workspace.createArticleFailed": "Не удалось создать статью. Повторите попытку.",
    "workspace.updateArticleFailed": "Не удалось обновить статью. Последние изменения остаются в редакторе. Повторите попытку.",
    "workspace.renameArticleFailed": "Не удалось переименовать статью. Прежнее название сохранено. Повторите попытку.",
    "workspace.deleteArticleFailed": "Не удалось удалить статью. Она по-прежнему доступна. Повторите попытку.",
    "workspace.restoreRevisionFailed": "Не удалось восстановить версию. Статья не изменена. Повторите попытку.",
    "workspace.styleCorpusLoadFailed": "Не удалось загрузить профиль стиля. Обновите страницу и повторите попытку.",
    "workspace.styleCorpusAddFailed": "Не удалось добавить текст в профиль стиля. Профиль не изменён. Повторите попытку.",
    "workspace.styleCorpusRemoveFailed": "Не удалось удалить текст из профиля стиля. Профиль не изменён. Повторите попытку.",
    "workspace.styleCorpusUpdateFailed": "Не удалось обновить профиль стиля. Прежний профиль сохранён. Повторите попытку.",
    "workspace.styleCorpusRebuildFailed": "Не удалось перестроить профиль стиля. Прежний профиль доступен. Повторите попытку.",
    "workspace.styleRulesLoadFailed": "Не удалось загрузить правила профиля стиля. Обновите страницу и повторите попытку.",
    "workspace.styleRulesSaveFailed": "Не удалось сохранить правила профиля стиля. Прежние правила сохранены. Повторите попытку.",
    "workspace.styleCorpusSnapshotFailed": "Не удалось добавить версию в профиль стиля. Профиль не изменён. Повторите попытку.",
    "workspace.resolveFindingFailed": "Не удалось обновить замечание. Статья не изменена. Повторите попытку.",
    "workspace.createTranslationFailed": "Не удалось создать статью перевода. Исходная статья не изменена. Повторите попытку.",
    "workspace.acceptProposalFailed": "Не удалось принять предложение. Статья не изменена. Повторите попытку.",
    "settings.modelsLoadFailed": "Не удалось загрузить доступные модели. Настройки не изменены. Повторите попытку.",
    "settings.connectionAddFailed": "Не удалось добавить подключение к ИИ. Настройки не изменены. Проверьте данные и повторите попытку.",
    "settings.connectionUpdateFailed": "Не удалось обновить подключение к ИИ. Прежние настройки не изменены. Повторите попытку.",
    "settings.connectionRemoveFailed": "Не удалось удалить подключение к ИИ. Оно доступно в настройках. Повторите попытку.",
    "settings.publishingSaveFailed": "Не удалось сохранить настройки публикации. Прежние настройки не изменены. Повторите попытку.",
    "publishing.defaultProfile": "Используется профиль публикации по умолчанию.",
    "publishing.charactersRemaining": "Осталось символов: {count} (рекомендация)",
    "publishing.charactersOverGuidance": "Превышение рекомендации в символах: {count}",
    "publishing.markdownCopied": "Markdown скопирован.",
    "publishing.plainTextCopied": "Обычный текст скопирован.",
    "publishing.copyFailed": "Не удалось скопировать. Повторите попытку.",
    "publishing.profileSaveFailed": "Не удалось сохранить профиль публикации.",
    "publishing.default": "По умолчанию",
    "publishing.linkedInPost": "Пост LinkedIn",
    "publishing.linkedInArticle": "Статья LinkedIn",
    "publishing.noRestrictions": "Без ограничений",
    "publishing.characterCount": "Символов: {count}",
} satisfies Partial<Record<MessageId, string>>;
