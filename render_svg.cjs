const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 450, height: 200 } });
    const svgPath = path.join(__dirname, 'lg_official_logo.svg');
    await page.goto(`file:///${svgPath.replace(/\\/g, '/')}`);
    
    const element = await page.$('svg');
    if (element) {
        await element.screenshot({ path: path.join(__dirname, 'lg_official_logo.png'), omitBackground: true });
        console.log("SUCCESSFULLY_RENDERED_OFFICIAL_LG_LOGO_PNG");
    } else {
        await page.screenshot({ path: path.join(__dirname, 'lg_official_logo.png') });
    }
    await browser.close();
})();
