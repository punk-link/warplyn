import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.recovery.title": "作成者のスキルの復旧",
    "skills.recovery.message": "影響を受けた作成者のスキルは利用できません。ファイルと履歴は保持されています。スキルファイルの競合を解消するか、バックアップを復元してから、復旧を再試行してください。記事と組み込みスキルは引き続き利用できます。",
    "skills.recovery.retry": "復旧を再試行",
    "skills.recovery.review": "復旧を確認",
    "skills.recovery.ready": "作成者のスキルを利用できます。",
    "skills.recovery.loadFailed": "スキルの復旧状態を確認できませんでした。再試行するか、Warplynを開き直してください。",
    "skills.recovery.retryFailed": "スキルの復旧を再試行できませんでした。ファイルは保持されています。再試行するか、バックアップを復元してください。",
    "skills.loadFailed": "スキルを読み込めませんでした。再度読み込むか、AI設定を開き直してください。",
    "skills.validation.invalid_frontmatter": "このスキルのSKILL.mdの先頭に有効な詳細情報がありません。ID、名前、説明、バージョンを追加して再試行してください。",
    "skills.validation.invalid_instructions": "このスキルが従う指示をMarkdownで追加してください。指示は対応するサイズ以内に収めてください。",
    "skills.validation.invalid_metadata": "スキルの詳細を確認してください。重複しない小文字のID、分かりやすい名前と説明、数値のバージョン、対応する対象範囲と実行設定を指定してください。",
    "skills.validation.invalid_reference": "Warplynで利用できない参考資料が指定されています。参考資料はreferencesフォルダー内のMarkdownファイルにし、対応するサイズ以内に収めてください。",
    "skills.validation.package_too_large": "このスキルパッケージは大きすぎて読み込めません。指示や参考資料を短くして再試行してください。",
    "skills.validation.unsafe_package": "非対応のファイルまたは保存場所が含まれるため、このスキルパッケージは利用できません。SKILL.mdと宣言されたMarkdownの参考資料だけを含めてください。",
} satisfies Partial<Record<MessageId, string>>;
