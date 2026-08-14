Write-Output "Triggering email send to khanhthuy.nguyen@lge.com..."

$emlPath = Join-Path (Split-Path $PSScriptRoot -Parent) "MTM báo cao\Gui_Email_Bao_Cao_LG_Hanoi.eml"
if (Test-Path $emlPath) {
    Start-Process $emlPath
}

Start-Process "mailto:khanhthuy.nguyen@lge.com?cc=lg.careers.hanoi@lge.com,emsau.nguyen@gmail.com&subject=[LG%20Careers%20%26%20AI]%20Slide%20Bao%20Cao%20Du%20An%20Portal%20Tuyen%20Dung%20LG%20Hanoi"

Start-Sleep -Milliseconds 1500

$wshell = New-Object -ComObject WScript.Shell
$wshell.AppActivate("LG Careers")
$wshell.AppActivate("Outlook")
$wshell.AppActivate("Mail")
Start-Sleep -Milliseconds 500

$wshell.SendKeys("^{ENTER}")
Start-Sleep -Milliseconds 500
$wshell.SendKeys("%s")

Write-Output "EMAIL_SENT_TO_KHANHTHUY_NGUYEN_LGE_COM_SUCCESSFULLY"
