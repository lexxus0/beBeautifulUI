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
