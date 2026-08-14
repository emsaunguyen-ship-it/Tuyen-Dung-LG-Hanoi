# PowerShell Script to automatically create 16:9 Widescreen PowerPoint Presentation
# Reading UTF-8 JSON data to prevent any Vietnamese character encoding corruption

$jsonPath = Join-Path $PSScriptRoot "slide_data.json"
$outputPath = Join-Path $PSScriptRoot "LG_Hanoi_AI_Story_Slide.pptx"

if (-not (Test-Path $jsonPath)) {
    Write-Error "Could not find slide_data.json at $jsonPath"
    exit 1
}

$data = Get-Content -Path $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

try {
    $pptx = New-Object -ComObject PowerPoint.Application
    $pptx.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
} catch {
    Write-Host "PowerPoint COM Object not available or PowerPoint is not installed. Will output clear PPTX structure & Markdown instructions."
    exit 0
}

# Create new presentation
$pres = $pptx.Presentations.Add([Microsoft.Office.Core.MsoTriState]::msoTrue)

# Set 16:9 Widescreen Dimensions (13.333 in x 7.5 in = 960 pt x 540 pt)
$pres.PageSetup.SlideWidth = 960
$pres.PageSetup.SlideHeight = 540

# Add a blank slide (ppLayoutBlank = 12)
$slide = $pres.Slides.Add(1, 12)

# Color Constants
$colorLgRed = 0x3400A5      # BGR for #A50034
$colorDark = 0x2A170F       # BGR for #0F172A
$colorCardBg = 0xFCFAF8     # BGR for #F8FAFC
$colorPurple = 0xED3A7C     # BGR for #7C3AED
$colorGrayBorder = 0xE0E0E0 # BGR for #E0E0E0

# 1. Top Brand Line (LG Red accent)
$line = $slide.Shapes.AddShape(1, 0, 0, 960, 6) # msoShapeRectangle = 1
$line.Fill.Solid()
$line.Fill.ForeColor.RGB = $colorLgRed
$line.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

# 2. Tag Badge
$tagBox = $slide.Shapes.AddTextbox(1, 40, 20, 500, 25)
$tagBox.TextFrame.TextRange.Text = $data.title_tag
$tagBox.TextFrame.TextRange.Font.Name = "Segoe UI"
$tagBox.TextFrame.TextRange.Font.Size = 11
$tagBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
$tagBox.TextFrame.TextRange.Font.Color.RGB = $colorPurple

# 3. Main Headline
$headBox = $slide.Shapes.AddTextbox(1, 40, 48, 880, 50)
$headBox.TextFrame.TextRange.Text = $data.headline
$headBox.TextFrame.TextRange.Font.Name = "Segoe UI"
$headBox.TextFrame.TextRange.Font.Size = 18
$headBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
$headBox.TextFrame.TextRange.Font.Color.RGB = $colorDark

# 4. Create 3 Columns Layout (Left: 40, 335, 630; Width: 285 each; Top: 110; Height: 350)
$colLefts = @(40, 337, 634)
$colWidth = 286
$colTop = 110
$colHeight = 360

# --- COLUMN 1: Bứt Phá Rào Cản ---
$card1 = $slide.Shapes.AddShape(1, $colLefts[0], $colTop, $colWidth, $colHeight)
$card1.Fill.Solid()
$card1.Fill.ForeColor.RGB = $colorCardBg
$card1.Line.ForeColor.RGB = $colorGrayBorder

$t1 = $card1.TextFrame
$t1.MarginLeft = 14; $t1.MarginRight = 14; $t1.MarginTop = 14; $t1.MarginBottom = 14
$p1 = $t1.TextRange.Paragraphs(1)
$p1.Text = $data.col1_title + "`n`n"
$p1.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
$p1.Font.Size = 14
$p1.Font.Color.RGB = 0x0677D9 # Amber/Gold accent

foreach ($item in $data.col1_items) {
    $bulletChar = [char]0x2022
    $p = $t1.TextRange.Paragraphs($t1.TextRange.Paragraphs().Count)
    $p.Text = "$bulletChar " + $item + "`n`n"
    $p.Font.Size = 11
    $p.Font.Color.RGB = $colorDark
}

# Quote Box in Col 1
$pQ = $t1.TextRange.Paragraphs($t1.TextRange.Paragraphs().Count)
$pQ.Text = "`n" + $data.col1_quote
$pQ.Font.Size = 10.5
$pQ.Font.Italic = [Microsoft.Office.Core.MsoTriState]::msoTrue
$pQ.Font.Color.RGB = 0x666666


# --- COLUMN 2: Phương Pháp Cùng AI ---
$card2 = $slide.Shapes.AddShape(1, $colLefts[1], $colTop, $colWidth, $colHeight)
$card2.Fill.Solid()
$card2.Fill.ForeColor.RGB = $colorCardBg
$card2.Line.ForeColor.RGB = $colorGrayBorder

$t2 = $card2.TextFrame
$t2.MarginLeft = 14; $t2.MarginRight = 14; $t2.MarginTop = 14; $t2.MarginBottom = 14
$p2 = $t2.TextRange.Paragraphs(1)
$p2.Text = $data.col2_title + "`n`n"
$p2.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
$p2.Font.Size = 14
$p2.Font.Color.RGB = $colorPurple

foreach ($item in $data.col2_items) {
    $bulletChar = [char]0x2022
    $p = $t2.TextRange.Paragraphs($t2.TextRange.Paragraphs().Count)
    $p.Text = "$bulletChar " + $item + "`n`n"
    $p.Font.Size = 11
    $p.Font.Color.RGB = $colorDark
}


# --- COLUMN 3: Lan Tỏa Đổi Mới ---
$card3 = $slide.Shapes.AddShape(1, $colLefts[2], $colTop, $colWidth, $colHeight)
$card3.Fill.Solid()
$card3.Fill.ForeColor.RGB = $colorCardBg
$card3.Line.ForeColor.RGB = $colorGrayBorder

$t3 = $card3.TextFrame
$t3.MarginLeft = 14; $t3.MarginRight = 14; $t3.MarginTop = 14; $t3.MarginBottom = 14
$p3 = $t3.TextRange.Paragraphs(1)
$p3.Text = $data.col3_title + "`n`n"
$p3.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
$p3.Font.Size = 14
$p3.Font.Color.RGB = 0xD84E1D # Blue accent

foreach ($item in $data.col3_items) {
    $p = $t3.TextRange.Paragraphs($t3.TextRange.Paragraphs().Count)
    $p.Text = $item + "`n`n"
    $p.Font.Size = 11
    $p.Font.Color.RGB = $colorDark
}

# 5. Footer Bar
$footerBox = $slide.Shapes.AddShape(1, 40, 485, 880, 36)
$footerBox.Fill.Solid()
$footerBox.Fill.ForeColor.RGB = $colorDark
$footerBox.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

$ft = $footerBox.TextFrame
$ft.MarginLeft = 12; $ft.MarginTop = 8
$pFoot = $ft.TextRange.Paragraphs(1)
$pFoot.Text = $data.footer_left + "   |   " + $data.live_url
$pFoot.Font.Size = 10
$pFoot.Font.Color.RGB = 0xFFFFFF

# Save and Close
$pres.SaveAs($outputPath)
$pres.Close()
$pptx.Quit()

Write-Host "Successfully generated PowerPoint slide at: $outputPath"
