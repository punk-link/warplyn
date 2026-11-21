import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.loadFailed": "スキルを読み込めませんでした。再度読み込むか、AI設定を開き直してください。",
    "skills.validation.invalid_frontmatter": "このスキルのSKILL.mdの先頭に有効な詳細情報がありません。ID、名前、説明、バージョンを追加して再試行してください。",
    "skills.validation.invalid_instructions": "このスキルが従う指示をMarkdownで追加してください。指示は対応するサイズ以内に収めてください。",
    "skills.validation.invalid_metadata": "スキルの詳細を確認してください。重複しない小文字のID、分かりやすい名前と説明、数値のバージョン、対応する対象範囲と実行設定を指定してください。",
    "skills.validation.invalid_reference": "Warplynで利用できない参考資料が指定されています。参考資料はreferencesフォルダー内のMarkdownファイルにし、対応するサイズ以内に収めてください。",
    "skills.validation.package_too_large": "このスキルパッケージは大きすぎて読み込めません。指示や参考資料を短くして再試行してください。",
    "skills.validation.unsafe_package": "非対応のファイルまたは保存場所が含まれるため、このスキルパッケージは利用できません。SKILL.mdと宣言されたMarkdownの参考資料だけを含めてください。",
} satisfies Partial<Record<MessageId, string>>;
