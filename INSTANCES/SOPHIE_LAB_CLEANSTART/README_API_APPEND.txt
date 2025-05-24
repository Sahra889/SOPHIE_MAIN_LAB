
// API: Liste Exporte
app.get('/exports', (req, res) => {
  fs.readdir(backupFolder, (err, files) => {
    if (err) return res.status(500).json({ error: 'Backup-Verzeichnis nicht lesbar' });
    const exports = files.filter(f => f.endsWith('.json'));
    res.json({ exports });
  });
});

// API: Liste Snapshots
app.get('/snapshots/list', (req, res) => {
  fs.readdir(snapshotFolder, (err, files) => {
    if (err) return res.status(500).json({ error: 'Snapshot-Verzeichnis nicht lesbar' });
    const snapshots = files.filter(f => f.endsWith('.json'));
    res.json({ snapshots });
  });
});
