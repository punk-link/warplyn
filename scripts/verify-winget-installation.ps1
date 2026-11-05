$ErrorActionPreference = 'Stop'

if ($env:GITHUB_ACTIONS -ne 'true' -or $env:RUNNER_ENVIRONMENT -ne 'github-hosted' -or -not $IsWindows) {
    throw 'Installation lifecycle checks run only on disposable GitHub-hosted Windows runners.'
}

$installRoot = Join-Path $env:LOCALAPPDATA 'com.warplyn.desktop'
$profileRoot = Join-Path $env:APPDATA 'Warplyn'
$artifactRoot = Join-Path $env:RUNNER_TEMP 'warplyn-winget-lifecycle'
$registrationPath = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*'

function Get-WarplynRegistration {
    @(Get-ItemProperty $registrationPath -ErrorAction SilentlyContinue | Where-Object DisplayName -eq 'Warplyn')
}

function Assert-InstalledVersion([string] $version, [string] $publisher) {
    $entries = @(Get-WarplynRegistration)
    if ($entries.Count -ne 1 -or $entries[0].DisplayVersion -ne $version) {
        throw "Expected exactly one installed Warplyn $version registration."
    }
    if ($entries[0].Publisher -ne $publisher) { throw "Installed publisher does not match the manifest: $publisher." }
    if ($entries[0].UninstallString -notmatch '^"?(?<updater>[^\"]+?\\Update\.exe)"?\s+--uninstall') {
        throw 'Expected a Squirrel Update.exe uninstall registration.'
    }
    $registeredRoot = [IO.Path]::GetFullPath([IO.Path]::GetDirectoryName($Matches.updater))
    $localRoot = [IO.Path]::GetFullPath($env:LOCALAPPDATA).TrimEnd('\') + '\'
    if (-not $registeredRoot.StartsWith($localRoot, [StringComparison]::OrdinalIgnoreCase)) {
        throw 'Registered installer location is outside the disposable user profile.'
    }
    $script:installRoot = $registeredRoot
    Write-Output "Registered installation: $registeredRoot ($version, $publisher)"
    if (-not (Test-Path -LiteralPath (Join-Path $installRoot "app-$version/Warplyn.exe"))) {
        throw "Installed executable is missing for $version."
    }
}

function Invoke-SilentInstaller([string] $file, [string[]] $arguments) {
    $process = Start-Process -FilePath $file -ArgumentList $arguments -WindowStyle Hidden -PassThru `
        -RedirectStandardOutput (Join-Path $artifactRoot 'process-output.log') `
        -RedirectStandardError (Join-Path $artifactRoot 'process-error.log')
    if (-not $process.WaitForExit(120000)) {
        Save-InstallationDiagnostics
        $process.Kill($true)
        throw 'Silent installer did not finish within two minutes.'
    }
    $process.Refresh()
    if ($process.ExitCode -ne 0) { throw "Silent installer exited with code $($process.ExitCode)." }
}

function Save-InstallationDiagnostics {
    Get-CimInstance Win32_Process | Where-Object {
        $_.Name -match '^(winget|Warplyn|Warplyn-.+-setup|smartscreen|consent)\.exe$' -or
        ($_.Name -eq 'Update.exe' -and $_.ExecutablePath -match 'Warplyn|com\.warplyn|SquirrelTemp')
    } | Select-Object Name, ProcessId, ParentProcessId, CommandLine |
        ConvertTo-Json | Set-Content (Join-Path $artifactRoot 'installer-processes.log')

    $logPaths = @(
        (Join-Path $env:LOCALAPPDATA 'Packages/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe/LocalState/DiagOutputDir'),
        (Join-Path $env:LOCALAPPDATA 'Microsoft/WinGet/DiagOutputDir'),
        (Join-Path $env:LOCALAPPDATA 'SquirrelTemp')
    )
    foreach ($path in $logPaths) {
        Get-ChildItem -LiteralPath $path -Filter '*.log' -ErrorAction SilentlyContinue |
            Sort-Object LastWriteTime -Descending | Select-Object -First 3 | ForEach-Object {
                Get-Content -LiteralPath $_.FullName | Where-Object {
                    $_ -match 'Starting:|Installer|ShellExecute|Exception|Error|setup|install' -and
                    $_ -notmatch 'https?://|Authorization|Token|signature'
                } | Add-Content (Join-Path $artifactRoot 'installation-diagnostics.log')
            }
    }
    Save-RunnerDesktop
}

function Save-RunnerDesktop {
    try {
        Add-Type -AssemblyName System.Windows.Forms, System.Drawing
        $bounds = [Windows.Forms.SystemInformation]::VirtualScreen
        $bitmap = [Drawing.Bitmap]::new($bounds.Width, $bounds.Height)
        $graphics = [Drawing.Graphics]::FromImage($bitmap)
        try {
            $graphics.CopyFromScreen($bounds.Location, [Drawing.Point]::Empty, $bounds.Size)
            $bitmap.Save((Join-Path $artifactRoot 'runner-desktop.png'), [Drawing.Imaging.ImageFormat]::Png)
        } finally {
            $graphics.Dispose()
            $bitmap.Dispose()
        }
    } catch {
        Write-Warning 'Could not capture the disposable runner desktop.'
    }
}

function Stop-TestApplication {
    Get-Process Warplyn -ErrorAction SilentlyContinue | Where-Object {
        $_.Path -and $_.Path.StartsWith("$installRoot\", [StringComparison]::OrdinalIgnoreCase)
    } | Stop-Process -Force
}

function Assert-SilentUninstall {
    Stop-TestApplication
    Invoke-SilentInstaller (Join-Path $installRoot 'Update.exe') @('--uninstall', '--silent')
    if (@(Get-WarplynRegistration).Count -ne 0) { throw 'Uninstall left a Warplyn registration.' }
    if (Get-ChildItem -LiteralPath $installRoot -Filter Warplyn.exe -Recurse -ErrorAction SilentlyContinue) {
        throw 'Uninstall left an application executable.'
    }
}

if ((Test-Path -LiteralPath $installRoot) -or (Test-Path -LiteralPath (Join-Path $env:LOCALAPPDATA 'Warplyn')) -or
    (Test-Path -LiteralPath $profileRoot) -or @(Get-WarplynRegistration).Count) {
    throw 'Expected a clean runner with no Warplyn installation or profile.'
}

$metadata = Get-Content packages/electron/package.json -Raw | ConvertFrom-Json
$currentVersion = $metadata.version
if ($currentVersion -notmatch '^\d+\.\d+\.\d+$') { throw 'Check a published stable release checkout.' }
$releases = gh release list --repo punk-link/warplyn --limit 100 --json tagName,isDraft,isPrerelease | ConvertFrom-Json
if ($LASTEXITCODE -ne 0) { throw 'Could not list published releases.' }
$previous = $releases | Where-Object {
    -not $_.isDraft -and -not $_.isPrerelease -and $_.tagName -match '^v\d+\.\d+\.\d+$' -and
    [version]$_.tagName.Substring(1) -lt [version]$currentVersion
} | Sort-Object { [version]$_.tagName.Substring(1) } -Descending | Select-Object -First 1
if (-not $previous) { throw 'A previous published stable release is required for the upgrade check.' }
$previousVersion = $previous.tagName.Substring(1)

New-Item -ItemType Directory -Path $artifactRoot | Out-Null
foreach ($version in @($previousVersion, $currentVersion)) {
    gh release download "v$version" --repo punk-link/warplyn --pattern "Warplyn-$version-win32-x64-setup.exe" --dir $artifactRoot
    if ($LASTEXITCODE -ne 0) { throw "Could not download the published $version installer." }
}
$currentInstaller = Join-Path $artifactRoot "Warplyn-$currentVersion-win32-x64-setup.exe"
$previousInstaller = Join-Path $artifactRoot "Warplyn-$previousVersion-win32-x64-setup.exe"
node scripts/generate-winget-manifests.mjs $currentInstaller $artifactRoot
if ($LASTEXITCODE -ne 0) { throw 'Manifest generation failed.' }
winget validate --manifest (Join-Path $artifactRoot $currentVersion) --disable-interactivity
if ($LASTEXITCODE -ne 0) { throw 'WinGet manifest validation failed.' }

$manifest = Get-Content (Join-Path $artifactRoot "$currentVersion/PunkLink.Warplyn.installer.yaml") -Raw
$checksum = (Get-FileHash -LiteralPath $currentInstaller -Algorithm SHA256).Hash
if ($manifest -notmatch "InstallerSha256: $checksum") { throw 'Manifest checksum does not match the installer.' }

winget settings --enable LocalManifestFiles
if ($LASTEXITCODE -ne 0) { throw 'Could not enable local manifests on the disposable runner.' }
$manifestDirectory = Join-Path $artifactRoot $currentVersion
$installationLog = Join-Path $artifactRoot 'winget-install.log'
Invoke-SilentInstaller (Get-Command winget).Source @(
    'install', '--manifest', "`"$manifestDirectory`"", '--silent', '--disable-interactivity',
    '--accept-source-agreements', '--accept-package-agreements', '--log', "`"$installationLog`""
)
Assert-InstalledVersion $currentVersion $metadata.author
Assert-SilentUninstall
Write-Output "PASS fresh silent install and uninstall: $currentVersion"

Invoke-SilentInstaller $previousInstaller @('--silent')
Assert-InstalledVersion $previousVersion $metadata.author
Stop-TestApplication
New-Item -ItemType Directory -Path $profileRoot -Force | Out-Null
$sentinel = Join-Path $profileRoot 'distribution-test.txt'
Set-Content -LiteralPath $sentinel -Value 'Disposable upgrade recovery fixture.'
Invoke-SilentInstaller $currentInstaller @('--silent')
Assert-InstalledVersion $currentVersion $metadata.author
if ((Get-Content -LiteralPath $sentinel -Raw).Trim() -ne 'Disposable upgrade recovery fixture.') {
    throw 'Upgrade did not preserve the existing profile fixture.'
}
Assert-SilentUninstall
if (-not (Test-Path -LiteralPath $sentinel)) { throw 'Uninstall deleted the profile fixture.' }
Write-Output "PASS silent upgrade $previousVersion -> $currentVersion and uninstall; profile fixture preserved."

@{
    currentVersion = $currentVersion
    previousVersion = $previousVersion
    installerSha256 = $checksum
    publisher = $metadata.author
    freshInstall = 'passed'
    upgrade = 'passed'
    uninstall = 'passed'
    profilePreserved = 'passed'
} | ConvertTo-Json | Set-Content (Join-Path $artifactRoot 'lifecycle-results.json')
