export interface Lens {
  lensId?: number;
  name: string;
  price: number;
  category?: number;
  lenseType: string;
  lenseProducer: string;
  lenseBrand: string;
  quantity: number;
  lenseCorrection: string;
  lenseMaterial: string;
  description: string;
  lenseWater: number;
  lenseSleep: boolean;
  sdate: number;
  stdt: number;
  defaultBC?: number;
  defaultDiameter?: number;
  avgPriceInUkraine: number;
  hasDefaultBC: boolean;
  hasAxis: boolean;
  hasCylinder: boolean;
  availability: boolean;
}

export interface UpdateLens {
  name: string;
  price: number;
  avgPriceInUkraine: number;
  lenseType: string;
  lenseProducer: string;
  lenseBrand: string;
  quantity: number;
  lenseCorrection: string;
  lenseMaterial: string;
  description: string;
  lenseWater: number;
  lenseSleep: boolean;
  sdate: number;
  stdt: number;
  lenseShelfLife: number;
  hasDefaultBC: boolean;
  hasAxis: boolean;
  defaultDiameter: number;
  hasCylinder: boolean;
  defaultBC: number;
  availability: boolean;
}
