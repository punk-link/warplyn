import type { MessageId } from "../../messages.js";


export const typographyMessages = {
    "typography.add": "Добавить правило",
    "typography.applyPreset": "Применить набор",
    "typography.articlePreferences": "Только этой статье",
    "typography.articleSaveHint": "Правила статьи заменяют или отключают унаследованные правила языка. Сохраните их для следующей проверки.",
    "typography.articleSaved": "Настройки типографики статьи сохранены.",
    "typography.check": "Проверить типографику",
    "typography.checkFailed": "Не удалось проверить типографику. Сохраните корректные правила и повторите попытку.",
    "typography.chooseLanguage": "Выберите язык",
    "typography.closeEditor": "Закрыть",
    "typography.closingMark": "Закрывающий знак",
    "typography.contextual": "Контекстное указание по типографике",
    "typography.contextualSkipped": (
        "{count, plural, one {# контекстное правило требует полной проверки стиля.} few {# контекстных правил" +
        "а требуют полной проверки стиля.} many {# контекстных правил требуют полной проверки стиля.} other {" +
        "# контекстного правила требуют полной проверки стиля.}}"
    ),
    "typography.copyLegacy": "Копировать прежние правила",
    "typography.correction": "{source} → {replacement}",
    "typography.correctionsConflict": (
        "Не удалось согласованно применить исправления типографики. Измените перекрывающиеся или повторяющиеся правила " +
        "и проверьте снова. Статья не изменена."
    ),
    "typography.customPair": "Своя пара",
    "typography.dash": "Тире в тексте",
    "typography.deleted": "удалено",
    "typography.earlierConvention": "Проверка использовала прежние настройки языка или типографики. Повторите её с текущими правилами.",
    "typography.edit": "Изменить",
    "typography.effectiveLanguage": "Проверка правил для языка {language}",
    "typography.ellipsis": "Многоточие",
    "typography.ellipsisSingle": "Один символ многоточия, …",
    "typography.ellipsisThree": "Три точки, ...",
    "typography.empty": "Правил типографики нет. Добавьте правило для проверки пунктуации или пробелов.",
    "typography.horizontal": "Повторяющиеся пробелы",
    "typography.horizontalHint": "Один обычный пробел между элементами текста. Отступы, переносы строк и код не меняются.",
    "typography.inheritanceHint": (
        "Редактирование заменяет унаследованное правило, удаление отключает его. Восстановите унаследованные правила, ч" +
        "тобы сбросить изменения."
    ),
    "typography.innerSpace": "Пробел внутри кавычек",
    "typography.instruction": "Указание для полной проверки стиля",
    "typography.invalid": (
        "Не удалось сохранить или загрузить правила типографики. Проверьте незаполненные, повторяющиеся и кон" +
        "фликтующие правила, затем повторите попытку. Если сохранённые правила не загружаются, восстановите р" +
        "езервную копию в настройках."
    ),
    "typography.kind": "Тип правила {number}",
    "typography.languageCode": "Язык или региональный вариант",
    "typography.languageCodeHint": (
        "Введите название языка или регионального варианта, например польский или испанский, Аргентина. Коды ja и es-AR" +
        " тоже подходят."
    ),
    "typography.languageHint": "Сохраняйте отдельные правила для каждого языка текста. Язык статьи и интерфейса не меняется.",
    "typography.languagePreferences": "Всем статьям на этом языке",
    "typography.languageSaveFailed": "Не удалось сохранить язык статьи. Повторите попытку; текст не изменён.",
    "typography.languageScope": "Язык типографики",
    "typography.left": "Левый элемент",
    "typography.legacyHint": "Прежние общие правила сохранены. Скопируйте их для языка, чтобы использовать в новых проверках.",
    "typography.legacyReview": "В этой предыдущей проверке не записаны языковые правила.",
    "typography.literal": "Точная замена пунктуации",
    "typography.loadFailed": "Не удалось загрузить настройки типографики. Повторите загрузку перед редактированием или проверкой.",
    "typography.localHint": (
        "Механические проверки выполняются локально. Контекстные правила требуют полной проверки стиля. Текст статьи ме" +
        "няется только после принятия предложения."
    ),
    "typography.mark": "Предпочтительный знак",
    "typography.missingLanguage": "Выберите язык статьи в строке состояния перед проверкой типографики.",
    "typography.narrowNbsp": "Узкий неразрывный пробел, U+202F",
    "typography.nbsp": "Неразрывный пробел, U+00A0",
    "typography.nested": "Вложенные кавычки",
    "typography.noConvention": "Нет подходящих механических правил. Выберите набор или добавьте и сохраните правила для этого языка.",
    "typography.noPreset": "Свои правила",
    "typography.noViolations": "Механических нарушений типографики не найдено.",
    "typography.nonbreaking": "Неразрывная пара элементов",
    "typography.olderProfile": "Проверка использовала профиль стиля версии {version}. Правила изменились. Повторите проверку с текущим профилем.",
    "typography.openingMark": "Открывающий знак",
    "typography.ordinarySpace": "пробел",
    "typography.otherLanguage": "Другой язык…",
    "typography.otherLanguageTitle": "Выбрать другой язык текста",
    "typography.outer": "Внешние кавычки",
    "typography.preset": "Готовый набор правил",
    "typography.presetPending": "{language}{separator}ожидает проверки носителем языка",
    "typography.presetReviewHint": "Предварительные наборы ожидают проверки носителем языка. Вы можете добавить свои правила ниже.",
    "typography.punctuationMarks": "Знаки пунктуации",
    "typography.punctuationSpacing": "Пробелы при знаках пунктуации",
    "typography.quotes": "Кавычки",
    "typography.remove": "Удалить",
    "typography.replacement": "Знак замены",
    "typography.required": "Не удалось проверить типографику. Выберите язык статьи и сохраните правила для него в профиле стиля.",
    "typography.resetInheritance": "Сбросить изменения",
    "typography.retryLoad": "Загрузить снова",
    "typography.reviewLanguage": "Правила для языка: {language}",
    "typography.reviewProposal": "Проверить предложение",
    "typography.right": "Правый элемент",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.ruleNumber": "Правило {number}",
    "typography.rulesOnly": (
        "Образцы текстов не включены. Добавьте их для определения особенностей голоса или используйте явные правила тип" +
        "ографики для локальных проверок."
    ),
    "typography.save": "Сохранить",
    "typography.saveDraftFirst": "Сохраните текущий черновик перед проверкой типографики. Локальная проверка использует сохранённую версию.",
    "typography.saveFailed": "Не удалось сохранить правила типографики. Правки остались здесь. Повторите сохранение.",
    "typography.saveHint": (
        "Сохранение локально перестраивает профиль по включённым образцам и сохранённым правилам, включая ожи" +
        "дающие изменения образцов. Несохранённые изменения других форм не включаются."
    ),
    "typography.saved": "Правила типографики сохранены, профиль стиля обновлён.",
    "typography.savedRule": "Сохранено",
    "typography.scope": "Применять правила к",
    "typography.skipped": (
        "{count, plural, one {# неоднозначный случай с кавычками оставлен без изменений.} few {# неоднозначны" +
        "х случая с кавычками оставлены без изменений.} many {# неоднозначных случаев с кавычками оставлены б" +
        "ез изменений.} other {# неоднозначного случая с кавычками оставлены без изменений.}} Проверьте их в " +
        "контексте."
    ),
    "typography.source": "Знак для замены",
    "typography.source.article": "Правило статьи",
    "typography.source.language": "Настройка языка",
    "typography.source.preset": "Набор",
    "typography.spaceBefore": "Пробел перед знаком",
    "typography.spacing": "Пробелы",
    "typography.support": "Правила типографики: {rules}",
    "typography.title": "Правила типографики",
    "typography.unknownLanguage": "Язык не указан",
    "typography.unsavedRule": "Не сохранено",
    "typography.useLanguage": "Использовать язык",
    "typography.validation.conflict": "Правила конфликтуют. Измените или удалите одно перед сохранением.",
    "typography.validation.duplicate": "Такое правило уже есть в списке. Измените или удалите повтор перед сохранением.",
    "typography.validation.invalid": "Заполните поля правила перед сохранением.",
    "typography.validation.limit": "Оставьте не более 30 правил перед сохранением.",
    "typography.withSpaces": "С пробелами",
    "typography.withoutSpaces": "Без пробелов",
} satisfies Partial<Record<MessageId, string>>;
