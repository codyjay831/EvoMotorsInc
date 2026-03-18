import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Use SectionHeading-style spacing above/below */
  spacing?: "default" | "tight" | "loose";
  as?: "section" | "div";
};

const spacingMap = {
  default: "py-16 sm:py-20 lg:py-24",
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
