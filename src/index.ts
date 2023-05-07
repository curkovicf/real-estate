import { NjuskaloScrapper } from './njuskalo/njuskalo.scrapper';

(async () => {
  const njuskaloScrapper = new NjuskaloScrapper();

  // await njuskaloScrapper.getFlatsInZagreb();

  await njuskaloScrapper.stealth();

  // await njuskaloScrapper.close();
})();
