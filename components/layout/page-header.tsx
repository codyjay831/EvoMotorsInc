import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("space-y-2", className)}>
      {eyebrow && <p className="evo-eyebrow">{eyebrow}</p>}
      <h1 className="evo-section-heading text-foreground">{title}</h1>
      {description && (
        <p className="evo-body text-muted-foreground max-w-2xl">{description}</p>
      )}
    </header>
  );
}
