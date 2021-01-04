export interface UpdateOrder {
  createdAt: string;
  totalSumm: number;
  lastName: string;
  email: string;
  cityName: string;
  firstName: string;
  patronymic: string;
  phone: string;
  customerComment: string;
  delivery: Delivery;
  meestTrackingId: string;
  novaPoshtaTTN: string;
  receivedInMesstPoland: boolean;
  priceToPayAfterDelivery: number;
  priceToPayNow: number;
  userEmail: string;
  userId: number;
  canceled: boolean;
}

export interface Delivery {
  cityName: string;
  deliveryType: string;
  paymentType: string;
  warehouseNumber: string;
  description: string;
  postIndex: number;
}
