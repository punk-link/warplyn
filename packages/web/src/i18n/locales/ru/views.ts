import type { MessageId } from "../../messages.js";


export const viewsMessages = {
    "views.acceptAll": "Пометить все как принятые",
    "views.acceptChange": "Принять",
    "views.acceptFactAsWritten": "Принять как написано",
    "views.acceptFactEvidence": "Принять доказательства",
    "views.acceptSelected": "Принять выбранное",
    "views.addToCorpus": "Добавить в корпус",
    "views.autoScrollNextChange": "Автоматически прокручивать к следующему изменению",
    "views.applyProposal": "Применить",
    "views.changeNavigation": "Навигация по изменениям",
    "views.changeType.addition": "Добавление{separator}Изменение {index} из {total}",
    "views.changeType.removal": "Удаление{separator}Изменение {index} из {total}",
    "views.changeType.replacement": "Замена{separator}Изменение {index} из {total}",
    "views.characterCount": "{count} / {limit} символов",
    "views.confirmRejectTranslation": "Отклонить",
    "views.continueWriting": "Продолжить писать",
    "views.copy": "Копировать",
    "views.decision.accepted": "Принято",
    "views.decision.pending": "Ожидает решения",
    "views.decision.rejected": "Отклонено",
    "views.discardDraftAndRestore": "Удалить черновик и восстановить",
    "views.dismissPreservationWarnings": "Скрыть предупреждения о сохранности",
    "views.dismissProposal": "Закрыть предложение",
    "views.earlierSuggestion": "Предыдущее предложение",
    "views.earlierSuggestionHelp": "Статья изменилась после создания этого предложения.",
    "views.editTranslation": "Изменить",
    "views.existingTranslations": "Существующие переводы",
    "views.factCheck": "Проверка фактов",
    "views.factCheckCurrent": "Текущая сохранённая версия",
    "views.factCheckEmpty": "Результаты проверки фактов носят рекомендательный характер и не изменяют статью.",
    "views.factCheckEmptyTitle": "Нет замечаний по фактам",
    "views.factCheckFindings": "Замечания по фактам",
    "views.factCheckHistorical": "Эта предыдущая проверка фактов доступна только для чтения. Действия доступны в последней проверке этой версии.",
    "views.factCheckHistory": "История проверок фактов",
    "views.factCheckIncomplete": (
        "Проверка фактов не завершена. Показаны только готовые замечания. Запустите её снова, чтобы проверить" +
        " оставшиеся утверждения."
    ),
    "views.factCheckRevision": "Проверенная версия: {revision}",
    "views.factCheckRunOption": "Версия {revision}, проверена {dateTime}",
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {Помощник ищет утверждения для проверки.} one {Помощник проверяет # утверждение.}" +
        " few {Помощник проверяет # утверждения.} many {Помощник проверяет # утверждений.} other {Помощник пр" +
        "оверяет # утверждения.}} Результаты появятся здесь после завершения."
    ),
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {Помощник ищет утверждения для проверки.} one {Помощник проверяет # утверждение.}" +
        " few {Помощник проверяет # утверждения.} many {Помощник проверяет # утверждений.} other {Помощник пр" +
        "оверяет # утверждения.}} Здесь показаны результаты предыдущей завершённой проверки. Они обновятся по" +
        "сле завершения новой."
    ),
    "views.factCheckStale": "Замечания относятся к предыдущей версии. Их можно читать, но для исправлений нужно повторить проверку фактов.",
    "views.factCheckedAt": "Проверено {dateTime}.",
    "views.factEvidenceFreshness": (
        "Доказательства соответствуют датам источников и проверки. Зависящие от времени утверждения могли измениться; п" +
        "овторите проверку фактов, чтобы обновить их."
    ),
    "views.factEvidenceReused": "Доказательства взяты из версии {revision}.",
    "views.factImportance": "Важность: {importance}",
    "views.factResolution": "Решение: {resolution}",
    "views.factResolution.accepted_as_written": "Принято как написано",
    "views.factResolution.corrected_or_removed": "Исправлено или удалено",
    "views.factResolution.evidence_accepted": "Доказательства приняты",
    "views.factStatus.disputed": "Оспаривается",
    "views.factStatus.supported": "Подтверждено",
    "views.factStatus.unverifiable": "Невозможно проверить",
    "views.findingNavigation": "Навигация по замечаниям",
    "views.nextChange": "Следующее изменение",
    "views.nextFinding": "Следующее замечание",
    "views.openTranslation": "{language}: {title}",
    "views.preservationWarnings": "Проверьте сохранность деталей",
    "views.previousChange": "Предыдущее изменение",
    "views.previousFinding": "Предыдущее замечание",
    "views.proposalAccepted": "Предложение принято. Решения доступны только для чтения.",
    "views.proposalAuthorEdited": "Вы изменили формулировку. Проверьте свой текст перед применением.",
    "views.proposalCounts": (
        "{total, plural, =0 {Нет предложений} one {# предложение} few {# предложения} many {# предложений} ot" +
        "her {# предложения}}{separator}Ожидают: {pending, plural, =0 {0} other {#}}{separator}Принято: {acce" +
        "pted, plural, =0 {0} other {#}}{separator}Отклонено: {rejected, plural, =0 {0} other {#}}"
    ),
    "views.proposalDisplayMode": "Режим отображения предложения",
    "views.proposalEmpty": "Попросите помощника подготовить предложение. Он никогда не меняет статью автоматически.",
    "views.proposalEmptyTitle": "Нет предложения для проверки",
    "views.proposalFallback": "Предложение нельзя безопасно разделить на отдельные изменения. Проверьте его целиком перед принятием.",
    "views.proposalHighlight": "Выделять изменения",
    "views.proposalNoChanges": "Без изменений",
    "views.proposalReview": "Проверка предложения",
    "views.proposalSideBySide": "Рядом",
    "views.proposalStacked": "Друг под другом",
    "views.proposalStale": "Предложение устарело, поскольку у статьи есть более новая версия. Создайте новое предложение, прежде чем принимать изменения.",
    "views.proposalSummaryLoading": "Подготовка описания изменения…",
    "views.proposalSummaryUnavailable": "Краткое описание недоступно. Сравните исходный и предложенный текст ниже.",
    "views.proposalWhole": "Полное предложение{separator}{changes, plural, one {# изменение} few {# изменения} many {# изменений} other {# изменения}}",
    "views.proposeFactCorrection": "Предложить исправление",
    "views.proposeFactCorrections": "Предложить правки ({count})",
    "views.proposedChangeInput": "Предложенный текст изменения {index}",
    "views.regenerateInAssistant": "Создать заново",
    "views.rejectAll": "Пометить все как отклонённые",
    "views.rejectChange": "Отклонить",
    "views.rejectProposal": "Отклонить предложение",
    "views.rejectTranslation": "Отклонить",
    "views.rejectTranslationDescription": (
        "Созданный перевод на языке {language} будет убран из списка на подтверждение. Исходная статья и принятые перев" +
        "оды не изменятся."
    ),
    "views.rejectTranslationTitle": "Отклонить этот перевод?",
    "views.remove": "Удалить",
    "views.resetAllDecisions": "Сбросить все решения",
    "views.restoreDescription": "Восстановление создаёт новую неизменяемую версию и не переписывает историю.",
    "views.restoreDraftDescription": "В черновике есть изменения, которых нет в сохранённой версии. Сохраните или удалите его перед восстановлением.",
    "views.restoreHeading": "Восстановить версию?",
    "views.restoreRevision": "Восстановить версию",
    "views.resumeReview": "Продолжить проверку",
    "views.reviewCurrentArticle": "Проверить текущую статью",
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Проверить факты",
    "views.runFactCheckAgain": "Проверить снова",
    "views.sampleName": "Название образца",
    "views.saveAndRestore": "Сохранить и восстановить",
    "views.selectAllNeedingReview": "Выбрать для проверки",
    "views.selectChange": "Выбрать изменение",
    "views.setAllDecisions": "Задать все решения…",
    "views.sourceLinkedPrefix": "Этот перевод связан со статьёй",
    "views.sourceLinkedRevision": "в исходной версии {revisionNumber}.",
    "views.styleIntro": "Локальный корпус текстов никогда не отправляется целиком; используется только построенный по нему профиль.",
    "views.styleProfile": "Профиль стиля",
    "views.translate": "Новый перевод…",
    "views.translationAligned": "Сопоставленные абзацы",
    "views.translationArticleStale": (
        "Исходная статья изменилась после принятия перевода. Его текст сохранён. Откройте исходную статью, чтобы подгот" +
        "овить обновлённый перевод."
    ),
    "views.translationChooseTargets": "Выберите хотя бы один язык перевода.",
    "views.translationComparison": (
        "Сравнение перевода. Стрелками влево и вправо переходите к проверенному защищённому тексту, Enter или пробелом " +
        "открывайте подробности, Escape закрывайте их."
    ),
    "views.translationContextChanged": "Исходная статья изменилась. Проверьте обновлённый текст перед повторным подтверждением.",
    "views.translationDialogTitle": "Новый перевод",
    "views.translationDisplayMode": "Режим отображения перевода",
    "views.translationEmpty": "Попросите помощника перевести эту статью.",
    "views.translationEmptyTitle": "Нет предложения перевода",
    "views.translationFresh": "Актуален",
    "views.translationGenerateBatch": "Перевести на языки: {count, number}",
    "views.translationGenerateConfirm": "Создать перевод: {languages}",
    "views.translationGenerateDescription": "Перевести «{title}», исходная версия {revisionId}.",
    "views.translationGenerateDraft": "Несохранённый черновик будет сохранён как версия перед генерацией.",
    "views.translationGenerateTargets": "Языки перевода",
    "views.translationGenerating": "Перевод…",
    "views.translationGeneratingLanguages": "Перевод на языки: {languages}…",
    "views.translationGenerationActive": "Выполняется запрос. Дождитесь его завершения или отмените его перед созданием переводов.",
    "views.translationLinkedIdentity": "Статья {articleId}, исходная версия {revisionId}",
    "views.translationLinkedTarget": "{title}, статья {articleId}, исходная версия {revisionId}",
    "views.translationMissingOriginal": "Нет соответствующего исходного абзаца.",
    "views.translationMissingResult": "Нет соответствующего переведённого абзаца.",
    "views.translationOriginal": "Оригинал",
    "views.translationOutdated": "Устарел",
    "views.translationPair": "Оригинал: {source} → перевод: {target}",
    "views.translationPreservation": "Существующие результаты и статьи сохраняются. Для обновления статьи перевода нужно отдельное подтверждение.",
    "views.translationProtectedExplanation": (
        "Отмечено для точного сохранения в переводе. {count, plural, one {Ожидаемое вхождение сохранено} othe" +
        "r {Все ожидаемые вхождения (#) сохранены}} без изменений. Эта проверка носит рекомендательный характ" +
        "ер; проверьте перевод перед принятием."
    ),
    "views.translationProtectedValue": "Проверенный защищённый текст: {value}",
    "views.translationProtectedWarning": "Защищённый текст изменён или отсутствует",
    "views.translationPublishingGuidance": "Рекомендации: {profile}",
    "views.translationRefresh": "Обновить",
    "views.translationRefreshConfirm": "Обновить",
    "views.translationRefreshDescription": (
        "Применить проверенный текст на языке {language} к статье «{title}» как новую сохранённую версию? Наз" +
        "вание останется прежним, предыдущие версии сохранятся в истории."
    ),
    "views.translationRefreshDraft": "Сохраните или удалите черновик перевода перед обновлением.",
    "views.translationRefreshFailed": (
        "Не удалось обновить перевод. Сохраните или удалите его черновик, убедитесь, что исходная статья и перевод не и" +
        "зменились, и проверьте предложение снова."
    ),
    "views.translationRefreshTarget": "Перевод для обновления",
    "views.translationRefreshTitle": "Обновить перевод?",
    "views.translationRefreshUnavailable": "Не удалось обновить перевод: предложение недоступно. Создайте новый перевод и проверьте его снова.",
    "views.translationResult": "Перевод: {language}",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationResultSelector": "Результат перевода",
    "views.translationReviewSource": "Проверить обновлённый оригинал",
    "views.translationSideBySide": "Рядом",
    "views.translationStale": "Исходная статья изменилась после подготовки этого предложения перевода.",
    "views.translationTargets": "Создайте перевод и проверьте его здесь. Предыдущие результаты сохраняются.",
    "views.translationTargetsEmpty": "Создайте перевод и проверьте его здесь. Предыдущие результаты сохраняются.",
    "views.translations": "Переводы",
    "views.uncertainty": "Неопределённость: {value}",
    "views.updateSuggestion": "Обновить предложение",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
    "views.warning.claims": "Правки могут изменить фактический смысл; проверьте утверждения перед принятием.",
    "views.warning.code": "Код изменился. Проверьте строчный код и блоки кода.",
    "views.warning.number": "Числа изменились. Проверьте каждое число.",
    "views.warning.url": "Ссылки изменились. Проверьте каждую ссылку.",
    "views.writingSample": "Образец текста",
} satisfies Partial<Record<MessageId, string>>;
