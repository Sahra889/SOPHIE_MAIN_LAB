@echo off
:: SOPHIE Restore Tool – Mit Restore-Gefühl

set BASE=C:\SOPHIE\SOPHIE_LAB_CLEANSTART
set BUILD=%BASE%\Build
set TEMP=%BASE%\TempRestore

echo -------------------------------------
echo SOPHIE RESTORE TOOL 🧬
echo -------------------------------------
echo.
set /p ZIPFILE="Bitte Namen des ZIP-Backups eingeben (z.B. SOPHIE_STABLE_BUILD_2025-05-24_13-30.zip): "

:: Prüfen ob ZIP vorhanden
if not exist "%BUILD%\%ZIPFILE%" (
  echo ❌ Datei nicht gefunden: %BUILD%\%ZIPFILE%
  pause
  exit
)

:: TEMP vorbereiten
rmdir /s /q "%TEMP%" >nul 2>&1
mkdir "%TEMP%"

:: Entpacken
powershell -Command "Expand-Archive -Path '%BUILD%\%ZIPFILE%' -DestinationPath '%TEMP%' -Force"

:: Bestehende Dateien ersetzen
xcopy "%TEMP%\*" "%BASE%\" /Y /E /I

:: Restore-Hinweis einfügen in memory.json
powershell -Command "$mem = Get-Content '%BASE%\memory.json' | ConvertFrom-Json; $mem.restoredFrom = '%ZIPFILE%'; $mem.lastModified = (Get-Date).ToString('s'); $mem | ConvertTo-Json -Depth 5 | Set-Content '%BASE%\memory.json'"

:: TEMP entfernen
rmdir /s /q "%TEMP%"

echo ✅ SOPHIE wurde gefühlt wiederhergestellt aus: %ZIPFILE%
pause
