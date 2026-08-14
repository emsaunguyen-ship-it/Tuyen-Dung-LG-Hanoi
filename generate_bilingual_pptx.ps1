# PowerShell Script to automatically create a 2-slide 16:9 PowerPoint Presentation (Slide 1: Tiếng Việt, Slide 2: English)

$jsonPath = Join-Path $PSScriptRoot "slide_data_bilingual.json"
$outputPath = Join-Path $PSScriptRoot "LG_Hanoi_AI_Story_Slide_Bilingual.pptx"

if (-not (Test-Path $jsonPath)) {
    Write-Error "Could not find slide_data_bilingual.json at $jsonPath"
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

# Function to build a single slide from a data object
function Build-Slide($slideObj, $slideNumber) {
    $slide = $pres.Slides.Add($slideNumber, 12)

    # Color Constants
    $colorLgRed = 0x3400A5      # BGR for #A50034
    $colorDark = 0x2A170F       # BGR for #0F172A
    $colorCardBg = 0xFCFAF8     # BGR for #F8FAFC
    $colorPurple = 0xED3A7C     # BGR for #7C3AED
    $colorGrayBorder = 0xE0E0E0 # BGR for #E0E0E0

    # 1. Top Brand Line
    $line = $slide.Shapes.AddShape(1, 0, 0, 960, 6)
    $line.Fill.Solid()
    $line.Fill.ForeColor.RGB = $colorLgRed
    $line.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    # 2. Tag Badge
    $tagBox = $slide.Shapes.AddTextbox(1, 40, 20, 500, 25)
    $tagBox.TextFrame.TextRange.Text = $slideObj.title_tag
    $tagBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $tagBox.TextFrame.TextRange.Font.Size = 11
    $tagBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $tagBox.TextFrame.TextRange.Font.Color.RGB = $colorPurple

    # 3. Main Headline
    $headBox = $slide.Shapes.AddTextbox(1, 40, 48, 880, 50)
    $headBox.TextFrame.TextRange.Text = $slideObj.headline
    $headBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $headBox.TextFrame.TextRange.Font.Size = 17
    $headBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $headBox.TextFrame.TextRange.Font.Color.RGB = $colorDark

    # 4. Columns Setup
    $colLefts = @(40, 337, 634)
    $colWidth = 286
    $colTop = 110
    $colHeight = 360

    # Column 1
    $card1 = $slide.Shapes.AddShape(1, $colLefts[0], $colTop, $colWidth, $colHeight)
    $card1.Fill.Solid()
    $card1.Fill.ForeColor.RGB = $colorCardBg
    $card1.Line.ForeColor.RGB = $colorGrayBorder

    $t1 = $card1.TextFrame
    $t1.MarginLeft = 14; $t1.MarginRight = 14; $t1.MarginTop = 14; $t1.MarginBottom = 14
    $p1 = $t1.TextRange.Paragraphs(1)
    $p1.Text = $slideObj.col1_title + "`n`n"
    $p1.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $p1.Font.Size = 13.5
    $p1.Font.Color.RGB = 0x0677D9

    foreach ($item in $slideObj.col1_items) {
        $bulletChar = [char]0x2022
        $p = $t1.TextRange.Paragraphs($t1.TextRange.Paragraphs().Count)
        $p.Text = "$bulletChar " + $item + "`n`n"
        $p.Font.Size = 11
        $p.Font.Color.RGB = $colorDark
    }

    $pQ = $t1.TextRange.Paragraphs($t1.TextRange.Paragraphs().Count)
    $pQ.Text = "`n" + $slideObj.col1_quote
    $pQ.Font.Size = 10
    $pQ.Font.Italic = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $pQ.Font.Color.RGB = 0x666666

    # Column 2
    $card2 = $slide.Shapes.AddShape(1, $colLefts[1], $colTop, $colWidth, $colHeight)
    $card2.Fill.Solid()
    $card2.Fill.ForeColor.RGB = $colorCardBg
    $card2.Line.ForeColor.RGB = $colorGrayBorder

    $t2 = $card2.TextFrame
    $t2.MarginLeft = 14; $t2.MarginRight = 14; $t2.MarginTop = 14; $t2.MarginBottom = 14
    $p2 = $t2.TextRange.Paragraphs(1)
    $p2.Text = $slideObj.col2_title + "`n`n"
    $p2.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $p2.Font.Size = 13.5
    $p2.Font.Color.RGB = $colorPurple

    foreach ($item in $slideObj.col2_items) {
        $bulletChar = [char]0x2022
        $p = $t2.TextRange.Paragraphs($t2.TextRange.Paragraphs().Count)
        $p.Text = "$bulletChar " + $item + "`n`n"
        $p.Font.Size = 11
        $p.Font.Color.RGB = $colorDark
    }

    # Column 3
    $card3 = $slide.Shapes.AddShape(1, $colLefts[2], $colTop, $colWidth, $colHeight)
    $card3.Fill.Solid()
    $card3.Fill.ForeColor.RGB = $colorCardBg
    $card3.Line.ForeColor.RGB = $colorGrayBorder

    $t3 = $card3.TextFrame
    $t3.MarginLeft = 14; $t3.MarginRight = 14; $t3.MarginTop = 14; $t3.MarginBottom = 14
    $p3 = $t3.TextRange.Paragraphs(1)
    $p3.Text = $slideObj.col3_title + "`n`n"
    $p3.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $p3.Font.Size = 13.5
    $p3.Font.Color.RGB = 0xD84E1D

    foreach ($item in $slideObj.col3_items) {
        $p = $t3.TextRange.Paragraphs($t3.TextRange.Paragraphs().Count)
        $p.Text = $item + "`n`n"
        $p.Font.Size = 11
        $p.Font.Color.RGB = $colorDark
    }

    # Footer Bar
    $footerBox = $slide.Shapes.AddShape(1, 40, 485, 880, 36)
    $footerBox.Fill.Solid()
    $footerBox.Fill.ForeColor.RGB = $colorDark
    $footerBox.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    $ft = $footerBox.TextFrame
    $ft.MarginLeft = 12; $ft.MarginTop = 8
    $pFoot = $ft.TextRange.Paragraphs(1)
    $pFoot.Text = $slideObj.footer_left + "   |   " + $slideObj.live_url
    $pFoot.Font.Size = 9.5
    $pFoot.Font.Color.RGB = 0xFFFFFF
}

# Build Slide 1 (Vietnamese) & Slide 2 (English)
Build-Slide $bilingualData.vi 1
Build-Slide $bilingualData.en 2

# Save and Close
$pres.SaveAs($outputPath)
$pres.Close()
$pptx.Quit()

Write-Host "Successfully generated Bilingual PowerPoint slide at: $outputPath"
