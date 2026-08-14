Add-Type -AssemblyName System.Drawing
$p2 = Join-Path $PSScriptRoot "user_ui_culture.png"
$img2 = [System.Drawing.Image]::FromFile($p2)
Write-Output "Card 2: Width $($img2.Width) Height $($img2.Height)"
$img2.Dispose()

$p3 = Join-Path $PSScriptRoot "user_ui_svc_training.png"
$img3 = [System.Drawing.Image]::FromFile($p3)
Write-Output "Card 3: Width $($img3.Width) Height $($img3.Height)"
$img3.Dispose()
