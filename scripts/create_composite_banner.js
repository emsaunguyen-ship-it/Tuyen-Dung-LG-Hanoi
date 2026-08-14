import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const photoPath = path.join(projectRoot, 'src', 'assets', 'lg_31st_anniversary_banner.jpg');
const outputPath = path.join(projectRoot, 'src', 'assets', 'lg_31st_master_cover.webp');

async function createMasterBanner() {
  console.log('🎨 Generating Master Artistic LG 31st Anniversary Cover Banner...');

  // Master Banner Dimensions
  const width = 1600;
  const height = 540;

  // 1. Create Base Background with LG Crimson Gradient SVG
  const gradientSvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#140306" />
          <stop offset="45%" stop-color="#2a060d" />
          <stop offset="75%" stop-color="#A50034" />
          <stop offset="100%" stop-color="#850027" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="75%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FD312E" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#140306" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
      <rect width="${width}" height="${height}" fill="url(#glowGrad)" />
    </svg>
  `);

  let baseBuffer = await sharp(gradientSvg).png().toBuffer();

  // 2. Resize Photo keeping 100% natural proportions (NO DISTORTION)
  const photoMeta = await sharp(photoPath).metadata();
  const targetPhotoHeight = 520;
  const photoAspect = photoMeta.width / photoMeta.height;
  const targetPhotoWidth = Math.round(targetPhotoHeight * photoAspect);

  const resizedPhotoBuffer = await sharp(photoPath)
    .resize(targetPhotoWidth, targetPhotoHeight, { fit: 'contain' })
    .modulate({ brightness: 1.06, saturation: 1.18 })
    .png()
    .toBuffer();

  // 3. Create Feather/Fade Mask for the left edge of the photo
  const maskSvg = Buffer.from(`
    <svg width="${targetPhotoWidth}" height="${targetPhotoHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fadeMask" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0" />
          <stop offset="18%" stop-color="#000000" stop-opacity="0.7" />
          <stop offset="35%" stop-color="#000000" stop-opacity="1" />
          <stop offset="100%" stop-color="#000000" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="${targetPhotoWidth}" height="${targetPhotoHeight}" fill="url(#fadeMask)" />
    </svg>
  `);

  const maskBuffer = await sharp(maskSvg).png().toBuffer();

  // Apply mask to photo
  const maskedPhotoBuffer = await sharp(resizedPhotoBuffer)
    .composite([{ input: maskBuffer, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 4. Composite Photo onto the Right Side of the Master Canvas
  const photoLeftPos = width - targetPhotoWidth + 60;
  const photoTopPos = Math.round((height - targetPhotoHeight) / 2);

  const finalComposite = await sharp(baseBuffer)
    .composite([{ input: maskedPhotoBuffer, left: Math.max(0, photoLeftPos), top: photoTopPos }])
    .webp({ quality: 92 })
    .toFile(outputPath);

  const stats = await sharp(outputPath).metadata();
  console.log(`🎉 Master Cover Banner generated successfully at ${outputPath} (${stats.width}x${stats.height})!`);
}

createMasterBanner().catch(err => {
  console.error('Error creating master banner:', err);
  process.exit(1);
});
