import * as puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({  headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.pdf({path: 'resource/google.pdf'});

    await browser.close();
})();