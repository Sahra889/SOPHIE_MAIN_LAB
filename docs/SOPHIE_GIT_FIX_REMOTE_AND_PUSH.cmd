
@echo off
echo ========================================
echo   🛠 GitFix: Remote reparieren & pushen
echo ========================================

cd /d C:\MAIN_LAB

echo.
echo 🔄 Entferne ggf. alte origin...
git remote remove origin

echo ➕ Setze neue origin:
git remote add origin https://github.com/PatrickAI/SOPHIE_MAIN_LAB.git

echo.
echo ✅ Stelle sicher, dass main existiert...
git checkout -b main

echo 🗃️ Füge alle Dateien hinzu...
git add .

echo 💬 Commit vorbereiten...
git commit -m "🚀 Initial Push mit korrekter Remote"

echo ⬆️ Push zur Remote:
git push -u origin main

echo.
echo ✅ GitFix abgeschlossen.
pause
