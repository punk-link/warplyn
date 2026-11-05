# WinGet submission

The `0.6.2` directory contains draft manifests for `PunkLink.Warplyn`. The installer URL and SHA-256 match the published Windows release. Publisher, package name, and version match the installed app's Windows registration.

Future Windows builds use `punk.link` as their publisher metadata. The published `0.6.2` installer still registers `Kirill Taran`, so its manifests retain that value. When preparing a manifest for a new release, verify the installed publisher and update both publisher fields. Publisher metadata does not provide a digital signature or remove Windows' unsigned-publisher warning.

Each stable Windows release automatically generates and validates fresh manifests after building the installer. Download the `winget-v<version>` artifact from the Windows release workflow. It uses the package version and publisher, the release installer URL, and the SHA-256 of the built installer. Preview releases skip this step. The checked-in `0.6.2` manifests remain the template; change shared installer settings there when packaging changes. Generation does not submit a pull request to WinGet or replace the installed lifecycle checks below.

If WinGet is absent from the CI runner, the workflow installs it using Microsoft's [PowerShell bootstrap procedure](https://learn.microsoft.com/en-us/windows/package-manager/winget/).

Validate from the repository root:

```powershell
winget validate --manifest distribution/winget/0.6.2 --disable-interactivity
```

Before submitting, run the **WinGet installation lifecycle** workflow from a published stable release checkout. Its GitHub-hosted Windows runner is disposable; a local VM is not required. The workflow runs on PRs that change the manifests or lifecycle check, and also supports manual dispatch after it is merged. It downloads the current and previous published installers, validates the generated manifests and checksum, checks silent fresh installation and uninstall, then upgrades the previous installation and verifies registration, publisher, executable, and preservation of a synthetic profile fixture. It saves manifests and `lifecycle-results.json` as workflow artifacts. A missing result file or failed job is not a passing lifecycle check.

The script refuses to run outside a GitHub-hosted Windows runner or with an existing installation/profile. Do not bypass those guards to test an Author's working installation. This check does not exercise the in-app update coordinator, database migrations, or actual Article recovery; the packaged desktop journeys cover application behavior separately.

After those checks pass, copy the three validated manifests from the workflow artifact to `manifests/p/PunkLink/Warplyn/<version>/` in a fork of [winget-pkgs](https://github.com/microsoft/winget-pkgs), then open a pull request. Check for an existing Warplyn entry or submission first.

See Microsoft's [submission guide](https://learn.microsoft.com/en-us/windows/package-manager/package/repository) and [installation validation guide](https://github.com/microsoft/winget-pkgs/blob/master/doc/Validation.md).
