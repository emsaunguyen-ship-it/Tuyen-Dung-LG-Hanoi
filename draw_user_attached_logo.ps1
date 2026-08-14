Add-Type -AssemblyName System.Drawing

$width = 240
$height = 80
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.Clear([System.Drawing.Color]::Transparent) # 100% Transparent background

# 1. Official Red Circle Emblem (#A50034)
$redBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(165, 0, 52))
$g.FillEllipse($redBrush, 6, 12, 56, 56)

# White Eye Dot
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.FillEllipse($whiteBrush, 22, 25, 8, 8)

# White L Line
$whitePen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 5)
$whitePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$whitePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

$g.DrawLine($whitePen, 34, 28, 34, 48)
$g.DrawLine($whitePen, 34, 48, 42, 48)

# White G Arc & horizontal line
$whitePenG = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 4.5)
$g.DrawArc($whitePenG, 14, 20, 40, 40, 25, 310)
$g.DrawLine($whitePenG, 50, 40, 39, 40)

# 2. Bold White "LG" Text (visible on dark navbar)
$fontLg = New-Object System.Drawing.Font("Segoe UI", 28, [System.Drawing.FontStyle]::Bold)
$g.DrawString("LG", $fontLg, $whiteBrush, 74, 15)

# 3. Vertical Separator Line removed as requested

$destPath = Join-Path $PSScriptRoot "lg_user_attached_logo.png"
$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
Write-Output "Successfully drawn user attached LG logo at $destPath"
