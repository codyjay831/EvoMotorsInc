"use client";

import { useCallback, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type LifestyleScenario = {
  id: string;
  title: string;
  summary: string;
  chargingFit: string;
  dailyLife: string;
  practicalNote: string;
};

const SCENARIOS: LifestyleScenario[] = [
  {
    id: "apartment",
    title: "Apartment or shared parking",
    summary: "With shared power, start with reliable access, not peak amperage.",
    chargingFit:
      "Level 1 works if you control a safe, dedicated outlet. Otherwise prioritize building Level 2, workplace charging, or a dependable public mix. Fast charging fills gaps, not everyday life.",
    dailyLife:
      "You plug in when the spot allows and lean on networks when you are out. Most of your savings still come from slower, cheaper kWh whenever you can get them.",
    practicalNote: "Ask about EV policies and charger waitlists before you move or buy. Rules beat specs.",
  },
  {
    id: "house",
    title: "House with a garage or driveway",
    summary: "Home base: Level 2 is the calm default once you commit.",
    chargingFit:
      "Level 1 can buy time while you plan. Level 2 is what most owners install for predictable overnight fills and winter headroom.",
    dailyLife:
      "Pull in, plug in, walk away. Mornings start with a full “tank” without a side trip.",
    practicalNote: "If you want 240V ready near delivery, line up an electrician quote early. Permits often add a little time.",
  },
  {
    id: "long-commute",
    title: "Long commute",
    summary: "High miles: overnight speed usually pays for itself in peace of mind.",
    chargingFit:
      "Level 2 is the comfort pick. Keep DC fast in your pocket for emergencies, not as your primary plan.",
    dailyLife:
      "Charging happens while you sleep, not between meetings. You stop thinking about “finding time” to charge.",
    practicalNote: "Heat, hills, and speed trim range, so leave a little buffer in your nightly routine.",
  },
  {
    id: "short-commute",
    title: "Short commute + errands",
    summary: "Light daily miles: Level 1 often buys breathing room to decide.",
    chargingFit:
      "Level 1 may cover you for a while. Level 2 still wins if you want faster top-ups or bigger weekend swings.",
    dailyLife:
      "Short hops mean the pack rarely feels empty; charging feels optional until it suddenly is not, so plan one level up.",
    practicalNote: "Reassess before road-trip season if your weekend miles jump.",
  },
  {
    id: "road-trips",
    title: "Frequent road trips",
    summary: "Home for the week, fast chargers for the miles that matter.",
    chargingFit:
      "Level 2 at home for the bulk of kWh, plus comfort with DC fast when you are covering distance.",
    dailyLife:
      "Weekdays look like any other owner; trip days you plan around short, predictable stops instead of range anxiety.",
    practicalNote: "Pick one route planner or in-car flow you trust. You will use it more than a spec-sheet kW number.",
  },
];

const panelEase = [0.22, 1, 0.36, 1] as const;

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/75";

export function LifestyleChargingGuide({ className }: { className?: string }) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <div
      className={cn(
        "rounded-2xl bg-muted/15 p-1.5 sm:p-2 ring-1 ring-inset ring-white/[0.05]",
        className
      )}
    >
      <div className="flex flex-col gap-1 sm:gap-1.5" role="list">
        {SCENARIOS.map((item, index) => {
          const isOpen = openId === item.id;
          const panelId = `${baseId}-${item.id}-panel`;
          const headerId = `${baseId}-${item.id}-header`;
          const n = String(index + 1).padStart(2, "0");

          return (
            <div
              key={item.id}
              role="listitem"
              className={cn(
                "rounded-xl transition-[background-color,box-shadow] duration-200 ease-out",
                isOpen
                  ? "bg-surface/45 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
                  : "bg-transparent hover:bg-surface/30"
              )}
            >
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={cn(
                  "flex w-full min-h-[3.25rem] sm:min-h-[3.5rem] items-start gap-3 sm:gap-4 px-3.5 py-4 sm:px-5 sm:py-[1.125rem] text-left",
                  "rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                <span
                  className="mt-0.5 w-6 shrink-0 text-right text-[11px] font-medium tabular-nums text-muted-foreground/45 sm:w-7"
                  aria-hidden
                >
                  {n}
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <span className="text-[0.9375rem] font-semibold leading-snug tracking-tight text-foreground sm:max-w-[min(100%,20rem)] sm:pt-0.5">
                    {item.title}
                  </span>
                  <span className="text-[13px] leading-snug text-muted-foreground/90 sm:max-w-[min(100%,22rem)] sm:pt-0.5 sm:text-right">
                    {item.summary}
                  </span>
                </span>

                <span
                  className={cn(
                    "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                    isOpen ? "bg-primary/15 text-primary" : "bg-background/40 text-muted-foreground"
                  )}
                  aria-hidden
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.26, ease: panelEase }}
                    className="flex"
                  >
                    <ChevronDown className="size-[1.125rem]" strokeWidth={2} />
                  </motion.span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: panelEase }}
                    className="overflow-hidden"
                  >
                    <div className="mx-3.5 mb-4 border-t border-white/[0.06] pt-4 sm:mx-5 sm:mb-5 sm:pt-5">
                      <div className="grid max-w-2xl gap-5 pl-0 sm:pl-10">
                        <div>
                          <p className={labelClass}>Likely charging fit</p>
                          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                            {item.chargingFit}
                          </p>
                        </div>
                        <div>
                          <p className={labelClass}>What daily life feels like</p>
                          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                            {item.dailyLife}
                          </p>
                        </div>
                        <div>
                          <p className={labelClass}>Practical note</p>
                          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                            {item.practicalNote}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
