param(
  [string]$Target = "x86_64-pc-windows-msvc"
)

$ErrorActionPreference = "Stop"

Write-Host "Building intern-local for $Target..."
cargo build --release --target $Target

$exe = Join-Path $PSScriptRoot "..\target\$Target\release\intern-local.exe"
$exe = (Resolve-Path $exe).Path
Write-Host "Built: $exe"

Write-Host "SHA256:"
Get-FileHash $exe -Algorithm SHA256 | Format-List

$defenderCli = "C:\Program Files\Windows Defender\MpCmdRun.exe"
if (Test-Path $defenderCli) {
  Write-Host "Running Microsoft Defender custom scan..."
  & $defenderCli -Scan -ScanType 3 -File $exe
} else {
  Write-Host "Defender CLI not found; skipped local scan."
}

Write-Host ""
Write-Host "If Defender still flags this file, submit it to:"
Write-Host "https://www.microsoft.com/wdsi/filesubmission"
