$brainDir = "C:\Users\acer\.gemini\antigravity\brain\97ce0853-0150-4238-970f-630739b828c2"
$imgDir = "C:\Users\acer\.gemini\antigravity\scratch\moments-website\images"

$files = Get-ChildItem -Path $brainDir -Filter "media__*.jpg" | Sort-Object Name
$i = 1
foreach ($f in $files) {
    $target = Join-Path $imgDir "img_$i.jpg"
    Copy-Item $f.FullName -Destination $target -Force
    Write-Host "Copied $($f.Name) to img_$i.jpg"
    $i++
}
