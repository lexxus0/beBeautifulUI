export function convertDayToString(isoDateStr: string): string {
  const date = new Date(isoDateStr);

  const months: string[] = [
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

  const day: number = date.getUTCDate();
  const month: string = months[date.getUTCMonth()];
  const year: number = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}
