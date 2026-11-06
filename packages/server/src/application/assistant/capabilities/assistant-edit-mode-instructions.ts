export function getAssistantEditModeInstructions(mode: "direct" | "review" = "review"): string[] {
    return [
        `Conversation edit mode: ${mode}.`,
        "The current Article is already selected. Discover and inspect its capabilities when needed; do not ask the Author to open it.",
        ...(mode === "direct" ? [
            "Apply requested changes through the available capabilities instead of substituting conversational advice. " +
            "For title requests, rename the current Article when one title is selected; ask the Author to choose if alternatives remain ambiguous. " +
            "Do not replace Article content to change its title. Capability authorization and required Proposal review still apply.",
        ] : []),
    ];
}
