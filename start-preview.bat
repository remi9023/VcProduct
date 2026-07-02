@echo off
cd /d "%~dp0"
start "Sgwon Preview Server" powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0preview-server.ps1"
timeout /t 1 /nobreak >nul
start "" "http://localhost:5500/"
