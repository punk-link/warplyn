import type { MessageId } from "../messages.js";

export const ruTypography = {
    "editor.contextMenu": "Действия редактирования",
    "editor.moreTextFormatting": "Форматирование",
    "editor.paragraphStyle": "Стиль абзаца",
    "editor.lists": "Списки",
    "editor.editLink": "Изменить ссылку…",
    "editor.addLink": "Ссылка…",
    "editor.skills": "Навыки",
    "editor.clipboardFailed": "Не удалось вставить текст. Разрешите доступ к буферу обмена или используйте сочетание клавиш для вставки.",
    "typography.customPair": "Своя пара",
    "typography.articleSaved": "Настройки типографики статьи сохранены.",
    "typography.articleSaveHint": "Правила статьи заменяют или отключают унаследованные правила языка. Сохраните их для следующей проверки.",
    "typography.reviewLanguage": "Правила для языка: {language}",
    "typography.unknownLanguage": "Язык не указан",
    "typography.otherLanguage": "Другой язык…",
    "typography.otherLanguageTitle": "Выбрать другой язык текста",
    "typography.languageCode": "Язык или региональный вариант",
    "typography.languageCodeHint":
        "Введите название языка или регионального варианта, например польский или испанский, Аргентина. Коды " +
        "ja и es-AR тоже подходят.",
    "typography.languageSaveFailed": "Не удалось сохранить язык статьи. Повторите попытку; текст не изменён.",
    "typography.useLanguage": "Использовать язык",
    "typography.loadFailed": "Не удалось загрузить настройки типографики. Повторите загрузку перед редактированием или проверкой.",
    "typography.retryLoad": "Загрузить снова",
    "typography.openingMark": "Открывающий знак",
    "typography.closingMark": "Закрывающий знак",
    "typography.innerSpace": "Пробел внутри кавычек",
    "typography.punctuationMarks": "Знаки пунктуации",
    "typography.spaceBefore": "Пробел перед знаком",
    "typography.punctuationSpacing": "Пробелы при знаках пунктуации",
    "typography.languageScope": "Язык типографики",
    "typography.chooseLanguage": "Выберите язык",
    "typography.languageHint": "Сохраняйте отдельные правила для каждого языка текста. Язык статьи и интерфейса не меняется.",
    "typography.missingLanguage": "Выберите язык статьи в строке состояния перед проверкой типографики.",
    "typography.scope": "Применять правила к",
    "typography.languagePreferences": "Всем статьям на этом языке",
    "typography.articlePreferences": "Только этой статье",
    "typography.preset": "Готовый набор правил",
    "typography.noPreset": "Свои правила",
    "typography.presetPending": "{language}{separator}ожидает проверки носителем языка",
    "typography.presetReviewHint": "Предварительные наборы ожидают проверки носителем языка. Вы можете добавить свои правила ниже.",
    "typography.applyPreset": "Применить набор",
    "typography.legacyHint": "Прежние общие правила сохранены. Скопируйте их для языка, чтобы использовать в новых проверках.",
    "typography.copyLegacy": "Копировать прежние правила",
    "typography.resetInheritance": "Сбросить изменения",
    "typography.inheritanceHint":
        "Редактирование заменяет унаследованное правило, удаление отключает его. Восстановите унаследованные " +
        "правила, чтобы сбросить изменения.",
    "typography.noConvention": "Нет подходящих механических правил. Выберите набор или добавьте и сохраните правила для этого языка.",
    "typography.effectiveLanguage": "Проверка правил для языка {language}",
    "typography.earlierConvention": "Проверка использовала прежние настройки языка или типографики. Повторите её с текущими правилами.",
    "typography.legacyReview": "В этой предыдущей проверке не записаны языковые правила.",
    "typography.source.preset": "Набор",
    "typography.source.language": "Настройка языка",
    "typography.source.article": "Правило статьи",
    "spelling.desktopOnly":
        "В настольном приложении можно скачивать языковые словари и управлять личным словарём. В браузере " +
        "используются его настройки правописания.",
    "spelling.localHint":
        "Проверка правописания и личные слова остаются на устройстве. Для скачивания словарей нужен интернет; " +
        "загрузка обращается к CDN словарей Google.",
    "spelling.preloadHint": "Выберите языки для работы без интернета. Язык статьи не изменится.",
    "spelling.personalHint": "Храните технические термины, например PostgreSQL и gRPC, в едином личном словаре для всех статей и языков проверки.",
    "spelling.systemHint": "Добавление или удаление слова также меняет пользовательский словарь операционной системы и может влиять на другие приложения.",
    "spelling.wordsHint":
        "Введите по одному слову или термину на строку, до 128 символов каждый. За раз можно добавить до 500 " +
        "слов. Неудачные записи останутся для исправления или повтора.",
    "spelling.searchHint": "Найдите сохранённые термины и удалите слова, которые снова нужно проверять.",
    "spelling.persistenceHint":
        "Словари и личные слова относятся к этой установке. Резервные копии статей и восстановление их не " +
        "включают. Удаление данных статей не удаляет слова из словаря операционной системы; удаляйте их " +
        "здесь.",
    "spelling.partial": "Некоторые слова не удалось добавить. Исправьте или повторите записи в поле «Слова для добавления».",
    "spelling.operationFailed": "Не удалось обновить настройки правописания. Повторите изменение. Для скачивания проверьте подключение к интернету.",
    "spelling.invalidWords": "Введите до 500 слов по одному на строку, не более 128 символов каждое и 64 КиБ суммарно.",
    "spelling.wordFailed": "Не удалось добавить слово в личный словарь. Откройте настройки правописания и добавьте его снова.",
    "spelling.correctionFailed": "Не удалось применить исправление. Откройте меню подсказок заново или введите исправление в статье.",
    "spelling.languageFailed": "Не удалось включить проверку для языка статьи. Выберите язык снова или подготовьте его словарь в настройках правописания.",
    "settings.assistantRequestTimeoutHint":
        "Останавливать запросы помощника по истечении этого времени. Применяется к новым запросам и повторам. " +
        "При превышении времени статья не меняется.",
    "article.titleGenerationFailed": "Версия сохранена без названия статьи",
    "article.titleContextRequired": "Добавьте подробности и сохраните новую версию или назовите статью сами.",
    "article.titleGenerationNextStep": "Назовите статью сами или проверьте модель генерации текста в настройках и сохраните новую версию.",
    "articleFiles.layoutWarning":
        "Абзацы, списки и базовое форматирование сохраняются. Макеты страниц и таблиц упрощаются. " +
        "Изображения, комментарии и встроенные объекты пропускаются. Проверьте преобразованную статью перед " +
        "импортом.",
    "typography.invalid":
        "Не удалось сохранить или загрузить правила типографики. Проверьте незаполненные, повторяющиеся и " +
        "конфликтующие правила, затем повторите попытку. Если сохранённые правила не загружаются, " +
        "восстановите резервную копию в настройках.",
    "typography.correctionsConflict":
        "Не удалось согласованно применить исправления типографики. Измените перекрывающиеся или " +
        "повторяющиеся правила и проверьте снова. Статья не изменена.",
    "typography.required": "Не удалось проверить типографику. Выберите язык статьи и сохраните правила для него в профиле стиля.",
    "typography.saveHint":
        "Сохранение локально перестраивает профиль по включённым образцам и сохранённым правилам, включая " +
        "ожидающие изменения образцов. Несохранённые изменения других форм не включаются.",
    "typography.validation.invalid": "Заполните поля правила перед сохранением.",
    "typography.validation.duplicate": "Такое правило уже есть в списке. Измените или удалите повтор перед сохранением.",
    "typography.validation.conflict": "Правила конфликтуют. Измените или удалите одно перед сохранением.",
    "typography.validation.limit": "Оставьте не более 30 правил перед сохранением.",
    "typography.saveFailed": "Не удалось сохранить правила типографики. Правки остались здесь. Повторите сохранение.",
    "typography.saved": "Правила типографики сохранены, профиль стиля обновлён.",
    "typography.localHint":
        "Механические проверки выполняются локально. Контекстные правила требуют полной проверки стиля. Текст " +
        "статьи меняется только после принятия предложения.",
    "typography.kind": "Тип правила {number}",
    "typography.nonbreaking": "Неразрывная пара элементов",
    "typography.literal": "Точная замена пунктуации",
    "typography.contextual": "Контекстное указание по типографике",
    "typography.mark": "Предпочтительный знак",
    "typography.left": "Левый элемент",
    "typography.right": "Правый элемент",
    "typography.nbsp": "Неразрывный пробел, U+00A0",
    "typography.narrowNbsp": "Узкий неразрывный пробел, U+202F",
    "typography.source": "Знак для замены",
    "typography.replacement": "Знак замены",
    "typography.instruction": "Указание для полной проверки стиля",
    "typography.horizontalHint": "Один обычный пробел между элементами текста. Отступы, переносы строк и код не меняются.",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.support": "Правила типографики: {rules}",
    "typography.noViolations": "Механических нарушений типографики не найдено.",
    "typography.skipped":
        "{count, plural, one {# неоднозначный случай с кавычками оставлен без изменений.} few {# " +
        "неоднозначных случая с кавычками оставлены без изменений.} many {# неоднозначных случаев с кавычками " +
        "оставлены без изменений.} other {# неоднозначного случая с кавычками оставлены без изменений.}} " +
        "Проверьте их в контексте.",
    "typography.contextualSkipped":
        "{count, plural, one {# контекстное правило требует полной проверки стиля.} few {# контекстных " +
        "правила требуют полной проверки стиля.} many {# контекстных правил требуют полной проверки стиля.} " +
        "other {# контекстного правила требуют полной проверки стиля.}}",
    "typography.olderProfile": "Проверка использовала профиль стиля версии {version}. Правила изменились. Повторите проверку с текущим профилем.",
    "typography.rulesOnly":
        "Образцы текстов не включены. Добавьте их для определения особенностей голоса или используйте явные " +
        "правила типографики для локальных проверок.",
    "typography.checkFailed": "Не удалось проверить типографику. Сохраните корректные правила и повторите попытку.",
    "typography.saveDraftFirst": "Сохраните текущий черновик перед проверкой типографики. Локальная проверка использует сохранённую версию.",
    "typography.reviewProposal": "Проверить предложение",
    "typography.correction": "{source} → {replacement}",
    "typography.ordinarySpace": "пробел",
    "typography.deleted": "удалено",
    "styleProfile.saveRules": "Сохранить правила",
    "styleProfile.rulesApplied": "Применяются при проверке стиля.",
    "styleProfile.rulesUnsaved": "Есть несохранённые изменения.",
    "styleProfile.rulesNone": "Своих правил нет.",
    "styleProfile.rebuild": "Перестроить профиль",
    "styleProfile.add": "Добавить",
    "styleProfile.addWritingSample": "Добавить образец текста",
    "styleProfile.sourceName": "Название источника",
    "styleProfile.sourceNameHint": "Оставьте пустым, чтобы текстовая модель создала название источника.",
    "styleProfile.generatingSourceName": "Создание названия источника",
    "styleProfile.paste": "Текст образца",
    "styleProfile.upload": "Загрузить .txt / .md",
    "styleProfile.addRevision": "Добавить эту статью",
    "styleProfile.addRevisionTitle": "Добавить статью в корпус стиля?",
    "styleProfile.addRevisionDescription": "Выберите сохранённую версию как образец текста. Будет создана отдельная неизменяемая копия; статья не изменится.",
    "styleProfile.confirmAddRevision": "Добавить в корпус",
    "styleProfile.savedRevision": "Сохранённая версия",
    "styleProfile.revision": "Версия {number}",
    "styleProfile.required": "Вставьте текст перед добавлением.",
    "styleProfile.corpusHint": "Держите активными хотя бы 3–5 характерных образцов. Разнообразие образцов помогает профилю отражать ваш голос.",
    "styleProfile.detectedHint": "Анализ охватывает голос, ритм, лексику, структуру, переходы и повторяющиеся выражения в локальных образцах.",
    "styleProfile.detectedEmpty": "Постройте профиль, чтобы увидеть выявленные особенности.",
    "styleProfile.invalidFile": "Выберите файл .txt или .md.",
    "styleProfile.staleReview": "Проверка стиля основана на предыдущей версии.",
    "styleProfile.review": "Проверка стиля",
    "styleProfile.trait.voice": "Голос",
    "styleProfile.trait.rhythm": "Ритм",
    "styleProfile.trait.structure": "Структура",
    "styleProfile.trait.vocabulary": "Лексика",
    "styleProfile.trait.transitions": "Переходы",
    "styleProfile.trait.personalAuthorPresence": "Личное присутствие автора. {evidence}",
    "styleProfile.trait.impersonalExplanatoryVoice": "Безличный объяснительный голос. {evidence}",
    "styleProfile.trait.compactSentences": "Короткие предложения. {evidence}",
    "styleProfile.trait.longDevelopedSentences": "Длинные развёрнутые предложения. {evidence}",
    "styleProfile.trait.moderateSentenceLength": "Средняя длина предложений. {evidence}",
    "styleProfile.trait.frequentParagraphBreaks": "Частое деление на абзацы. {evidence}",
    "styleProfile.trait.developedParagraphs": "Развёрнутые абзацы. {evidence}",
    "styleProfile.trait.conversationalContractions": "Разговорные сокращения. {evidence}",
    "styleProfile.trait.formalExpandedPhrasing": "Формальные развёрнутые формулировки. {evidence}",
    "styleProfile.trait.usesExplicitTransitions": "Явные переходы между мыслями. {evidence}",
    "styleProfile.trait.usesFewExplicitTransitions": "Мало явных переходов между мыслями. {evidence}",
    "styleProfile.trait.unknown": "{label}. {evidence}",
    "styleProfile.words": "{count, plural, one {# слово} few {# слова} many {# слов} other {# слова}}",
    "styleProfile.addedDate": "Добавлено {date}",
    "styleProfile.removeConfirmationTitle": "Удалить образец текста?",
    "styleProfile.removeConfirmationDescription": "Образец будет удалён из локального корпуса стиля.",
    "styleProfile.confirmRemove": "Удалить образец",
    "styleProfile.activeSources":
        "{count, plural, one {# активный источник} few {# активных источника} many {# активных источников} " +
        "other {# активного источника}}",
    "styleProfile.profileContributors": "Источники текущего профиля",
    "styleProfile.profileSourceCount": "{count, plural, one {# источник} few {# источника} many {# источников} other {# источника}}",
    "styleProfile.showProfileSources": "Показать источники",
    "styleProfile.profileUpdated": "Последнее перестроение: {date}",
    "styleProfile.profileLastRebuilt": "Последнее перестроение",
    "styleProfile.reviewEvidence": "Основано на: {sources}",
    "styleProfile.rebuilt":
        "Профиль перестроен. Активных источников: {count, plural, one {# источник} few {# источника} many {# " +
        "источников} other {# источника}}.",
    "styleProfile.phrasesToAvoid": "Нежелательные выражения",
    "styleProfile.manualRules": "Ручные правила",
    "styleProfile.navigation": "Разделы профиля стиля",
    "styleProfile.writingSamples": "Образцы текстов",
    "styleProfile.detectedCharacteristics": "Выявленные особенности",
    "styleProfile.thisArticle": "Эта статья",
    "styleProfile.articleRules": "Правила только для этой статьи",
    "styleProfile.lowConfidence": "Для профиля мало исходных материалов. Проверка стиля доступна, но замечания могут быть предварительными.",
} satisfies Partial<Record<MessageId, string>>;
