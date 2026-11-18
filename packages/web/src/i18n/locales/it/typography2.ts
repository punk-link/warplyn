import type { MessageId } from "../../messages.js";

export const typography2 = {
    "typography.nested": "Virgolette interne",
    "typography.mark": "Segno preferito",
    "typography.spacing": "Spaziatura",
    "typography.withSpaces": "Con spazi",
    "typography.withoutSpaces": "Senza spazi",
    "typography.left": "Elemento sinistro",
    "typography.right": "Elemento destro",
    "typography.nbsp": "Spazio non separabile, U+00A0",
    "typography.narrowNbsp": "Spazio stretto non separabile, U+202F",
    "typography.source": "Punteggiatura da sostituire",
    "typography.replacement": "Punteggiatura sostitutiva",
    "typography.instruction": "Istruzione per la revisione completa dello stile",
    "typography.horizontalHint": "Usa uno spazio normale tra gli elementi della prosa. Rientri, interruzioni di riga e codice restano invariati.",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.support": "Regole tipografiche: {rules}",
    "typography.noViolations": "Nessuna violazione tipografica meccanica trovata.",
    "typography.skipped": (
        "{count, plural, one {# caso di virgolette ambiguo è rimasto invariato.} other {# casi di virgolette " +
        "ambigui sono rimasti invariati.}} Verificali nel contesto."
    ),
    "typography.contextualSkipped": (
        "{count, plural, one {# regola contestuale richiede la revisione completa dello stile.} other {# rego" +
        "le contestuali richiedono la revisione completa dello stile.}}"
    ),
    "typography.olderProfile": (
        "Questa verifica ha usato la versione {version} del Profilo di stile. Le regole sono cambiate. Ripeti" +
        " la verifica per usare il profilo attuale."
    ),
    "typography.rulesOnly": (
        "Nessun campione di scrittura incluso. Aggiungi campioni per ricavare le caratteristiche della voce, " +
        "oppure usa regole tipografiche esplicite per le verifiche locali."
    ),
    "typography.checkFailed": "Impossibile verificare la tipografia. Salva regole valide e riprova.",
    "typography.saveDraftFirst": "Salva la bozza attuale prima di verificare la tipografia. La verifica locale usa la versione salvata.",
    "typography.reviewProposal": "Rivedi proposta",
    "typography.correction": "{source} → {replacement}",
    "typography.ordinarySpace": "spazio",
    "typography.deleted": "rimosso",
} satisfies Partial<Record<MessageId, string>>;
