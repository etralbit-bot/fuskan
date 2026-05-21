import Image from "next/image";

type BrandLogoProps = {
  /** Tailwind height classes; width follows aspect ratio */
  className?: string;
  /** Pixel height for next/image intrinsic size (layout hint) */
  heightPx?: number;
  /** Pixel width hint for next/image (aspect ratio) */
  widthPx?: number;
  priority?: boolean;
};

export default function BrandLogo({
  className = "h-10 w-auto md:h-11",
  heightPx = 140,
  widthPx = 126,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Fuskan Global Exports"
      width={widthPx}
      height={heightPx}
      className={`object-contain object-left ${className}`}
      style={{ width: "auto", height: "auto" }}
      priority={priority}
    />
  );
}
