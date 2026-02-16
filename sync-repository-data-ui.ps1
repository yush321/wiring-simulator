param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName Microsoft.VisualBasic

function Pick-File {
    param(
        [string]$Title
    )

    $dlg = New-Object System.Windows.Forms.OpenFileDialog
    $dlg.Title = $Title
    $dlg.Filter = "JSON or JS (*.json;*.js)|*.json;*.js|All files (*.*)|*.*"
    $dlg.Multiselect = $false
    $dlg.InitialDirectory = (Get-Location).Path

    $result = $dlg.ShowDialog()
    if ($result -eq [System.Windows.Forms.DialogResult]::OK) {
        return $dlg.FileName
    }
    return $null
}

$scriptPath = Join-Path (Get-Location).Path "sync-local-overrides.js"
if (-not (Test-Path $scriptPath)) {
    Write-Host "[sync-ui] sync-local-overrides.js 파일을 찾을 수 없습니다: $scriptPath" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[1/3] 튜토리얼 JSON 선택 (취소하면 건너뜀)"
$tutorial = Pick-File -Title "튜토리얼 JSON 선택 (취소: 건너뜀)"

Write-Host "[2/3] 넘버링 JSON 선택 (취소하면 건너뜀)"
$numbering = Pick-File -Title "넘버링 JSON 선택 (취소: 건너뜀)"

Write-Host "[3/3] 정답(DB_ANSWERS) JSON 선택 (취소하면 건너뜀)"
$answers = Pick-File -Title "정답(DB_ANSWERS) JSON 선택 (취소: 건너뜀)"

if (-not $tutorial -and -not $numbering -and -not $answers) {
    Write-Host "[sync-ui] 선택된 파일이 없어 작업을 종료했습니다."
    exit 0
}

$layout = [Microsoft.VisualBasic.Interaction]::InputBox(
    "단일 레이아웃 파일(stages만 있는 파일)일 때만 layout id를 입력하세요. 예: t7`n(대부분은 비워두고 확인 누르면 됩니다)",
    "선택 입력: layout id",
    ""
)

$args = @("sync-local-overrides.js")
if ($tutorial) { $args += @("--tutorial", $tutorial) }
if ($numbering) { $args += @("--numbering", $numbering) }
if ($answers) { $args += @("--answers", $answers) }
if ($layout -and $layout.Trim()) { $args += @("--layout", $layout.Trim()) }

Write-Host ""
Write-Host "[sync-ui] 실행: node $($args -join ' ')" -ForegroundColor Cyan
& node @args
$exitCode = $LASTEXITCODE

if ($exitCode -eq 0) {
    Write-Host "[sync-ui] 완료" -ForegroundColor Green
} else {
    Write-Host "[sync-ui] 실패 (exit code: $exitCode)" -ForegroundColor Red
}

exit $exitCode
