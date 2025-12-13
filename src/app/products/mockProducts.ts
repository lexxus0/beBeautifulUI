// import { IProduct } from "@/types/types";

// export const mockProducts: IProduct[] = [
//   {
//     _id: "test-product-1",
//     name: {
//       ua: "Шампунь зволожуючий",
//       en: "Moisturizing Shampoo",
//     },
//     sku: "SH-TEST-001",
//     category: "hair",

//     imageUrl: "",

//     //  Загальна наявність товару
//     inStock: true,

//     //  Варіанти обʼєму (як з беку)
//     volumeOptions: ["250ml", "500ml", "1L"],

//     //  Ціни по обʼємах (volume — ЧИСЛО, ml)
//     priceByVolume: [
//       {
//         _id: "vol-250",
//         volume: 250,
//         price: 500,
//         stockQuantity: 10,
//       },
//       {
//         _id: "vol-500",
//         volume: 500,
//         price: 900,
//         stockQuantity: 0,// ❗ немає в наявності
//       },
//       {
//         _id: "vol-1000",
//         volume: 1000,
//         price: 1500,
//         stockQuantity: 5, 
//       },
//     ],

//     stockQuantity: 15,

//     features: ["зволоження", "без сульфатів"],

//     description: "Тестовий опис шампуню",
//     instructions: "Нанести, змити",

//     activeIngredients: [
//       {
//         _id: "ing-1",
//         name: {
//           ua: "Алое Вера",
//           en: "Aloe Vera",
//         },
//       },
//     ],

//     inciList: ["Aqua", "Aloe Extract"],

//     isVegan: true,
//     isPromoted: false,

//     reviews: [
//       {
//         _id: "rev-1",
//         productId: "test-product-1",
//         userId: "user-1",
//         rating: 5,
//         comment: "Супер!",
//         likes: 0,
//         dislikes: 0,
//         likedBy: [],
//         dislikedBy: [],
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       },
//     ],

//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },

//   // ❌ Товар повністю відсутній
//   {
//     _id: "test-product-2",
//     name: {
//       ua: "Маска для волосся",
//       en: "Hair Mask",
//     },
//     sku: "MASK-TEST-002",
//     category: "hair",

//     imageUrl: "",

//     inStock: false,

//     volumeOptions: ["200ml"],

//     priceByVolume: [
//       {
//         _id: "vol-200",
//         volume: 200,
//         price: 650,
//         stockQuantity: 0,
//       },
//     ],

//     stockQuantity: 0,

//     features: ["живлення"],
//     description: "Немає в наявності",
//     instructions: "—",

//     activeIngredients: [],
//     inciList: [],

//     isVegan: false,
//     isPromoted: false,

//     reviews: [],

//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ];
