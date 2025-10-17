"use client"
import { useEffect, useState } from 'react';
import ProductActions from "@/components/ui/ProductActions/ProductActions";
import ProductDescription from "@/components/ui/ProductDescription/ProductDescription";
import ProductGallery from "@/components/ui/ProductGallery/ProductGallery";
import ProductHeader from "@/components/ui/ProductHeader/ProductHeader";
import { IProduct } from "@/types/types";
import css from "./page.module.css";
import BrandPhilosophy from "@/components/ui/BrandPhilosophy/BrandPhilosophy";
import VisitedProduct from '@/app/products/[productId]/VisitedProduct';

const getProductById = async (id: string): Promise<IProduct> => {
  const res = await fetch(
    `https://be-beautiful-backend.onrender.com/api/products/${id}`
  );
  const json = await res.json();
  return json.data;
};
const Product = ({productId}: {productId: string}) => {

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<IProduct | null>(null)

  useEffect(() => {
    const getData = async () => {
      if (productId) setProduct(await getProductById(productId))
      setLoading(false)
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container">{
      loading ? <span>Loading....</span>
      :
      (product && productId) ?
            <section>
        <VisitedProduct productId={productId} />
        <div className={css.productContainer}>
          <div className={css.header}>
            <ProductHeader product={product} />
          </div>
          <div className={css.gallery}>
            <ProductGallery product={product} />
          </div>
          <div className={css.description}>
            <ProductDescription product={product} />
          </div>
          <div className={css.actions}>
            <ProductActions product={product} />
          </div>
        </div>
        <div className={css.fullWidthWrapper}>
          <BrandPhilosophy dynamicText="Цей шампунь — як свіже «доброго ранку» собі. І як щоденне нагадування: ти — варта найкращого." />
        </div>
      </section>
      :
      <span>some problems...</span>
    }
    </section>
  );
}

export default Product;
