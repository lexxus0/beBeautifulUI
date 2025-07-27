"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal/modal";
import ReviewForm from "@/components/ui/ReviewForm/ReviewForm";

export default function ProductsPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <h1>Products page</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="
          border border-white
          text-white
          font-sans
          font-normal
          text-[20px]
          leading-[1.2]
          rounded-lg
          px-8 py-4
          w-[292px] h-[56px]
          bg-[linear-gradient(180deg,rgba(45,45,45,0.8)_0%,rgba(148,148,148,0.8)_65.07%,rgba(45,45,45,0.8)_100%)]
        "
      >
        Залишити відгук
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ReviewForm />
      </Modal>
      </div>
{/* import ProductsList from "@/components/ui/products/ProductsList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/products/operations";
import { selectProducts } from "@/store/products/selectors";
import { useEffect } from "react";

export default function Products() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ limit: 8, currentPage: 1 }));
  }, [dispatch]);
  const products = useAppSelector(selectProducts);
  return (
    <div className="container">
      <ProductsList products={products} />
    </div>
  );
} */}
