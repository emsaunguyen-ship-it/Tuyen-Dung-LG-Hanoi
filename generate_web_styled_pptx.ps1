# PowerShell Script to generate a 2-Slide Widescreen PowerPoint Deck (Slide 1: Vietnamese, Slide 2: English)
# Styled strictly after the visual web UI design of https://emsaunguyen-ship-it.github.io/Tuyen-Dung-LG-Hanoi/?v=12

$jsonPath = Join-Path $PSScriptRoot "slide_data_exact.json"
$outputPath = Join-Path $PSScriptRoot "LG_Hanoi_AI_Story_Slide_Bilingual.pptx"

if (-not (Test-Path $jsonPath)) {
    Write-Error "Could not find slide_data_exact.json at $jsonPath"
    exit 1
}

$exactData = Get-Content -Path $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

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

# Color Constants (BGR Format for PowerPoint COM)
$colorLgRed       = 0x3400A5   # #A50034 LG Red
$colorDarkNav     = 0x2A170F   # #0F172A Dark Obsidian Header/Footer
$colorCardBg      = 0xFCFAF8   # #F8FAFC Light Card Background
$colorCardBorder  = 0xE2E8F0   # #E2E8F0 Glassmorphic Border
$colorPurple      = 0xED3A7C   # #7C3AED Accent Purple
$colorTextDark    = 0x1E170F   # #0F172A Primary Dark Text
$colorTextMuted   = 0x8B7464   # #64748B Secondary Gray Text
$colorBannerBg   = 0xF7F5FA   # Light Banner Tint

function Build-Web-Styled-Slide($slideData, $slideIndex) {
    $slide = $pres.Slides.Add($slideIndex, 12) # Layout blank = 12

    # -------------------------------------------------------------
    # 1. TOP NAV BAR (Mô phỏng Header Web LG Careers)
    # -------------------------------------------------------------
    $navBar = $slide.Shapes.AddShape(1, 0, 0, 960, 42) # Height = 42pt
    $navBar.Fill.Solid()
    $navBar.Fill.ForeColor.RGB = $colorDarkNav
    $navBar.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    # LG Logo Circle
    $logoCircle = $slide.Shapes.AddShape(9, 30, 8, 26, 26) # msoShapeOval = 9
    $logoCircle.Fill.Solid()
    $logoCircle.Fill.ForeColor.RGB = $colorLgRed
    $logoCircle.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $logoCircle.TextFrame.TextRange.Text = "LG"
    $logoCircle.TextFrame.TextRange.Font.Name = "Segoe UI"
    $logoCircle.TextFrame.TextRange.Font.Size = 11
    $logoCircle.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $logoCircle.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF

    # "Careers" Text next to Logo
    $brandText = $slide.Shapes.AddTextbox(1, 62, 9, 120, 24)
    $brandText.TextFrame.TextRange.Text = "Careers"
    $brandText.TextFrame.TextRange.Font.Name = "Segoe UI"
    $brandText.TextFrame.TextRange.Font.Size = 14
    $brandText.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $brandText.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF

    # Floating Slogan Sticker: "Life's Good." (Mô phỏng Sticker trên Web)
    $stickerBox = $slide.Shapes.AddShape(1, 820, 8, 110, 26)
    $stickerBox.Fill.Solid()
    $stickerBox.Fill.ForeColor.RGB = $colorLgRed
    $stickerBox.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $stickerBox.TextFrame.TextRange.Text = "Life's Good."
    $stickerBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $stickerBox.TextFrame.TextRange.Font.Size = 11
    $stickerBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $stickerBox.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF
    $stickerBox.TextFrame.MarginLeft = 6; $stickerBox.TextFrame.MarginTop = 3


    # -------------------------------------------------------------
    # 2. HERO SUB-HEADER BANNER (Mô phỏng Banner Hero Web)
    # -------------------------------------------------------------
    $heroBox = $slide.Shapes.AddShape(1, 30, 48, 900, 52)
    $heroBox.Fill.Solid()
    $heroBox.Fill.ForeColor.RGB = $colorBannerBg
    $heroBox.Line.ForeColor.RGB = $colorCardBorder

    # Tag Badge inside Hero
    $tagBadge = $slide.Shapes.AddShape(1, 40, 53, 360, 20)
    $tagBadge.Fill.Solid()
    $tagBadge.Fill.ForeColor.RGB = 0xFBE8F3
    $tagBadge.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $tagBadge.TextFrame.TextRange.Text = $slideData.title_tag
    $tagBadge.TextFrame.TextRange.Font.Name = "Segoe UI"
    $tagBadge.TextFrame.TextRange.Font.Size = 8.5
    $tagBadge.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $tagBadge.TextFrame.TextRange.Font.Color.RGB = $colorLgRed
    $tagBadge.TextFrame.MarginLeft = 6; $tagBadge.TextFrame.MarginTop = 2

    # Main Headline inside Hero
    $headBox = $slide.Shapes.AddTextbox(1, 40, 74, 880, 24)
    $headBox.TextFrame.TextRange.Text = $slideData.headline
    $headBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $headBox.TextFrame.TextRange.Font.Size = 14
    $headBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $headBox.TextFrame.TextRange.Font.Color.RGB = $colorTextDark


    # -------------------------------------------------------------
    # 3. SPLIT-SCREEN 2-CARD CONTAINERS (Mô phỏng Khung Job Cards Web)
    # -------------------------------------------------------------
    $cardWidth = 435
    $cardHeight = 372
    $cardTop = 108
    $left1 = 30
    $left2 = 495

    # --- CARD 1 (LEFT): PHẦN 1 - ÍCH LỢI AI NON-TECH ---
    $c1 = $slide.Shapes.AddShape(1, $left1, $cardTop, $cardWidth, $cardHeight)
    $c1.Fill.Solid()
    $c1.Fill.ForeColor.RGB = $colorCardBg
    $c1.Line.ForeColor.RGB = $colorCardBorder
    $c1.Line.Weight = 1.5

    # Card 1 Header Pill
    $c1Header = $slide.Shapes.AddShape(1, $left1 + 12, $cardTop + 10, $cardWidth - 24, 28)
    $c1Header.Fill.Solid()
    $c1Header.Fill.ForeColor.RGB = 0xFCE8F3 # Light Purple Tint
    $c1Header.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $c1Header.TextFrame.TextRange.Text = $slideData.part1_title
    $c1Header.TextFrame.TextRange.Font.Name = "Segoe UI"
    $c1Header.TextFrame.TextRange.Font.Size = 9.8
    $c1Header.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $c1Header.TextFrame.TextRange.Font.Color.RGB = $colorPurple
    $c1Header.TextFrame.MarginLeft = 6; $c1Header.TextFrame.MarginTop = 5

    # Card 1 Body Text (Load ALL bullet items together so none get overwritten!)
    $c1Body = $slide.Shapes.AddTextbox(1, $left1 + 12, $cardTop + 42, $cardWidth - 24, $cardHeight - 50)
    $t1 = $c1Body.TextFrame
    $t1.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $t1.MarginLeft = 4; $t1.MarginRight = 4; $t1.MarginTop = 4

    $bulletChar = [char]0x2022
    $fullText1 = ($slideData.part1_items | ForEach-Object { "$bulletChar $_" }) -join "`n`n"
    $t1.TextRange.Text = $fullText1
    $t1.TextRange.Font.Name = "Segoe UI"
    $t1.TextRange.Font.Size = 9.2
    $t1.TextRange.Font.Color.RGB = $colorTextDark


    # --- CARD 2 (RIGHT): PHẦN 2 - GIỚI THIỆU DỰ ÁN ---
    $c2 = $slide.Shapes.AddShape(1, $left2, $cardTop, $cardWidth, $cardHeight)
    $c2.Fill.Solid()
    $c2.Fill.ForeColor.RGB = $colorCardBg
    $c2.Line.ForeColor.RGB = $colorCardBorder
    $c2.Line.Weight = 1.5

    # Card 2 Header Pill
    $c2Header = $slide.Shapes.AddShape(1, $left2 + 12, $cardTop + 10, $cardWidth - 24, 28)
    $c2Header.Fill.Solid()
    $c2Header.Fill.ForeColor.RGB = 0xFBE8F3 # Soft LG Red Tint
    $c2Header.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $c2Header.TextFrame.TextRange.Text = $slideData.part2_title
    $c2Header.TextFrame.TextRange.Font.Name = "Segoe UI"
    $c2Header.TextFrame.TextRange.Font.Size = 9.8
    $c2Header.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $c2Header.TextFrame.TextRange.Font.Color.RGB = $colorLgRed
    $c2Header.TextFrame.MarginLeft = 6; $c2Header.TextFrame.MarginTop = 5

    # Card 2 Body Text (Load ALL bullet items together so none get overwritten!)
    $c2Body = $slide.Shapes.AddTextbox(1, $left2 + 12, $cardTop + 42, $cardWidth - 24, $cardHeight - 50)
    $t2 = $c2Body.TextFrame
    $t2.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $t2.MarginLeft = 4; $t2.MarginRight = 4; $t2.MarginTop = 4

    $fullText2 = ($slideData.part2_items | ForEach-Object { "$bulletChar $_" }) -join "`n`n"
    $t2.TextRange.Text = $fullText2
    $t2.TextRange.Font.Name = "Segoe UI"
    $t2.TextRange.Font.Size = 9.2
    $t2.TextRange.Font.Color.RGB = $colorTextDark


    # -------------------------------------------------------------
    # 4. BOTTOM WEB FOOTER BAR (Mô phỏng Footer Web LG)
    # -------------------------------------------------------------
    $footerBox = $slide.Shapes.AddShape(1, 0, 492, 960, 48)
    $footerBox.Fill.Solid()
    $footerBox.Fill.ForeColor.RGB = $colorDarkNav
    $footerBox.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    $ft = $footerBox.TextFrame
    $ft.MarginLeft = 30; $ft.MarginTop = 14
    $pFoot = $ft.TextRange.Paragraphs(1)
    $pFoot.Text = $slideData.footer_left + "   |   " + $slideData.live_url
    $pFoot.Font.Name = "Segoe UI"
    $pFoot.Font.Size = 9.5
    $pFoot.Font.Color.RGB = 0xFFFFFF
}

# Build Slide 1 (Vietnamese) & Slide 2 (English)
Build-Web-Styled-Slide $exactData.vi 1
Build-Web-Styled-Slide $exactData.en 2

# Save & Overwrite PPTX
$pres.SaveAs($outputPath)
$pres.Close()
$pptx.Quit()

Write-Host "Successfully generated WEB UI STYLED PowerPoint Deck at: $outputPath"
