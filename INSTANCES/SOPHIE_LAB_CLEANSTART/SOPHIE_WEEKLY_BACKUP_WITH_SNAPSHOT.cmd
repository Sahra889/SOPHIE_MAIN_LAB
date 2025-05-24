@echo off
:: SOPHIE Weekly Backup Script + Snapshot

set BASE=C:\SOPHIE\SOPHIE_LAB_CLEANSTART
set DATESTAMP=%DATE:~6,4%-%DATE:~3,2%-%DATE:~0,2%_%TIME:~0,2%-%TIME:~3,2%
set ZIPNAME=SOPHIE_STABLE_BUILD_%DATESTAMP%.zip
set SNAPSHOTNAME=weekly_snapshot_%DATESTAMP%.json

:: Snapshot erzeugen
copy "%BASE%\memory.json" "%BASE%\snapshots\%SNAPSHOTNAME%"

:: Backup erzeugen
powershell -Command "Compress-Archive -Path %BASE%\*.html,%BASE%\*.js,%BASE%\*.json,%BASE%\*.css,%BASE%\*.md,%BASE%\*.txt,%BASE%\*.cmd -DestinationPath %BASE%\Build\%ZIPNAME% -Force"
