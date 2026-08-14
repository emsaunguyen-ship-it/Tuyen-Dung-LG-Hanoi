[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$webClient = New-Object System.Net.WebClient
$webClient.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")

$svgUrl = "https://www.lg.com/content/dam/lge/common/logo/logo-lg-100-44.svg"
$svgDest = Join-Path $PSScriptRoot "lg_official_logo.svg"
$webClient.DownloadFile($svgUrl, $svgDest)
Write-Output "Downloaded $svgUrl to $svgDest"

# Also try fetching png or webp
$pngUrls = @(
    "https://www.lg.com/content/dam/lge/common/logo/logo-lg-100-44.png",
    "https://www.lg.com/content/dam/lge/common/logo/logo-lg-128-60.png",
    "https://www.lg.com/content/dam/lge/common/logo/logo-lg-200-88.png"
)

foreach ($url in $pngUrls) {
    try {
        $dest = Join-Path $PSScriptRoot "lg_official_logo.png"
        $webClient.DownloadFile($url, $dest)
        Write-Output "Successfully downloaded official PNG logo from $url"
        break
    } catch {
        # continue
    }
}
