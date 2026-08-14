$code = @"
using System;
using System.Runtime.InteropServices;

public class Win32 {
    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@

Add-Type -TypeDefinition $code

$procs = Get-Process olk -ErrorAction SilentlyContinue
foreach ($p in $procs) {
    if ($p.MainWindowHandle -ne [IntPtr]::Zero) {
        # 9 = SW_RESTORE, 3 = SW_MAXIMIZE
        [Win32]::ShowWindow($p.MainWindowHandle, 9)
        [Win32]::SetForegroundWindow($p.MainWindowHandle)
        Write-Output "SUCCESSFULLY_BRONG_OUTLOOK_TO_FRONT"
    }
}
