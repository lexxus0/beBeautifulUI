type IconsProps = {
  name: string;
  width: number;
  height: number;
  color?: string;
  useGradient?: boolean;
};

export default function Icon({
  name,
  width,
  height,
  color = "currentColor",
  useGradient,
}: IconsProps) {
  let fillColor = color;

  if (useGradient) {
    if (name === "icon-star") {
      fillColor = "url(#star-gold-gradient)";
    } else if (name === "icon-heart") {
      fillColor = "url(#gold-gradient)";
    }
  }

  return (
    <svg width={width} height={height} fill={fillColor} aria-hidden="true">
      <use xlinkHref={`/symbol-defs.svg#${name}`} />
    </svg>
  );
}
