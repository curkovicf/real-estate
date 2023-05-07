import { Browser, Page, launch } from 'puppeteer';
import { getRandom } from 'random-useragent';
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'


export class Puppeteer {
    private browser!: Browser;

    public async launch(site: string): Promise<Page> {
        this.browser = await launch({headless: false});

        const page = await this.browser.newPage();
        const userAgent = getRandom();

        await page.setUserAgent(userAgent);
        await page.goto(site, { waitUntil: "networkidle2" });

        return page;
    }

    public async launchStealthPuppeteer(): Promise<Browser> {
        return puppeteer
            .use(StealthPlugin())
            .launch({ headless: true });
    }

    public async close(): Promise<void> {
        await this.browser.close();
    }

    public isBrowserAlive(): boolean {
        return !!this.browser;
    }
}