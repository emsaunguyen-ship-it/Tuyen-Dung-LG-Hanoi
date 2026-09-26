# System.Text.Encoding UTF-8 script to generate exact PowerPoint presentation
$psCode = @'
$outputPath1 = "C:\Users\LG\Sau 1 AI\MTM báo cao\LG_Hanoi_Recruitment_Portal_Slide_Exact.pptx"
$outputPath2 = "C:\Users\LG\Sau 1 AI\Làm trang web tuyên dung\LG_Hanoi_Recruitment_Portal_Slide_Exact.pptx"
$imgDir = "C:\Users\LG\Sau 1 AI\Làm trang web tuyên dung"

$imgPortal = Join-Path $imgDir "lg_hero_cover.png"
$imgDash   = Join-Path $imgDir "user_ui_dashboard.png"

try {
    $pptx = New-Object -ComObject PowerPoint.Application
    $pptx.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
} catch {
    Write-Host "PowerPoint COM Object not available."
    exit 1
}

# Widescreen 16:9 (960 pt x 540 pt)
$pres = $pptx.Presentations.Add([Microsoft.Office.Core.MsoTriState]::msoTrue)
$pres.PageSetup.SlideWidth = 960
$pres.PageSetup.SlideHeight = 540

# Color Constants (BGR Format for PowerPoint COM)
$colorLgRed      = 0x3400A5   # #A50034 LG Red Crimson
$colorWhite      = 0xFFFFFF   # #FFFFFF
$colorCardBg     = 0xF8FAFC   # #FCFAF8 Light Gray Background
$colorCardBorder = 0xE2E8F0   # #E2E8F0 Border Color
$colorTextDark   = 0x0F172A   # #2A170F Dark Text
$colorTextMuted  = 0x64748B   # #8B7464 Muted Text

function Build-Exact-Slide-Deck($isVietnamese, $slideIndex) {
    $slide = $pres.Slides.Add($slideIndex, 12) # Layout 12 = Blank

    # Set background white
    $slide.Background.Fill.Solid()
    $slide.Background.Fill.ForeColor.RGB = $colorWhite

    # =========================================================================
    # 1. LEFT RED COLUMN (CRIMSON #A50034)
    # =========================================================================
    $leftCol = $slide.Shapes.AddShape(1, 0, 0, 360, 540) # 1 = Rectangle
    $leftCol.Fill.Solid()
    $leftCol.Fill.ForeColor.RGB = $colorLgRed
    $leftCol.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

    # 1.1 Badge: AI INNOVATION STORY
    $badge = $slide.Shapes.AddTextbox(1, 40, 55, 280, 24)
    $badge.TextFrame.TextRange.Text = "A I   I N N O V A T I O N   S T O R Y"
    $badge.TextFrame.TextRange.Font.Name = "Segoe UI"
    $badge.TextFrame.TextRange.Font.Size = 9.5
    $badge.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $badge.TextFrame.TextRange.Font.Color.RGB = 0xE0E0E0

    # 1.2 Main Title
    $titleBox = $slide.Shapes.AddTextbox(1, 38, 90, 290, 95)
    $titleBox.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    if ($isVietnamese) {
        $titleBox.TextFrame.TextRange.Text = "Portal Tuyển Dụng`nLG Hà Nội"
    } else {
        $titleBox.TextFrame.TextRange.Text = "LG Hanoi`nRecruitment Portal"
    }
    $titleBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $titleBox.TextFrame.TextRange.Font.Size = 25
    $titleBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $titleBox.TextFrame.TextRange.Font.Color.RGB = $colorWhite

    # 1.3 Subtitle
    $subBox = $slide.Shapes.AddTextbox(1, 38, 195, 290, 48)
    $subBox.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    if ($isVietnamese) {
        $subBox.TextFrame.TextRange.Text = "Từ ý tưởng đến sản phẩm thật, chỉ trong nửa ngày - cùng AI."
    } else {
        $subBox.TextFrame.TextRange.Text = "From idea to live product in just half a day - powered by AI."
    }
    $subBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $subBox.TextFrame.TextRange.Font.Size = 12
    $subBox.TextFrame.TextRange.Font.Italic = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $subBox.TextFrame.TextRange.Font.Color.RGB = 0xF5F5F5

    # 1.4 Author Details
    $authorBox = $slide.Shapes.AddTextbox(1, 38, 252, 290, 52)
    $authorBox.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    if ($isVietnamese) {
        $authorBox.TextFrame.TextRange.Text = "Xây dựng bởi: Trưởng phòng Mua sắm (Non-Tech)`nĐồng hành cùng: Mr. Bảo - AI Coach"
    } else {
        $authorBox.TextFrame.TextRange.Text = "Built by: Purchasing Manager (Non-Tech)`nCoached by: Mr. Bao - AI Coach"
    }
    $authorBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $authorBox.TextFrame.TextRange.Font.Size = 9.5
    $authorBox.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF

    # 1.5 Link Pill Button
    $linkBtn = $slide.Shapes.AddShape(5, 38, 315, 284, 32) # 5 = Rounded Rectangle
    $linkBtn.Fill.Solid()
    $linkBtn.Fill.ForeColor.RGB = $colorWhite
    $linkBtn.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $linkBtn.TextFrame.TextRange.Text = "emsaunguyen-ship-it.github.io/Tuyen-Dung-LG-Hanoi"
    $linkBtn.TextFrame.TextRange.Font.Name = "Segoe UI"
    $linkBtn.TextFrame.TextRange.Font.Size = 8.5
    $linkBtn.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $linkBtn.TextFrame.TextRange.Font.Color.RGB = $colorLgRed
    $linkBtn.TextFrame.MarginLeft = 10; $linkBtn.TextFrame.MarginTop = 6
    $linkBtn.ActionSettings(1).Action = 7
    $linkBtn.ActionSettings(1).Hyperlink.Address = "https://emsaunguyen-ship-it.github.io/Tuyen-Dung-LG-Hanoi/"

    # 1.6 Quote Box
    $quoteBox = $slide.Shapes.AddTextbox(1, 38, 395, 290, 90)
    $quoteBox.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    if ($isVietnamese) {
        $quoteBox.TextFrame.TextRange.Text = '"AI không thay thế con người -`nAI chắp cánh cho người không chuyên`nbiến ý tưởng thành hiện thực."'
    } else {
        $quoteBox.TextFrame.TextRange.Text = '"AI does not replace humans -`nAI empowers non-tech professionals`nto turn ideas into reality."'
    }
    $quoteBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $quoteBox.TextFrame.TextRange.Font.Size = 10.5
    $quoteBox.TextFrame.TextRange.Font.Italic = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $quoteBox.TextFrame.TextRange.Font.Color.RGB = 0xFFFFFF


    # =========================================================================
    # 2. RIGHT WHITE AREA
    # =========================================================================

    # 2.1 Section Header
    $headerBox = $slide.Shapes.AddTextbox(1, 395, 30, 530, 24)
    if ($isVietnamese) {
        $headerBox.TextFrame.TextRange.Text = "G I A O   D I Ệ N   T H Ự C   T Ế   T R Ê N   W E B S I T E"
    } else {
        $headerBox.TextFrame.TextRange.Text = "L I V E   W E B S I T E   I N T E R F A C E"
    }
    $headerBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $headerBox.TextFrame.TextRange.Font.Size = 11
    $headerBox.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $headerBox.TextFrame.TextRange.Font.Color.RGB = $colorLgRed

    # 2.2 Visual Mockups Frame 1 (Main Portal) & Frame 2 (Dashboard)
    if (Test-Path $imgPortal) {
        $mock1 = $slide.Shapes.AddPicture($imgPortal, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoTrue, 395, 62, 290, 185)
        $mock1.Line.ForeColor.RGB = $colorCardBorder
        $mock1.Line.Weight = 1
    }
    $cap1 = $slide.Shapes.AddTextbox(1, 395, 252, 290, 24)
    if ($isVietnamese) {
        $cap1.TextFrame.TextRange.Text = "Trang tuyển dụng - tìm & ứng tuyển 1-click"
    } else {
        $cap1.TextFrame.TextRange.Text = "Recruitment portal - 1-click search & apply"
    }
    $cap1.TextFrame.TextRange.Font.Name = "Segoe UI"
    $cap1.TextFrame.TextRange.Font.Size = 8.5
    $cap1.TextFrame.TextRange.Font.Color.RGB = $colorTextMuted

    if (Test-Path $imgDash) {
        $mock2 = $slide.Shapes.AddPicture($imgDash, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoTrue, 700, 62, 225, 142)
        $mock2.Line.ForeColor.RGB = $colorCardBorder
        $mock2.Line.Weight = 1
    }
    $cap2 = $slide.Shapes.AddTextbox(1, 700, 210, 225, 45)
    $cap2.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
    if ($isVietnamese) {
        $cap2.TextFrame.TextRange.Text = "Dashboard tự động đồng bộ Google Sheets, báo cáo real-time cho HR."
    } else {
        $cap2.TextFrame.TextRange.Text = "Automated HR Dashboard synced with Google Sheets for real-time reporting."
    }
    $cap2.TextFrame.TextRange.Font.Name = "Segoe UI"
    $cap2.TextFrame.TextRange.Font.Size = 8.5
    $cap2.TextFrame.TextRange.Font.Color.RGB = $colorTextMuted


    # 2.3 4 Pillar Feature Cards (Bottom Grid: 4 Vertical Cards)
    $cardItemsVi = @(
        @{ num = "01"; title = "Giải bài toán tuyển SVC"; sub = "2 kênh song song: Agency thị trường + LG tự đăng tuyển trực tiếp" },
        @{ num = "02"; title = "1-Click Apply"; sub = "Lọc việc & nộp CV nhanh, chuẩn nhận diện thương hiệu LG" },
        @{ num = "03"; title = "Tự động hóa HR"; sub = "Tự tổng hợp Excel & gửi email real-time cho HR Manager" },
        @{ num = "04"; title = "Content Hub"; sub = "Cập nhật hoạt động công ty hàng ngày, thu hút nhân tài" }
    )

    $cardItemsEn = @(
        @{ num = "01"; title = "SVC Hiring Solution"; sub = "Dual-channel: Market Agency + LG direct recruitment portal" },
        @{ num = "02"; title = "1-Click Apply"; sub = "Fast job filter & CV submission aligned with LG brand identity" },
        @{ num = "03"; title = "HR Automation"; sub = "Auto-sync data to Excel & trigger real-time email alerts to HR" },
        @{ num = "04"; title = "Content Hub"; sub = "Daily corporate activity updates to attract top talent" }
    )

    $cards = if ($isVietnamese) { $cardItemsVi } else { $cardItemsEn }
    $startLeft = 395
    $cardWidth = 125
    $gap = 10
    $cardTop = 300
    $cardHeight = 175

    for ($i = 0; $i -lt 4; $i++) {
        $item = $cards[$i]
        $curLeft = $startLeft + ($i * ($cardWidth + $gap))

        # Card Container (Rounded Rectangle)
        $cBox = $slide.Shapes.AddShape(5, $curLeft, $cardTop, $cardWidth, $cardHeight)
        $cBox.Fill.Solid()
        $cBox.Fill.ForeColor.RGB = $colorCardBg
        $cBox.Line.ForeColor.RGB = $colorCardBorder
        $cBox.Line.Weight = 1.2

        # Circle Badge Number (01, 02, 03, 04)
        $badgeCircle = $slide.Shapes.AddShape(9, $curLeft + ($cardWidth / 2) - 18, $cardTop + 14, 36, 36) # 9 = Oval
        $badgeCircle.Fill.Solid()
        $badgeCircle.Fill.ForeColor.RGB = $colorLgRed
        $badgeCircle.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
        $badgeCircle.TextFrame.TextRange.Text = $item.num
        $badgeCircle.TextFrame.TextRange.Font.Name = "Segoe UI"
        $badgeCircle.TextFrame.TextRange.Font.Size = 12
        $badgeCircle.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $badgeCircle.TextFrame.TextRange.Font.Color.RGB = $colorWhite
        $badgeCircle.TextFrame.MarginLeft = 0; $badgeCircle.TextFrame.MarginTop = 6

        # Card Title
        $ct = $slide.Shapes.AddTextbox(1, $curLeft + 4, $cardTop + 58, $cardWidth - 8, 30)
        $ct.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $ct.TextFrame.TextRange.Text = $item.title
        $ct.TextFrame.TextRange.Font.Name = "Segoe UI"
        $ct.TextFrame.TextRange.Font.Size = 10
        $ct.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $ct.TextFrame.TextRange.Font.Color.RGB = $colorTextDark
        $ct.TextFrame.TextRange.ParagraphFormat.Alignment = 2 # Center

        # Card Subtext
        $cs = $slide.Shapes.AddTextbox(1, $curLeft + 6, $cardTop + 92, $cardWidth - 12, 75)
        $cs.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $cs.TextFrame.TextRange.Text = $item.sub
        $cs.TextFrame.TextRange.Font.Name = "Segoe UI"
        $cs.TextFrame.TextRange.Font.Size = 8
        $cs.TextFrame.TextRange.Font.Color.RGB = $colorTextMuted
        $cs.TextFrame.TextRange.ParagraphFormat.Alignment = 2 # Center
    }


    # 2.4 Footer Text
    $ftBox = $slide.Shapes.AddTextbox(1, 395, 495, 530, 25)
    if ($isVietnamese) {
        $ftBox.TextFrame.TextRange.Text = "LG Careers Hanoi Portal - Sản phẩm thực tế được xây dựng 100% bằng AI, bởi một nhân sự không chuyên IT."
    } else {
        $ftBox.TextFrame.TextRange.Text = "LG Careers Hanoi Portal - A real live product built 100% with AI by a non-IT professional."
    }
    $ftBox.TextFrame.TextRange.Font.Name = "Segoe UI"
    $ftBox.TextFrame.TextRange.Font.Size = 8.5
    $ftBox.TextFrame.TextRange.Font.Italic = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $ftBox.TextFrame.TextRange.Font.Color.RGB = $colorTextMuted
}

# Generate Slide 1 (Vietnamese) & Slide 2 (English)
Build-Exact-Slide-Deck $true 1
Build-Exact-Slide-Deck $false 2

# Save to both workspace paths
$pres.SaveAs($outputPath1)
$pres.SaveAs($outputPath2)
$pres.Close()
$pptx.Quit()

Write-Host "SUCCESSFULLY GENERATED EXACT POWERPOINT PRESENTATION AT:`n$outputPath1`n$outputPath2"
'@

[System.IO.File]::WriteAllText("c:\Users\LG\Sau 1 AI\Làm trang web tuyên dung\create_exact_slide_pptx.ps1", $psCode, [System.Text.Encoding]::UTF8)
