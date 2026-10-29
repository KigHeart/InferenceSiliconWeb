import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function createZip() {
  console.log('Packaging Advanced Inference Silicon Forum repository...');
  const zip = new JSZip();

  const ignoreList = [
    'node_modules',
    '.git',
    'dist',
    '.aistudio',
    'inference-silicon-forum.zip',
  ];

  function addFolderToZip(folderPath, zipFolder) {
    const items = fs.readdirSync(folderPath);

    for (const item of items) {
      if (ignoreList.includes(item)) continue;

      const fullPath = path.join(folderPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const subZip = zipFolder.folder(item);
        addFolderToZip(fullPath, subZip);
      } else {
        const fileData = fs.readFileSync(fullPath);
        zipFolder.file(item, fileData);
      }
    }
  }

  addFolderToZip(rootDir, zip);

  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  const outputPath = path.join(rootDir, 'inference-silicon-forum.zip');
  fs.writeFileSync(outputPath, zipBuffer);

  console.log(`Successfully generated zip: ${outputPath} (${(zipBuffer.length / 1024).toFixed(1)} KB)`);
}

createZip().catch((err) => {
  console.error('Error creating zip:', err);
  process.exit(1);
});
