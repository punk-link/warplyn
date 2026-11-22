import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.recovery.title": "Author Skill recovery",
    "skills.recovery.message": (
        "Affected Author Skills are unavailable. Their files and history are preserved. Resolve the " +
        "conflicting Skill files or restore a backup, then retry recovery. Your Articles and built-in Skills " +
        "remain available."
    ),
    "skills.recovery.retry": "Retry recovery",
    "skills.recovery.review": "Review recovery",
    "skills.recovery.ready": "Author Skills are available.",
    "skills.recovery.loadFailed": "Couldn't check Skill recovery. Try again or reopen Warplyn.",
    "skills.recovery.retryFailed": "Couldn't retry Skill recovery. Your files are preserved. Try again or restore a backup.",
    "skills.loadFailed": "Couldn't load Skills. Retry loading them or reopen AI Settings.",
    "skills.validation.invalid_frontmatter": (
        "This Skill's SKILL.md file is missing a valid details block at the top. Add its ID, name, description, and ver" +
        "sion, then try again."
    ),
    "skills.validation.invalid_instructions": "Add the Markdown guidance this Skill should follow. Keep the instructions within the supported size.",
    "skills.validation.invalid_metadata": (
        "Review this Skill's details. Use a unique lowercase ID, a clear name and description, a numeric version, and s" +
        "upported scope and execution settings."
    ),
    "skills.validation.invalid_reference": (
        "This Skill names a reference Warplyn can't use. Keep references as Markdown files inside its references folder" +
        " and within the supported size."
    ),
    "skills.validation.package_too_large": (
        "This Skill package is too large for Warplyn to load. Shorten its instructions or reference files, th" +
        "en try again."
    ),
    "skills.validation.unsafe_package": (
        "Warplyn can't use this Skill package because it includes an unsupported file or file location. Keep only SKILL" +
        ".md and declared Markdown references."
    ),
} satisfies Partial<Record<MessageId, string>>;
