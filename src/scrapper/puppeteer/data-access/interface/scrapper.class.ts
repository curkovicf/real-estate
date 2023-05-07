import { Browser } from 'puppeteer';
import { Scrapper } from '../../../shared/data-access/scrapper.class';

export abstract class PuppeteerScrapper<T> extends Scrapper<T> {
  /**
   * Instance of browser
   * @protected
   */
  protected browser!: Browser;
}
