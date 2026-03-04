//  Парсимо дату з бекенду (формат "DD.MM.YYYY") у Date

export const parseSwaggerDate = (value?: string | null): Date | null => {
  if (!value) return null;
  const [day, month, year] = value.split(".");
  if (!day || !month || !year) return null;
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  return isNaN(d.getTime()) ? null : d;
};

// Форматуємо Date у формат "DD.MM.YYYY" для відправки на бекенд

export const formatToSwaggerDate = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

// Перетворюємо ISO-дату ("2025-11-10T00:00:00Z") у формат "10 листопада 2025"

export function convertDayToString(isoDateStr: string): string {
  const date = new Date(isoDateStr);

  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

export const formatISOToDMY = (iso?: string | null): string => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("uk-UA");
};
