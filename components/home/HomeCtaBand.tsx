import Link from "next/link";
import { cn } from "@/lib/utils";

const outlineButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 evo-focus-ring";

type HomeCtaBandProps = {
  className?: string;
};

export function HomeCtaBand({ className }: HomeCtaBandProps) {
  return (
    <section className={cn("evo-home-section", className)} aria-label="Next steps">
      <div className="evo-home-panel py-12 sm:py-14 px-6 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="evo-section-heading text-foreground">Need help finding the right EV?</h2>
          <p className="evo-body mt-4 text-muted-foreground">
            Share your preferred model, budget, and timeline. We will help you narrow the right fit and next steps.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/request-vehicle" className={outlineButtonClass}>
              Request a Vehicle
            </Link>
            <Link href="/contact?intent=inventory-help" className={outlineButtonClass}>
              Talk to Evo Motors
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
