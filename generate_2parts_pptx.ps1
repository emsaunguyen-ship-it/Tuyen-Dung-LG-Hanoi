# PowerShell Script to generate a 2-Slide PowerPoint Presentation structured strictly into 2 Sections:
# Section 1: Ích lợi AI cho người không chuyên (Non-Tech AI Benefits)
# Section 2: Giới thiệu dự án Portal Tuyển dụng LG Hanoi (Project Overview)

$jsonPath = Join-Path $PSScriptRoot "slide_data_2parts.json"
$outputPath = Join-Path $PSScriptRoot "LG_Hanoi_AI_Story_Slide_Bilingual.pptx"

if (-not (Test-Path $jsonPath)) {
    Write-Error "Could not find slide_data_2parts.json at $jsonPath"
    exit 1
}

$data2Parts = Get-Content -Path $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

try {
    $pptx = New-Object -ComObject PowerPoint.Application
    $pptx.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
} catch {
    Write-Host "PowerPoint COM Object not available."
    exit 0
}

# Create presentation (Widescreen 16:9 = 960 pt x 540 pt)
$pres = $pptx.Presentations.Add([Microsoft.Office.Core.MsoTriState]::msoTrue)
$pres.PageSetup.SlideWidth = 960
$pres.PageSetup.SlideHeight = 540

# Colors (BGR format for Office COM)
$colorLgRed      = 0x3400A5   # #A50034 LG Red
$colorDarkBg     = 0x2A170F   # #0F172A Charcoal Dark
$colorCardBg     = 0xFCFAF8   # #F8FAFC Warm Slate Light
$colorCardBorder = 0xE2E8F0   # #E2E8F0 Border
$colorPurple     = 0xED3A7C   # #7C3AED Purple
$colorTextDark   = 0x1E170F   # Dark text

function Build-2Part-Slide($slideData, $slideIndex) {
    $slide = $pres.Slides.Add($slideIndex, 12) # Blank layout = 12

    # 1. Top Red Accent Banner
    $topLine = $slide.Shapes.AddShape(1, 0, 0, 960, 6)
    $topLine.Fill.Solid()
    $topLine.Fill.ForeColor.RGB = $colorLgRed
    $topLine.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    # 2. Tag Pill Badge
    $tagShape = $slide.Shapes.AddShape(1, 40, 18, 480, 24)
    $tagShape.Fill.Solid()
    $tagShape.Fill.ForeColor.RGB = 0xFBE8F3
    $tagShape.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $tagShape.TextFrame.TextRange.Text = $slideData.title_tag
    $tagShape.TextFrame.TextRange.Font.Name = "Segoe UI"
    $tagShape.TextFrame.TextRange.Font.Size = 9.5
    $tagShape.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $tagShape.TextFrame.TextRange.Font.Color.RGB = $colorLgRed
    $tagShape.TextFrame.MarginLeft = 10; $tagShape.TextFrame.MarginTop = 4

    # 3. Main Title
    $headBox = $slide.Shapes.AddTextbox(1, 40, 46, 880, 50)
    $headBox.TextFrame.TextRange.Text = $slideData.headline
    $headBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $headBox.TextFrame.TextRange.Font.Size = 17
    $headBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $headBox.TextFrame.TextRange.Font.Color.RGB = $colorTextDark

    # 4. Split-Screen Layout (2 Equal Cards: Width = 425 each)
    $cardWidth = 426
    $cardHeight = 368
    $cardTop = 106
    $left1 = 40
    $left2 = 494

    # --- CARD 1 (LEFT): PHẦN 1 - ÍCH LỢI AI NONG-TECH ---
    $c1 = $slide.Shapes.AddShape(1, $left1, $cardTop, $cardWidth, $cardHeight)
    $c1.Fill.Solid()
    $c1.Fill.ForeColor.RGB = $colorCardBg
    $c1.Line.ForeColor.RGB = $colorCardBorder
    $c1.Line.Weight = 1.5

    # Card 1 Header Pill
    $c1Header = $slide.Shapes.AddShape(1, $left1 + 12, $cardTop + 12, $cardWidth - 24, 30)
    $c1Header.Fill.Solid()
    $c1Header.Fill.ForeColor.RGB = 0xFCE8F3 # Soft Purple
    $c1Header.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $c1Header.TextFrame.TextRange.Text = $slideData.part1_title
    $c1Header.TextFrame.TextRange.Font.Name = "Segoe UI"
    $c1Header.TextFrame.TextRange.Font.Size = 10.5
    $c1Header.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $c1Header.TextFrame.TextRange.Font.Color.RGB = $colorPurple
    $c1Header.TextFrame.MarginLeft = 8; $c1Header.TextFrame.MarginTop = 6

    # Card 1 Body Text
    $c1Body = $slide.Shapes.AddTextbox(1, $left1 + 12, $cardTop + 48, $cardWidth - 24, $cardHeight - 58)
    $t1 = $c1Body.TextFrame
    $t1.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $t1.MarginLeft = 4; $t1.MarginRight = 4; $t1.MarginTop = 4

    foreach ($item in $slideData.part1_items) {
        $bulletChar = [char]0x2022
        $p = $t1.TextRange.Paragraphs($t1.TextRange.Paragraphs().Count)
        $p.Text = "$bulletChar " + $item + "`n`n"
        $p.Font.Name = "Segoe UI"
        $p.Font.Size = 10
        $p.Font.Color.RGB = $colorTextDark
    }


    # --- CARD 2 (RIGHT): PHẦN 2 - GIỚI THIỆU DỰ ÁN ---
    $c2 = $slide.Shapes.AddShape(1, $left2, $cardTop, $cardWidth, $cardHeight)
    $c2.Fill.Solid()
    $c2.Fill.ForeColor.RGB = $colorCardBg
    $c2.Line.ForeColor.RGB = $colorCardBorder
    $c2.Line.Weight = 1.5

    # Card 2 Header Pill
    $c2Header = $slide.Shapes.AddShape(1, $left2 + 12, $cardTop + 12, $cardWidth - 24, 30)
    $c2Header.Fill.Solid()
    $c2Header.Fill.ForeColor.RGB = 0xFBE8F3 # Soft LG Red
    $c2Header.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $c2Header.TextFrame.TextRange.Text = $slideData.part2_title
    $c2Header.TextFrame.TextRange.Font.Name = "Segoe UI"
    $c2Header.TextFrame.TextRange.Font.Size = 10.5
    $c2Header.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $c2Header.TextFrame.TextRange.Font.Color.RGB = $colorLgRed
    $c2Header.TextFrame.MarginLeft = 8; $c2Header.TextFrame.MarginTop = 6

    # Card 2 Body Text
    $c2Body = $slide.Shapes.AddTextbox(1, $left2 + 12, $cardTop + 48, $cardWidth - 24, $cardHeight - 58)
    $t2 = $c2Body.TextFrame
    $t2.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $t2.MarginLeft = 4; $t2.MarginRight = 4; $t2.MarginTop = 4

    foreach ($item in $slideData.part2_items) {
        $bulletChar = [char]0x2022
        $p = $t2.TextRange.Paragraphs($t2.TextRange.Paragraphs().Count)
        $p.Text = "$bulletChar " + $item + "`n`n"
        $p.Font.Name = "Segoe UI"
        $p.Font.Size = 10
        $p.Font.Color.RGB = $colorTextDark
    }


    # 5. Bottom Dark Footer Bar
    $footerBox = $slide.Shapes.AddShape(1, 40, 486, 880, 36)
    $footerBox.Fill.Solid()
    $footerBox.Fill.ForeColor.RGB = $colorDarkBg
    $footerBox.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    $ft = $footerBox.TextFrame
    $ft.MarginLeft = 14; $ft.MarginTop = 8
    $pFoot = $ft.TextRange.Paragraphs(1)
    $pFoot.Text = $slideData.footer_left + "   |   " + $slideData.live_url
    $pFoot.Font.Name = "Segoe UI"
    $pFoot.Font.Size = 9.5
    $pFoot.Font.Color.RGB = 0xFFFFFF
}

# Build Slide 1 (Vietnamese) & Slide 2 (English)
Build-2Part-Slide $data2Parts.vi 1
Build-2Part-Slide $data2Parts.en 2

# Save & Overwrite PPTX
$pres.SaveAs($outputPath)
$pres.Close()
$pptx.Quit()

Write-Host "Successfully generated 2-Part Structured PowerPoint at: $outputPath"
