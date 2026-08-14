import { Jimp } from 'jimp';
import path from 'path';

const projectDir = 'c:/Users/LG/Sau 1 AI/Làm trang web tuyên dung';

async function cropImages() {
  console.log('Generating Perfect 1:1 Square Focus Crops for All 4 Images...');

  try {
    // 1. Non-Tech AI (Job Search & Procurement Card Focus)
    const img1 = await Jimp.read(path.join(projectDir, 'user_ui_non_tech_ai.png'));
    const w1 = img1.bitmap.width;
    const h1 = img1.bitmap.height;
    const size1 = Math.min(w1, h1);
    img1.crop({ x: 0, y: Math.floor((h1 - size1) / 2), w: size1, h: size1 });
    await img1.write(path.join(projectDir, 'square_non_tech_ai.png'));

    // 2. Logic Building (Employee Quotes Focus)
    const img2 = await Jimp.read(path.join(projectDir, 'user_ui_logic.png'));
    const w2 = img2.bitmap.width;
    const h2 = img2.bitmap.height;
    const size2 = Math.min(w2, h2);
    img2.crop({ x: 0, y: Math.floor((h2 - size2) / 2), w: size2, h: size2 });
    await img2.write(path.join(projectDir, 'square_logic_code.png'));

    // 3. SVC Solution (SVC Training Playlists Focus)
    const img3 = await Jimp.read(path.join(projectDir, 'user_ui_svc_training.png'));
    const w3 = img3.bitmap.width;
    const h3 = img3.bitmap.height;
    const size3 = Math.min(w3, h3);
    img3.crop({ x: 0, y: Math.floor((h3 - size3) / 2), w: size3, h: size3 });
    await img3.write(path.join(projectDir, 'square_svc_training.png'));

    // 4. HR Automation (Recruiter Dashboard Focus)
    const img4 = await Jimp.read(path.join(projectDir, 'user_ui_hr_automation.png'));
    const w4 = img4.bitmap.width;
    const h4 = img4.bitmap.height;
    const size4 = Math.min(w4, h4);
    img4.crop({ x: Math.floor((w4 - size4) / 2), y: Math.floor((h4 - size4) / 2), w: size4, h: size4 });
    await img4.write(path.join(projectDir, 'square_hr_stats.png'));

    console.log('PERFECT 1:1 SQUARE CROPS COMPLETED!');
  } catch (err) {
    console.error('Crop error:', err);
  }
}

cropImages();
