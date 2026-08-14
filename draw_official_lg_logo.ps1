Add-Type -AssemblyName System.Drawing

$width = 440
$height = 120
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.Clear([System.Drawing.Color]::Transparent)

# 1. Draw Official LG Red Circle Emblem (Radius = 42px, Center at X=48, Y=60)
$lgRedPen = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(165, 0, 52)) # #A50034
$g.FillEllipse($lgRedPen, 6, 18, 84, 84)

# 2. Draw White "L" and "G" emblem inside circle
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)

# White Eye Dot (X=36, Y=42, 10x10)
$g.FillEllipse($whiteBrush, 31, 38, 12, 12)

# White L Shape (thick line down & right)
$whitePen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 7)
$whitePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$whitePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

# L-Vertical: (48, 42) -> (48, 72)
$g.DrawLine($whitePen, 48, 42, 48, 72)
# L-Horizontal: (48, 72) -> (60, 72)
$g.DrawLine($whitePen, 48, 72, 60, 72)

# G-Circle Arc (outer ring around L)
$whitePenG = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 6)
$g.DrawArc($whitePenG, 19, 31, 58, 58, 25, 310)
# G-Horizontal bar pointing inwards: (64, 60) -> (48, 60)
$g.DrawLine($whitePenG, 72, 60, 56, 60)

# 3. Draw Official "LG Electronics" Text next to Emblem
$fontBrand = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Bold)
$g.DrawString("LG Electronics", $fontBrand, $whiteBrush, 105, 36)

$destPath = Join-Path $PSScriptRoot "lg_official_header_logo.png"
$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
Write-Output "Generated official high-res LG header logo at $destPath"
