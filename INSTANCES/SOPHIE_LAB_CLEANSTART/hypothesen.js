
// 📘 Hypothesenanalyse aus memory.json (GET /hypothesen)
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
                confidence: 0.85
            });
        }

        if (high.includes("hilfe")) {
            hypotheses.push({
                text: "ein Problem will gelöst werden",
                basedOn: ["hilfe"],
                confidence: 0.75
            });
        }

        if (high.includes("fragen")) {
            hypotheses.push({
                text: "eine Suche nach Bedeutung läuft",
                basedOn: ["fragen"],
                confidence: 0.7
            });
        }

        res.json({ hypotheses });
    });
});
