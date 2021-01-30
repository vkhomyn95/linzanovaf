export interface OrderToSend {
  createdAt: string;
  totalSumm: number;
  lastName: string;
  firstName: string;
  patronymic: string;
  phone: string;
  customerComment: string;
  items: [Items];
  user: number;
}

export interface Items {
  drops?: any[];
  lenses?: any[];
  offers?: any[];
  solutions?: any[];
}

interface Drops {
  dropId: number;
}
interface Lenses {
  defaultDiameter: number;
  lenseId: number;
}
interface Offers {
  offerId: number;
}
