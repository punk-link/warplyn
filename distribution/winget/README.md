# WinGet manifests

The `0.6.2` directory is the template for `PunkLink.Warplyn`. Stable Windows releases generate and validate current manifests as the `winget-v<version>` workflow artifact; preview releases skip this step.

The template retains the published 0.6.2 installer's `Kirill Taran` publisher. Generated manifests use the release's publisher metadata. This metadata does not sign the installer.

For lifecycle checks, evidence, and catalog submission, follow [Published Windows installer lifecycle](../../docs/development/guides/testing.md#published-windows-installer-lifecycle).
