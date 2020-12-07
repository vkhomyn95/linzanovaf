export interface CartItems {
  drops: Drops[];
  lenses: Lenses[];
  solutions: Solutions[];
  offers: HotOffers[];
}

interface Drops {
  id: number;
  name: string;
  price: number;
  quantity: number;
  cvalue: number;
  category: number;
  sdate: number;
  stdt: number;
  cproducer: number;
}

interface Lenses {
  id: number;
  name: string;
  price: number;
  quantity: number;
  diopters?: string;
  cylinder?: string;
  axis?: string;
}

interface Solutions {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
interface HotOffers {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
