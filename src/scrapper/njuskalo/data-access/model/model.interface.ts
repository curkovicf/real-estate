import { ScrapeConfig } from '../../../shared/data-access/model.interface';

export const RESOURCE_URL: string = './data';

export namespace ScrapeConfigApi {
  /*********************************
   **** ZAGREB
   ********************************/
  export const GRAD_ZAGREB_FLAT: ScrapeConfig = {
    county: 'Grad Zagreb',
    url: 'https://www.njuskalo.hr/prodaja-stanova/zagreb',
    fileName: 'grad_zagreb.csv',
    resourceUrl: `${RESOURCE_URL}/flat`,
  };
  export const GRAD_ZAGREB_HOUSE: ScrapeConfig = {
    county: 'Grad Zagreb',
    url: 'https://www.njuskalo.hr/prodaja-kuca/zagreb',
    fileName: 'grad_zagreb.csv',
    resourceUrl: `${RESOURCE_URL}/house`,
  };

  /*********************************
   **** ZADAR
   ********************************/
  export const ZADARSKA_ZUPANIJA_FLAT: ScrapeConfig = {
    county: 'Zadarska Županija',
    url: 'https://www.njuskalo.hr/prodaja-stanova/zadarska',
    fileName: 'zadarska_zupanija.csv',
    resourceUrl: `${RESOURCE_URL}/flat`,
  };
  export const ZADARSKA_ZUPANIJA_HOUSE: ScrapeConfig = {
    county: 'Zadarska Županija',
    url: 'https://www.njuskalo.hr/prodaja-kuca/zadarska',
    fileName: 'zadarska_zupanija.csv',
    resourceUrl: `${RESOURCE_URL}/house`,
  };

  /*********************************
   **** SPLIT
   ********************************/
  export const SPLITSKO_DALMATINSKA_FLAT: ScrapeConfig = {
    county: 'Splitsko Dalmatinska Županija',
    url: 'https://www.njuskalo.hr/prodaja-stanova/splitsko-dalmatinska',
    fileName: 'splitsko_dalmatinska_zupanija.csv',
    resourceUrl: `${RESOURCE_URL}/flat`,
  };
  export const SPLITSKO_DALMATINSKA_HOUSE: ScrapeConfig = {
    county: 'Splitsko Dalmatinska Županija',
    url: 'https://www.njuskalo.hr/prodaja-kuca/splitsko-dalmatinska',
    fileName: 'splitsko_dalmatinska_zupanija.csv',
    resourceUrl: `${RESOURCE_URL}/house`,
  };

  export const scrapeConfigs: ScrapeConfig[] = [
    GRAD_ZAGREB_FLAT,
    GRAD_ZAGREB_HOUSE,
    ZADARSKA_ZUPANIJA_FLAT,
    ZADARSKA_ZUPANIJA_HOUSE,
    SPLITSKO_DALMATINSKA_HOUSE,
    SPLITSKO_DALMATINSKA_FLAT,
  ];
}
