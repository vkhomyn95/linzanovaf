export interface CartItems {
  drops: Drops[];
  lenses: Lenses[];
  solutions: Solutions[];
  offers: HotOffers[];
}

interface Drops {
  img?: any;
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
  img?: any;
  price: number;
  quantity: number;
  diopters?: string;
  cylinder?: string;
  axis?: string;
  defaultDiameter: number;
  defaultBC?: string;
  hasDefaultBC?: boolean;
  hasAxis?: boolean;
  hasCylinder?: boolean;
}

interface Solutions {
  id: number;
  name: string;
  img?: any;
  price: number;
  quantity: number;
  solutionValue: number;
}
interface HotOffers {
  img?: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  diopters?: string;
  cylinder?: string;
  axis?: string;
  defaultDiameter: number;
  defaultBC?: string;
  hasDefaultBC?: boolean;
  hasAxis?: boolean;
  hasCylinder?: boolean;
}
