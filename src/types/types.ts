import { ChangeEventHandler } from "react";
import { IUIReview } from "./reviews";

export interface IState {
  isLoading: boolean;
  error: string | null;
}

export interface IPagination {
  total: number;
  page: number;
  perPage?: number;
  totalPages?: number;
}

export interface IPriceByVolume {
  _id: string;
  stockQuantity: number;
  volume: number;
  price: number;
}

export interface IProduct {
  _id: string;
  name: {
    en?: string;
    ua: string;
  };
  sku: string;
  volumeOptions: string[];          //number[]
  priceByVolume: IPriceByVolume[];
  stockQuantity: number;
  // features: string[];
  features: {
    en?: string[];
    ua: string[];
  };
  description: {
    en?: string;
    ua: string;
  };
  // instructions: string;
  instructions: {
    en?: string;
    ua: string;
  };
  activeIngredients: {
    name: {
      en?: string;
      ua: string;
    };
    _id: string;
  }[];
  inciList: string[];
  category: string;
  isVegan: boolean;
  reviews: IUIReview[];
  isPromoted: boolean;
  imageUrl: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProductResponse {
  productsById: Record<string, IProduct>;
  productsListIds: string[];
  pagination: IPagination;
}

type UrlObject = {
  pathname?: string;
  query?: Record<string, string | number | boolean | undefined>;
  hash?: string;
};

export type CategoryData = {
  title: string;
  description: string;
  imageMobile: string;
  imageDesktop: string;
  category: string; 
  href: UrlObject;
};

export type CategoryCardProps = CategoryData;

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
  dateOfBirth?: string; // "DD.MM.YYYY"
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

export type ServerErrorBody = {
  status?: number;
  message?: string;
  data?: string;
};

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

export type BasketIconVariant = "black" | "white";

export interface BasketIconProps extends React.SVGProps<SVGSVGElement> {
  variant?: BasketIconVariant;
}

export interface ContactInfoInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
