@echo off
:: SOPHIE MAIN_LAB – Struktur + Template-Setup

set BASE=C:\MAIN_LAB

echo ----------------------------------------
echo 🧠 SOPHIE AIO Struktur + Template-Installer
echo ----------------------------------------

echo Erstelle Verzeichnisse...
mkdir %BASE%\INSTANCES\SOPHIE_LAB_CLEANSTART
mkdir %BASE%\INSTANCES\LIZARDI_RESEARCH\data
mkdir %BASE%\INSTANCES\LIZARDI_RESEARCH\trainings
mkdir %BASE%\INSTANCES\LIZARDI_RESEARCH\visuals
mkdir %BASE%\INSTANCES\LIZARDI_RESEARCH\figma
mkdir %BASE%\INSTANCES\TERRAN_OBSERVER\data
mkdir %BASE%\INSTANCES\TERRAN_OBSERVER\fields
mkdir %BASE%\INSTANCES\TERRAN_OBSERVER\modules
mkdir %BASE%\INSTANCES\TERRAN_OBSERVER\figma

mkdir %BASE%\TRAINING\LABS\SOPHIE
mkdir %BASE%\TRAINING\LABS\LIZARDI
mkdir %BASE%\TRAINING\LABS\TERRAN

mkdir %BASE%\TOOLCHAIN\backup_engine
mkdir %BASE%\TOOLCHAIN\deploy_launcher
mkdir %BASE%\TOOLCHAIN\visual_debug
mkdir %BASE%\DOCS\VERSIONS
mkdir %BASE%\DOCS\BLUEPRINTS
mkdir %BASE%\DOCS\EVOLUTION
mkdir %BASE%\SHARED\figma_assets
mkdir %BASE%\SHARED\components
mkdir %BASE%\SHARED\logos
mkdir %BASE%\START
mkdir %BASE%\START\launchtasks
mkdir %BASE%\START\shortcuts

echo Lege Vorlagen an...

:: HTML/JSON/MD-TEMPLATES
echo <!DOCTYPE html><html><head><title>Template</title></head><body><h1>Template Seite</h1></body></html> > %BASE%\INSTANCES\SOPHIE_LAB_CLEANSTART\index.html
echo {} > %BASE%\INSTANCES\SOPHIE_LAB_CLEANSTART\memory.json
echo # SOPHIE KI-System > %BASE%\DOCS\README.md
echo # Struktur Blueprint > %BASE%\DOCS\BLUEPRINTS\structure.md
echo # Systemhistorie > %BASE%\DOCS\VERSIONS\version_1.0.md

echo 🧬 Projektstruktur + Templates wurden erstellt in: %BASE%
pause
