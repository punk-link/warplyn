import type { MessageId } from "../../messages.js";


export const workspaceMessages = {
    "workspace.saveProposalReviewFailed": "Не удалось сохранить проверку предложения. Повторите изменение перед закрытием приложения.",
    "workspace.acceptProposalFailed": "Не удалось принять предложение. Статья не изменена. Повторите попытку.",
    "workspace.addModelKey": "Добавить ключ модели",
    "workspace.aiConnectionCapabilities": (
        "Вы можете писать, сохранять, упорядочивать и копировать статьи, а также локально проверять типографи" +
        "ку. Запросы к помощнику, переводы, проверка фактов и полная проверка стиля требуют настроенного подк" +
        "лючения модели, в том числе поддерживаемой локальной модели."
    ),
    "workspace.aiConnectionRequired": "Локальное письмо доступно. Настройте модель для работы с помощником.",
    "workspace.badges.findings": "{count, plural, =0 {Нет замечаний} one {# замечание} few {# замечания} many {# замечаний} other {# замечания}}",
    "workspace.badges.nearLimit": "Близко к лимиту",
    "workspace.badges.overLimit": "Лимит превышен",
    "workspace.badges.ready": "Готово",
    "workspace.badges.review": "На проверке",
    "workspace.badges.stale": "Устарело",
    "workspace.createArticleFailed": "Не удалось создать статью. Повторите попытку.",
    "workspace.createTranslationFailed": "Не удалось создать статью перевода. Исходная статья не изменена. Повторите попытку.",
    "workspace.deleteArticleFailed": "Не удалось удалить статью. Она по-прежнему доступна. Повторите попытку.",
    "workspace.loadingArticles": "Загрузка локальных статей…",
    "workspace.renameArticleFailed": "Не удалось переименовать статью. Прежнее название сохранено. Повторите попытку.",
    "workspace.resolveFindingFailed": "Не удалось обновить замечание. Статья не изменена. Повторите попытку.",
    "workspace.restoreRevisionFailed": "Не удалось восстановить версию. Статья не изменена. Повторите попытку.",
    "workspace.revisionHistoryFailed": "Не удалось загрузить историю версий. Статья не изменена. Обновите страницу и повторите попытку.",
    "workspace.saveFailed": "Не удалось сохранить черновик. Последние изменения остаются в редакторе. Повторите сохранение.",
    "workspace.serviceUnavailable": "Локальный сервис недоступен. Запустите его и повторите попытку.",
    "workspace.styleCorpusAddFailed": "Не удалось добавить текст в профиль стиля. Профиль не изменён. Повторите попытку.",
    "workspace.styleCorpusLoadFailed": "Не удалось загрузить профиль стиля. Обновите страницу и повторите попытку.",
    "workspace.styleCorpusRebuildFailed": "Не удалось перестроить профиль стиля. Прежний профиль доступен. Повторите попытку.",
    "workspace.styleCorpusRemoveFailed": "Не удалось удалить текст из профиля стиля. Профиль не изменён. Повторите попытку.",
    "workspace.styleCorpusSnapshotFailed": "Не удалось добавить версию в профиль стиля. Профиль не изменён. Повторите попытку.",
    "workspace.styleCorpusUpdateFailed": "Не удалось обновить профиль стиля. Прежний профиль сохранён. Повторите попытку.",
    "workspace.styleRulesLoadFailed": "Не удалось загрузить правила профиля стиля. Обновите страницу и повторите попытку.",
    "workspace.styleRulesSaveFailed": "Не удалось сохранить правила профиля стиля. Прежние правила сохранены. Повторите попытку.",
    "workspace.tabs.ariaLabel": "Разделы рабочей области статьи",
    "workspace.tabs.factCheck": "Факты",
    "workspace.tabs.proposal": "Предложения",
    "workspace.tabs.revisions": "Версии",
    "workspace.tabs.styleProfile": "Стиль",
    "workspace.tabs.translations": "Переводы",
    "workspace.tabs.write": "Текст",
    "workspace.updateArticleFailed": "Не удалось обновить статью. Последние изменения остаются в редакторе. Повторите попытку.",
} satisfies Partial<Record<MessageId, string>>;
