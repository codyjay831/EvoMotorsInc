import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type RoadStorySectionProps = {
  className?: string;
};

const ROAD_BEATS = [
  {
    headline: "Confidence for the road ahead",
    subtext: "Everything you need to go electric, kept simple.",
  },
  {
    headline: "Choosing an EV shouldn't feel complicated.",
    subtext:
      "We guide you through range, charging, and real-world ownership so you know what to expect.",
  },
  {
    headline:
      "Home charging support through BayTech Smart Homes helps your EV fit seamlessly into your life.",
    subtext: null as string | null,
  },
] as const;

export function RoadStorySection({ className }: RoadStorySectionProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      aria-label="Why Evo Motors"
    >
      <div className="relative">
        <div className="absolute inset-0 opacity-20 md:opacity-30" aria-hidden>
          <Image
            src="/hero/road-hero2.1.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"
          aria-hidden
        />

        <div className="relative px-5 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="evo-content-width mx-auto">
            <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
              {ROAD_BEATS.map((beat, index) => (
                <div key={beat.headline}>
                  <h2
                    className={cn(
                      "font-semibold tracking-tight text-foreground",
                      index === 0 ? "text-2xl md:text-xl lg:text-2xl" : "text-xl md:text-lg lg:text-xl"
                    )}
                  >
                    {beat.headline}
                  </h2>
                  {beat.subtext ? (
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">{beat.subtext}</p>
                  ) : null}
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-muted-foreground md:mt-12">
              Learn more about{" "}
              <Link href="/ev-charging" className="font-medium text-primary no-underline hover:text-primary/90 evo-focus-ring rounded-sm">
                home EV charging
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
