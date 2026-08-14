import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '..', 'src', 'assets');

async function optimize() {
  console.log('🚀 Starting Sharp Image Optimization Pipeline...');
  const files = fs.readdirSync(assetsDir);

  let totalOldSize = 0;
  let totalNewSize = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const filePath = path.join(assetsDir, file);
      const baseName = path.basename(file, ext);
      const webpPath = path.join(assetsDir, `${baseName}.webp`);

      const statsBefore = fs.statSync(filePath);
      totalOldSize += statsBefore.size;

      let pipeline = sharp(filePath);
      const metadata = await pipeline.metadata();

      // Resize max width/height to 1000px while maintaining aspect ratio
      if (metadata.width > 1000 || metadata.height > 1000) {
        pipeline = pipeline.resize({
          width: metadata.width >= metadata.height ? 1000 : undefined,
          height: metadata.height > metadata.width ? 1000 : undefined,
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      await pipeline
        .webp({ quality: 80, effort: 4 })
        .toFile(webpPath);

      const statsAfter = fs.statSync(webpPath);
      totalNewSize += statsAfter.size;

      const saving = (((statsBefore.size - statsAfter.size) / statsBefore.size) * 100).toFixed(1);
      console.log(`✓ ${file} (${(statsBefore.size / 1024).toFixed(1)} KB) ➔ ${baseName}.webp (${(statsAfter.size / 1024).toFixed(1)} KB) [-${saving}%]`);
    }
  }

  console.log('----------------------------------------------------');
  console.log(`📊 TOTAL BASELINE: ${(totalOldSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`📊 TOTAL OPTIMIZED: ${(totalNewSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`🎉 OVERALL PAYLOAD SAVINGS: -${(((totalOldSize - totalNewSize) / totalOldSize) * 100).toFixed(1)}%`);
}

optimize().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
