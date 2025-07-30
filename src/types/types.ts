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
  priceByVolume: number[];
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
  name: string;
  location: string;
  rating: number;
  comment: string;
  createdAt: string;
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
