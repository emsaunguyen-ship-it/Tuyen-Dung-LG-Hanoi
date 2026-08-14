# PowerShell Script to generate a Soothing Executive McKinsey-style PowerPoint Presentation (2 Slides: Vietnamese & English)
# Featuring real project images in each card with STRICT 1:1 SQUARE ASPECT RATIO (ZERO DISTORTION/STRETCHING)
# Bright, Light Executive Aesthetic (No dark/black areas) & Presentation Bullet Language

$jsonPath = Join-Path $PSScriptRoot "slide_data_visual.json"
$outputPath = Join-Path $PSScriptRoot "LG_Hanoi_AI_Story_Slide_Bilingual.pptx"
$livePortalUrl = "https://emsaunguyen-ship-it.github.io/Tuyen-Dung-LG-Hanoi/?v=12"

if (-not (Test-Path $jsonPath)) {
    Write-Error "Could not find slide_data_visual.json at $jsonPath"
    exit 1
}

$visualData = Get-Content -Path $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json
$meta = $visualData.meta

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

# Color Constants (BGR Format for PowerPoint COM) - LIGHT EXECUTIVE PALETTE (NO DARK/BLACK)
$colorLgRed         = 0x3400A5   # #A50034 LG Red
$colorLightNav      = 0xFCFAF8   # #F8FAFC Light Slate Header
$colorLightBanner   = 0xF9F5F1   # #F1F5F9 Light Slate Gray Banner
$colorBannerBorder = 0xE2E8F0   # #E2E8F0 Banner Border
$colorCardBg        = 0xFFFFFF   # #FFFFFF Card Fill
$colorCardBorder    = 0xE2E8F0   # #E2E8F0 Card Border
$colorTextDark      = 0x0F172A   # #0F172A Primary Dark Slate Text
$colorTextMuted     = 0x695547   # #475569 Secondary Text

function Build-Visual-JobCard-Slide($cardList, $slideIndex, $isVietnamese) {
    $slide = $pres.Slides.Add($slideIndex, 12) # Layout blank = 12

    # -------------------------------------------------------------
    # 0. SLIDE BACKGROUND - SOFT CLEAN WHITE
    # -------------------------------------------------------------
    $slide.Background.Fill.Solid()
    $slide.Background.Fill.ForeColor.RGB = 0xFFFFFF

    # -------------------------------------------------------------
    # 1. TOP NAV BAR & ACCENT STRIP (LIGHT EXECUTIVE STYLE - NO DARK/BLACK)
    # -------------------------------------------------------------
    # Top 4pt LG Red Accent Strip
    $topStrip = $slide.Shapes.AddShape(1, 0, 0, 960, 4)
    $topStrip.Fill.Solid()
    $topStrip.Fill.ForeColor.RGB = $colorLgRed
    $topStrip.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    # Top Light Navigation Bar (Light Slate Background)
    $navBar = $slide.Shapes.AddShape(1, 0, 4, 960, 38)
    $navBar.Fill.Solid()
    $navBar.Fill.ForeColor.RGB = $colorLightNav
    $navBar.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    # Floating Slogan Sticker: "Life's Good."
    $stickerBox = $slide.Shapes.AddShape(1, 825, 10, 110, 26)
    $stickerBox.Fill.Solid()
    $stickerBox.Fill.ForeColor.RGB = $colorLgRed
    $stickerBox.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $stickerBox.TextFrame.TextRange.Text = "Life's Good."
    $stickerBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $stickerBox.TextFrame.TextRange.Font.Size = 11
    $stickerBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $stickerBox.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF
    $stickerBox.TextFrame.MarginLeft = 6; $stickerBox.TextFrame.MarginTop = 3
    $stickerBox.ActionSettings(1).Action = 7
    $stickerBox.ActionSettings(1).Hyperlink.Address = $livePortalUrl


    # -------------------------------------------------------------
    # 2. HERO BANNER (LIGHT & ELEGANT SLATE GRAY)
    # -------------------------------------------------------------
    $heroBox = $slide.Shapes.AddShape(1, 25, 46, 910, 50)
    $heroBox.Fill.Solid()
    $heroBox.Fill.ForeColor.RGB = $colorLightBanner
    $heroBox.Line.ForeColor.RGB = $colorBannerBorder
    $heroBox.Line.Weight = 1

    # Banner Title (Dark Slate Text with LG Red Accent)
    $hTitle = $slide.Shapes.AddTextbox(1, 35, 49, 890, 24)
    if ($isVietnamese) {
        $hTitle.TextFrame.TextRange.Text = $meta.vi_title
    } else {
        $hTitle.TextFrame.TextRange.Text = $meta.en_title
    }
    $hTitle.TextFrame.TextRange.Font.Name = "Segoe UI"
    $hTitle.TextFrame.TextRange.Font.Size = 13.5
    $hTitle.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $hTitle.TextFrame.TextRange.Font.Color.RGB = $colorTextDark

    # Banner Subtext
    $hSub = $slide.Shapes.AddTextbox(1, 35, 72, 890, 20)
    if ($isVietnamese) {
        $hSub.TextFrame.TextRange.Text = $meta.vi_sub
    } else {
        $hSub.TextFrame.TextRange.Text = $meta.en_sub
    }
    $hSub.TextFrame.TextRange.Font.Name = "Segoe UI"
    $hSub.TextFrame.TextRange.Font.Size = 9
    $hSub.TextFrame.TextRange.Font.Color.RGB = $colorTextMuted


    # -------------------------------------------------------------
    # 3. 2x2 GRID OF 4 VISUAL JOB CARDS (BULLET PRESENTATION STYLE)
    # -------------------------------------------------------------
    foreach ($card in $cardList) {
        $targetUrl = if ($card.url) { $card.url } else { $livePortalUrl }

        # Card Container Box WITH CLICKABLE HYPERLINK
        $cBox = $slide.Shapes.AddShape(1, $card.x, $card.y, $card.w, $card.h)
        $cBox.Fill.Solid()
        $cBox.Fill.ForeColor.RGB = $colorCardBg
        $cBox.Line.ForeColor.RGB = $colorCardBorder
        $cBox.Line.Weight = 1.5
        $cBox.ActionSettings(1).Action = 7
        $cBox.ActionSettings(1).Hyperlink.Address = $targetUrl

        # Left Column: Insert Image into 140x140 Container Space
        if (Test-Path $card.img) {
            $imgPic = $slide.Shapes.AddPicture($card.img, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoTrue, $card.x + 12, $card.y + 20, 140, 140)
            $imgPic.LockAspectRatio = [Microsoft.Office.Core.MsoTriState]::msoTrue
            $imgPic.ActionSettings(1).Action = 7
            $imgPic.ActionSettings(1).Hyperlink.Address = $targetUrl
        }

        # Right Column (Text Side, X = card.x + 162, Width = card.w - 172)
        $rightX = $card.x + 162
        $rightW = $card.w - 172

        # Top Category Pill Tag
        $pill = $slide.Shapes.AddShape(1, $rightX, $card.y + 10, 155, 20)
        $pill.Fill.Solid()
        $pill.Fill.ForeColor.RGB = [System.Convert]::ToInt32($card.pill_bg, 16)
        $pill.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
        $pill.TextFrame.TextRange.Text = $card.pill
        $pill.TextFrame.TextRange.Font.Name = "Segoe UI"
        $pill.TextFrame.TextRange.Font.Size = 8.5
        $pill.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $pill.TextFrame.TextRange.Font.Color.RGB = [System.Convert]::ToInt32($card.pill_fg, 16)
        $pill.TextFrame.MarginLeft = 6; $pill.TextFrame.MarginTop = 2
        $pill.ActionSettings(1).Action = 7
        $pill.ActionSettings(1).Hyperlink.Address = $targetUrl

        # Card Title
        $ctBox = $slide.Shapes.AddTextbox(1, $rightX, $card.y + 32, $rightW, 24)
        $ctBox.TextFrame.TextRange.Text = $card.title
        $ctBox.TextFrame.TextRange.Font.Name = "Segoe UI"
        $ctBox.TextFrame.TextRange.Font.Size = 10.5
        $ctBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $ctBox.TextFrame.TextRange.Font.Color.RGB = $colorTextDark

        # Card Body Text (Bullet Presentation Style)
        $cbBox = $slide.Shapes.AddTextbox(1, $rightX, $card.y + 55, $rightW, 90)
        $cbBox.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $cbBox.TextFrame.TextRange.Text = $card.text
        $cbBox.TextFrame.TextRange.Font.Name = "Segoe UI"
        $cbBox.TextFrame.TextRange.Font.Size = 8.5
        $cbBox.TextFrame.TextRange.Font.Color.RGB = 0x334155

        # Bottom Button Badge Tag WITH CLICKABLE HYPERLINK
        $btnBox = $slide.Shapes.AddShape(1, $rightX, $card.y + 148, 145, 20)
        $btnBox.Fill.Solid()
        $btnBox.Fill.ForeColor.RGB = [System.Convert]::ToInt32($card.btn_bg, 16)
        $btnBox.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
        $btnBox.TextFrame.TextRange.Text = $card.btn_text
        $btnBox.TextFrame.TextRange.Font.Name = "Segoe UI"
        $btnBox.TextFrame.TextRange.Font.Size = 8
        $btnBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $btnBox.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF
        $btnBox.TextFrame.MarginLeft = 8; $btnBox.TextFrame.MarginTop = 2
        $btnBox.ActionSettings(1).Action = 7
        $btnBox.ActionSettings(1).Hyperlink.Address = $targetUrl
    }


    # -------------------------------------------------------------
    # 4. BOTTOM WEB FOOTER BAR (LIGHT SLATE STYLE - NO DARK/BLACK)
    # -------------------------------------------------------------
    $footerBox = $slide.Shapes.AddShape(1, 0, 480, 960, 60)
    $footerBox.Fill.Solid()
    $footerBox.Fill.ForeColor.RGB = $colorLightNav
    $footerBox.Line.ForeColor.RGB = $colorCardBorder
    $footerBox.Line.Weight = 1

    $ftLeft = $slide.Shapes.AddTextbox(1, 25, 490, 480, 40)
    $ftLeft.TextFrame.TextRange.Text = "(C) LG Electronics Vietnam - Sales & Marketing Procurement`nAI Partner: Antigravity AI (Google DeepMind)"
    $ftLeft.TextFrame.TextRange.Font.Name = "Segoe UI"
    $ftLeft.TextFrame.TextRange.Font.Size = 9
    $ftLeft.TextFrame.TextRange.Font.Color.RGB = $colorTextMuted

    $ftRight = $slide.Shapes.AddShape(1, 560, 492, 375, 28)
    $ftRight.Fill.Solid()
    $ftRight.Fill.ForeColor.RGB = $colorLgRed
    $ftRight.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $ftRight.TextFrame.TextRange.Text = "Live Portal: https://emsaunguyen-ship-it.github.io/Tuyen-Dung-LG-Hanoi/?v=12"
    $ftRight.TextFrame.TextRange.Font.Name = "Segoe UI"
    $ftRight.TextFrame.TextRange.Font.Size = 9
    $ftRight.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $ftRight.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF
    $ftRight.TextFrame.MarginLeft = 10; $ftRight.TextFrame.MarginTop = 5
    $ftRight.ActionSettings(1).Action = 7
    $ftRight.ActionSettings(1).Hyperlink.Address = $livePortalUrl
}

# Build Slide 1 (Vietnamese) & Slide 2 (English)
Build-Visual-JobCard-Slide $visualData.vi 1 $true
Build-Visual-JobCard-Slide $visualData.en 2 $false

# Save & Overwrite PPTX
$pres.SaveAs($outputPath)
$pres.Close()
$pptx.Quit()

Write-Host "Successfully generated SOOTHING EXECUTIVE MCKINSEY-STYLE POWERPOINT DECK at: $outputPath"
