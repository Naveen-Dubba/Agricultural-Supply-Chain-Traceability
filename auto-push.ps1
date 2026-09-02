Set-Location "C:\Users\navee\Desktop\SE\agritrace\agritrace"

Write-Host "AgriTrace Auto Git Push Started..."

while ($true) {

    $changes = git status --porcelain

    if ($changes) {
        Write-Host "Changes detected..."

        git add .

        $message = "Auto update $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git commit -m "$message"

        if ($LASTEXITCODE -eq 0) {
            Write-Host "Pushing changes to GitHub..."
            git push origin main

            if ($LASTEXITCODE -eq 0) {
                Write-Host "Successfully pushed to GitHub."
            }
        }
    }

    Start-Sleep -Seconds 30
}