import type { ElectronMessages } from "../electron-messages.js";

export const ru: ElectronMessages = {
    "electron.spelling.addWord": "Добавить в словарь",
    "electron.articleFiles.markdown": "Файлы Markdown",
    "electron.articleFiles.html": "Файлы HTML",
    "electron.articleFiles.docx": "Файлы Word",
    "electron.articleFiles.rtf": "Файлы с форматированным текстом",
    "electron.articleFiles.load": "Загрузить статью из файла",
    "electron.articleFiles.save": "Сохранить статью в файл",
    "electron.draftCheckpointFailed.title": "Не удалось сохранить чекпоинт",
    "electron.draftCheckpointFailed.message": "Warplyn не удалось сохранить последний чекпоинт черновика.",
    "electron.draftCheckpointFailed.detail": "Вернитесь к статье и повторите попытку или выйдите без последних несохранённых изменений.",
    "electron.draftCheckpointFailed.return": "Вернуться к статье",
    "electron.draftCheckpointFailed.quit": "Выйти без последнего чекпоинта",
    "electron.closeFailed.title": "Не удалось корректно закрыть Warplyn",
    "electron.closeFailed.message": "Чекпоинт сохранён, но локальная база данных не закрылась корректно.",
    "electron.startFailed.title": "Не удалось запустить Warplyn",
    "electron.startFailed.message": "Проверьте доступность папки локальных данных и повторите попытку.",
    "electron.deleteData.title": "Удалить все локальные данные Warplyn?",
    "electron.deleteData.message":
        "Статьи, чекпоинты, сохранённые версии, история помощника, данные стиля, настройки и локальные " +
        "резервные копии в папке данных Warplyn будут удалены навсегда.",
    "electron.deleteData.detail": "После удаления Warplyn закроется. Если настроена папка резервных копий, перед удалением можно создать резервную копию.",
    "electron.deleteData.backup": "Создать резервную копию перед удалением",
    "electron.deleteData.delete": "Удалить все локальные данные",
    "electron.deleteData.cancel": "Отмена",
    "electron.restoreBackup.title": "Восстановить эту резервную копию?",
    "electron.restoreBackup.message": "Текущие локальные данные Warplyn будут заменены выбранной резервной копией.",
    "electron.restoreBackup.detail":
        "Warplyn сохранит последние чекпоинты, создаст копию текущих данных для восстановления и " +
        "перезапустится. Существующие подключения к ИИ останутся локальными. Ссылки на переменные окружения " +
        "можно восстановить; ключи API и значения переменных никогда не импортируются. Отменить это действие " +
        "в настройках нельзя.",
    "electron.restoreBackup.restore": "Восстановить и перезапустить",
    "electron.restoreBackup.cancel": "Отмена",
    "electron.restoreFailed.title": "Не удалось восстановить резервную копию",
    "electron.restoreFailed.message":
        "Закройте другие окна Warplyn и локальные серверы разработки, использующие эти данные, затем " +
        "повторите попытку. Текущие данные не изменены.",
};
