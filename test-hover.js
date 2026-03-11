const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3001');

  // Scroll down to Make the Skills section sticky
  await page.evaluate(() => {
    window.scrollTo(0, window.innerHeight * 2);
  });
  
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Find all cards
  const cards = await page.$$('.group');
  console.log(`Found ${cards.length} cards`);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const text = await card.$eval('span', el => el.textContent);
    const box = await card.boundingBox();
    if (!box) continue;
    
    // Check element at center
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    
    const elementClasses = await page.evaluate((x, y) => {
      const el = document.elementFromPoint(x, y);
      return el ? el.className : 'null';
    }, centerX, centerY);

    // Only print for ones we know are problematic
    if (["Docker", "Kubernetes", "Jira", "Selenium", "Scikit-learn", "Power BI"].includes(text)) {
      console.log(`Card: ${text}, Center: (${Math.round(centerX)}, ${Math.round(centerY)}), Element at center classes: ${elementClasses}`);
    }
  }

  await browser.close();
})();
