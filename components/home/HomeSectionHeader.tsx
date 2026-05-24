import { cn } from "@/lib/utils";

type HomeSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function HomeSectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: HomeSectionHeaderProps) {
  return (
    <div className={cn("mb-6 sm:mb-8", className)}>
      {eyebrow ? <p className="evo-eyebrow text-foreground/70">{eyebrow}</p> : null}
      <div
        className={cn(
          action && "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6"
        )}
      >
        <div>
          <h2 className={cn("evo-section-heading text-foreground", eyebrow && "mt-2")}>{title}</h2>
          {description ? (
            <p className="evo-body-sm mt-3 max-w-2xl text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
    </div>
  );
}
