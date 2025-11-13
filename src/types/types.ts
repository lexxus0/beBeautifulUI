import { ChangeEventHandler } from "react";

export interface IState {
  isLoading: boolean;
  error: string | null;
}

export interface IPagination {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface IPriceByVolume {
  _id: string;
  volume: string;
  price: number;
}

export interface IProduct {
  _id: string;
  name: string;
  sku: string;
  volumeOptions: string[];
  priceByVolume: IPriceByVolume[];
  stockQuantity: number;
  features: string[];
  description: string;
  instructions: string;
  activeIngredients: {
    name: string;
    description: string;
    _id: string;
  }[];
  inciList: string[];
  category: string;
  isVegan: boolean;
  reviews: IReview[];
  isPromoted: boolean;
  imageUrl: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProductResponse {
  data: IProduct[];
  pagination: IPagination;
}

export type CategoryData = {
  title: string;
  description: string;
  imageMobile: string;
  imageDesktop: string;
  href: string;
};

export type CategoryCardProps = CategoryData;

export interface IReview {
  _id: string;
  productId: string; // Required - matches backend schema
  userId: string; // Required - matches backend schema (for unique constraint)
  rating: number; // 1-5, required, matches backend schema
  comment?: string; // Optional, max 1000 chars, matches backend schema
  createdAt: string; // From timestamps
  updatedAt: string; // From timestamps
  // Frontend-specific fields (not in backend schema)
  name: string; // From user profile
  location: string; // From user profile
  likes: number; // For future like/dislike feature
  dislikes: number; // For future like/dislike feature
  hasLiked?: boolean; // For future like/dislike feature
  hasDisliked?: boolean; // For future like/dislike feature
}

export interface IReviewResponse {
  data: IReview[];
  pagination: IPagination;
}

export interface IUser {
  _id?: string;
  first_name?: string;
  last_name?: string;
  dateOfBirth?: string;
  email?: string;
  // gender?: "woman" | "man";
  // language?: "en" | "uk";
  telephone?: string;
  password?: string;
  photo?: string | null;
  agree?: string;
}

export interface IUserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IUpdateUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  telephone?: string;
  dateOfBirth?: string;   // "DD.MM.YYYY"
  photo?: File | null;
}

export interface IUpdateUserApiUser {
  _id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  telephone?: string;
  dateOfBirth?: string;
  photo?: string | null;
}

export type RegisterError = { code: number; field?: "email"; message: string };

export type ServerErrorBody = { status?: number; message?: string; data?: string };

export interface RegisterFormInputs {
  first_name: string;
  email: string;
  password: string;
  agree: boolean;
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface InputGroupProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "password";
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  showToggle?: boolean;
  onToggle?: () => void;
  variant?: "default" | "custom";
  inputClassName?: string;
  labelClassName?: string;
  icon?: React.ReactNode;
}

export interface TopProduct {
  id: number;
  title: string;
  underTitle: string;
  price: string;
  imageMobile: string;
  imageDesktop: string;
}

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
  balance: number;
  isActive: boolean;
  activatedAt: string;
  expiresAt: string;
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
  delivery: IDelivery;
  paymentMethod: PaymentChoice;
  // ttn: string;
  comment?: string;
  certificate?: string;
  amount: number;
  totalAmount: number;
}

export type BasketIconVariant = "black" | "white";

export interface BasketIconProps extends React.SVGProps<SVGSVGElement> {
  variant?: BasketIconVariant;
}

export interface ICartItemRaw {
  productId: string | IProduct;
  quantity: number;
}

export interface ICartRaw {
  _id: string;
  userId: string;
  items: ICartItemRaw[];
  createdAt: string;
  updatedAt: string;
}

export interface ICartItem {
  product: IProduct; 
  selectedVolume: string;
  quantity: number;
}

export interface CartState {
  isLoading: boolean;
  error: string | null;
  items: ICartItem[];
  isGuest: boolean;
}

export interface ContactInfoInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface BasketItemsListProps {
  basketItems: ICartItem[];
  onIncrement: (item: ICartItem) => void;
  onDecrement: (item: ICartItem) => void;
  onRemove: (item: ICartItem) => void;
}


