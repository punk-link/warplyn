import type { MessageId } from "../../messages.js";


export const settingsBackupsMessages = {
    "settings.automaticBackupFailed": (
        "Не удалось создать автоматическую копию. Проверьте папку в разделе «Данные и резервные копии» и создайте копию" +
        " вручную. Статьи не изменены."
    ),
    "settings.automaticBackups": "Автоматические резервные копии",
    "settings.automaticBackupsHint": (
        "Создаёт резервную копию вскоре после запуска и затем каждые 24 часа, пока Warplyn открыт. Ручные копии никогда" +
        " не удаляются автоматически."
    ),
    "settings.backupAutomation": "Автокопии",
    "settings.backupCreateFailed": (
        "Не удалось создать резервную копию. Проверьте выбранную папку и ограничения браузера на размер, затем повторит" +
        "е попытку. Сеанс редактирования не изменён."
    ),
    "settings.backupCreateUnavailable": "Резервные копии недоступны в этом сеансе браузера.",
    "settings.backupCreated": "Создана копия {name}",
    "settings.backupCreating": "Создание резервной копии…",
    "settings.backupFolder": "Папка резервных копий",
    "settings.backupFolderFailed": "Не удалось выбрать папку. Повторите попытку.",
    "settings.backupFolderHint": "Выберите локальную папку для резервных копий. Warplyn сможет записывать в неё только после вашего выбора.",
    "settings.backupFolderPermissionDenied": "Warplyn не может получить доступ к папке резервных копий. Выберите её снова и разрешите доступ.",
    "settings.backupFolderRequired": "Сначала выберите папку резервных копий.",
    "settings.backupFolderSelected": "Используется {folderName}",
    "settings.backupFolderUnsupported": "В этом браузере нельзя выбрать папку резервных копий.",
    "settings.backupSaveFailed": "Не удалось сохранить настройки резервных копий. Предыдущие настройки не изменены. Повторите попытку.",
    "settings.backupStorage": "Хранение резервных копий",
    "settings.chooseBackup": "Выбрать резервную копию",
    "settings.chooseBackupFolder": "Выбрать папку…",
    "settings.createBackup": "Создать копию",
    "settings.createBackupHint": (
        "Сохраняет статьи, версии, настройки, авторские навыки и их историю. В браузере поддерживаются файлы до 100 МБ " +
        "и суммарно до 500 МБ. Ключи API не включаются."
    ),
    "settings.dataBackups": "Данные и копии",
    "settings.keepAllBackups": "Хранить все копии",
    "settings.keepBackups": "Хранить копии: {count}",
    "settings.restoreBackup": "Восстановить…",
    "settings.restoreBackupConfirm": "Восстановить {name}? Warplyn заменит текущие локальные данные и перезагрузится.",
    "settings.restoreBackupFailed": (
        "Не удалось восстановить копию. Проверьте её файлы и ограничения браузера или выберите другую. Текущи" +
        "е данные не изменены."
    ),
    "settings.restoreBackupHint": (
        "Выберите копию из указанной папки. Warplyn проверит файлы, сохранит копию для восстановления, затем " +
        "восстановит статьи, версии, настройки и навыки. Существующие подключения к ИИ останутся локальными. " +
        "Ссылки на переменные окружения можно восстановить; ключи API и значения переменных никогда не импорт" +
        "ируются. Старые копии только базы данных сохраняют текущие навыки."
    ),
    "settings.restoreBackupUnavailable": "Эту резервную копию нельзя восстановить.",
    "settings.retention": "Хранение автоматических копий",
    "settings.retentionHint": "Определяет количество автоматических копий. Ручные копии никогда не удаляются автоматически.",
    "settings.revealBackupFolder": "Открыть папку",
} satisfies Partial<Record<MessageId, string>>;
