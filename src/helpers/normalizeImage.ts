// export const normalizeBackendImageUrl = (src?: string | null): string | null => {
//   if (!src) return null;

//   // якщо бек вже повернув повну URL
//   if (src.startsWith("http://") || src.startsWith("https://" || src.startsWith("blob:"))) {
//     return src;
//   }

//   // прибираємо початкові слеші
//   let cleaned = src.replace(/^\/+/, "");

//   // якщо рядок починається з "3001/", вирізаємо цей префікс
//   if (cleaned.startsWith("3001/")) {
//     cleaned = cleaned.slice("3001/".length);
//   }
//   const origin =
//     process.env.NEXT_PUBLIC_API_ORIGIN || "https://be-beautiful-backend.onrender.com";

//   return `${origin}/${cleaned}`;
// };

export const normalizeBackendImageUrl = (src?: string | null): string | null => {
  if (!src) return null;

  // вже повний URL
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("blob:")) {
    // dev: якщо раптом фото вказує на 3001 (порт фронта) — міняємо на 3000 (бек)
    if (process.env.NODE_ENV !== "production") {
      return src.replace("http://localhost:3001", "http://localhost:3000");
    }
    // prod: підмінимо localhost → прод-домен бекенда, якщо таке трапиться
    return src.replace("http://localhost:3000", "https://be-beautiful-backend.onrender.com");
  }

  // відносні шляхи → додаємо базу бекенда залежно від середовища
  const base =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000" // 👈 БЕК на 3000
      : "https://be-beautiful-backend.onrender.com";

  return `${base}/${src.replace(/^\/+/, "")}`;
};
