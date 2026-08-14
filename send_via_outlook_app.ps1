$code = @"
using System;
using System.Runtime.InteropServices;

public class Win32 {
    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);

    [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
    public static extern int GetWindowText(IntPtr hWnd, System.Text.StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll")]
    public static extern bool EnumWindows(EnumWindowsProc enumProc, IntPtr lParam);

    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
}
"@

Add-Type -TypeDefinition $code

# Launch EML file
$emlPath = Join-Path (Split-Path $PSScriptRoot -Parent) "MTM báo cao\Gui_Email_Bao_Cao_LG_Hanoi.eml"
if (Test-Path $emlPath) {
    Start-Process $emlPath
}

Start-Sleep -Seconds 2

# Find window with "LG Careers" or "Mail" or "Outlook" or "khanhthuy"
$targetHWnd = [IntPtr]::Zero
[Win32]::EnumWindows({
    param($hWnd, $lParam)
    $sb = New-Object System.Text.StringBuilder(256)
    [Win32]::GetWindowText($hWnd, $sb, 256) | Out-Null
    $title = $sb.ToString()
    if ($title -like "*LG Careers*" -or $title -like "*khanhthuy*" -or $title -like "*Mail*" -or $title -like "*Outlook*") {
        $script:targetHWnd = $hWnd
        return $false
    }
    return $true
}, [IntPtr]::Zero)

if ($targetHWnd -ne [IntPtr]::Zero) {
    [Win32]::SetForegroundWindow($targetHWnd)
    Start-Sleep -Milliseconds 500
    $wshell = New-Object -ComObject WScript.Shell
    $wshell.SendKeys("^{ENTER}")
    Start-Sleep -Milliseconds 300
    $wshell.SendKeys("%s")
    Write-Output "SUCCESSFULLY_FOCUSED_AND_SENT_EMAIL"
} else {
    Write-Output "EML_WINDOW_OPENED_READY_FOR_SEND"
}
