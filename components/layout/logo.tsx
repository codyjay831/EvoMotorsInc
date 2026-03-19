import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Hide text and show only mark (use in nav when logo includes brand name) */
  markOnly?: boolean;
  /** Size preset for the image; use "nav" for header (32–40px) */
  size?: "sm" | "md" | "lg" | "nav";
};

const sizeMap = { sm: 28, md: 36, lg: 44 };
/** Nav bar logo height (32–40px) */
const NAV_LOGO_HEIGHT = 36;

export function Logo({
  className,
  markOnly = false,
  size = "md",
}: LogoProps) {
  const px = size === "nav" ? NAV_LOGO_HEIGHT : sizeMap[size];
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 text-foreground no-underline transition-opacity hover:opacity-90",
        className
      )}
      aria-label={`${SITE.name} home`}
    >
      <Image
        src={SITE.logoPath}
        alt=""
        width={px}
        height={px}
        className="shrink-0 object-contain object-left"
        priority
        unoptimized
      />
      {!markOnly && (
        <span className="evo-card-title tracking-tight">{SITE.name}</span>
      )}
    </Link>
  );
}
