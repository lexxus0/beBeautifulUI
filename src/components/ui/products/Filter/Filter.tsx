"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import CustomSelect from "@/components/ui/CustomSelect/CustomSelect";
import Icon from "@/components/shared/Icon";
import IconCategory from "./IconCategory";
import IconVolume from "./IconVolume";
import { categoryNames } from "@/constants/categoryNames";
import styles from "./Filter.module.scss";

const categories = Object.keys(categoryNames);
const volumes = ["200ml", "250ml", "400ml", "500ml", "1000ml"];

const catOptions = categories.map((c) => ({
  value: c,
  label: categoryNames[c] || c,
}));

const volumeOptions = volumes.map((v) => ({
  value: v,
  label: v,
}));

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [selectedVolume, setSelectedVolume] = useState<string | undefined>();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isVolumeMenuOpen, setIsVolumeMenuOpen] = useState(false);

  const categoryButtonRef = useRef<HTMLButtonElement | null>(null);
  const volumeButtonRef = useRef<HTMLButtonElement | null>(null);
  const categoryMenuRef = useRef<HTMLUListElement | null>(null);
  const volumeMenuRef = useRef<HTMLUListElement | null>(null);

  const [categoryMenuPosition, setCategoryMenuPosition] = useState({
    top: 56,
    left: 0,
  });
  const [volumeMenuPosition, setVolumeMenuPosition] = useState({
    top: 56,
    left: 0,
  });

  useEffect(() => {
    const category = searchParams.get("category") || undefined;
    const volume = searchParams.get("volume") || undefined;
    const keyword = searchParams.get("keyword") || "";

    setSelectedCategory(category);
    setSelectedVolume(volume);
    setSearchTerm(keyword);
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(e.target as Node)
      ) {
        setIsCategoryMenuOpen(false);
      }
      if (
        volumeMenuRef.current &&
        !volumeMenuRef.current.contains(e.target as Node)
      ) {
        setIsVolumeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (categoryButtonRef.current) {
      setCategoryMenuPosition({
        top: categoryButtonRef.current.offsetHeight + 8,
        left: categoryButtonRef.current.offsetLeft,
      });
    }
    if (volumeButtonRef.current) {
      setVolumeMenuPosition({
        top: volumeButtonRef.current.offsetHeight + 8,
        left: volumeButtonRef.current.offsetLeft,
      });
    }
  }, []);

  const updateQuery = (
    category?: string,
    volume?: string,
    keyword?: string
  ) => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (volume) params.set("volume", volume);
    if (keyword) params.set("keyword", keyword);

    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (option: { value: string } | null) => {
    const value = option?.value;
    setSelectedCategory(value);
    updateQuery(value, selectedVolume, searchTerm);
    setIsCategoryMenuOpen(false);
  };

  const handleVolumeChange = (option: { value: string } | null) => {
    const value = option?.value;
    setSelectedVolume(value);
    updateQuery(selectedCategory, value, searchTerm);
    setIsVolumeMenuOpen(false);
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

  const isFilterActive =
    selectedCategory || selectedVolume || searchTerm.trim() !== "";

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Пошук"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={styles.searchInput}
        />
        <HiMiniMagnifyingGlass
          className={styles.searchIcon}
          onClick={handleSearch}
        />
      </div>

      <div className={styles.filters}>
        <div className={styles.filtersSelects}>
          <div className={styles.iconSelectsWrap}>
            <button
              ref={categoryButtonRef}
              className={styles.iconCategoryButton}
              onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
            >
              <IconCategory />
            </button>

            {isCategoryMenuOpen && (
              <ul
                ref={categoryMenuRef}
                className={`${styles.menuSelect} open`}
                style={{
                  top: `${categoryMenuPosition.top}px`,
                  left: `${categoryMenuPosition.left}px`,
                }}
              >
                {catOptions.map((op) => (
                  <li
                    key={op.value}
                    onClick={() => handleCategoryChange(op)}
                    className={
                      selectedCategory === op.value ? styles.selectedOption : ""
                    }
                  >
                    {op.label}
                  </li>
                ))}
              </ul>
            )}

            <button
              ref={volumeButtonRef}
              className={styles.iconVolumeButton}
              onClick={() => setIsVolumeMenuOpen((prev) => !prev)}
            >
              <IconVolume />
            </button>

            {isVolumeMenuOpen && (
              <ul
                ref={volumeMenuRef}
                className={`${styles.menuSelect} open`}
                style={{
                  top: `${volumeMenuPosition.top}px`,
                  left: `${volumeMenuPosition.left}px`,
                }}
              >
                {volumeOptions.map((op) => (
                  <li
                    key={op.value}
                    onClick={() => handleVolumeChange(op)}
                    className={
                      selectedVolume === op.value ? styles.selectedOption : ""
                    }
                  >
                    {op.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.selectsWrap}>
            <CustomSelect
              value={selectedCategory}
              options={catOptions}
              placeholder="Категорії"
              onChange={handleCategoryChange}
            />

            <CustomSelect
              value={selectedVolume}
              options={volumeOptions}
              placeholder="Об’єм"
              onChange={handleVolumeChange}
            />
          </div>
        </div>

        {isFilterActive && (
          <button onClick={handleResetFilters} className={styles.resetButton}>
            Очистити фільтри
            <Icon name="icon-close" className={styles.resetIcon} />
          </button>
        )}
      </div>
    </div>
  );
}
