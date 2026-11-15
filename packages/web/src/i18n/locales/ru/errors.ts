import type { MessageId } from "../../messages.js";

export const ruErrors = {
    "errors.generic": "Не удалось завершить действие. Статья не изменена. Повторите попытку.",
    "errors.invalidRequest": "Не удалось завершить действие: некоторые данные некорректны. Проверьте их и повторите попытку.",
    "errors.proposalEditInvalid":
        "Не удалось применить изменённое предложение. Статья не изменена. Сохраните предложенные числа, " +
        "ссылки, код и технические термины без изменений и повторите попытку. Если предложение недоступно, " +
        "создайте новое.",
    "errors.factCorrectionSelectionInvalid":
        "Не удалось подготовить исправления: выбранные замечания устарели или требуют проверки. Повторите " +
        "проверку фактов и выберите нерешённые оспариваемые или непроверяемые замечания.",
    "errors.requestTooLarge": "Не удалось завершить действие: выбранный текст слишком большой. Сократите его и повторите попытку.",
    "errors.invalidJson": "Не удалось завершить действие: некоторые данные некорректны. Проверьте их и повторите попытку.",
    "errors.originNotPermitted": "Не удалось завершить действие в этом окне приложения. Откройте Warplyn заново и повторите попытку.",
    "errors.resourceNotFound": "Не удалось найти данные для этого действия. Обновите Warplyn и повторите попытку.",
    "errors.articleNotFound": "Не удалось найти статью. Выберите существующую статью и повторите попытку.",
    "errors.revisionNotFound": "Не удалось найти сохранённую версию. Выберите другую и повторите попытку.",
    "errors.revisionConflict": "Не удалось сохранить: статья уже изменилась. Последние изменения остаются в редакторе; проверьте конфликт и повторите попытку.",
    "errors.unsupportedPublishingProfile": "Выберите поддерживаемый профиль публикации.",
    "errors.invalidEnvironmentVariableName": "Введите имя переменной окружения из заглавных букв, цифр и знаков подчёркивания.",
    "errors.environmentVariableUnavailable": "Переменная {environmentVariableName} недоступна. Добавьте её и повторите попытку.",
    "errors.aiConnectionNotFound": "Не удалось найти подключение к ИИ. Выберите другое и повторите попытку.",
    "errors.duplicateStyleCorpusItem": "Этот текст уже есть в корпусе стиля.",
    "errors.activeConnectionRequired": "Сначала добавьте и выберите подключение к ИИ.",
    "errors.activeConnectionRemovalBlocked": "Перед удалением выберите другое активное подключение к ИИ.",
    "errors.aiConnectionVerificationFailed": "Провайдер ИИ не смог проверить подключение. Проверьте переменную и её ключ и повторите попытку.",
    "errors.managedCredentialsUnavailable": "Защищённое хранилище учётных данных недоступно на устройстве. Выберите переменную окружения.",
    "errors.managedCredentialMissing":
        "У этого подключения нет ключа API в Warplyn. Добавьте новое подключение с ключом API, выберите его " +
        "для моделей и удалите старое подключение.",
    "errors.styleCorpusRequired": "Добавьте хотя бы один образец в корпус стиля перед проверкой.",
    "errors.targetLanguageRequired": "Выберите язык перевода перед отправкой запроса.",
    "errors.editorialOperationUnsupported": "Это действие с ИИ недоступно. Выберите другое.",
    "errors.editorialConfigurationMissing": "Не удалось начать действие с ИИ. Выберите совместимую модель в настройках и повторите попытку.",
    "errors.editorialProviderFailed": "Не удалось завершить действие с ИИ. Статья не изменена. Повторите попытку или проверьте подключение к ИИ в настройках.",
    "errors.editorialStreamIncomplete": "Не удалось завершить действие с ИИ. Статья не изменена. Повторите попытку.",
    "errors.editorialRequestFailed": "Не удалось выполнить действие с ИИ. Статья не изменена. Повторите попытку или проверьте подключение к ИИ в настройках.",
    "errors.invalidKeyBinding": "Введите полное сочетание с клавишей, не являющейся модификатором.",
    "errors.keyBindingConflict": "Выберите ещё не назначенное сочетание клавиш.",
    "errors.assistantSkillUnsupported": "Это действие помощника недоступно. Выберите другое.",
    "errors.assistantSkillScopeIncompatible": "Действие помощника не поддерживает это выделение. Измените выделение и повторите попытку.",
    "errors.assistantSelectionInvalid": "Выделение нельзя использовать для этого действия помощника. Измените его и повторите попытку.",
    "errors.assistantRequestConflict": "Это действие помощника уже выполняется. Дождитесь завершения перед повторной попыткой.",
    "errors.assistantCheckpointConflict": "Диалог помощника изменился. Проверьте обновлённые сведения о восстановлении и повторите попытку.",
    "errors.assistantCheckpointInvalid": "Эта точка восстановления диалога больше недоступна. Выберите другое сообщение автора.",
    "errors.assistantEditConflict": "Статья или черновик изменились. Сохраните текущую работу или разрешите конфликт, затем запросите новую правку.",
    "errors.assistantEditInvalid":
        "Помощник не смог подготовить безопасную замену. Статья не изменена. Попробуйте выделить меньший " +
        "фрагмент или дать более точные указания.",
    "assistant.editMode.label": "Режим редактирования",
    "assistant.editMode.review": "Предлагать правки для проверки",
    "assistant.editMode.direct": "Применять правки сразу",
    "settings.defaultAssistantEditMode": "Режим редактирования помощника по умолчанию",
    "settings.defaultAssistantEditModeHint":
        "Новые диалоги статей используют этот режим; существующие сохраняют свой. Прямой режим пропускает " +
        "проверку предложений только для явно запрошенных вами правок. Остальные предложения требуют " +
        "проверки.",
    "settings.assistantBehavior": "Редактирование и запросы",
    "settings.showExecutionProgress": "Показывать ход выполнения",
    "settings.showExecutionProgressHint": "Показывать текущее действие и сворачиваемый список действий в чате помощника.",
    "assistant.activity.proposalReady": "Предложение готово к проверке",
    "assistant.activity.article": "Чтение статьи",
    "assistant.activity.links": "Чтение связанных статей",
    "assistant.activity.history": "Чтение истории версий",
    "assistant.activity.draft": "Проверка черновика",
    "assistant.activity.saved": "Чтение сохранённой редакторской работы",
    "assistant.activity.proposal": "Проверка предложенных изменений",
    "assistant.activity.findings": "Чтение замечаний проверки фактов",
    "assistant.activity.publishing": "Чтение рекомендаций по публикации",
    "assistant.activity.corpus": "Чтение корпуса стиля",
    "assistant.activity.rules": "Чтение правил стиля статьи",
    "assistant.activity.translations": "Чтение переводов",
    "assistant.activity.rename": "Переименование статьи",
    "assistant.activity.language": "Изменение языка статьи",
    "assistant.activity.assignPublishing": "Назначение рекомендаций по публикации",
    "assistant.activity.updateRules": "Обновление правил стиля статьи",
    "assistant.activity.addCorpus": "Добавление версии в корпус стиля",
    "assistant.activity.rebuild": "Перестроение профиля стиля",
    "assistant.activity.rejectTranslation": "Отклонение перевода",
    "assistant.activity.prepareProposal": "Подготовка предложения",
    "assistant.activity.corrections": "Подготовка исправлений",
    "assistant.activity.claims": "Проверка утверждений",
    "assistant.activity.style": "Проверка стиля",
    "assistant.activity.translate": "Подготовка перевода",
    "assistant.activity.editorial": "Подготовка редакторской работы",
    "assistant.activityInterrupted": "Остановлено во время действия: {activity}. Отправьте запрос снова для повторной попытки.",
    "assistant.applySelection": "Применить к выделению",
    "assistant.applyArticle": "Заменить статью",
    "assistant.appliedEdit": "Применено как новая сохранённая версия",
    "assistant.editOriginal": "Обсуждаемый фрагмент",
    "assistant.editReplacement": "Предложенная замена",
    "assistant.response.editApplied": "Запрошенная правка применена",
    "revisions.assistantEdit": "Правка помощника",
    "errors.assistantRetryInvalid": "Это действие помощника нельзя повторить. Запустите его заново в помощнике.",
    "errors.assistantCoordinatorFailed": "Не удалось завершить действие помощника. Статья не изменена. Повторите попытку.",
    "skills.loadFailed": "Не удалось загрузить навыки. Повторите загрузку или заново откройте настройки ИИ.",
    "skills.validation.invalid_frontmatter":
        "В начале файла SKILL.md нет корректного блока сведений о навыке. Добавьте идентификатор, название, " +
        "описание и версию, затем повторите попытку.",
    "skills.validation.invalid_metadata":
        "Проверьте сведения о навыке. Укажите уникальный идентификатор в нижнем регистре, понятные название и " +
        "описание, числовую версию и поддерживаемые параметры области действия и выполнения.",
    "skills.validation.invalid_instructions": "Добавьте указания в Markdown, которым должен следовать навык. Не превышайте поддерживаемый размер инструкций.",
    "skills.validation.invalid_reference":
        "Навык ссылается на материал, который Warplyn не может использовать. Храните материалы как файлы " +
        "Markdown в папке references и не превышайте поддерживаемый размер.",
    "skills.validation.unsafe_package":
        "Warplyn не может использовать пакет навыка: он содержит неподдерживаемый файл или путь. Оставьте " +
        "только SKILL.md и объявленные материалы Markdown.",
    "skills.validation.package_too_large": "Пакет навыка слишком большой для загрузки. Сократите инструкции или справочные файлы и повторите попытку.",
    "errors.skillPackageConflict":
        "Навык изменился либо его идентификатор или название уже заняты. Обновите список навыков, при " +
        "необходимости выберите свободное название и повторите попытку.",
    "errors.skillRevisionNotFound": "Эта версия навыка недоступна. Снова откройте список версий и выберите существующую.",
    "errors.assistantRequestTimedOut":
        "Запрос помощника достиг лимита времени. Статья не изменена. Повторите запрос или увеличьте лимит " +
        "времени в общих настройках.",
} satisfies Partial<Record<MessageId, string>>;
