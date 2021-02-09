export interface Drops {
  img?: any;
  id?: number;
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
  availability?: boolean;
}
export interface UpdateCare {
  name: string;
  price: number;
  avgPriceInUkraine: number;
  cproducer: string;
  cvalue: number;
  description: string;
  sdate: number;
  stdt: number;
  availability: boolean;
}
