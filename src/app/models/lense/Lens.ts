export interface Lens {
  name: string;
  price: number;
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
}

export interface UpdateLens {
  name: string;
  price: number;
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
  // userId: number;
}
