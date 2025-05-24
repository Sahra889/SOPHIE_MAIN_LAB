@echo off
:: SOPHIE_MAIN_LAB – GitHub AIO Setup + LAB Migration

set BASE=C:\MAIN_LAB
set REPO=PatrickAI/SOPHIE_MAIN_LAB
set GITURL=https://github.com/%REPO%.git
set LOCAL=%BASE%

echo ----------------------------------------
echo 🧠 GitHub AIO Setup für SOPHIE_MAIN_LAB
echo ----------------------------------------

cd /d %LOCAL%

echo Initialisiere Git...
git init
git add .
git commit -m "🧠 Initial Commit – vollständige Struktur mit LAB"

echo Füge GitHub Remote hinzu...
git remote add origin %GITURL%

echo Push zur GitHub Main Branch...
git branch -M main
git push -u origin main

echo ----------------------------------------
echo 📦 Struktur + Repo veröffentlicht.
echo ----------------------------------------

echo ➕ Verschiebe LAB Inhalte...
move /Y "%BASE%\SOPHIE_LAB_CLEANSTART\*" "%BASE%\INSTANCES\SOPHIE_LAB_CLEANSTART\"
rmdir /S /Q "%BASE%\SOPHIE_LAB_CLEANSTART"

echo ✅ LAB Migration abgeschlossen.
pause
