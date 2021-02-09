export interface SpecialOffer {
  id?: number;
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
export interface UpdateOffer {
  name: string;
  price: number;
  avgPriceInUkraine: number;
  firstItemName: string;
  secondItemName: string;
  firstItemQuanity: number;
  secondItemQuanity: number;
  hasDefaultBC: boolean;
  hasAxis: boolean;
  defaultDiameter: number;
  hasCylinder: boolean;
  defaultBC: number;
  activeStatus: boolean;
}
