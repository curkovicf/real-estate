export abstract class Scrapper<T> {
  /**
   * Method that will be used from outside to start the job
   */
  public async scrape(): Promise<void> {
    const data = await this.fetch();
    await this.store(data);
  }

  /**
   * Method that sets everything up
   */
  public abstract buildBrowser(): Promise<void>;

  /**
   * Fetch data from target
   * @protected
   */
  protected abstract fetch(): Promise<T>;

  /**
   * Store data in target format
   * @protected
   */
  protected abstract store(data: T): Promise<void>;
}
