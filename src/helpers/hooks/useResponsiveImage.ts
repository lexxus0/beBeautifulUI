import { useBreakpoint } from "@/helpers/hooks/useBreakpoint";

interface ImageSize {
  w: number;
  h: number;
}

interface UseResponsiveImageResult {
  size: ImageSize;
  srcPlaceholder: string;
}

export const useResponsiveImage = (
  mobileSize: ImageSize,
  tabletSize: ImageSize,
  desktopSize: ImageSize
): UseResponsiveImageResult => {
  const bp = useBreakpoint();

  const size =
    bp === "mobile"
      ? mobileSize
      : bp === "tablet"
      ? tabletSize
      : desktopSize;

  const srcPlaceholder =
    bp === "mobile"
      ? "/images/placeholder/placeholder-mob.png"
      : bp === "tablet"
      ? "/images/placeholder/placeholder-tab.png"
      : "/images/placeholder/placeholder-desk.png";

  return { size, srcPlaceholder };
};
