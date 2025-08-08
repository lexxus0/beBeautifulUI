import { ChangeEventHandler } from "react";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export interface IProduct {
  _id: string;
  name: string;
  sku: string;
  volumeOptions: string[];
  priceByVolume: {
    volume: string;
    price: number;
    _id: string;
  }[];
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

export type CategoryCardProps = {
  title: string;
  description: string;
  imageMobile: string;
  imageDesktop: string;
  href: string;
};

export interface IReview {
  _id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  hasLiked?: boolean;
  hasDisliked?: boolean;
}

export interface IReviewResponse {
  data: IReview[];
  pagination: IPagination;
}

export interface IUser {
  name?: string;
  email: string;
  password?: string;
}

export interface IUserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterFormInputs {
  name: string;
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

export interface IOrder {
  _id: string;
  number: string;
  date: string;
  status: string;
  deliveryType: string;
  paymentType: string;
  ttn: string;
  total: string;
  city: string;
  branch: string;
  products: Array<{
    product: IProduct;
    quantity: number;
    selectedVolume: string;
  }>;
}

export type BasketIconVariant = "black" | "white";

export interface BasketIconProps extends React.SVGProps<SVGSVGElement> {
  variant?: BasketIconVariant;
}

export interface BasketItemType {
  id: number;
  image: string;
  titleEn: string;
  titleUk: string;
  volume: string;
  quantity: number;
  price: number;
}