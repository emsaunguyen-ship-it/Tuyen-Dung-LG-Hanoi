# PowerShell Script to export PowerPoint slides directly to high-resolution PNG images for user review

$pptxPath = Join-Path $PSScriptRoot "LG_Hanoi_AI_Story_Slide_Bilingual.pptx"
$artifactDir = "C:\Users\LG\.gemini\antigravity-ide\brain\9a229a17-aa26-4b40-9aef-061a16b33cd3"
$preview1Path = Join-Path $artifactDir "slide_1_preview.png"
$preview2Path = Join-Path $artifactDir "slide_2_preview.png"

if (-not (Test-Path $artifactDir)) {
    New-Item -ItemType Directory -Path $artifactDir -Force
}

try {
    Write-Host "Exporting PowerPoint slides to high-res PNG images..."
    $pptx = New-Object -ComObject PowerPoint.Application
    $pres = $pptx.Presentations.Open($pptxPath, [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)

    $pres.Slides.Item(1).Export($preview1Path, "PNG", 1920, 1080)
    $pres.Slides.Item(2).Export($preview2Path, "PNG", 1920, 1080)

    $pres.Close()
    $pptx.Quit()
    Write-Host "SLIDE_PREVIEWS_EXPORTED_SUCCESSFULLY"
} catch {
    Write-Error "Failed to export slides: $_"
}

