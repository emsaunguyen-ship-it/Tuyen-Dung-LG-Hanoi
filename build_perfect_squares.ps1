Add-Type -AssemblyName System.Drawing

# 1. Process Card 2: user_ui_culture.png (1024x504) -> Fit inside 600x600 canvas with white bg
$src2Path = Join-Path $PSScriptRoot "user_ui_culture.png"
$dest2Path = Join-Path $PSScriptRoot "square_culture_balanced.png"

$src2 = [System.Drawing.Image]::FromFile($src2Path)
$canvas2 = New-Object System.Drawing.Bitmap(600, 600)
$g2 = [System.Drawing.Graphics]::FromImage($canvas2)
$g2.Clear([System.Drawing.Color]::White)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# Calculate proportional width and height inside 560x560 box
$targetW2 = 560
$targetH2 = [int]($src2.Height * ($targetW2 / $src2.Width)) # ~275px
$offsetX2 = [int]((600 - $targetW2) / 2) # 20px
$offsetY2 = [int]((600 - $targetH2) / 2) # ~162px

$g2.DrawImage($src2, $offsetX2, $offsetY2, $targetW2, $targetH2)

# Draw subtle light border around canvas
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(226, 232, 240), 2)
$g2.DrawRectangle($pen, 1, 1, 598, 598)

$canvas2.Save($dest2Path, [System.Drawing.Imaging.ImageFormat]::Png)
$g2.Dispose()
$canvas2.Dispose()
$src2.Dispose()

# 2. Also create a Center-Top Crop version of Card 2: square_culture_crop.png (Focus on top video cards)
$src2 = [System.Drawing.Image]::FromFile($src2Path)
$cropCanvas2 = New-Object System.Drawing.Bitmap(504, 504)
$g2Crop = [System.Drawing.Graphics]::FromImage($cropCanvas2)
$g2Crop.Clear([System.Drawing.Color]::White)
$g2Crop.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Crop middle 504x504 out of 1024x504
$cropX = [int]((1024 - 504) / 2) # 260px
$srcRect = New-Object System.Drawing.Rectangle($cropX, 0, 504, 504)
$destRect = New-Object System.Drawing.Rectangle(0, 0, 504, 504)
$g2Crop.DrawImage($src2, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$destCrop2Path = Join-Path $PSScriptRoot "square_culture_crop.png"
$cropCanvas2.Save($destCrop2Path, [System.Drawing.Imaging.ImageFormat]::Png)
$g2Crop.Dispose()
$cropCanvas2.Dispose()
$src2.Dispose()

# 3. Process Card 3: user_ui_svc_training.png (774x589) -> Fit inside 600x600 canvas
$src3Path = Join-Path $PSScriptRoot "user_ui_svc_training.png"
$dest3Path = Join-Path $PSScriptRoot "square_svc_balanced.png"

$src3 = [System.Drawing.Image]::FromFile($src3Path)
$canvas3 = New-Object System.Drawing.Bitmap(600, 600)
$g3 = [System.Drawing.Graphics]::FromImage($canvas3)
$g3.Clear([System.Drawing.Color]::White)
$g3.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$targetH3 = 560
$targetW3 = [int]($src3.Width * ($targetH3 / $src3.Height)) # ~736 -> scale down to fit 560
if ($targetW3 > 560) {
    $targetW3 = 560
    $targetH3 = [int]($src3.Height * ($targetW3 / $src3.Width))
}
$offsetX3 = [int]((600 - $targetW3) / 2)
$offsetY3 = [int]((600 - $targetH3) / 2)

$g3.DrawImage($src3, $offsetX3, $offsetY3, $targetW3, $targetH3)
$g3.DrawRectangle($pen, 1, 1, 598, 598)

$canvas3.Save($dest3Path, [System.Drawing.Imaging.ImageFormat]::Png)
$g3.Dispose()
$canvas3.Dispose()
$src3.Dispose()

Write-Output "Successfully generated perfect square images with zero distortion!"
