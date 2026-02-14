import Image from "next/image";

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export function BrandLogo({ size = 40, className = "" }: BrandLogoProps) {
  return (
    <span className={className}>
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        className="opacity-75 dark:hidden"
      />
      <Image
        src="/logo-inverted.png"
        alt=""
        width={size}
        height={size}
        className="hidden opacity-75 dark:block"
      />
    </span>
  );
}
