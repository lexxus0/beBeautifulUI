import { IProduct } from "./types";

export type DeliveryType = "branch" | "address";
export type PaymentMethod = "liqpay" | "requisites" | "cod";
export type OrderStatus = "draft" | "ordered" | "payed" | "done";

export interface IOrderItemDraft {
  product?: IProduct;
  selectedVolume: number;
  quantity: number;
}

export interface IOrderItem {
  productId: string;
  selectedVolume: number;
  quantity: number;
}

export interface IDeliveryDraft {
  deliveryType: DeliveryType;
  city: string;
  branchNumber?: string;
  street?: string;
  house?: string;
  apartment?: string;
}

export interface ICertificate {
  _id: string;
  number: string;
  amount: number;
  isActive: boolean;
  owner: string | null;
  activatedAt: string | null;
  expiresAt: string | null;
  activatedBy: string | null;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDraft {
  items: IOrderItemDraft[];
  delivery: IDeliveryDraft | null;
  paymentMethod: PaymentMethod | null;

  customer: {
    customerName: string;
    phone: string;
    email?: string;
  } | null;

  comment?: string;
  certificateCode?: string | null;
  certificateDiscount?: number;
  amount: number; // сума товарів
  totalAmount: number; // з урахуванням сертифіката
}

export interface CreateOrderDto {
  clientId: string | null;

  items: IOrderItem[];

  deliveryType: DeliveryType;
  city: string;
  street?: string;
  house?: string;
  apartment?: string;
  branchNumber?: string;

  paymentMethod: PaymentMethod;

  customerName: string;
  phone: string;
  email?: string;

  comment?: string | null;

  certificateCode?: string;
}

export interface IOrderResponse {
  _id: string;
  clientId: string | null;
  customerName?: string;
  phone?: string;
  email?: string;
  // items: IOrderItem[];
  items: IOrderItemDraft[];

  deliveryMethod: "nova_poshta";
  deliveryType: DeliveryType;
  city: string;
  street?: string;
  house?: string;
  apartment?: string;
  branchNumber?: string;

  paymentMethod: PaymentMethod;
  paymentLink?: string;
  comment?: string;
  certificateCode?: string | null;
  certificateDiscount: number;

  totalAmount: number;
  finalAmount: number;

  lowStockWarning?: boolean;
  status: OrderStatus;

  createdAt?: string;
  updatedAt?: string;
}
