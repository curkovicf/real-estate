import { PuppeteerScrapper } from '../../data-access/interface/scrapper.class';
import { ScrapeModel } from '../../data-access/model/scrape.model';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import puppeteer from 'puppeteer-extra'

export class PuppeteerStealth extends PuppeteerScrapper<ScrapeModel> {
  public async buildBrowser(): Promise<void> {
      this.browser = await puppeteer.use(StealthPlugin()).launch({ headless: false });
  }

  // @ts-ignore
    protected async fetch(): Promise<ScrapeModel> {
      const url: string = 'https://www.njuskalo.hr/prodaja-stanova/zagreb';

      const page = await this.browser.newPage();

      await page.goto('https://www.njuskalo.hr/prodaja-stanova/zagreb');
      await page.waitForTimeout(5000);
      await page.screenshot({ path: './resource/stealth.png', fullPage: true });
      await this.browser.close();
  }

  protected async store(data: ScrapeModel): Promise<void> {
      console.log('Storing data');
  }
}

// this.launchStealthPuppeteer().then(async (browser) => {
//     console.log('Brwoser ', browser);
//     const page = await browser.newPage();
//     await page.goto('https://www.njuskalo.hr/prodaja-stanova/zagreb');
//     await page.waitForTimeout(5000);
//     await page.screenshot({ path: './resource/stealth.png', fullPage: true });
//     await browser.close();
// });