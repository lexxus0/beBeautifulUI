type StarGradientProp = {
  type?: "filled" | "half" | "empty";
  id?: string;
  className?: string;
};
export function StarGradient({
  type = "filled",
  id = "star",
  className,
}: StarGradientProp) {
  const gradientId = `${id}-${type}`;

  const gradients = {
    filled: [
      { offset: "0%", color: "#c48e28" },
      { offset: "50%", color: "#c09e5c" },
      { offset: "100%", color: "#c48e28" },
    ],
    half: [
      { offset: "0%", color: "#c48e28" },
      { offset: "50%", color: "#ddcbaa" },
      { offset: "100%", color: "#fff0d4" },
    ],
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        {type !== "empty" && (
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {gradients[type].map((stop, index) => (
              <stop key={index} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        )}
      </defs>

      <path
        d="M12 17.27l5.18 3.05-1.64-5.81L20 9.24l-6-.52L12 3.5 10 8.72 4 9.24l4.46 5.27L6.82 20z"
        fill={type === "empty" ? "#e0e0e0" : `url(#${gradientId})`}
      />
    </svg>
  );
}
