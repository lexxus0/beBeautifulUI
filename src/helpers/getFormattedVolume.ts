export function getFormattedVolume(
  volumeString: string | null | undefined
): string {
  if (typeof volumeString !== "string" || !volumeString) {
    return "";
  }

  const match = volumeString.match(/^(\d+)([a-zA-Z]+)$/);

  if (!match) return volumeString;

  const value = Number(match[1]);
  const unit = match[2].toLowerCase();

  const unitMap: Record<string, string> = {
    ml: "мл",
    l: "л",
    g: "г",
    kg: "кг",
  };

  return `${value} ${unitMap[unit] ?? unit}`;
}
