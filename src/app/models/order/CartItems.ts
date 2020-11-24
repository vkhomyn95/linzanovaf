export interface CartItems {
  drops: Drops[];
  lenses: Lenses[];
  solutions: Solutions[];
  hotOffers: HotOffers[];
}

interface Drops {
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
  name: string;
  price: number;
  quantity: number;
}

interface Solutions {
  name: string;
  price: number;
  quantity: number;
}
interface HotOffers {
  name: string;
  price: number;
  quantity: number;
}
