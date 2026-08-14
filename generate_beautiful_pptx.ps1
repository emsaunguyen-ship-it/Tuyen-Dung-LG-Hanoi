# PowerShell Script to generate an executive, beautifully styled 2-Slide PowerPoint Presentation (Slide 1: Vietnamese, Slide 2: English)
# Combining Project Overview + AI Co-Creation & Mindset Shift

$jsonPath = Join-Path $PSScriptRoot "slide_data_bilingual_v2.json"
$outputPath = Join-Path $PSScriptRoot "LG_Hanoi_AI_Story_Slide_Bilingual.pptx"

if (-not (Test-Path $jsonPath)) {
    Write-Error "Could not find slide_data_bilingual_v2.json at $jsonPath"
    exit 1
}

$bilingualData = Get-Content -Path $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

try {
    $pptx = New-Object -ComObject PowerPoint.Application
    $pptx.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
} catch {
    Write-Host "PowerPoint COM Object not available."
    exit 0
}

# Create new presentation
$pres = $pptx.Presentations.Add([Microsoft.Office.Core.MsoTriState]::msoTrue)
$pres.PageSetup.SlideWidth = 960
$pres.PageSetup.SlideHeight = 540

# Color Constants (BGR format for Office COM)
$colorLgRed      = 0x3400A5   # #A50034 LG Red
$colorDarkBg     = 0x2A170F   # #0F172A Charcoal Dark
$colorCardBg     = 0xFCFAF8   # #F8FAFC Warm Slate Light
$colorCardBorder = 0xE2E8F0   # #F0E8E2 Border
$colorCoral      = 0x3843CA   # Coral accent
$colorPurple     = 0xED3A7C   # #7C3AED Purple accent
$colorTeal       = 0x81B910   # #10B981 Teal accent
$colorTextDark   = 0x1E170F   # Dark slate text

function Build-Executive-Slide($slideData, $slideIndex) {
    $slide = $pres.Slides.Add($slideIndex, 12) # Layout blank = 12

    # 1. Top Red Accent Line
    $topLine = $slide.Shapes.AddShape(1, 0, 0, 960, 6)
    $topLine.Fill.Solid()
    $topLine.Fill.ForeColor.RGB = $colorLgRed
    $topLine.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    # 2. Tag Pill Badge Box
    $tagShape = $slide.Shapes.AddShape(1, 40, 18, 480, 24)
    $tagShape.Fill.Solid()
    $tagShape.Fill.ForeColor.RGB = 0xFBE8F3 # Light pink background
    $tagShape.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $tagShape.TextFrame.TextRange.Text = $slideData.title_tag
    $tagShape.TextFrame.TextRange.Font.Name = "Segoe UI"
    $tagShape.TextFrame.TextRange.Font.Size = 9.5
    $tagShape.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $tagShape.TextFrame.TextRange.Font.Color.RGB = $colorLgRed
    $tagShape.TextFrame.MarginLeft = 10; $tagShape.TextFrame.MarginTop = 4

    # 3. Main Headline
    $headBox = $slide.Shapes.AddTextbox(1, 40, 46, 880, 52)
    $headBox.TextFrame.TextRange.Text = $slideData.headline
    $headBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $headBox.TextFrame.TextRange.Font.Size = 16.5
    $headBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $headBox.TextFrame.TextRange.Font.Color.RGB = $colorTextDark

    # 4. 3 Widescreen Container Cards
    $colLefts = @(40, 337, 634)
    $colWidth = 286
    $colTop = 106
    $colHeight = 368

    # --- CARD 1: DỰ ÁN PORTAL TUYỂN DỤNG LG HANOI ---
    $c1 = $slide.Shapes.AddShape(1, $colLefts[0], $colTop, $colWidth, $colHeight)
    $c1.Fill.Solid()
    $c1.Fill.ForeColor.RGB = $colorCardBg
    $c1.Line.ForeColor.RGB = $colorCardBorder
    $c1.Line.Weight = 1.5

    # Card 1 Header Pill
    $c1Header = $slide.Shapes.AddShape(1, $colLefts[0] + 12, $colTop + 12, $colWidth - 24, 28)
    $c1Header.Fill.Solid()
    $c1Header.Fill.ForeColor.RGB = 0xE2E0FF # Coral tint
    $c1Header.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $c1Header.TextFrame.TextRange.Text = $slideData.section1_title
    $c1Header.TextFrame.TextRange.Font.Name = "Segoe UI"
    $c1Header.TextFrame.TextRange.Font.Size = 10
    $c1Header.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $c1Header.TextFrame.TextRange.Font.Color.RGB = $colorCoral
    $c1Header.TextFrame.MarginLeft = 8; $c1Header.TextFrame.MarginTop = 6

    # Card 1 Content Body
    $c1Body = $slide.Shapes.AddTextbox(1, $colLefts[0] + 12, $colTop + 46, $colWidth - 24, $colHeight - 56)
    $t1 = $c1Body.TextFrame
    $t1.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $t1.MarginLeft = 4; $t1.MarginRight = 4; $t1.MarginTop = 4

    foreach ($item in $slideData.section1_items) {
        $bulletChar = [char]0x2022
        $p = $t1.TextRange.Paragraphs($t1.TextRange.Paragraphs().Count)
        $p.Text = "$bulletChar " + $item + "`n`n"
        $p.Font.Name = "Segoe UI"
        $p.Font.Size = 10.5
        $p.Font.Color.RGB = $colorTextDark
    }


    # --- CARD 2: CÂU CHUYỆN ỨNG DỤNG AI ---
    $c2 = $slide.Shapes.AddShape(1, $colLefts[1], $colTop, $colWidth, $colHeight)
    $c2.Fill.Solid()
    $c2.Fill.ForeColor.RGB = $colorCardBg
    $c2.Line.ForeColor.RGB = $colorCardBorder
    $c2.Line.Weight = 1.5

    # Card 2 Header Pill
    $c2Header = $slide.Shapes.AddShape(1, $colLefts[1] + 12, $colTop + 12, $colWidth - 24, 28)
    $c2Header.Fill.Solid()
    $c2Header.Fill.ForeColor.RGB = 0xFCE8F3 # Purple tint
    $c2Header.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $c2Header.TextFrame.TextRange.Text = $slideData.section2_title
    $c2Header.TextFrame.TextRange.Font.Name = "Segoe UI"
    $c2Header.TextFrame.TextRange.Font.Size = 10
    $c2Header.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $c2Header.TextFrame.TextRange.Font.Color.RGB = $colorPurple
    $c2Header.TextFrame.MarginLeft = 8; $c2Header.TextFrame.MarginTop = 6

    # Card 2 Content Body
    $c2Body = $slide.Shapes.AddTextbox(1, $colLefts[1] + 12, $colTop + 46, $colWidth - 24, $colHeight - 56)
    $t2 = $c2Body.TextFrame
    $t2.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $t2.MarginLeft = 4; $t2.MarginRight = 4; $t2.MarginTop = 4

    foreach ($item in $slideData.section2_items) {
        $bulletChar = [char]0x2022
        $p = $t2.TextRange.Paragraphs($t2.TextRange.Paragraphs().Count)
        $p.Text = "$bulletChar " + $item + "`n`n"
        $p.Font.Name = "Segoe UI"
        $p.Font.Size = 10.5
        $p.Font.Color.RGB = $colorTextDark
    }


    # --- CARD 3: THÔNG ĐIỆP LAN TỎA & KHAI THÁC ---
    $c3 = $slide.Shapes.AddShape(1, $colLefts[2], $colTop, $colWidth, $colHeight)
    $c3.Fill.Solid()
    $c3.Fill.ForeColor.RGB = $colorCardBg
    $c3.Line.ForeColor.RGB = $colorCardBorder
    $c3.Line.Weight = 1.5

    # Card 3 Header Pill
    $c3Header = $slide.Shapes.AddShape(1, $colLefts[2] + 12, $colTop + 12, $colWidth - 24, 28)
    $c3Header.Fill.Solid()
    $c3Header.Fill.ForeColor.RGB = 0xE6F8F0 # Teal tint
    $c3Header.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $c3Header.TextFrame.TextRange.Text = $slideData.section3_title
    $c3Header.TextFrame.TextRange.Font.Name = "Segoe UI"
    $c3Header.TextFrame.TextRange.Font.Size = 10
    $c3Header.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $c3Header.TextFrame.TextRange.Font.Color.RGB = $colorTeal
    $c3Header.TextFrame.MarginLeft = 8; $c3Header.TextFrame.MarginTop = 6

    # Card 3 Content Body
    $c3Body = $slide.Shapes.AddTextbox(1, $colLefts[2] + 12, $colTop + 46, $colWidth - 24, $colHeight - 56)
    $t3 = $c3Body.TextFrame
    $t3.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $t3.MarginLeft = 4; $t3.MarginRight = 4; $t3.MarginTop = 4

    foreach ($item in $slideData.section3_items) {
        $bulletChar = [char]0x2022
        $p = $t3.TextRange.Paragraphs($t3.TextRange.Paragraphs().Count)
        $p.Text = "$bulletChar " + $item + "`n`n"
        $p.Font.Name = "Segoe UI"
        $p.Font.Size = 10.5
        $p.Font.Color.RGB = $colorTextDark
    }

    # 5. Bottom Executive Dark Footer
    $footerBox = $slide.Shapes.AddShape(1, 40, 486, 880, 36)
    $footerBox.Fill.Solid()
    $footerBox.Fill.ForeColor.RGB = $colorDarkBg
    $footerBox.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    $ft = $footerBox.TextFrame
    $ft.MarginLeft = 14; $ft.MarginTop = 8
    $pFoot = $ft.TextRange.Paragraphs(1)
    $pFoot.Text = $slideData.footer_text
    $pFoot.Font.Name = "Segoe UI"
    $pFoot.Font.Size = 9.5
    $pFoot.Font.Color.RGB = 0xFFFFFF
}

# Generate Slide 1 (Vietnamese) & Slide 2 (English)
Build-Executive-Slide $bilingualData.vi 1
Build-Executive-Slide $bilingualData.en 2

# Save & Overwrite PPTX
$pres.SaveAs($outputPath)
$pres.Close()
$pptx.Quit()

Write-Host "Successfully generated Executive Bilingual PowerPoint at: $outputPath"
