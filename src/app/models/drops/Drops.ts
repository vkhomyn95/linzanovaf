export interface Drops {
  name: string;
  price: number;
  avgPriceInUkraine: number;
  category?: number;
  cproducer: string;
  cvalue: number;
  description: string;
  sdate: number;
  stdt: number;
  quantity?: number;
}
export interface UpdateCare {
  name: string;
  price: number;
  cproducer: string;
  cvalue: number;
  description: string;
  sdate: number;
  stdt: number;
}
