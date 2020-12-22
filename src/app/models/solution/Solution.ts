export interface Solution {
  name: string;
  price: number;
  category?: number;
  solutionType: string;
  solutionProducer: string;
  solutionBrand: string;
  solutionValue: number;
  description: string;
  sdate: number;
  stdt: number;
  boolHyaluronate: boolean;
  avgPriceInUkraine: number;
}
export interface UpdateSolution {
  name: string;
  price: number;
  solutionType: string;
  solutionProducer: string;
  solutionBrand: string;
  solutionValue: number;
  description: string;
  sdate: number;
  stdt: number;
  boolHyaluronate: boolean;
}
