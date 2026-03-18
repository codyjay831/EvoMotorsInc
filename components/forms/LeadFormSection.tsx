import { cn } from "@/lib/utils";

type LeadFormSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function LeadFormSection({ title, children, className }: LeadFormSectionProps) {
  return (
    <fieldset className={cn("space-y-4", className)}>
      <legend className="evo-card-title text-foreground">{title}</legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}
