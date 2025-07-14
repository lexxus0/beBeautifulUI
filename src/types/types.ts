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
