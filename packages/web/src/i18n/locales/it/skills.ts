import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.loadFailed": "Impossibile caricare le abilità. Riprova il caricamento o riapri le Impostazioni IA.",
    "skills.validation.invalid_frontmatter": (
        "Il file SKILL.md di questa abilità non ha un blocco dettagli valido all'inizio. Aggiungi ID, nome, descrizione" +
        " e versione, poi riprova."
    ),
    "skills.validation.invalid_instructions": (
        "Aggiungi le istruzioni Markdown che questa abilità deve seguire. Mantienile entro le dimensioni supp" +
        "ortate."
    ),
    "skills.validation.invalid_metadata": (
        "Rivedi i dettagli dell'abilità. Usa un ID univoco in minuscolo, nome e descrizione chiari, una versi" +
        "one numerica e impostazioni di ambito ed esecuzione supportate."
    ),
    "skills.validation.invalid_reference": (
        "Questa abilità indica un riferimento che Warplyn non può usare. Mantieni i riferimenti come file Mar" +
        "kdown nella cartella references ed entro le dimensioni supportate."
    ),
    "skills.validation.package_too_large": "Questo pacchetto di abilità è troppo grande per Warplyn. Accorcia istruzioni o riferimenti e riprova.",
    "skills.validation.unsafe_package": (
        "Warplyn non può usare questo pacchetto perché contiene un file o un percorso non supportato. Mantieni solo SKI" +
        "LL.md e i riferimenti Markdown dichiarati."
    ),
} satisfies Partial<Record<MessageId, string>>;
