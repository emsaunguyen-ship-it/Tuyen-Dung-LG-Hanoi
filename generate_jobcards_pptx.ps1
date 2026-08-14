# PowerShell Script to generate a 2-Slide Widescreen PowerPoint Deck (Slide 1: Tiếng Việt, Slide 2: English)
# Styled with a rich Hero Banner and a 2x2 Grid of 4 Individual Job Card Containers matching the Web App UI

$jsonPath = Join-Path $PSScriptRoot "slide_data_4cards.json"
$outputPath = Join-Path $PSScriptRoot "LG_Hanoi_AI_Story_Slide_Bilingual.pptx"

if (-not (Test-Path $jsonPath)) {
    Write-Error "Could not find slide_data_4cards.json at $jsonPath"
    exit 1
}

$cardsData = Get-Content -Path $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

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
$colorDarkNav     = 0x2A170F   # #0F172A Dark Obsidian
$colorDarkBanner  = 0x3B291E   # #1E293B Dark Slate Banner
$colorCardBg      = 0xFFFFFF   # #FFFFFF Pristine White Card Fill
$colorCardBorder  = 0xE2E8F0   # #E2E8F0 Border
$colorTextDark    = 0x1E170F   # #0F172A Primary Dark Text

function Build-Web-JobCard-Slide($cardList, $slideIndex, $isVietnamese) {
    $slide = $pres.Slides.Add($slideIndex, 12) # Layout blank = 12

    # -------------------------------------------------------------
    # 1. TOP NAV BAR (Mô phỏng Navigation Bar Website)
    # -------------------------------------------------------------
    $navBar = $slide.Shapes.AddShape(1, 0, 0, 960, 40)
    $navBar.Fill.Solid()
    $navBar.Fill.ForeColor.RGB = $colorDarkNav
    $navBar.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    # LG Logo Circle
    $logoCircle = $slide.Shapes.AddShape(9, 25, 7, 26, 26)
    $logoCircle.Fill.Solid()
    $logoCircle.Fill.ForeColor.RGB = $colorLgRed
    $logoCircle.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $logoCircle.TextFrame.TextRange.Text = "LG"
    $logoCircle.TextFrame.TextRange.Font.Name = "Segoe UI"
    $logoCircle.TextFrame.TextRange.Font.Size = 11
    $logoCircle.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $logoCircle.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF

    # "Careers" Text
    $brandText = $slide.Shapes.AddTextbox(1, 56, 8, 120, 24)
    $brandText.TextFrame.TextRange.Text = "Careers"
    $brandText.TextFrame.TextRange.Font.Name = "Segoe UI"
    $brandText.TextFrame.TextRange.Font.Size = 14
    $brandText.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $brandText.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF

    # Floating Slogan Sticker: "Life's Good."
    $stickerBox = $slide.Shapes.AddShape(1, 825, 7, 110, 26)
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
    # 2. HERO BANNER (Mô phỏng Cover Hero Banner trên Web)
    # -------------------------------------------------------------
    $heroBox = $slide.Shapes.AddShape(1, 25, 46, 910, 58)
    $heroBox.Fill.Solid()
    $heroBox.Fill.ForeColor.RGB = $colorDarkBanner
    $heroBox.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    # Banner Title
    $hTitle = $slide.Shapes.AddTextbox(1, 35, 50, 890, 26)
    if ($isVietnamese) {
        $hTitle.TextFrame.TextRange.Text = "Ứng Dụng AI Cho Người Không Chuyên & Giới Thiệu Dự Án Portal Tuyển Dụng LG Hanoi"
    } else {
        $hTitle.TextFrame.TextRange.Text = "AI Benefits for Non-Tech Professionals & LG Hanoi Talent Portal Overview"
    }
    $hTitle.TextFrame.TextRange.Font.Name = "Segoe UI"
    $hTitle.TextFrame.TextRange.Font.Size = 14.5
    $hTitle.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $hTitle.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF

    # Banner Subtext
    $hSub = $slide.Shapes.AddTextbox(1, 35, 76, 890, 22)
    if ($isVietnamese) {
        $hSub.TextFrame.TextRange.Text = "⚡ Tự động hóa 100% HR Workflow • Trải nghiệm nộp CV 1-Click • Nhận diện thương hiệu chuẩn LG Electronics"
    } else {
        $hSub.TextFrame.TextRange.Text = "⚡ 100% HR Workflow Automation • 1-Click Candidate Apply • Standard LG Electronics Brand Identity"
    }
    $hSub.TextFrame.TextRange.Font.Name = "Segoe UI"
    $hSub.TextFrame.TextRange.Font.Size = 9.5
    $hSub.TextFrame.TextRange.Font.Color.RGB = 0xD0D8E8


    # -------------------------------------------------------------
    # 3. 2x2 GRID OF 4 INDIVIDUAL JOB CARD CONTAINERS
    # -------------------------------------------------------------
    foreach ($card in $cardList) {
        # Card Container Shape
        $cBox = $slide.Shapes.AddShape(1, $card.x, $card.y, $card.w, $card.h)
        $cBox.Fill.Solid()
        $cBox.Fill.ForeColor.RGB = $colorCardBg
        $cBox.Line.ForeColor.RGB = $colorCardBorder
        $cBox.Line.Weight = 1.5

        # Top Category Pill Tag
        $pill = $slide.Shapes.AddShape(1, $card.x + 12, $card.y + 10, 160, 20)
        $pill.Fill.Solid()
        $pill.Fill.ForeColor.RGB = [System.Convert]::ToInt32($card.pill_bg, 16)
        $pill.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
        $pill.TextFrame.TextRange.Text = $card.pill
        $pill.TextFrame.TextRange.Font.Name = "Segoe UI"
        $pill.TextFrame.TextRange.Font.Size = 8.5
        $pill.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $pill.TextFrame.TextRange.Font.Color.RGB = [System.Convert]::ToInt32($card.pill_fg, 16)
        $pill.TextFrame.MarginLeft = 6; $pill.TextFrame.MarginTop = 2

        # Card Title
        $ctBox = $slide.Shapes.AddTextbox(1, $card.x + 12, $card.y + 34, $card.w - 24, 24)
        $ctBox.TextFrame.TextRange.Text = $card.title
        $ctBox.TextFrame.TextRange.Font.Name = "Segoe UI"
        $ctBox.TextFrame.TextRange.Font.Size = 11.5
        $ctBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $ctBox.TextFrame.TextRange.Font.Color.RGB = $colorTextDark

        # Card Body Text
        $cbBox = $slide.Shapes.AddTextbox(1, $card.x + 12, $card.y + 58, $card.w - 24, 82)
        $cbBox.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $cbBox.TextFrame.TextRange.Text = $card.text
        $cbBox.TextFrame.TextRange.Font.Name = "Segoe UI"
        $cbBox.TextFrame.TextRange.Font.Size = 9.2
        $cbBox.TextFrame.TextRange.Font.Color.RGB = 0x334155

        # Bottom Button Badge (Mô phỏng Nút 'Ứng Tuyển / Xem Chi Tiết' trên Web Card)
        $btnBox = $slide.Shapes.AddShape(1, $card.x + 12, $card.y + 144, 150, 22)
        $btnBox.Fill.Solid()
        $btnBox.Fill.ForeColor.RGB = [System.Convert]::ToInt32($card.btn_bg, 16)
        $btnBox.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
        $btnBox.TextFrame.TextRange.Text = $card.btn_text
        $btnBox.TextFrame.TextRange.Font.Name = "Segoe UI"
        $btnBox.TextFrame.TextRange.Font.Size = 8.5
        $btnBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $btnBox.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF
        $btnBox.TextFrame.MarginLeft = 8; $btnBox.TextFrame.MarginTop = 3
    }


    # -------------------------------------------------------------
    # 4. BOTTOM WEB FOOTER BAR (Mô phỏng Footer Web LG)
    # -------------------------------------------------------------
    $footerBox = $slide.Shapes.AddShape(1, 0, 485, 960, 55)
    $footerBox.Fill.Solid()
    $footerBox.Fill.ForeColor.RGB = $colorDarkNav
    $footerBox.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    $ftLeft = $slide.Shapes.AddTextbox(1, 25, 495, 450, 30)
    $ftLeft.TextFrame.TextRange.Text = "© LG Electronics Vietnam • Sales & Marketing Procurement\nAI Partner: Antigravity AI (Google DeepMind)"
    $ftLeft.TextFrame.TextRange.Font.Name = "Segoe UI"
    $ftLeft.TextFrame.TextRange.Font.Size = 9
    $ftLeft.TextFrame.TextRange.Font.Color.RGB = 0x94A3B8

    $ftRight = $slide.Shapes.AddShape(1, 580, 498, 355, 28)
    $ftRight.Fill.Solid()
    $ftRight.Fill.ForeColor.RGB = $colorLgRed
    $ftRight.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $ftRight.TextFrame.TextRange.Text = "🌐 Live Portal: https://emsaunguyen-ship-it.github.io/Tuyen-Dung-LG-Hanoi/?v=12"
    $ftRight.TextFrame.TextRange.Font.Name = "Segoe UI"
    $ftRight.TextFrame.TextRange.Font.Size = 9.5
    $ftRight.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $ftRight.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF
    $ftRight.TextFrame.MarginLeft = 10; $ftRight.TextFrame.MarginTop = 5
}

# Build Slide 1 (Vietnamese) & Slide 2 (English)
Build-Web-JobCard-Slide $cardsData.vi 1 $true
Build-Web-JobCard-Slide $cardsData.en 2 $false

# Save & Overwrite PPTX
$pres.SaveAs($outputPath)
$pres.Close()
$pptx.Quit()

Write-Host "Successfully generated RICH 4-CARD WEB UI PowerPoint Deck at: $outputPath"
