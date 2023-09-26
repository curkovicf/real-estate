import { Scrapper } from '../../shared/data-access/scrapper.class';
import { Browser } from 'puppeteer';
import { buildPage } from '../../puppeteer/util/function/page-builder.function';
import { appendFile, readFile, writeFile, mkdir } from 'fs/promises';
import { SellingItem } from '../../shared/data-access/model.interface';

export class NjuskaloScrapper extends Scrapper<SellingItem> {
  private browser!: Browser;

  protected async fetch(url: string, county: string): Promise<SellingItem> {
    const { page, browser } = await buildPage(url);
    this.browser = browser;

    await page.$eval('.entities-count', (el) => el.textContent)


    const count = Number(await page.$eval('.entities-count', (el) => el.textContent));
    const date = new Date();

    return {
      count,
      county,
      date,
    };
  }

  protected async store(data: SellingItem, path: string, fileName: string): Promise<void> {
    const csvLocation = `${path}/${fileName}`;
    const csvEntry = `${data.county},${data.date},${data.count}\n`;

    try {
      await readFile(csvLocation);
      await appendFile(csvLocation, csvEntry);
    } catch (err) {
      await mkdir(path, { recursive: true });
      await writeFile(csvLocation, this.buildHeader());
      await appendFile(csvLocation, csvEntry);
    }
  }

  private buildHeader(): string {
    return `County,Date,Count\n`;
  }

  public async killSession(): Promise<void> {
    await this.browser.close();
  }
}
