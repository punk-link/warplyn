---
description: "Set Warplyn's appearance, writing defaults, Assistant behavior, publishing guidance, and desktop update preferences."
---

# Application settings

Application Settings control how Warplyn looks and behaves. They are not part of an Article's *Revision* history. Open **Settings** from the Article Library utility area. Some settings are desktop-only and are identified below.

## Set appearance and language

In **General** → **Appearance & language**, choose **System**, **Light**, or **Dark** for **Preferred appearance**. **System** follows your device and updates while Warplyn is open. Choose an **Interface language** for menus and messages. English is currently the only complete interface language. These choices do not change an Article's writing language or typography rules.

In **Date & time**, choose a date format, 12-hour or 24-hour time, and a time zone. The system options follow your device. These choices change how saved times appear in Warplyn, not the saved times themselves.

Set **Default Article language** for new Articles. Set **Default translation languages** to have those targets offered first when you request a translation. Warplyn still asks you to confirm each request.

## Set Assistant behavior

In **AI assistant**, choose **Propose edits for review** as the default for new Article conversations, or opt into **Apply edits directly** for explicitly requested edits. This default does not change existing conversations, and other generated results still need review.

**Request time limit** applies to each new request and retry. It defaults to two minutes. Choose a longer limit or **Unlimited** for a task that needs more time. A request that times out does not change your Article.

Choose **Enter** or **Ctrl + Enter** as the Assistant send key. Other application shortcuts can be changed in **Key bindings**. Warplyn identifies conflicts before saving a shortcut.

## Set publishing guidance

In **Publishing**, choose a default profile for new Articles. Profiles such as **LinkedIn Post** and **LinkedIn Article** show character guidance in the Article Status Bar. You can also choose **No restrictions** or add a custom profile with a name and whole-number character limit. The default affects new Articles; an existing Article can keep its own profile. Limits are guidance only and never prevent copying. In the Article Status Bar, choose **Copy Markdown**, or open its menu and choose **Copy plain text**. Warplyn copies text when you ask; it does not publish directly.

## Review AI model options

In **AI assistant**, you can keep multiple provider connections, activate only the ones you want to use, and assign different models to general Assistant work and specific Skills. The **Default model** is used for AI work unless a task has its own choice. The optional **App model** handles Warplyn tasks such as summaries and titles; it follows the Default model when unset. Use **Favorites**, search, or the vendor filter to find a model. **Reasoning level** appears for supported OpenAI models. Available tasks and controls depend on the model. See [AI providers and models](providers.md) for connection setup and provider limits.

In **Key bindings**, choose a shortcut beside an action, then press the key combination you want. You can set shortcuts for saving a Revision, switching views, or toggling Focus mode. Warplyn names the action already using a conflicting shortcut; choose a different combination. **Send with** controls whether **Enter** or **Ctrl + Enter** sends an Assistant request. Changing shortcuts does not change Article content.

## Check desktop updates

Packaged desktop apps can check for releases in **Settings** → **About Warplyn** → **Updates**. First allow **Allow network access for updates**. This lets Warplyn contact GitHub for public release details. Then choose **Automatically check for updates** and whether to **Include prerelease updates**. Choose **Check now** to check at any time. An available release shows its notes. Warplyn never downloads or applies an update without your action. Windows provides **Download** and **Restart and update** actions. On Linux, use **View release notes**, then update with your package manager or a newer `.deb` installer. See [Windows preview update recovery](update-recovery.md) if an update prevents the app from starting.

## Delete local data

In the desktop app, **Delete local data** permanently removes the active Warplyn data, including Articles, Revisions, Draft checkpoints, Assistant history, style data, settings, and local backups stored inside that data folder. When a backup folder is configured, the confirmation offers **Create a backup before deletion**. Warplyn must complete that backup before it deletes anything. The app closes after successful deletion. Ordinary uninstall does not remove your writing data. Personal spelling words stored in the operating system dictionary remain there; remove them separately in **Settings** → **Spelling** if you want them gone too.

Open **Settings** → **About Warplyn** to find the user guide, source repository, issue tracker, and license. Choose **Open quick start** to revisit the first-run introduction.
