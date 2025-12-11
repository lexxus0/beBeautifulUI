import { IProduct } from "./types";

export interface IOrderItem {
    product: IProduct;
    selectedVolume: string;
    quantity: number;
  }
  
  export interface IDelivery {
    deliveryMethod: "nova_poshta";
    city: string;
    warehouse?: string;
    street?: string;
    house?: string;
    apartment?: string;
  }

  export type PaymentChoice = "card" | "invoice" | "cod";

export interface ICertificate {
  _id: string;
  number: string;
  amount: number;
  isActive: boolean;
  owner: string | null;
  activatedAt: string | null;
  expiresAt: string | null;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDraft {
    items: IOrderItem[];
    delivery: IDelivery | null;
    paymentMethod: PaymentChoice | null;
    comment?: string;
    certificate?: ICertificate | null;
    amount: number; // сума товарів
    totalAmount: number; // з урахуванням знижок/сертифіката/доставки
  }

  export type OrderStatus = "draft" | "ordered" | "payed" | "done";

export interface IOrder {
  _id: string;
  clientId: string;
  customerName?: string;
  phone?: string;
  email?: string;
  items: IOrderItem[];
  orderNumber: string;
  date: string;
  status: OrderStatus;
  // DeliveryMethod: "nova_poshta";
  comment?: string;
  certificate?: string;
  totalAmount: number;
  delivery: IDelivery;
  paymentLink: string;
  lowStockWarning?: boolean;
  // ttn: string;
  // amount: number;
  createdAt?: string;
  updatedAt?: string;
}