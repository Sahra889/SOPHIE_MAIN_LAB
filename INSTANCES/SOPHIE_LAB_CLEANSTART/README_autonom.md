# SOPHIE.exe – Autonomes Memory-System

Dieses Verzeichnis enthält eine vollständige, offline-fähige Version von SOPHIE.exe mit:

✅ Autonomen Gedächtnis-Funktionen  
✅ Backup-Export  
✅ Snapshot-Manager  
✅ HTML-Navigation & Visualisierung  

---

## 📁 Strukturübersicht

```
SOPHIE_LAB_CLEANSTART/
├── index.html             → SOPHIE Oberfläche
├── style.css              → UI-Design
├── sophie_kern.js         → Dialoglogik & Memory
├── server.js              → Node.js API (localhost:3000)
├── avatar.png             → SOPHIE-Bild
├── backup/                → Memory-Exporte
├── snapshots/             → Manuelle Snapshots via /snapshot/:name
├── archive/               → ZIP-Backups (optional)
├── export-log.html        → Export-Liste im Browser
├── diff.html              → Zwei Speicherstände vergleichen
└── README_autonom.md      → Diese Datei
```

---

## 🧠 Befehle im Chat

| Befehl      | Funktion                                 |
|-------------|------------------------------------------|
| `/save`     | Memory wird gespeichert (POST /save)     |
| `/export`   | Memory wird exportiert in backup/        |
| `/log`      | Letzter Speicherzeitpunkt                |
| `/reset`    | SOPHIE vergisst alles                    |
| `/snapshot NAME` | Speichert Snapshot im `snapshots/` |

---

## 🧪 Analyse-Tools

- `export-log.html` zeigt alle Memory-Exporte in einer Liste  
- `diff.html` kann zwei JSON-Dateien visuell vergleichen  
