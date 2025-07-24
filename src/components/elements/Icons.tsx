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
  return (
    <svg
      width={width}
      height={height}
      fill={useGradient ? "url(#gold-gradient)" : color}
      aria-hidden="true"
    >
      <use xlinkHref={`/symbol-defs.svg#${name}`} />
    </svg>
  );
}
