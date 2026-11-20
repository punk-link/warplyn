import type { MessageId } from "../../messages.js";


export const articleFilesMessages = {
    "articleFiles.download": "ダウンロード",
    "articleFiles.downloadStarted": "記事のダウンロードを開始しました",
    "articleFiles.format": "ファイル形式",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatRtf": "リッチテキスト (.rtf)",
    "articleFiles.import": "インポート",
    "articleFiles.invalid": "有効な.md、.html、.docx、.rtfファイルを選んでください。MarkdownとHTMLの文字コードはUTF-8が必要です。",
    "articleFiles.layoutWarning": "段落、リスト、基本的な書式は保持されます。ページと表のレイアウトは簡略化されます。画像、コメント、埋め込みオブジェクトは省略されます。インポート前に変換された記事を確認してください。",
    "articleFiles.load": "ファイルから読み込む",
    "articleFiles.loadFailed": "記事を読み込めませんでした。読み取り可能なMarkdown、HTML、DOCX、RTFファイルを選んで、もう一度お試しください。",
    "articleFiles.loaded": "ファイルから記事を読み込みました",
    "articleFiles.menuLoad": "ファイルから読み込む…",
    "articleFiles.menuSave": "ファイルに保存…",
    "articleFiles.review": "インポートする記事を確認",
    "articleFiles.save": "ファイルに保存",
    "articleFiles.saveFailed": "記事をファイルに保存できませんでした。書き込み可能な保存先を選んで、もう一度お試しください。",
    "articleFiles.saved": "記事をファイルに保存しました",
    "articleFiles.tooLarge": "記事ファイルが10 MiBの上限を超えています。小さいファイルを選ぶか、記事を短くしてから保存してください。",
} satisfies Partial<Record<MessageId, string>>;
