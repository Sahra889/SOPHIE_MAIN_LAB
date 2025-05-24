const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const baseFolder = 'C:/SOPHIE/SOPHIE_LAB_CLEANSTART/';
const backupFolder = path.join(baseFolder, 'backup');
const snapshotFolder = path.join(baseFolder, 'snapshots');
const archiveFolder = path.join(baseFolder, 'archive');

const date = new Date();
const week = `${date.getFullYear()}-KW${Math.ceil((date.getDate() + 6 - date.getDay()) / 7)}`;
const zipName = `weekly_archive_${week}.zip`;
const outputPath = path.join(archiveFolder, zipName);

if (!fs.existsSync(archiveFolder)) {
  fs.mkdirSync(archiveFolder, { recursive: true });
}

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`✅ Archiv erstellt: ${outputPath} (${archive.pointer()} Bytes)`);
});

archive.on('error', err => {
  throw err;
});

archive.pipe(output);

// Sammle relevante Dateien
archive.directory(backupFolder, 'backup');
archive.directory(snapshotFolder, 'snapshots');
archive.file(path.join(baseFolder, 'memory.json'), { name: 'memory.json' });
archive.file(path.join(baseFolder, 'memory_log.txt'), { name: 'memory_log.txt' });

archive.finalize();
