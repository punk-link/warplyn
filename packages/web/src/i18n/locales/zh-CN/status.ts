import type { MessageId } from "../../messages.js";


export const statusMessages = {
    "status.article": "文章状态",
    "status.characterCount": "{characterCount} / {characterLimit}个字符",
    "status.characterCount.ariaLabel": "字符数：{characterCount}，上限{characterLimit}。请选择字符上限。",
    "status.characterLimitPresets": "字符上限预设",
    "status.revision": "v{revisionNumber}",
    "status.revisionMenu": "已保存版本",
    "status.revisionSelector": "当前已保存版本为v{revisionNumber}。请选择已保存版本。",
    "status.updateAvailable": "更新{version}可用",
    "status.updateDownloading": "正在下载更新",
    "status.updateFailed": "检查更新失败",
    "status.updateReady": "更新已就绪，可以重启",
    "status.windowsUpdateAvailable": "下载更新{version}并批准在下次打开Warplyn时自动安装",
    "status.windowsUpdateReady": "更新已下载，将在下次打开Warplyn时自动应用。",
} satisfies Partial<Record<MessageId, string>>;
