"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import CustomSelect from "@/components/ui/CustomSelect/CustomSelect";
import Icon from "@/components/shared/Icon";
import IconCategory from "./IconCategory";
import IconVolume from "./IconVolume";
import styles from "./Filter.module.scss";

const categories = ["hair", "makeup", "face", "body", "home"];
const volumes = ["200ml", "250ml", "400ml", "500ml", "1L"];
const categoryNames = {
  hair: "Для волосся",
  makeup: "Для макіяжу",
  face: "Для обличчя",
  body: "Для тіла",
  home: "Для дому",
};

type CategoryKey = keyof typeof categoryNames;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const catOptions = categories.map((c) => ({
  value: c,
  label: categoryNames[c as CategoryKey] || capitalize(c),
}));

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const category = searchParams.get("category") || undefined;
    const volume = searchParams.get("volume") || undefined;
    const keyword = searchParams.get("keyword") || "";
    setSelectedCategory(category);
    setSelectedVolume(volume);
    setSearchTerm(keyword);
  }, [searchParams?.toString()]);

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
  }, [categoryButtonRef.current, volumeButtonRef.current]);

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
    option: { value: string; label: string } | null
  ) => {
    const value = option?.value;
    setSelectedCategory(value);
    updateQuery(value, selectedVolume, searchTerm);
    setIsCategoryMenuOpen(false);
  };

  const handleVolumeChange = (
    option: { value: string; label: string } | null
  ) => {
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

  const handleCategoryReset = () => {
    setSelectedCategory(undefined);
    updateQuery(undefined, selectedVolume, searchTerm);
  };

  const handleVolumeReset = () => {
    setSelectedVolume(undefined);
    updateQuery(selectedCategory, undefined, searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
          onKeyDown={handleKeyDown}
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
              className={styles.iconCategoryButton}
              onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
              ref={categoryButtonRef}
            >
              <IconCategory />
            </button>
            {isCategoryMenuOpen && (
              <ul
                className={`${styles.menuSelect} ${
                  isCategoryMenuOpen ? "open" : ""
                }`}
                ref={categoryMenuRef}
                style={{
                  top: `${categoryMenuPosition.top}px`,
                  left: `${categoryMenuPosition.left}px`,
                }}
              >
                {catOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleCategoryChange(option)}
                    className={
                      selectedCategory === option.value
                        ? styles.selectedOption
                        : ""
                    }
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}

            <button
              className={styles.iconVolumeButton}
              onClick={() => setIsVolumeMenuOpen((prev) => !prev)}
              ref={volumeButtonRef}
            >
              <IconVolume />
            </button>
            {isVolumeMenuOpen && (
              <ul
                className={`${styles.menuSelect} ${
                  isVolumeMenuOpen ? "open" : ""
                }`}
                ref={volumeMenuRef}
                style={{
                  top: `${volumeMenuPosition.top}px`,
                  left: `${volumeMenuPosition.left}px`,
                }}
              >
                {volumeOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleVolumeChange(option)}
                    className={
                      selectedVolume === option.value
                        ? styles.selectedOption
                        : ""
                    }
                  >
                    {option.label}
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

      <div className={styles.selectedFilters}>
        {selectedCategory && (
          <div className={styles.selectedFilter}>
            <span>{categoryNames[selectedCategory as CategoryKey]}</span>
            <Icon
              name="icon-close"
              className={styles.resetFilters}
              onClick={handleCategoryReset}
            />
          </div>
        )}
        {selectedVolume && (
          <div className={styles.selectedFilter}>
            <span>{selectedVolume}</span>
            <Icon
              name="icon-close"
              className={styles.resetFilters}
              onClick={handleVolumeReset}
            />
          </div>
        )}
      </div>
    </div>
  );
}
