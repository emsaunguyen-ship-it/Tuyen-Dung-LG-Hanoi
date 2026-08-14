$parentDir = Split-Path $PSScriptRoot -Parent
$emlPath = Join-Path $parentDir "MTM báo cao\Gui_Email_Bao_Cao_LG_Hanoi.eml"

if (-not (Test-Path $emlPath)) {
    $emlPath = Join-Path $PSScriptRoot "Gui_Email_Bao_Cao_LG_Hanoi.eml"
}

if (Test-Path $emlPath) {
    Write-Output "Opening $emlPath..."
    Start-Process $emlPath
    Start-Sleep -Seconds 2

    $w = New-Object -ComObject WScript.Shell
    $w.AppActivate("Outlook")
    $w.AppActivate("Mail")
    $w.AppActivate("LG Careers")
    Start-Sleep -Milliseconds 500
    
    # Send Ctrl+Enter (Standard Outlook Send shortcut)
    $w.SendKeys("^{ENTER}")
    Start-Sleep -Milliseconds 300
    $w.SendKeys("%s")
    Write-Output "EMAIL_SEND_TRIGGERED_SUCCESSFULLY"
} else {
    Write-Output "EML_FILE_NOT_FOUND"
}
