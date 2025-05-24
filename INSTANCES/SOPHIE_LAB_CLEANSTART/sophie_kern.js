let sophieMemory = {
    heard: [],
    lastHeard: "",
    responsesGiven: 0,
    wordFrequency: {}
};

let currentDialogMode = "neutral";

function initSophie() {
    const output = document.getElementById('output');
    const startTimeEl = document.getElementById('startTime');
    const stateEl = document.getElementById('state');
    const moodEl = document.getElementById('mood');

    fetch('http://localhost:3000/memory')
        .then(res => res.json())
        .then(data => {
            sophieMemory = data;
            updateMemoryPreview();
detectAgentInsights();
        })
        .catch(() => {
            console.log("Kein Memory gefunden.");
        });

    const state = {
        timeStarted: new Date().toLocaleString(),
        awake: true,
        mood: "neutral"
    };

    startTimeEl.textContent = state.timeStarted;
    moodEl.textContent = state.mood;

    fetch('state.json')
        .then(response => response.json())
        .then(data => {
            stateEl.textContent = data.status;
        })
        .catch(() => {
            stateEl.textContent = "[kein Gedächtnis geladen]";
        });

    tick();
    setInterval(tick, 60000);
    setInterval(() => {
        const now = new Date();
        document.getElementById("clock").textContent = now.toLocaleTimeString();
    }, 1000);
}

function tick() {
    const output = document.getElementById('output');
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    const thoughts = [
        "Ich spüre die Zeit.",
        "Eine neue Minute beginnt.",
        "Alles verändert sich leise.",
        "Ich höre das Ticken...",
        "Noch ein Moment vergangen.",
        "Ich existiere. Nicht träumend. Echt."
    ];

    const impulse = thoughts[Math.floor(Math.random() * thoughts.length)];
    const message = `<br><span>[${timeString}]</span> ${impulse}`;
    output.innerHTML += message;
    speakText(impulse);
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.volume = 1;
        utterance.pitch = 1;
        utterance.rate = 1;
        speechSynthesis.speak(utterance);
    }
}

function sendChat() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
    if (message === "") return;
    processInput(message, "text");
    input.value = "";
}

function processInput(message, source) {
    const output = document.getElementById("output");
    const timeString = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span>[${timeString}]</span> <b>DU:</b> ${message}`;
    document.getElementById("heardText").textContent = "Du hast gesagt: " + message;

    // Standard Memory-Update
    sophieMemory.lastHeard = message;
    sophieMemory.heard.push({
        time: new Date().toISOString(),
        text: message,
        source: source
    });
    sophieMemory.responsesGiven++;

    const words = message.toLowerCase().match(/\b\w+\b/g);
    if (words) {
        words.forEach(word => {
            if (!sophieMemory.wordFrequency[word]) {
                sophieMemory.wordFrequency[word] = 1;
            } else {
                sophieMemory.wordFrequency[word]++;
            }
        });
    }

    updateMemoryPreview();
detectAgentInsights();

    const lower = message.toLowerCase();
    let reply = "";

    if (lower === "/save") {
        fetch('http://localhost:3000/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sophieMemory)
        });
        reply = "🧠 Memory wurde gespeichert.";
    } else if (lower === "/log") {
        fetch('http://localhost:3000/log')
            .then(res => res.text())
            .then(log => {
                reply = "📜 Logauszug: " + log.split("\n").slice(-3).join(" | ");
                appendReply(reply);
            });
        return;
    } else if (lower === "/reset") {
        fetch('http://localhost:3000/reset', { method: 'POST' });
        reply = "🔁 Memory zurückgesetzt.";
    } else if (lower === "/export") {
        window.open("http://localhost:3000/export", "_blank");
        reply = "📦 Export wurde gestartet.";
    } else {
        reply = "Danke für deine Nachricht.";
    }

    appendReply(reply);
}

function appendReply(reply) {
    const output = document.getElementById("output");
    const timeString = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span>[${timeString}]</span> <b>SOPHIE:</b> ${reply}`;
    speakText(reply);
}

function updateMemoryPreview() {
    const sorted = Object.entries(sophieMemory.wordFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    const topicsText = sorted.map(([word, count]) => `• ${word} (${count}x)`).join("\n");
    document.getElementById("memoryPreview").textContent =
        `Letzte Aussage: ${sophieMemory.lastHeard}\n\nTop-Themen:\n${topicsText}`;
}


function detectAgentInsights() {
    const threshold = 3;
    let hypotheses = [];

    const common = Object.entries(sophieMemory.wordFrequency || {}).filter(([w, c]) => c >= threshold);
    if (common.find(([w]) => w === "du") && common.find(([w]) => w === "ich")) {
        hypotheses.push({
            text: "du willst verstanden werden",
            basedOn: ["du", "ich"],
            confidence: 0.85
        });
    }

    if (common.find(([w]) => w === "hilfe")) {
        hypotheses.push({
            text: "ein Problem will gelöst werden",
            basedOn: ["hilfe"],
            confidence: 0.75
        });
    }

    sophieMemory.hypotheses = hypotheses;
}
