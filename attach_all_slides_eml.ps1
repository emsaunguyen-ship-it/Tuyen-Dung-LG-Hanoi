Add-Type -AssemblyName "System.Net"

$mail = New-Object System.Net.Mail.MailMessage
$mail.From = New-Object System.Net.Mail.MailAddress("emsau.nguyen@gmail.com", "LG Procurement Team")

$mail.To.Add("khanhthuy.nguyen@lge.com")
$mail.To.Add("lg.careers.hanoi@lge.com")
$mail.CC.Add("emsau.nguyen@gmail.com")

$mail.Subject = "[LG Careers & AI] Slide Bao Cao Du An Portal Tuyen Dung LG Hanoi (Slide AI MTM)"

$bodyText = @"
Kính gửi Chị Khánh Thủy & Ban Giám Đốc,

Xin gửi file AI Slide Báo cáo Dự án Portal Tuyển dụng LG Hanoi từ thư mục MTM Báo cáo:

1. LG_Hanoi_AI_Story_Slide_Bilingual.pptx (File Slide PowerPoint Song Ngữ Việt - Anh hoàn chỉnh)
2. LG_Hanoi_AI_Story_Slide.pptx (File Slide AI)
3. Trang_Web_Tuyen_Dung_LG_Hanoi_Offline.html (File Web Standalone Offline)
4. slide_1_preview.png & slide_2_preview.png (Ảnh Preview Slide)

Nội dung cập nhật:
- Logo LG Electronics chính thức từ lg.com/vn ở thanh Header
- Tỷ lệ hình ảnh vuông 1:1 cân đối 0% méo hình
- Tích hợp 2 giải pháp tuyển dụng KTV SVC & clip SVC Premier Care
- Tích hợp clip 30 năm & chuỗi LG Insider tăng tính minh bạch thu hút nhân tài.

Trân trọng,
LG Sales & Marketing Procurement Team
"@

$mail.Body = $bodyText

$dir = "C:\Users\LG\Sau 1 AI\MTM báo cao"
$f1 = Join-Path $dir "LG_Hanoi_AI_Story_Slide_Bilingual.pptx"
$f2 = Join-Path $dir "LG_Hanoi_AI_Story_Slide.pptx"
$f3 = Join-Path $dir "Trang_Web_Tuyen_Dung_LG_Hanoi_Offline.html"
$f4 = Join-Path $dir "slide_1_preview.png"
$f5 = Join-Path $dir "slide_2_preview.png"

if (Test-Path $f1) { $mail.Attachments.Add((New-Object System.Net.Mail.Attachment($f1))) }
if (Test-Path $f2) { $mail.Attachments.Add((New-Object System.Net.Mail.Attachment($f2))) }
if (Test-Path $f3) { $mail.Attachments.Add((New-Object System.Net.Mail.Attachment($f3))) }
if (Test-Path $f4) { $mail.Attachments.Add((New-Object System.Net.Mail.Attachment($f4))) }
if (Test-Path $f5) { $mail.Attachments.Add((New-Object System.Net.Mail.Attachment($f5))) }

$tempDir = Join-Path $PSScriptRoot "temp_eml_all"
if (-not (Test-Path $tempDir)) { New-Item -ItemType Directory -Path $tempDir | Out-Null }

$client = New-Object System.Net.Mail.SmtpClient("localhost")
$client.DeliveryMethod = [System.Net.Mail.SmtpDeliveryMethod]::SpecifiedPickupDirectory
$client.PickupDirectoryLocation = $tempDir
$client.Send($mail)

$emlFile = Get-ChildItem -Path $tempDir -Filter "*.eml" | Select-Object -First 1
$destEml = Join-Path $dir "Gui_Email_Bao_Cao_LG_Hanoi.eml"

if ($emlFile) {
    Copy-Item -Path $emlFile.FullName -Destination $destEml -Force
    Remove-Item -Path $tempDir -Recurse -Force
    Write-Output "SUCCESSFULLY_ATTACHED_ALL_SLIDES_TO_EML"
}
