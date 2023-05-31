import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteer from 'puppeteer-extra';
import { Browser, Page } from 'puppeteer';
import { getRandom } from 'random-useragent';

export async function buildPage(url: string): Promise<{ page: Page; browser: Browser }> {
  const browser = await puppeteer.use(StealthPlugin()).launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      // '--proxy-server=https://103.167.70.128:8080',
      "--ignore-certificate-errors",
    ]
  });

  // 1. Randomize User agent
  const userAgent = getRandom();
  const page = await browser.newPage();

  // 2. Randomize viewport size
  await page.setViewport({
    width: 1920 + Math.floor(Math.random() * 100),
    height: 3000 + Math.floor(Math.random() * 100),
    deviceScaleFactor: 1,
    hasTouch: false,
    isLandscape: false,
    isMobile: false,
  });

  await page.setUserAgent(userAgent);
  await page.setJavaScriptEnabled(true);
  await page.setDefaultNavigationTimeout(0);

  // 3. Skip images/styles/fonts loading for performance
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.evaluateOnNewDocument(() => {
    // 4. Pass webdriver check
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });

  await page.evaluateOnNewDocument(() => {
    // 5. Pass chrome check
    // @ts-ignore
    window.chrome = {
      runtime: {},
      // etc.
    };
  });

  await page.evaluateOnNewDocument(() => {
    // 6. Pass notifications check
    const originalQuery = window.navigator.permissions.query;

    return (window.navigator.permissions.query = (parameters) =>
      parameters.name === 'notifications'
        ? (Promise.resolve({ state: Notification.permission }) as Promise<PermissionStatus>)
        : originalQuery(parameters));
  });

  await page.evaluateOnNewDocument(() => {
    // Overwrite the `plugins` property to use a custom getter.
    Object.defineProperty(navigator, 'plugins', {
      // This just needs to have `length > 0` for the current test,
      // but we could mock the plugins too if necessary.
      get: () => [1, 2, 3, 4, 5],
    });
  });

  await page.evaluateOnNewDocument(() => {
    // Overwrite the `languages` property to use a custom getter.
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en'],
    });
  });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

  return { page, browser };
}
