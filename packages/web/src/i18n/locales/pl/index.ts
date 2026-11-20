import type { MessageId } from "../../messages.js";
import { electron } from "./electron.js";
import { assistant } from "./assistant.js";
import { assistant2 } from "./assistant2.js";
import { operations } from "./operations.js";
import { settings } from "./settings.js";
import { settings2 } from "./settings2.js";
import { settings3 } from "./settings3.js";
import { settings4 } from "./settings4.js";
import { revisions } from "./revisions.js";
import { publishing } from "./publishing.js";
import { telemetry } from "./telemetry.js";
import { status } from "./status.js";
import { workspace } from "./workspace.js";
import { errors } from "./errors.js";
import { skills } from "./skills.js";
import { navigation } from "./navigation.js";
import { articleWorkspace } from "./articleWorkspace.js";
import { draftSave } from "./draftSave.js";
import { draftConflict } from "./draftConflict.js";
import { articleHeader } from "./articleHeader.js";
import { preview } from "./preview.js";
import { editor } from "./editor.js";
import { keyBindings } from "./keyBindings.js";
import { quickStart } from "./quickStart.js";
import { languages } from "./languages.js";
import { spelling } from "./spelling.js";
import { article } from "./article.js";
import { articleFiles } from "./articleFiles.js";
import { styleProfile } from "./styleProfile.js";
import { views } from "./views.js";
import { views2 } from "./views2.js";
import { views3 } from "./views3.js";
import { translationLanguages } from "./translationLanguages.js";
import { typography } from "./typography.js";
import { typography2 } from "./typography2.js";
import { ui } from "./ui.js";
import { notifications } from "./notifications.js";

export const pl: Record<MessageId, string> = {
    "notes.markers": "Notatki redakcyjne {numbers}",
    "notes.add": "Dodaj notatkę redakcyjną…",
    "notes.title": "Notatki redakcyjne",
    "notes.count": "Notatki redakcyjne{separator}{count}",
    "notes.select": "Zaznacz tekst, aby dołączyć notatkę.",
    "notes.help": "Dołączone notatki kierują pracą Asystenta nad fragmentami. Są przechowywane oddzielnie od tekstu artykułu.",
    "notes.empty": "Brak notatek redakcyjnych.",
    "notes.detached": "Wymaga ponownego przypisania",
    "notes.edit": "Edytuj notatkę…",
    "notes.reattach": "Dołącz do zaznaczonego tekstu",
    "notes.reattachHelp": "Zaznacz nowy fragment w edytorze, a następnie otwórz ponownie tę notatkę, aby ją dołączyć.",
    "notes.guidance": "Wskazówki dla Asystenta",
    "notes.failed": "Nie udało się zmienić notatki. Zachowaj wskazówki, otwórz artykuł ponownie i spróbuj jeszcze raz.",
    "notes.remove": "Usuń notatkę",
    "notes.save": "Zapisz notatkę",
    "notes.marker": "Notatka redakcyjna {number}",
    "notes.included": "Notatki dołączone do tego żądania",
    ...electron,
    ...assistant,
    ...assistant2,
    ...operations,
    ...settings,
    ...settings2,
    ...settings3,
    ...settings4,
    ...revisions,
    ...publishing,
    ...telemetry,
    ...status,
    ...workspace,
    ...errors,
    ...skills,
    ...navigation,
    ...articleWorkspace,
    ...draftSave,
    ...draftConflict,
    ...articleHeader,
    ...preview,
    ...editor,
    ...keyBindings,
    ...quickStart,
    ...languages,
    ...spelling,
    ...article,
    ...articleFiles,
    ...styleProfile,
    ...views,
    ...views2,
    ...views3,
    ...translationLanguages,
    ...typography,
    ...typography2,
    ...ui,
    ...notifications,
};
