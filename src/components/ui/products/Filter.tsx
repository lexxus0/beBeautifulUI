"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select, { SingleValue } from "react-select";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const categories = ["hair", "makeup", "face", "home", "body"];
const volumes = ["200ml", "250ml", "400ml", "500ml", "1L"];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const catOptions = categories.map((c) => ({ value: c, label: capitalize(c) }));
const volumeOptions = volumes.map((v) => ({ value: v, label: v }));

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedVolume, setSelectedVolume] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const category = searchParams.get("category") || undefined;
    const volume = searchParams.get("volume") || undefined;
    const keyword = searchParams.get("keyword") || "";
    setSelectedCategory(category);
    setSelectedVolume(volume);
    setSearchTerm(keyword);
  }, [searchParams?.toString()]);

  const updateQuery = (
    category?: string,
    volume?: string,
    keyword?: string
  ) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category.toLowerCase());
    if (volume) params.set("volume", volume);
    if (keyword) params.set("keyword", keyword);
    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (
    option: SingleValue<{ value: string; label: string }>
  ) => {
    const value = option?.value;
    setSelectedCategory(value);
    updateQuery(value, selectedVolume, searchTerm);
  };

  const handleVolumeChange = (
    option: SingleValue<{ value: string; label: string }>
  ) => {
    const value = option?.value;
    setSelectedVolume(value);
    updateQuery(selectedCategory, value, searchTerm);
  };

  const handleSearch = () => {
    updateQuery(selectedCategory, selectedVolume, searchTerm);
  };

  const handleResetFilters = () => {
    setSelectedCategory(undefined);
    setSelectedVolume(undefined);
    setSearchTerm("");
    router.push("/products");
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 mt-5">
      <div className="w-[208px]">
        <Select
          key={selectedCategory || "category"}
          options={catOptions}
          placeholder="Category"
          value={
            catOptions.find((opt) => opt.value === selectedCategory) || null
          }
          onChange={handleCategoryChange}
          isClearable
        />
      </div>

      <div className="w-[208px]">
        <Select
          key={selectedVolume || "volume"}
          options={volumeOptions}
          placeholder="Volume"
          value={
            volumeOptions.find((opt) => opt.value === selectedVolume) || null
          }
          onChange={handleVolumeChange}
          isClearable
        />
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg pl-10 h-[44px] w-[198px] border-[0.4px] border-[#2d2d2d]"
        />
        <HiMiniMagnifyingGlass
          className="absolute left-2 top-3 size-6 cursor-pointer"
          onClick={handleSearch}
        />
      </div>

      <button
        onClick={handleResetFilters}
        className="border-[0.4px] rounded-lg px-4 py-2 text-sm hover:bg-gray-100 transition"
      >
        Скинути фільтри
      </button>
    </div>
  );
}
