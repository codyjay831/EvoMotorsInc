import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Use SectionHeading-style spacing above/below */
  spacing?: "default" | "afterHero" | "compact" | "tight" | "loose";
  as?: "section" | "div";
};

const spacingMap = {
  afterHero: "pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20",
  default: "py-12 sm:py-16 lg:py-20",
  compact: "py-8 sm:py-10 lg:py-12",
  tight: "py-10 sm:py-12 lg:py-16",
  loose: "py-20 sm:py-24 lg:py-32",
};

export function Section({
  children,
  className,
  spacing = "default",
  as: Component = "section",
}: SectionProps) {
  return (
    <Component className={cn(spacingMap[spacing], className)}>
      {children}
    </Component>
  );
}
