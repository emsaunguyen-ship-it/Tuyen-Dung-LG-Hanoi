try {
    Write-Output "Connecting to Outlook Application..."
    $Outlook = New-Object -ComObject Outlook.Application
    $Mail = $Outlook.CreateItem(0)

    $Mail.To = "khanhthuy.nguyen@lge.com"
    $Mail.CC = "emsau.nguyen@gmail.com"
    $Mail.Subject = "[LG Careers & AI] Slide Bao Cao Du An Portal Tuyen Dung LG Hanoi (Song Ngu Viet - Anh)"

    $bodyText = @"
Kính gửi Chị Khánh Thủy & Ban Giám Đốc,

Xin gửi file PowerPoint Báo cáo Dự án Portal Tuyển dụng LG Hanoi (Song Ngữ Tiếng Việt & Tiếng Anh) đã hoàn thiện đầy đủ với các cập nhật:

1. Logo LG Electronics chính thức chuẩn thương hiệu từ trang web LG.com/vn ở thanh Header.
2. Thẻ số 2 (Logic Building): Hình ảnh Góc Truyền Thông LG Vietnam, giải thích AI gợi ý tích hợp thông tin uy tín (Clip 30 năm & LG Insider).
3. Thẻ số 3 (SVC Service): Hình ảnh Hoạt động thực tế & Đào tạo KTV SVC, cập nhật 2 giải pháp tuyển dụng & video clip SVC Premier Care thu hút nhân lực.
4. Tỷ lệ hình ảnh vuông 1:1 cân đối, tuyệt đối không bị méo hình.
5. Hyperlink tương tác trực tiếp tới Live Web Portal trên tất cả các ảnh và nút bấm.

Đính kèm gồm 4 file:
- LG_Hanoi_AI_Story_Slide_Bilingual.pptx (Slide PowerPoint Song Ngữ)
- Trang_Web_Tuyen_Dung_LG_Hanoi_Offline.html (File Web Standalone Offline)
- slide_1_preview.png (Ảnh Preview Tiếng Việt)
- slide_2_preview.png (Ảnh Preview Tiếng Anh)

Trân trọng,
LG Sales & Marketing Procurement Team
"@

    $Mail.Body = $bodyText

    $f1 = "C:\Users\LG\Sau 1 AI\MTM báo cao\LG_Hanoi_AI_Story_Slide_Bilingual.pptx"
    $f2 = "C:\Users\LG\Sau 1 AI\MTM báo cao\Trang_Web_Tuyen_Dung_LG_Hanoi_Offline.html"
    $f3 = "C:\Users\LG\Sau 1 AI\MTM báo cao\slide_1_preview.png"
    $f4 = "C:\Users\LG\Sau 1 AI\MTM báo cao\slide_2_preview.png"

    if (Test-Path $f1) { $Mail.Attachments.Add($f1) }
    if (Test-Path $f2) { $Mail.Attachments.Add($f2) }
    if (Test-Path $f3) { $Mail.Attachments.Add($f3) }
    if (Test-Path $f4) { $Mail.Attachments.Add($f4) }

    $Mail.Send()
    Write-Output "SUCCESSFULLY_SENT_EMAIL_VIA_OUTLOOK"
} catch {
    Write-Output "OUTLOOK_COM_ERROR: $_"
}
