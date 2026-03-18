import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Hide text and show only mark */
  markOnly?: boolean;
  /** Size preset for the image */
  size?: "sm" | "md" | "lg";
};

const sizeMap = { sm: 28, md: 36, lg: 44 };

export function Logo({
  className,
  markOnly = false,
  size = "md",
}: LogoProps) {
  const px = sizeMap[size];
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
        className="shrink-0 object-contain"
        priority
        unoptimized
      />
      {!markOnly && (
        <span className="evo-card-title tracking-tight">{SITE.name}</span>
      )}
    </Link>
  );
}
