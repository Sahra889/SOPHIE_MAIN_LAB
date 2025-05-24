const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const memoryFile = 'memory.json';
const logFile = 'memory_log.txt';
const backupFolder = 'C:/SOPHIE/SOPHIE_LAB_CLEANSTART/backup';

app.use(express.json());

// Sicherstellen, dass Backup-Ordner existiert
if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder, { recursive: true });
}

// GET memory.json
app.get('/memory', (req, res) => {
    fs.readFile(memoryFile, 'utf8', (err, data) => {
        if (err) return res.status(404).json({ error: 'memory.json nicht gefunden' });
        res.type('application/json').send(data);
    });
});

// POST save
app.post('/save', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    fs.writeFile(memoryFile, data, (err) => {
        if (err) return res.status(500).json({ error: 'Fehler beim Speichern' });

        const now = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
        const logEntry = `[${now}] Memory gespeichert (${data.length} Bytes)\n`;
        fs.appendFile(logFile, logEntry, () => {});
        res.json({ status: 'Gespeichert' });
    });
});

// GET log file
app.get('/log', (req, res) => {
    fs.readFile(logFile, 'utf8', (err, data) => {
        if (err) return res.status(404).send("Noch kein Log vorhanden.");
        res.type('text/plain').send(data);
    });
});

// POST reset
app.post('/reset', (req, res) => {
    const empty = {
        heard: [],
        lastHeard: "",
        responsesGiven: 0,
        wordFrequency: {}
    };
    fs.writeFile(memoryFile, JSON.stringify(empty, null, 2), err => {
        if (err) return res.status(500).json({ error: 'Fehler beim Zurücksetzen' });
        res.json({ status: 'Gedächtnis zurückgesetzt' });
    });
});

// GET export (versioniert in /backup)
app.get('/export', (req, res) => {
    fs.readFile(memoryFile, 'utf8', (err, data) => {
        if (err) return res.status(404).json({ error: 'Kein Memory zum Exportieren' });

        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, "-");
        const filename = `memory_export_${timestamp}.json`;
        const fullpath = path.join(backupFolder, filename);

        fs.writeFile(fullpath, data, (writeErr) => {
            if (writeErr) return res.status(500).json({ error: 'Fehler beim Exportieren' });
            res.download(fullpath);
        });
    });
});

app.listen(port, () => {
    console.log(`🧠 SOPHIE Memory-Server bereit: http://localhost:${port}`);
});
