@echo off
:: SOPHIE Autostart – Server & Manifest

cd /d C:\SOPHIE\SOPHIE_LAB_CLEANSTART

echo Starte lokalen SOPHIE-Server...
start "" /MIN cmd /c "node server.js"

timeout /t 3 >nul

echo Öffne SOPHIE Manifest...
start "" "http://localhost:3000/manifest.html"
exit
