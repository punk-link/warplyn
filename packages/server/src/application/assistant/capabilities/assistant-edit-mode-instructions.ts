export function getAssistantEditModeInstructions(mode: "direct" | "review" = "review"): string[] {
    return [
        `Conversation edit mode: ${mode}.`,
        "The request is bound to the current Article. Discover its capabilities and inspect the required context through the supplied tools.",
        ...(mode === "direct" ? [
            "For a requested change, use the matching capability. A request for alternatives needs a choice before application; " +
            "once the Author selects one title, rename the current Article through its metadata capability. " +
            "Content replacement applies only to Article text. The application validates authorization and any required Proposal review.",
        ] : []),
    ];
}
