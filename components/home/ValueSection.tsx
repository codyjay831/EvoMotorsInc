import { CarFront, Zap, Compass, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ValueSectionProps = {
  className?: string;
};

const VALUE_ITEMS: Array<{
  title: string;
  description: string;
  Icon: LucideIcon;
}> = [
  {
    title: "Curated Inventory",
    description: "Hand-picked EVs ready to drive.",
    Icon: CarFront,
  },
  {
    title: "EV Expertise",
    description: "We guide you through range, charging, and incentives.",
    Icon: Zap,
  },
  {
    title: "Right Fit",
    description: "Find the EV that matches your life.",
    Icon: Compass,
  },
];

export function ValueSection({ className }: ValueSectionProps) {
  return (
    <section
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      aria-label="EV value proposition"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-5">
          {VALUE_ITEMS.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <span
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-teal-400"
                  aria-hidden
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-white/70 sm:text-base">{description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="min-h-24 rounded-2xl border border-white/5 bg-gradient-to-r from-transparent via-white/5 to-transparent md:min-h-full" />
      </div>
    </section>
  );
}
