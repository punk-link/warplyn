# WinGet submission

The `0.6.2` directory contains draft manifests for `PunkLink.Warplyn`. The installer URL and SHA-256 match the published Windows release. Publisher, package name, and version match the installed app's Windows registration.

Future Windows builds use `punk.link` as their publisher metadata. The published `0.6.2` installer still registers `Kirill Taran`, so its manifests retain that value. When preparing a manifest for a new release, verify the installed publisher and update both publisher fields. Publisher metadata does not provide a digital signature or remove Windows' unsigned-publisher warning.

Each stable Windows release automatically generates and validates fresh manifests after building the installer. Download the `winget-v<version>` artifact from the Windows release workflow. It uses the package version and publisher, the release installer URL, and the SHA-256 of the built installer. Preview releases skip this step. The checked-in `0.6.2` manifests remain the template; change shared installer settings there when packaging changes. Generation does not submit a pull request to WinGet or replace the installed lifecycle checks below.

If WinGet is absent from the CI runner, the workflow installs it using Microsoft's [PowerShell bootstrap procedure](https://learn.microsoft.com/en-us/windows/package-manager/winget/).

Validate from the repository root:

```powershell
winget validate --manifest distribution/winget/0.6.2 --disable-interactivity
```

Schema validation passes. Before submitting, test silent installation, upgrade from the previous release, and uninstall in a disposable Windows 11 environment. Do not use an Author's working installation for these checks. The Squirrel installer uses `--silent`; its unattended behavior has not yet been verified for this release.

After those checks pass, copy the three manifests to `manifests/p/PunkLink/Warplyn/0.6.2/` in a fork of [winget-pkgs](https://github.com/microsoft/winget-pkgs), then open a pull request. Check for an existing Warplyn entry or submission first.

See Microsoft's [submission guide](https://learn.microsoft.com/en-us/windows/package-manager/package/repository) and [installation validation guide](https://github.com/microsoft/winget-pkgs/blob/master/doc/Validation.md).
