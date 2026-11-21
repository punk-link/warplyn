import type { MessageId } from "../../messages.js";


export const errorsMessages = {
    "errors.activeConnectionRemovalBlocked": "Elige otra conexión de IA activa antes de eliminar esta.",
    "errors.activeConnectionRequired": "Añade y selecciona primero una conexión de IA.",
    "errors.aiConnectionNotFound": "No se encontró esa conexión de IA. Elige otra e inténtalo de nuevo.",
    "errors.aiConnectionVerificationFailed": "El proveedor de IA no pudo verificar esta conexión. Comprueba la variable y su clave e inténtalo de nuevo.",
    "errors.articleNotFound": "No se encontró ese artículo. Selecciona uno existente e inténtalo de nuevo.",
    "errors.assistantCheckpointConflict": (
        "La conversación con el asistente ha cambiado. Revisa los detalles de restauración actualizados e inténtalo de " +
        "nuevo."
    ),
    "errors.assistantCheckpointInvalid": "Ese punto de control de la conversación ya no está disponible. Elige otro mensaje del autor.",
    "errors.assistantCoordinatorFailed": "No se pudo completar esa acción del asistente. El artículo no ha cambiado. Inténtalo de nuevo.",
    "errors.assistantEditConflict": "El artículo o el borrador ha cambiado. Guarda o resuelve el trabajo actual y solicita una nueva edición.",
    "errors.assistantEditInvalid": (
        "El asistente no pudo generar una sustitución segura. El artículo no ha cambiado. Prueba con una selección más " +
        "pequeña o una instrucción más concreta."
    ),
    "errors.assistantRequestConflict": "Esa acción del asistente ya está en curso. Espera a que termine antes de intentarlo de nuevo.",
    "errors.assistantRequestTimedOut": (
        "La solicitud del asistente alcanzó su tiempo límite. El artículo no ha cambiado. Reinténtala o aumenta el tiem" +
        "po límite en la configuración general."
    ),
    "errors.assistantRetryInvalid": "No se puede reintentar esa acción del asistente. Iníciala de nuevo desde el asistente.",
    "errors.assistantSelectionInvalid": "No se puede usar esa selección para esta acción del asistente. Cámbiala e inténtalo de nuevo.",
    "errors.assistantSkillScopeIncompatible": "Esa acción del asistente no puede usar esta selección. Cámbiala e inténtalo de nuevo.",
    "errors.assistantSkillUnsupported": "Esa acción del asistente no está disponible. Elige otra.",
    "errors.duplicateStyleCorpusItem": "Este texto ya está en el corpus de estilo.",
    "errors.editorialConfigurationMissing": (
        "No se pudo iniciar esa acción asistida por IA. Elige un modelo compatible en la configuración e inténtalo de n" +
        "uevo."
    ),
    "errors.editorialOperationUnsupported": "Esa acción asistida por IA no está disponible. Elige otra.",
    "errors.editorialProviderFailed": (
        "No se pudo completar esa acción asistida por IA. El artículo no ha cambiado. Reintenta o comprueba tu conexión" +
        " de IA en la configuración."
    ),
    "errors.editorialRequestFailed": (
        "No se pudo completar esa acción asistida por IA. El artículo no ha cambiado. Reintenta o comprueba tu conexión" +
        " de IA en la configuración."
    ),
    "errors.editorialStreamIncomplete": "No se pudo completar esa acción asistida por IA. El artículo no ha cambiado. Inténtalo de nuevo.",
    "errors.environmentVariableUnavailable": "La variable {environmentVariableName} no está disponible. Añádela e inténtalo de nuevo.",
    "errors.factCorrectionSelectionInvalid": (
        "No se pudieron preparar correcciones porque las observaciones seleccionadas ya no están vigentes o n" +
        "ecesitan revisión. Repite la verificación y selecciona observaciones cuestionadas o no verificables " +
        "sin resolver."
    ),
    "errors.generic": "No se pudo completar esa acción. El artículo no ha cambiado. Inténtalo de nuevo.",
    "errors.invalidEnvironmentVariableName": "Introduce un nombre de variable de entorno con mayúsculas, números y guiones bajos.",
    "errors.invalidJson": "No se pudo completar esa acción porque algunos datos no eran válidos. Compruébalos e inténtalo de nuevo.",
    "errors.invalidKeyBinding": "Introduce un atajo completo con una tecla que no sea modificadora.",
    "errors.invalidRequest": "No se pudo completar esa acción porque algunos datos no eran válidos. Compruébalos e inténtalo de nuevo.",
    "errors.keyBindingConflict": "Elige un atajo que no esté asignado.",
    "errors.managedCredentialMissing": (
        "Esta conexión no tiene clave de API en Warplyn. Añade una nueva conexión con clave de API, selecciónala para t" +
        "us modelos y elimina esta conexión antigua."
    ),
    "errors.managedCredentialsUnavailable": "El almacenamiento seguro de credenciales no está disponible en este dispositivo. Elige Variable de entorno.",
    "errors.originNotPermitted": "No se pudo completar esa acción en esta ventana. Vuelve a abrir Warplyn e inténtalo de nuevo.",
    "errors.proposalEditInvalid": (
        "No se pudo aplicar la propuesta editada. El artículo no ha cambiado. Conserva sin cambios los número" +
        "s, enlaces, código y términos técnicos propuestos e inténtalo de nuevo. Si la propuesta no está disp" +
        "onible, genera otra."
    ),
    "errors.requestTooLarge": "No se pudo completar esa acción porque el contenido seleccionado es demasiado grande. Redúcelo e inténtalo de nuevo.",
    "errors.resourceNotFound": "No se encontró lo necesario para esa acción. Recarga Warplyn e inténtalo de nuevo.",
    "errors.revisionConflict": (
        "No se pudo guardar porque el artículo cambió antes. Los últimos cambios siguen en el editor; revisa el conflic" +
        "to e inténtalo de nuevo."
    ),
    "errors.revisionNotFound": "No se encontró esa versión guardada. Elige otra e inténtalo de nuevo.",
    "errors.skillPackageConflict": (
        "Esta habilidad ha cambiado o su ID o nombre ya está en uso. Recarga la lista, elige un nombre disponible si es" +
        " necesario e inténtalo de nuevo."
    ),
    "errors.skillRevisionNotFound": "Esa versión de la habilidad no está disponible. Vuelve a listar sus versiones y elige una existente.",
    "errors.styleCorpusRequired": "Añade al menos un elemento al corpus de estilo antes de revisar el estilo.",
    "errors.targetLanguageRequired": "Elige un idioma de destino antes de solicitar una traducción.",
    "errors.unsupportedPublishingProfile": "Elige un perfil de publicación compatible.",
} satisfies Partial<Record<MessageId, string>>;
