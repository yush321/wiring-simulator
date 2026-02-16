@echo off
setlocal
set "SCRIPT_PATH=%~dp0sync-repository-data-ui.ps1"
powershell -NoProfile -ExecutionPolicy Bypass -Command "$p='%SCRIPT_PATH%'; $s=Get-Content -Raw -Encoding UTF8 $p; Invoke-Expression $s"
set ec=%errorlevel%
if not "%ec%"=="0" (
  echo.
  echo sync-ui failed with exit code %ec%.
)
pause
exit /b %ec%
