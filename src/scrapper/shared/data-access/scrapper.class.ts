import { ScrapeConfig } from './model.interface';

export abstract class Scrapper<T> {
  /**
   * Method that will be used from outside to start the job
   *
   */
  public async scrape(scrapeConfig: ScrapeConfig): Promise<void> {
    const data = await this.fetch(scrapeConfig.url, scrapeConfig.county);

    await this.store(data, scrapeConfig.resourceUrl, scrapeConfig.fileName);
  }

  /**
   * Kills current session
   */
  public abstract killSession(): Promise<void>;

  /**
   * Fetch data from target
   *
   * @protected
   */
  protected abstract fetch(url: string, county: string): Promise<T>;

  /**
   * Store data in target format
   *
   * @protected
   */
  protected abstract store(data: T, path: string, fileName: string): Promise<void>;
}
