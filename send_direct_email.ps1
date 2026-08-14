# PowerShell Script to automatically send email directly with attachment via Outlook COM Object

$to = "khanhthuy.nguyen@lge.com"
$subject = "[LG Careers & AI Innovation] Slide Báo Cáo Dự Án Portal Tuyển Dụng LG Hanoi (Cập Nhật Bảng Màu Khung 4 Thẻ Multi-Color)"
$attachmentPath = Join-Path $PSScriptRoot "LG_Hanoi_AI_Story_Slide_Bilingual.pptx"

$bodyText = @"
Kính gửi Chị Khánh Thuỷ (HR Department / LGE Vietnam),

Tôi xin gửi chị bản Slide PowerPoint Báo cáo Dự án Portal Tuyển dụng LG Hanoi (Song Ngữ Việt - Anh) đã được khôi phục chuẩn dải màu 4 thẻ đa sắc (Tím, Xanh Dương, Đỏ LG, Xanh Lá) theo đúng nhận diện thương hiệu BI và phong cách báo cáo thị giác ban đầu.

TÓM TẮT 4 NỘI DUNG CHÍNH TRONG SLIDE:

1) BỨT PHÁ RÀO CẢN NON-TECH AI (Màu Tím Đột Phá)
- Vượt qua rào cản kỹ thuật: Là Trưởng phòng Mua sắm (không chuyên IT), nhờ sự hướng dẫn tận tình & kiên nhẫn của Mr. Bảo (người hướng dẫn lớp), tôi đã tự tay biến ý tưởng thành Website Portal chạy thực tế.

2) AI CO-PILOT LOGIC & GIAO DIỆN CHUẨN LG (Màu Xanh Dương Công Nghệ)
- Cùng AI thiết kế giao diện chuẩn nhận diện LG (Life's Good), lập trình bộ lọc vị trí tuyển dụng, nộp CV 1-click & tự động xuất báo cáo Excel cộng dồn cho HR. Hình ảnh trực quan sắc nét 1:1, 100% không méo hình.

3) GIẢI BÀI TOÁN TUYỂN DỤNG SVC (Màu Đỏ LG Nhiệt Huyết)
- Xuất phát từ phản hồi khó tuyển người của bộ phận SVC, đưa ra 2 Option chiến lược:
  + Option 1: Tích hợp thêm các nhà tuyển dụng khác trên thị trường để mở rộng nguồn ứng viên.
  + Option 2: LG tự chủ động đăng tuyển & tìm kiếm trực tiếp (In-house Sourcing) nhằm tăng thêm sự tin cậy.

4) HR AUTOMATION & KHO HOẠT ĐỘNG DOANH NGHIỆP (Màu Xanh Lá Tươi Mới)
- Tự động hóa 100% HR Workflow. Xây dựng Kho lưu trữ truyền thông (Media Content Hub) để HR dễ dàng đăng tải các hoạt động hàng ngày (daily activities), góc làm việc & văn hóa công ty giúp thu hút nhân tài.

======================================================================
🌐 Live Web Portal: https://emsaunguyen-ship-it.github.io/Tuyen-Dung-LG-Hanoi/?v=12
📎 File đính kèm: LG_Hanoi_AI_Story_Slide_Bilingual.pptx (Bản PowerPoint Widescreen 16:9)

Trân trọng,
Trưởng phòng Mua sắm (Sales & Marketing) - LG Electronics Việt Nam
"@

try {
    Write-Host "Connecting to Outlook COM Object..."
    $outlook = New-Object -ComObject Outlook.Application
    $mail = $outlook.CreateItem(0) # 0 = olMailItem
    $mail.To = $to
    $mail.Subject = $subject
    $mail.Body = $bodyText

    if (Test-Path $attachmentPath) {
        $mail.Attachments.Add($attachmentPath)
        Write-Host "Attached file: $attachmentPath"
    } else {
        Write-Warning "Attachment not found at: $attachmentPath"
    }

    $mail.Send()
    Write-Host "DIRECT_EMAIL_SENT_SUCCESSFULLY_TO: $to"
} catch {
    Write-Error "Failed to send email via Outlook COM: $_"
}

