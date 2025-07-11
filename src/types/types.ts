export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Product {
  _id: string;
  name: string;
  sku: string;
  volumeOptions: string[];
  priceByVolume: number[];
  stockQuantity: number;
  features: string[];
  description: string;
  instructions: string;
  activeIngredients: {
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
