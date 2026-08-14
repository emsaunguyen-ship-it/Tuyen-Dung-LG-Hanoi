# PowerShell Script to send email directly via LGE Corporate SMTP Gateway (lgesmtp.lge.com)

$smtpServer = "lgesmtp.lge.com"
$smtpPort = 25
$from = "lg.careers.hanoi@lge.com"
$to = "khanhthuy.nguyen@lge.com"
$subject = "[LG Careers & AI Innovation] Slide PowerPoint Báo Cáo Dự Án LG Hanoi Portal (Đầy Đủ 100% Chi Tiết)"
$attachmentPath = Join-Path $PSScriptRoot "LG_Hanoi_AI_Story_Slide_Bilingual.pptx"

$bodyText = @"
Kính gửi Chị Khánh Thuỷ (HR Department / LGE Vietnam),

Tôi xin gửi chị bản Slide PowerPoint Báo cáo Dự án Portal Tuyển dụng LG Hanoi (Song Ngữ Việt - Anh) đã hoàn thiện và cập nhật đầy đủ 100% nội dung chi tiết.

1) ÍCH LỢI AI DÀNH CHO NGƯỜI KHÔNG CHUYÊN (NON-TECH AI BENEFITS)
- Xóa bỏ rào cản kỹ thuật: Là Trưởng phòng Mua sắm (không chuyên IT), AI giúp tự tay biến ý tưởng trên giấy thành Website hoạt động thực tế (Live URL) mà không cần biết viết code.
- AI Co-pilot thực thi 100% logic: AI cùng thiết kế giao diện chuẩn nhận diện LG (Life's Good), viết code lọc vị trí tuyển dụng, nộp CV 1-click & tự động xuất báo cáo Excel cộng dồn.
- Bứt phá tốc độ thi hành (Execution Velocity): Hoàn thiện ứng dụng web tuyển dụng hoàn chỉnh chỉ trong vài giờ.
- Truyền cảm hứng Đổi mới (10-70-20): "AI không thay thế con người – AI chắp cánh cho những người chủ động cải tiến công việc."

2) GIỚI THIỆU DỰ ÁN PORTAL TUYỂN DỤNG LG HANOI (PROJECT OVERVIEW)
- Giải bài toán tuyển SVC khó khăn: Thay thế tin tuyển dụng văn bản khô khan bằng Cổng thông tin trực quan hiển thị hình ảnh môi trường & công việc kỹ thuật thực tế.
- Truyền thông văn hóa LG Insider: Tích hợp câu chuyện nhân sự, hình ảnh hoạt động sự kiện (Áo Dài Day, Family Day) tạo niềm tin cho ứng viên.
- Trải nghiệm Nộp CV 1-Click: Tối ưu mượt mà trên Mobile & Web, ứng viên ứng tuyển cực nhanh.
- Tự động hóa 100% HR Workflow: Tự động tổng hợp file Excel cộng dồn ứng viên, sync Google Sheets Webhook & phát email thông báo tức thì cho HR Manager.

======================================================================
🌐 Live Web Portal: https://emsaunguyen-ship-it.github.io/Tuyen-Dung-LG-Hanoi/?v=12
📎 File đính kèm: LG_Hanoi_AI_Story_Slide_Bilingual.pptx (Mở trực tiếp đầy đủ 100% chữ trên PowerPoint)

Trân trọng,
Trưởng phòng Mua sắm (Sales & Marketing) - LG Electronics Việt Nam
"@

try {
    Write-Host "Connecting to LGE SMTP server $smtpServer..."
    $smtp = New-Object System.Net.Mail.SmtpClient($smtpServer, $smtpPort)
    $smtp.Timeout = 10000

    $msg = New-Object System.Net.Mail.MailMessage($from, $to, $subject, $bodyText)
    $msg.IsBodyHtml = $false
    $msg.BodyEncoding = [System.Text.Encoding]::UTF8
    $msg.SubjectEncoding = [System.Text.Encoding]::UTF8

    if (Test-Path $attachmentPath) {
        $attachment = New-Object System.Net.Mail.Attachment($attachmentPath)
        $msg.Attachments.Add($attachment)
        Write-Host "Attached file: $attachmentPath"
    }

    $smtp.Send($msg)
    Write-Host "DIRECT_SMTP_SENT_SUCCESSFULLY_TO: $to"
} catch {
    Write-Host "SMTP_SEND_FAILED: $_"
}
