import Image from "next/image";
import { cn } from "@/lib/utils";

type RoadSectionProps = {
  className?: string;
};

export function RoadSection({ className }: RoadSectionProps) {
  return (
    <section
      className={cn(
        "relative left-1/2 right-1/2 -mx-[50vw] h-[400px] w-screen md:h-[650px]",
        className
      )}
      aria-label="Road ahead"
    >
      <Image
        src="/hero/road-hero.png"
        alt="Road ahead"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-white/90" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm tracking-widest text-teal-400">EVO MOTORS</p>
        <h2 className="text-4xl font-semibold text-white md:text-6xl">
          Built for the road ahead
        </h2>
        <p className="mt-4 max-w-2xl text-white/70">
          From choosing the right vehicle to understanding range, charging, and
          home setup — we make going electric simple.
          <br />
          <br />
          Home charging installation through our partner company ensures your EV
          fits seamlessly into your life.
        </p>
      </div>
    </section>
  );
}
