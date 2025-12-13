// import { IProduct } from "@/types/types";

// export const mockProduct: { [key: string]: IProduct } = {
//   // Товар повністю відсутній
//   outOfStockProduct: {
//     _id: "prod-out-001",
//     name: { en: "Шампунь плюс", ua: "Шампунь плюс" },
//     sku: "SH00000",
//     volumeOptions: ["250ml", "500ml", "1L"],
//     priceByVolume: [
//       { volume: 250, price: 500, stockQuantity: 0, _id: "vol1" },
//       { volume: 500, price: 900, stockQuantity: 0, _id: "vol2" },
//       { volume: 1000, price: 1560, stockQuantity: 0, _id: "vol3" },
//     ],
//     stockQuantity: 0,
//     features: ["увлажнение", "питание", "без сульфатов"],
//     description: { ua: "Отличный шампунь для сухих волос", en: "" },
//     instructions: "",
//     activeIngredients: [],
//     inciList: [],
//     category: "hair",
//     isVegan: true,
//     imageUrl: "",
//     inStock: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     isPromoted: false,
//   },

//   // Товар є, але 500ml відсутній
//   missing500ml: {
//     _id: "prod-500-001",
//     name: { en: "Шампунь плюс", ua: "Шампунь плюс" },
//     sku: "SH12345",
//     volumeOptions: ["250ml", "500ml", "1L"],
//     priceByVolume: [
//       { volume: 250, price: 500, stockQuantity: 100, _id: "vol1" },
//       { volume: 500, price: 900, stockQuantity: 0, _id: "vol2" }, // недоступний
//       { volume: 1000, price: 1560, stockQuantity: 100, _id: "vol3" },
//     ],
//     stockQuantity: 200,
//     features: ["увлажнение", "питание", "без сульфатов"],
//     description: {
//       ua: "Отличный шампунь для сухих волос",
//       en: "",
//     },
//     instructions: "Наносить на влажные волосы, вспенить и смыть",
//     activeIngredients: [
//       { name: { en: "Алоэ Вера", ua: "Алоэ Вера" }, _id: "ai1" },
//     ],
//     inciList: ["Aqua", "Sodium Laureth Sulfate", "Aloe Vera Extract"],
//     category: "hair",
//     isVegan: true,
//     imageUrl: "",
//     inStock: true,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     isPromoted: false,
//   },
// };
