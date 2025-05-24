const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // ← WICHTIG: Macht HTML & Assets erreichbar

const base = 'C:/SOPHIE/SOPHIE_LAB_CLEANSTART';
const memoryFile = path.join(base, 'memory.json');
const logFile = path.join(base, 'memory_log.txt');
const backupFolder = path.join(base, 'backup');
const snapshotFolder = path.join(base, 'snapshots');
const archiveFolder = path.join(base, 'archive');

[backupFolder, snapshotFolder, archiveFolder].forEach(folder => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
});

// Memory lesen
app.get('/memory', (req, res) => {
  fs.readFile(memoryFile, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'memory.json nicht gefunden' });
    res.type('application/json').send(data);
  });
});

// Memory speichern
app.post('/save', (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  fs.writeFile(memoryFile, data, err => {
    if (err) return res.status(500).json({ error: 'Fehler beim Speichern' });
    const now = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
    fs.appendFile(logFile, `[${now}] Memory gespeichert (${data.length} Bytes)\n`, () => {});
    res.json({ status: 'Gespeichert' });
  });
});

// Log anzeigen
app.get('/log', (req, res) => {
  fs.readFile(logFile, 'utf8', (err, data) => {
    if (err) return res.status(404).send("Noch kein Log vorhanden.");
    res.type('text/plain').send(data);
  });
});

// Reset mit Archivierung
app.post('/reset', (req, res) => {
  try {
    const snapshot = fs.readFileSync(memoryFile, 'utf8');
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    fs.writeFileSync(path.join(archiveFolder, `archive_before_reset_${timestamp}.json`), snapshot);
  } catch {}
  const empty = {
    heard: [],
    lastHeard: "",
    responsesGiven: 0,
    wordFrequency: {},
    label: "",
    notes: "",
    hypotheses: []
  };
  fs.writeFile(memoryFile, JSON.stringify(empty, null, 2), err => {
    if (err) return res.status(500).json({ error: 'Fehler beim Zurücksetzen' });
    res.json({ status: 'Gedächtnis gelöscht & archiviert.' });
  });
});

// Export in backup
app.get('/export', (req, res) => {
  let data;
  try {
    data = fs.readFileSync(memoryFile, 'utf8');
  } catch {
    return res.status(404).json({ error: 'Memory nicht gefunden' });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(backupFolder, `memory_export_${timestamp}.json`);
  fs.writeFile(filePath, data, err => {
    if (err) return res.status(500).json({ error: 'Fehler beim Exportieren' });
    res.json({ status: `Export gespeichert: ${filePath}` });
  });
});

// Snapshot mit label + notes
app.post('/snapshot/:name', (req, res) => {
  const raw = req.params.name || "unnamed";
  const clean = raw.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `snapshot_${timestamp}_${clean}.json`;
  const labeled = {
    ...req.body.memory,
    label: req.body.label || clean,
    notes: req.body.notes || ""
  };
  fs.writeFile(path.join(snapshotFolder, filename), JSON.stringify(labeled, null, 2), err => {
    if (err) return res.status(500).json({ error: 'Snapshot fehlgeschlagen' });
    res.json({ status: `Snapshot gespeichert als ${filename}` });
  });
});

// Hypothesen API
app.get('/hypothesen', (req, res) => {
  fs.readFile(memoryFile, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'memory.json nicht gefunden' });
    let mem;
    try {
      mem = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: 'Ungültiges Memory-Format' });
    }

    const threshold = 3;
    let hypotheses = [];
    const words = Object.entries(mem.wordFrequency || {});
    const high = words.filter(([w, c]) => c >= threshold).map(([w]) => w);

    if (high.includes("du") && high.includes("ich")) {
      hypotheses.push({
        text: "du willst verstanden werden",
        basedOn: ["du", "ich"],
        confidence: 0.85,
        triggered: true,
        confirmed: false,
        reflected: false
      });
    }

    if (high.includes("hilfe")) {
      hypotheses.push({
        text: "ein Problem will gelöst werden",
        basedOn: ["hilfe"],
        confidence: 0.75,
        triggered: true,
        confirmed: false,
        reflected: false
      });
    }

    res.json({ hypotheses });
  });
});

app.listen(port, () => {
  console.log(`🧠 SOPHIE läuft auf http://localhost:${port}`);
});
