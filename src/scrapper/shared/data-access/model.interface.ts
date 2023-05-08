export interface ScrapeConfig {
  county: string;
  url: string;
  fileName: string;
  resourceUrl: string;
}

export interface SellingItem {
  count: number;
  date: Date;
  county: string;
}
