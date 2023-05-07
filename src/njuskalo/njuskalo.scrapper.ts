export class NjuskaloScrapper extends Puppeteer {
  public async getFlatsInZagreb(): Promise<void> {
    const url = 'https://www.njuskalo.hr/prodaja-stanova/zagreb';

    const page = await this.launch(url);

    // console.log('Page ', page)
    await page.waitForSelector('.entities-count');

    const elementContent = await page.$eval('.entities-count', (el) => el.textContent);

    console.log(elementContent);

    const result = await page.evaluate(() => {
      console.log(document.querySelector('.entities-count'));
      return Promise.resolve(8 * 7);
    });
    console.log(result); // prints "56"
  }

  public async stealth(): Promise<void> {
    this.launchStealthPuppeteer().then(async (browser) => {
      console.log('Brwoser ', browser);
      const page = await browser.newPage();
      await page.goto('https://www.njuskalo.hr/prodaja-stanova/zagreb');
      await page.waitForTimeout(5000);
      await page.screenshot({ path: './resource/stealth.png', fullPage: true });
      await browser.close();
    });
  }
}
