

export const settingsUpdatesMessages = {
    "settings.automaticUpdates": "Automatically check for updates",
    "settings.automaticUpdatesHint": (
        "Checks GitHub when Warplyn starts and then daily while it stays open. Updates download only when you" +
        " choose Download."
    ),
    "settings.checkNow": "Check now",
    "settings.restartAndUpdate": "Restart and update",
    "settings.updateChanges": "Changes in {version}",
    "settings.updateChangesUnavailable": "Release details are unavailable. You can still update.",
    "settings.updateNetworkAccess": "Allow network access for updates",
    "settings.updateNetworkAccessHint": (
        "Allows Warplyn to contact GitHub for public release metadata and updates you choose to download. It " +
        "never sends Article content, account information, device identifiers, or analytics."
    ),
    "settings.updateNetworkPermissionDescription": (
        "Warplyn will contact api.github.com for public release metadata. It will not send Article content, account inf" +
        "ormation, device identifiers, or analytics."
    ),
    "settings.updateNetworkPermissionTitle": "Allow Warplyn to check GitHub for updates?",
    "settings.updateRecovery": "Update recovery",
    "settings.updateStatus": "Update status",
    "settings.updateStatusHint": "Current version: {version}",
    "settings.updateStatusUnavailableHint": "Update settings apply when this version supports updates.",
    "settings.updates": "Updates",
    "settings.updatesAvailable": "Version {version} is available.",
    "settings.updatesChecking": "Checking for updates…",
    "settings.updatesCurrent": "You have the latest release.",
    "settings.updatesError.apply_failed": "Couldn’t prepare the update. Try again, or open Update recovery for help.",
    "settings.updatesError.discovery_failed": "Couldn’t check for updates. Try again.",
    "settings.updatesError.download_failed": "Couldn’t download the update. Try again.",
    "settings.updatesNetworkAccessRequired": "Allow network access to check for updates.",
    "settings.updatesUnavailable": "Updates aren’t available in this version.",
    "settings.viewReleaseNotes": "View release notes",
    "settings.windowsUpdateDownloadHint": (
        "Downloading an update also approves installation. Once downloaded, it will apply automatically the n" +
        "ext time you open Warplyn, including after closing the app normally."
    ),
} satisfies Record<string, string>;
