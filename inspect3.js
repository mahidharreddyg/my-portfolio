const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    const htmls = await page.evaluate(() => {
        const spans = Array.from(document.querySelectorAll('span')).filter(el => 
            ['Docker', 'Kubernetes', 'Jira', 'Selenium', 'Scikit-learn', 'Power BI', 'React'].includes(el.textContent.trim())
        );
        return spans.map(span => {
            const container = span.closest('.relative.cursor-pointer');
            return {
                name: span.textContent.trim(),
                html: container ? container.outerHTML : 'NOT FOUND'
            };
        });
    });
    console.log(JSON.stringify(htmls, null, 2));
    await browser.close();
})();
