@echo off
:: SOPHIE MAIN_LAB – Verzeichnisstruktur-Ersteller

set BASE=C:\MAIN_LAB

echo ----------------------------------------
echo 🧠 SOPHIE AIO Struktur-Builder
echo ----------------------------------------

echo Erstelle Hauptverzeichnisstruktur...
mkdir %BASE%\INSTANCES\SOPHIE_LAB_CLEANSTART
mkdir %BASE%\INSTANCES\LIZARDI_RESEARCH\data
mkdir %BASE%\INSTANCES\LIZARDI_RESEARCH\trainings
mkdir %BASE%\INSTANCES\LIZARDI_RESEARCH\visuals
mkdir %BASE%\INSTANCES\LIZARDI_RESEARCH\figma
mkdir %BASE%\INSTANCES\TERRAN_OBSERVER\data
mkdir %BASE%\INSTANCES\TERRAN_OBSERVER\fields
mkdir %BASE%\INSTANCES\TERRAN_OBSERVER\modules
mkdir %BASE%\INSTANCES\TERRAN_OBSERVER\figma

echo Erstelle Trainingsbereiche...
mkdir %BASE%\TRAINING\LABS\SOPHIE
mkdir %BASE%\TRAINING\LABS\LIZARDI
mkdir %BASE%\TRAINING\LABS\TERRAN

echo Erstelle Toolchain und Doku...
mkdir %BASE%\TOOLCHAIN\backup_engine
mkdir %BASE%\TOOLCHAIN\deploy_launcher
mkdir %BASE%\TOOLCHAIN\visual_debug
mkdir %BASE%\DOCS\VERSIONS
mkdir %BASE%\DOCS\BLUEPRINTS
mkdir %BASE%\DOCS\EVOLUTION

echo Erstelle Shared Assets & Start...
mkdir %BASE%\SHARED\figma_assets
mkdir %BASE%\SHARED\components
mkdir %BASE%\SHARED\logos
mkdir %BASE%\START
mkdir %BASE%\START\launchtasks
mkdir %BASE%\START\shortcuts

echo Struktur erstellt in: %BASE%
pause
