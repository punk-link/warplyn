import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.loadFailed": "Impossible de charger les compétences. Réessayez ou rouvrez les paramètres d’IA.",
    "skills.validation.invalid_frontmatter": (
        "Le fichier SKILL.md de cette compétence ne contient pas de bloc de métadonnées valide en tête. Ajout" +
        "ez son ID, son nom, sa description et sa version, puis réessayez."
    ),
    "skills.validation.invalid_instructions": (
        "Ajoutez les instructions Markdown que cette compétence doit suivre. Respectez la taille maximale prise en char" +
        "ge."
    ),
    "skills.validation.invalid_metadata": (
        "Vérifiez les détails de cette compétence. Utilisez un ID unique en minuscules, un nom et une descrip" +
        "tion clairs, une version numérique et des paramètres de portée et d’exécution pris en charge."
    ),
    "skills.validation.invalid_reference": (
        "Cette compétence indique une référence inutilisable par Warplyn. Conservez les références sous forme" +
        " de fichiers Markdown dans son dossier references et respectez la taille maximale prise en charge."
    ),
    "skills.validation.package_too_large": (
        "Ce paquet de compétence est trop volumineux pour Warplyn. Raccourcissez ses instructions ou ses fichiers de ré" +
        "férence, puis réessayez."
    ),
    "skills.validation.unsafe_package": (
        "Warplyn ne peut pas utiliser ce paquet de compétence, car il contient un fichier ou un emplacement n" +
        "on pris en charge. Conservez uniquement SKILL.md et les références Markdown déclarées."
    ),
} satisfies Partial<Record<MessageId, string>>;
