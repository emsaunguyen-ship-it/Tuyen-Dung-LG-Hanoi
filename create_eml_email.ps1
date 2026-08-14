Add-Type -AssemblyName "System.Net"

$mail = New-Object System.Net.Mail.MailMessage
$mail.From = New-Object System.Net.Mail.MailAddress("emsau.nguyen@gmail.com", "LG Procurement Team")

$mail.To.Add("khanhthuy.nguyen@lge.com")
$mail.To.Add("lg.careers.hanoi@lge.com")
$mail.CC.Add("emsau.nguyen@gmail.com")

$mail.Subject = "[LG Careers & AI] Slide Bao Cao Du An Portal Tuyen Dung LG Hanoi (Song Ngu Viet - Anh)"

$bodyText = @"
Kính gửi Chị Khánh Thủy, LG Careers Hanoi & Ban Giám Đốc,

Xin gửi file PowerPoint Báo cáo Dự án Portal Tuyển dụng LG Hanoi (Song Ngữ Tiếng Việt & Tiếng Anh) đã hoàn thiện đầy đủ theo đúng yêu cầu:

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

$mail.Body = $bodyText

# Attach 4 files
$f1 = Join-Path $PSScriptRoot "LG_Hanoi_AI_Story_Slide_Bilingual.pptx"
$f2 = Join-Path $PSScriptRoot "docs\index.html"
$f3 = "C:\Users\LG\.gemini\antigravity-ide\brain\9a229a17-aa26-4b40-9aef-061a16b33cd3\slide_1_preview.png"
$f4 = "C:\Users\LG\.gemini\antigravity-ide\brain\9a229a17-aa26-4b40-9aef-061a16b33cd3\slide_2_preview.png"

if (Test-Path $f1) { $mail.Attachments.Add((New-Object System.Net.Mail.Attachment($f1))) }
if (Test-Path $f2) { $mail.Attachments.Add((New-Object System.Net.Mail.Attachment($f2))) }
if (Test-Path $f3) { $mail.Attachments.Add((New-Object System.Net.Mail.Attachment($f3))) }
if (Test-Path $f4) { $mail.Attachments.Add((New-Object System.Net.Mail.Attachment($f4))) }

# Save as .eml via SmtpClient SpecifiedPickupDirectory
$tempDir = Join-Path $PSScriptRoot "temp_eml"
if (-not (Test-Path $tempDir)) { New-Item -ItemType Directory -Path $tempDir | Out-Null }

$client = New-Object System.Net.Mail.SmtpClient("localhost")
$client.DeliveryMethod = [System.Net.Mail.SmtpDeliveryMethod]::SpecifiedPickupDirectory
$client.PickupDirectoryLocation = $tempDir
$client.Send($mail)

# Move exported .eml file to current folder and MTM báo cao
$emlFile = Get-ChildItem -Path $tempDir -Filter "*.eml" | Select-Object -First 1
$destEml1 = Join-Path $PSScriptRoot "Gui_Email_Bao_Cao_LG_Hanoi.eml"
$destEml2 = "C:\Users\LG\Sau 1 AI\MTM báo cao\Gui_Email_Bao_Cao_LG_Hanoi.eml"

if ($emlFile) {
    Copy-Item -Path $emlFile.FullName -Destination $destEml1 -Force
    Copy-Item -Path $emlFile.FullName -Destination $destEml2 -Force
    Remove-Item -Path $tempDir -Recurse -Force
    Write-Output "SUCCESSFULLY_CREATED_EML_AT: $destEml2"
}
