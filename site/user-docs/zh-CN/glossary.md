---
description: "了解 Warplyn 写作工作区中使用的文章、草稿、已保存版本、待审核提案、审查意见和技能等术语。"
---

# Warplyn 术语表

以下术语描述作者可见的概念，以及 Warplyn 中使用的领域语言。

## 文章和版本

- **Article**：可独立恢复的编辑作品。Warplyn 使用“Article”，而不使用“document”。
- **文章库**：作者本地的*文章*集合。**current Article** 是工作区中打开的文章；**Article list** 显示整个集合。
- **Draft**：正在编辑但尚未保存为*已保存版本*的*文章*文本。
- **Draft checkpoint**：本地保存的、可恢复且可变的*草稿*状态，并关联到基础*已保存版本*。它本身不是*已保存版本*。**Current Draft** 基于*文章*当前的*已保存版本*；**stale Draft** 则基于较早的*已保存版本*。
- **已保存版本**：*文章*不可变的已保存快照。
- **Revision promotion**：作者明确将当前*草稿*保存为新的*已保存版本*。此操作只会清除相应的*草稿*检查点。
- **Proposal**：由 AI 生成、需要作者明确批准的候选内容或更改。
- **Proposal base Revision**：用于审阅并生成*待审核提案*的*已保存版本*。当*待审核提案*不再对应当前*已保存版本*时，它会过期。
- **Change selection**：作者选择接受的*待审核提案*子集。接受后会创建新的*已保存版本*。
- **Finding**：建议性的输出，例如事实核查或风格审阅结果，不会更改*文章*。
- **Source Article** 和 **translation Article**：关联但可独立恢复的*文章*。翻译永远不是其源文的*已保存版本*。

## 编辑工作

- **Editorial capability**：经过验证的 Warplyn 操作，会声明可使用的*文章*上下文、前置条件和结果。Workspace View 和 Assistant Skill 可以调用同一项功能。
- **Skill**：可复用的指令包，帮助助理为作者请求选择并安排编辑功能。*技能*不授予任何功能或权限。**built-in Skill** 随 Warplyn 提供。**Author-created Skill** 是在助理对话中创建的本地 Markdown 包，并拥有独立的*技能已保存版本*历史。
- **Editorial operation**：作者请求的助理活动，例如撰写、润色、事实核查、风格审阅或翻译。
- **Editorial request**：一次编辑操作调用。
- **Editorial session**：编辑请求的交互序列和活动历史。
- **编辑指示**：作者在编辑请求中输入的指令或上下文。
- **Style corpus**：作者提供的本地写作样本。**style profile** 是从这些样本提取的精简表示。
- **Workflow stage**：作者可选的进度提示。它不会运行 AI，也不会更改*文章*内容。

## 发布和设置

- **Publishing profile**：可配置的平台建议，包括字符限制。默认配置只适用于新*文章*。
- **Publishing copy**：通过 Article Status Bar 明确从当前*文章*复制的 Markdown 或纯文本。Warplyn 不提供 Publishing Preview Workspace View。
- **Application Settings**：工作区偏好、AI 配置、Publishing 配置和本地数据管理。设置不属于*文章*的已保存版本历史。
- **AI connection**：带有凭据来源的具名服务端提供商配置。新的编辑请求使用**active AI connection**。
- **Credential source**：AI 连接使用的私密来源，可以是环境变量引用或托管凭据。
- **托管凭据**：保存在操作系统凭据存储中的 API 密钥。Warplyn 会保存连接元数据，但绝不会将密钥写入 SQLite 或备份快照。
- **Model preference**：默认模型标识符，或针对特定编辑操作的模型覆盖设置。
- **Interface locale**：Warplyn 界面的语言，与*文章*和翻译所用语言分开。
- **默认文章语言**：未另行指定时分配给新*文章*的语言。
- **默认翻译语言**：翻译请求中优先显示的有序语言列表。它们不会自动启动翻译。
- **Backup destination**：Warplyn 写入备份快照的本地目录。
- **Backup snapshot**：特定时间点的本地数据一致性副本，与活动数据库分开保存且不含凭据。
- **Data location**：包含 Warplyn SQLite 数据的活动本地目录。
- **Data relocation**：经作者确认的复制和重启流程，可将 Warplyn 切换到新的数据目录，同时保留旧副本以供恢复。
- **Recovery snapshot**：Warplyn 恢复数据时、替换活动数据前保留的备份快照。
- **Application update**：较新的 Warplyn 打包版本。桌面客户端可以检查、下载，并且只能通过作者控制的步骤应用。更新本身不会更改*文章*内容。
- **安全更新**：发布标签带有 `.security` 后缀的应用更新。Warplyn 会发出提醒，但不会强制检查、下载或重启。
- **Staged update**：已下载、等待作者选择 重启并更新 的应用更新。普通关闭应用不会应用它。
- **Pre-update snapshot**：应用暂存更新前创建的本地数据备份快照。恢复此快照需要匹配的旧版应用。
- **Diagnostics event**：为启动或可恢复故障支持而写入宿主进程日志的本地脱敏记录。它不包含私密*文章*内容、模型正文或环境变量值。

## 界面

### 工作区布局图

桌面布局，两侧面板均已展开，且选中了文章编辑器。方框展示位置和包含关系，不代表精确尺寸。

```text
Editorial Workspace
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Article Library Panel    │ Article Workspace            │ Editorial Assistant Panel│
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · New Article    │ Article Header               │ Assistant header         │
│ Collapse control         │ Title and Article metadata   │ Collapse control         │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Article search           │ Workspace Tab Bar            │ Conversation             │
├──────────────────────────┼──────────────────────────────┤ Request status           │
│ Article list             │ Workspace View               │ and activity             │
│                          │                              │                          │
│                          │ Article Editor               │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Writing surface          │ │                          │
│                          │ │                          │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Article Library          │                              │ Quick actions            │
│ utility area             │                              │ Composer                 │
│ Style Profile · Settings ├──────────────────────────────┤ Editorial guidance       │
│ Update, when relevant    │ Article Status Bar           │ and Send                 │
│ Language · Local         │ Save status · Metadata · Copy │                          │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

在展开布局中，Library 面板底部的页脚是 **文章库面板工具区域**。最下方一行显示当前*文章*的语言代码和 **本地** 标签。中央文章视图下方的 **Article Status Bar** 显示保存状态。

### 界面术语

- **Editorial Workspace**：主要写作界面，包含 文章库面板、Article Workspace 和 写作助理面板。
- **文章库面板**：文章搜索、文章列表和工作区级入口。折叠后为 **Navigation Rail**；在小屏幕上临时显示为 **Navigation Drawer**。
- **文章库面板工具区域**：展开的 文章库面板 底部区域，包含 风格档案、Settings、必要时的更新控件，以及当前文章的语言代码和 **本地** 标签。
- **Save-state indicator**：Article Status Bar 中的状态，显示当前*草稿*已保存、正在保存或需要处理。
- **Article Workspace**：Article Header、Workspace Tab Bar、选中的 Workspace View 和 Article Status Bar。
- **Article Header**：Workspace Tab Bar 上方的标题和元数据控件。
- **Workspace Tab Bar**：用于选择 Workspace View 的标签栏。
- **Workspace View**：选中的 Article Editor 或辅助视图：提案审核、版本历史、事实核查 或 Translations。
- **风格档案**：独立页面，展示识别出的特征、风格审阅*审查意见*、排版规则、手动建议和写作样本。
- **Article Editor**：写作视图。主要编辑区域称为 **writing surface**。
- **Article Status Bar**：选中 Workspace View 下方的栏，显示文章状态和元数据、语言选择、发布配置建议和复制控件。
- **写作助理面板**：编辑建议、操作、请求状态和活动。小屏幕上的临时形式称为 **Assistant Drawer**。
- **快捷操作**：助理 Composer 上方的下拉菜单，用于向请求插入内置 Skill。
- **Composer**：写作助理面板 底部的消息输入框，作者可在此输入编辑建议并发送请求。
- **Application 设置导航**：在 **常规**、**快捷键**、**服务商**、**AI助理**、**发布准备**、**默认语言**、**拼写**、**数据与备份** 和 **关于Warplyn** 之间导航。
