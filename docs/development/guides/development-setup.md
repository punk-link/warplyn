# Development setup

Use Node.js 26.13.0, pinned in `.nvmrc` and shared by CI. With nvm, run `nvm install` and `nvm use`; with nvm-windows, run `nvm install 26.13.0` and `nvm use 26.13.0`. Then run `npm ci` from the repository root.

This version applies to development and release tooling. The desktop app uses Electron's bundled Node.js runtime.

The `extract-zip` dependency override keeps Electron packaging compatible with Node 26; its older `yauzl` dependency can silently stop extracting archives. Remove the override when Forge's packaging dependencies support Node 26 directly.

Run `npm run dev` for browser development or `npm run dev:electron` for the desktop app. Follow the [testing guide](testing.md) for verification and the [release guide](mvp-release-and-recovery.md) for release preparation, publication, and recovery.
