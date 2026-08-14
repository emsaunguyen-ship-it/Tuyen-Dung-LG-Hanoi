import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

async function buildOffline() {
  console.log('📦 Building single-file offline HTML bundle with optimized WebP assets...');
  
  await build({
    root: projectRoot,
    configFile: false,
    base: './',
    plugins: [react(), viteSingleFile()],
    build: {
      outDir: path.join(projectRoot, 'dist_offline'),
      emptyOutDir: true,
    }
  });

  const distHtml = path.join(projectRoot, 'dist_offline', 'index.html');
  const targetHtml = path.join(projectRoot, 'LG_Careers_Website_Offline.html');

  if (fs.existsSync(distHtml)) {
    fs.copyFileSync(distHtml, targetHtml);
    const stats = fs.statSync(targetHtml);
    console.log(`🎉 LG_Careers_Website_Offline.html generated successfully! File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
  }
}

buildOffline().catch(err => {
  console.error('Build offline error:', err);
  process.exit(1);
});
