import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.recovery.title": "作者技能恢复",
    "skills.recovery.message": "受影响的作者技能暂不可用，其文件和历史记录均已保留。请解决技能文件中的冲突或还原备份，然后重试恢复。文章和内置技能仍可使用。",
    "skills.recovery.retry": "重试恢复",
    "skills.recovery.review": "查看恢复",
    "skills.recovery.ready": "作者技能可用。",
    "skills.recovery.loadFailed": "无法检查技能恢复状态。请重试或重新打开 Warplyn。",
    "skills.recovery.retryFailed": "无法重试技能恢复。文件已保留。请重试或还原备份。",
    "skills.loadFailed": "无法加载技能。请重新加载或重新打开AI设置。",
    "skills.validation.invalid_frontmatter": "此技能的SKILL.md文件顶部缺少有效的详情块。请添加ID、名称、说明和版本后重试。",
    "skills.validation.invalid_instructions": "请添加此技能应遵循的Markdown指示，并将长度控制在支持范围内。",
    "skills.validation.invalid_metadata": "请检查技能详情，使用唯一的小写ID、清晰的名称和说明、数字版本，以及支持的范围和执行设置。",
    "skills.validation.invalid_reference": "此技能引用了Warplyn无法使用的资料。请将引用保存为references文件夹中的Markdown文件，并控制在支持大小内。",
    "skills.validation.package_too_large": "技能包过大，Warplyn无法加载。请缩短指示或引用文件后重试。",
    "skills.validation.unsafe_package": "此技能包包含不支持的文件或文件位置，无法使用。请只保留SKILL.md及声明的Markdown引用资料。",
} satisfies Partial<Record<MessageId, string>>;
