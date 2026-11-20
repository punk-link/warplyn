import type { MessageId } from "../../messages.js";


export const quickStartMessages = {
    "quickStart.addModelKey": "Добавить ключ модели",
    "quickStart.assistant.description": (
        "На правой панели доступны правки, проверки, переводы и проверка фактов. Изменения ИИ остаются предло" +
        "жениями до вашего принятия, а замечания носят рекомендательный характер."
    ),
    "quickStart.assistant.title": "Обратитесь к помощнику.",
    "quickStart.close": "Закрыть быстрый старт",
    "quickStart.modelKey.description": (
        "Ключ модели — это ключ API провайдера ИИ. В настольном приложении выберите провайдера, вставьте ключ" +
        " и сохраните его в хранилище учётных данных операционной системы. Обновите список моделей и выберите" +
        " модель по умолчанию. Warplyn никогда не показывает сохранённый ключ повторно."
    ),
    "quickStart.modelKey.title": "Добавьте ключ модели.",
    "quickStart.skip": "Пропустить быстрый старт",
    "quickStart.startWriting": "Начать писать",
    "quickStart.title": "Добро пожаловать в Warplyn",
    "quickStart.write.description": (
        "Создайте или откройте статью на левой панели и пишите в центральной рабочей области. Warplyn сохраняет состоян" +
        "ие черновика для восстановления и историю версий."
    ),
    "quickStart.write.title": "Напишите статью.",
} satisfies Partial<Record<MessageId, string>>;
