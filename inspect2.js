const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Scroll a bit to trigger any framer-motion animations
    await page.evaluate(() => window.scrollBy(0, 100));
    await page.waitForTimeout(1000);
    
    const elements = await page.evaluate(() => {
        const textElements = Array.from(document.querySelectorAll('span')).filter(el => 
            ['Docker', 'Kubernetes', 'Jira', 'Selenium', 'Scikit-learn', 'Power BI'].includes(el.textContent.trim())
        );
        return textElements.map(el => {
            const container = el.parentElement;
            const rect = container.getBoundingClientRect();
            const topElement = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
            return {
                text: el.textContent.trim(),
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height,
                topElementTag: topElement ? topElement.tagName : 'NONE',
                topElementClass: topElement ? topElement.className : 'NONE',
                containerClasses: container.className
            };
        });
    });
    fs.writeFileSync('puppeteer_output.json', JSON.stringify(elements, null, 2));
    await browser.close();
})();
