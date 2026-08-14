$emlPath = Join-Path $PSScriptRoot "Gui_Email_Bao_Cao_LG_Hanoi.eml"
if (-not (Test-Path $emlPath)) {
    $emlPath = Join-Path (Split-Path $PSScriptRoot -Parent) "MTM báo cao\Gui_Email_Bao_Cao_LG_Hanoi.eml"
}

Write-Output "Opening prepared EML email draft at $emlPath..."
Start-Process $emlPath

Start-Sleep -Milliseconds 2000

$wshell = New-Object -ComObject WScript.Shell
$wshell.AppActivate("LG Careers")
$wshell.AppActivate("Outlook")
$wshell.AppActivate("Mail")
Start-Sleep -Milliseconds 500

# Send Ctrl+Enter (Universal Send shortcut)
$wshell.SendKeys("^{ENTER}")
Start-Sleep -Milliseconds 500
$wshell.SendKeys("%s")

Write-Output "AUTO_SEND_COMMAND_TRIGGERED_SUCCESSFULLY"
