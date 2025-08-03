"use client";

import { useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/products/operations";
import React, { useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { RxDropdownMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Select from "react-select";

const categories = ["hair", "body", "face", "makeup", "home"];
const catOptions = [
  { value: "Hair", label: "Hair" },
  { value: "Makeup", label: "Makeup" },
  { value: "Face", label: "Face" },
  { value: "Home", label: "Home" },
  { value: "Body", label: "Body" },
];

const volumes = ["50ml", "100ml", "200ml", "400ml", "500ml", "1L"];
const volumeOptions = [
  { value: "200ml", label: "200ml" },
  { value: "250ml", label: "250ml" },
  { value: "400ml", label: "400ml" },
  { value: "500ml", label: "500ml" },
  { value: "1L", label: "1L" },
];

export default function Filter() {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedVolume, setSelectedVolume] = useState<string | undefined>(
    undefined
  );

  const handleSearch = () => {
    dispatch(
      fetchProducts({
        limit: 9,
        currentPage: 1,
        category: selectedCategory,
        volumeOptions: selectedVolume,
        keyword: searchTerm,
      })
    );
  };

  const handleFilterSelect = (type: "category" | "volume", value: string) => {
    if (type === "category") setSelectedCategory(value);
    else setSelectedVolume(value);

    setIsDropdownOpen(false);

    dispatch(
      fetchProducts({
        limit: 9,
        currentPage: 1,
        category: type === "category" ? value : selectedCategory,
        volumeOptions: type === "volume" ? value : selectedVolume,
        keyword: searchTerm,
      })
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory(undefined);
    setSelectedVolume(undefined);
    setSearchTerm("");
    dispatch(fetchProducts({ limit: 9, currentPage: 1 }));
  };

  return (
    <div className="relative flex flex-col gap-4 mb-8">
      <div className="flex flex-wrap items-center gap-4 md:flex-row-reverse">
        <div className="relative">
          <input
            type="text"
            placeholder="Пошук"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-lg pl-10 h-12 w-[198px] border-[#2d2d2d] border-[0.4px]"
          />
          <HiMiniMagnifyingGlass
            className="absolute left-2 top-3 size-6 cursor-pointer"
            onClick={handleSearch}
            title="Search"
          />
        </div>

        <div className="relative md:hidden">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="p-2.5 bg-[rgba(45,45,45,0.8)] size-12 rounded-lg flex items-center"
            title="Filter"
          >
            <RxDropdownMenu size={30} color="white" />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-10 text-sm">
              <div className="px-4 py-2 font-semibold border-b">Categories</div>
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => handleFilterSelect("category", cat)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {cat}
                </div>
              ))}

              <div className="px-4 py-2 font-semibold border-t border-b">
                Volume
              </div>
              {volumes.map((vol) => (
                <div
                  key={vol}
                  onClick={() => handleFilterSelect("volume", vol)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {vol}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleResetFilters}
          className="border-[0.4px] size-12 rounded-lg flex items-center justify-center p-3.5 md:hidden"
          title="Reset Filters"
        >
          <FaFilterCircleXmark />
        </button>

        <div className="hidden md:flex gap-4">
          <div className="w-[208px] h-12">
            <Select
              options={catOptions}
              placeholder="Category"
              isClearable
              value={
                catOptions.find((opt) => opt.value === selectedCategory) || null
              }
              onChange={(option) => {
                if (option) {
                  handleFilterSelect("category", option.value);
                } else {
                  setSelectedCategory(undefined);
                  dispatch(
                    fetchProducts({
                      limit: 9,
                      currentPage: 1,
                      category: undefined,
                      volumeOptions: selectedVolume,
                      keyword: searchTerm,
                    })
                  );
                }
              }}
            />
          </div>

          <div className="w-[208px] h-12">
            <Select
              options={volumeOptions}
              placeholder="Volume"
              isClearable
              value={
                volumeOptions.find((opt) => opt.value === selectedVolume) ||
                null
              }
              onChange={(option) => {
                if (option) {
                  handleFilterSelect("volume", option.value);
                } else {
                  setSelectedVolume(undefined);
                  dispatch(
                    fetchProducts({
                      limit: 9,
                      currentPage: 1,
                      category: selectedCategory,
                      volumeOptions: undefined,
                      keyword: searchTerm,
                    })
                  );
                }
              }}
            />
          </div>
        </div>
      </div>

      {products && products.length === 0 && (
        <p className="text-sm text-gray-500 italic pl-2">
          We did not find anything 🧐
        </p>
      )}
    </div>
  );
}
