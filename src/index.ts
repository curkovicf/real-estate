import { ScrapeConfigApi } from './scrapper/njuskalo/data-access/model/model.interface';
import { NjuskaloScrapper } from './scrapper/njuskalo/feature/njuskalo-scrapper.class';

(async () => {
  const njuskaloScrapper = new NjuskaloScrapper();

  for await (const scrapeConfig of ScrapeConfigApi.scrapeConfigs) {
    await njuskaloScrapper.scrape(scrapeConfig);
    await njuskaloScrapper.killSession();
  }
})();
