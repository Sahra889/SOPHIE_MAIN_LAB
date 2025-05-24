# SOPHIE – Desktop-Agent Konzept

## Ziel:
SOPHIE läuft lokal mit:
- eigenem UI-Fenster
- Autostart über Windows
- Zugriff auf alle Tools aus `manifest.html`

## Umsetzung (empfohlen):
1. `npm install --global serve`
2. `serve .` im SOPHIE-Ordner starten (localhost:3000)
3. Tray-Tool über Electron oder Python+Tk + Browser-Fenster als Wrapper
4. Autostart-Verknüpfung via:
   `shell:startup` → Link zu `start_sophie_ui.cmd`

## start_sophie_ui.cmd
```
start chrome http://localhost:3000/manifest.html
exit
```

## Zusatzfunktionen (optional):
- 🔔 Tray-Icon mit Intervall-Reminder
- 🧠 Notification bei Wiederholungserkennung
- 🗂️ Kontextuelle Archivierung + Live-Meldungen

---

Bereit für Integration in lokale Taskleiste.  
