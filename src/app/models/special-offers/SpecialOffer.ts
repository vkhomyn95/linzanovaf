export interface SpecialOffer {
  name: string;
  price: number;
  category?: number;
  alensaLink?: string;
  firstItemName: string;
  secondItemName: string;
  firstItemQuanity: string;
  secondItemQuanity: string;
  activeStatus?: boolean;
  avgPriceInUkraine?: number;
  defaultBC?: number;
  defaultDiameter?: number;
  hasDefaultBC: boolean;
  hasAxis: boolean;
  hasCylinder: boolean;
}
