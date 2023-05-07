export interface Flat {
  count: number;
  date: Date;
  county: string;
}

export interface House {
  count: number;
  date: Date;
  county: string;
}

export type ScrapeModel = Flat | House;
