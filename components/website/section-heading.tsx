import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: React.ReactNode;
  eyebrow?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  children,
  eyebrow,
  className,
  as: Component = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {eyebrow && (
        <p className="evo-eyebrow" data-slot="section-eyebrow">
          {eyebrow}
        </p>
      )}
      <Component className="evo-section-heading text-foreground" data-slot="section-title">
        {children}
      </Component>
    </div>
  );
}
