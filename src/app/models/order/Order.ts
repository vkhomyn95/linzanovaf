export interface UpdateOrder {
  createdAt: string;
  totalSumm: number;
  lastName: string;
  firstName: string;
  patronymic: string;
  phone: string;
  customerComment: string;
  delivery: Delivery;
  items: Item;

  meestTrackingId: string;
  dpdTrackingId: string;
  novaPoshtaTTN: string;
  alensaId: string;
  receivedInMesstPoland: string;
}

export interface Delivery {
  street: string;
  city: string;
}

export interface Item {
  drops: [Drop];
}
export interface Drop {
  dropId: number;
}
