"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { LeadFormField, LeadFormInput, LeadFormSelect } from "@/components/forms";

const VEHICLE_PRESETS: { id: string; label: string; kwhPer100Mi: number }[] = [
  { id: "m3", label: "Typical compact sedan (~27 kWh/100 mi)", kwhPer100Mi: 27 },
  { id: "suv", label: "Typical crossover / SUV (~35 kWh/100 mi)", kwhPer100Mi: 35 },
  { id: "truck", label: "Larger EV truck / 3-row (~45 kWh/100 mi)", kwhPer100Mi: 45 },
  { id: "custom", label: "Custom efficiency (below)", kwhPer100Mi: 32 },
];

const RATE_PRESETS: { id: string; label: string; perKwh: number; hint: string }[] = [
  {
    id: "offpeak",
    label: "Mostly overnight off-peak (EV-style plan)",
    perKwh: 0.24,
    hint: "Illustrative; PG&E EV time-of-use plans reward charging after peak.",
  },
  {
    id: "blended",
    label: "Blended typical home use",
    perKwh: 0.32,
    hint: "Rough average if some charging happens in pricier hours.",
  },
  {
    id: "peak",
    label: "Often during peak hours (4–9 p.m.)",
    perKwh: 0.45,
    hint: "Avoid charging during peak when possible.",
  },
];

const PUBLIC_BLEND_PER_KWH = 0.52;

const toolSurfaceClass =
  "rounded-2xl bg-muted/10 p-6 ring-1 ring-inset ring-white/[0.05] sm:p-8";

export function EvChargingCalculators({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-10 lg:grid-cols-2", className)}>
      <MonthlyCostEstimator />
      <ChargingTimeEstimator />
    </div>
  );
}

function MonthlyCostEstimator() {
  const [milesMonth, setMilesMonth] = useState(900);
  const [vehiclePreset, setVehiclePreset] = useState("m3");
  const [customKwh, setCustomKwh] = useState(32);
  const [homeCharging, setHomeCharging] = useState(true);
  const [rateId, setRateId] = useState("offpeak");
  const [gasPrice, setGasPrice] = useState(4.75);
  const [iceMpg, setIceMpg] = useState(28);

  const kwhPer100 =
    vehiclePreset === "custom"
      ? Math.min(80, Math.max(18, customKwh || 32))
      : (VEHICLE_PRESETS.find((v) => v.id === vehiclePreset)?.kwhPer100Mi ?? 32);

  const rate = RATE_PRESETS.find((r) => r.id === rateId)?.perKwh ?? 0.32;
  const kwhMonth = useMemo(() => (milesMonth * kwhPer100) / 100, [milesMonth, kwhPer100]);
  const elecPerKwh = homeCharging ? rate : PUBLIC_BLEND_PER_KWH;
  const electricCost = useMemo(() => kwhMonth * elecPerKwh, [kwhMonth, elecPerKwh]);
  const gasCost = useMemo(() => {
    if (iceMpg <= 0 || milesMonth <= 0) return 0;
    return (milesMonth / iceMpg) * gasPrice;
  }, [milesMonth, iceMpg, gasPrice]);

  return (
    <div className={cn(toolSurfaceClass, "space-y-6")}>
      <div>
        <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">Monthly cost vs gas</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground/90 sm:text-sm">
          Rough estimate only—not a quote. Rates change; your real bill depends on your plan, season, and usage.
        </p>
      </div>

      <div className="space-y-4">
        <LeadFormField label="Miles per month" id="est-miles">
          <LeadFormInput
            id="est-miles"
            type="number"
            min={0}
            step={50}
            value={Number.isNaN(milesMonth) ? "" : milesMonth}
            onChange={(e) => setMilesMonth(Number(e.target.value))}
          />
        </LeadFormField>

        <fieldset className="space-y-2">
          <legend className="evo-body-sm font-medium text-foreground">Home charging</legend>
          <label className="flex items-center gap-2 evo-body-sm cursor-pointer">
            <input
              type="radio"
              name="homeCharging"
              checked={homeCharging}
              onChange={() => setHomeCharging(true)}
              className="rounded-full border-border text-primary focus:ring-primary"
            />
            Mostly at home (garage / driveway)
          </label>
          <label className="flex items-center gap-2 evo-body-sm cursor-pointer">
            <input
              type="radio"
              name="homeCharging"
              checked={!homeCharging}
              onChange={() => setHomeCharging(false)}
              className="rounded-full border-border text-primary focus:ring-primary"
            />
            Mostly public charging
          </label>
        </fieldset>

        <LeadFormField label="Vehicle efficiency" id="est-vehicle">
          <LeadFormSelect
            id="est-vehicle"
            value={vehiclePreset}
            onChange={(e) => setVehiclePreset(e.target.value)}
          >
            {VEHICLE_PRESETS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </LeadFormSelect>
        </LeadFormField>

        {vehiclePreset === "custom" && (
          <LeadFormField label="kWh per 100 miles" id="est-custom-kwh">
            <LeadFormInput
              id="est-custom-kwh"
              type="number"
              min={18}
              max={80}
              step={1}
              value={customKwh}
              onChange={(e) => setCustomKwh(Number(e.target.value))}
            />
          </LeadFormField>
        )}

        {homeCharging && (
          <LeadFormField label="PG&E-style assumption (illustrative $/kWh)" id="est-rate">
            <LeadFormSelect
              id="est-rate"
              value={rateId}
              onChange={(e) => setRateId(e.target.value)}
            >
              {RATE_PRESETS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label} (~${r.perKwh.toFixed(2)}/kWh)
                </option>
              ))}
            </LeadFormSelect>
            <p className="evo-muted text-xs mt-1.5">
              {RATE_PRESETS.find((r) => r.id === rateId)?.hint}
            </p>
          </LeadFormField>
        )}

        {!homeCharging && (
          <p className="rounded-lg bg-background/40 px-3 py-2.5 text-[13px] leading-relaxed text-muted-foreground/90 ring-1 ring-inset ring-white/[0.05] sm:text-sm">
            Using a higher illustrative rate (~${PUBLIC_BLEND_PER_KWH.toFixed(2)}/kWh) for a public-charging-heavy
            mix. DC fast sessions are often more per kWh than home charging.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <LeadFormField label="Gas price ($/gal) for comparison" id="est-gas">
            <LeadFormInput
              id="est-gas"
              type="number"
              min={2}
              max={8}
              step={0.05}
              value={gasPrice}
              onChange={(e) => setGasPrice(Number(e.target.value))}
            />
          </LeadFormField>
          <LeadFormField label="Comparable gas MPG" id="est-mpg">
            <LeadFormInput
              id="est-mpg"
              type="number"
              min={15}
              max={60}
              step={1}
              value={iceMpg}
              onChange={(e) => setIceMpg(Number(e.target.value))}
            />
          </LeadFormField>
        </div>
      </div>

      <div className="space-y-2 rounded-xl bg-primary/[0.06] p-4 ring-1 ring-inset ring-primary/15 sm:p-5">
        <p className="text-[13px] text-foreground sm:text-sm">
          <span className="font-medium">~{kwhMonth.toFixed(0)} kWh</span> / month at this driving level
        </p>
        <p className="text-[13px] text-foreground sm:text-sm">
          <span className="font-medium">~${electricCost.toFixed(0)}</span> / month charging (illustrative)
        </p>
        <p className="text-[13px] text-muted-foreground/90 sm:text-sm">
          vs <span className="text-foreground font-medium">~${gasCost.toFixed(0)}</span> / month gas at {iceMpg}{" "}
          MPG and ${gasPrice.toFixed(2)}/gal
        </p>
      </div>
    </div>
  );
}

function ChargingTimeEstimator() {
  const [milesToAdd, setMilesToAdd] = useState(100);
  const [level, setLevel] = useState<"l1" | "l2" | "dc">("l2");
  const [l2Mph, setL2Mph] = useState(32);

  const milesPerHour =
    level === "l1" ? 5 : level === "l2" ? Math.min(55, Math.max(18, l2Mph)) : 130;

  const hours = milesToAdd > 0 && milesPerHour > 0 ? milesToAdd / milesPerHour : 0;

  return (
    <div className={cn(toolSurfaceClass, "space-y-6")}>
      <div>
        <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">Charging time (rough)</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground/90 sm:text-sm">
          Level 1 uses ~5 miles of range per hour as a common rule of thumb (U.S. DOE). Level 2 and DC vary a lot by
          car, charger, and battery state—treat this as a ballpark.
        </p>
      </div>

      <div className="space-y-4">
        <LeadFormField label="Miles of range to add" id="time-miles">
          <LeadFormInput
            id="time-miles"
            type="number"
            min={1}
            max={500}
            step={10}
            value={milesToAdd}
            onChange={(e) => setMilesToAdd(Number(e.target.value))}
          />
        </LeadFormField>

        <LeadFormField label="Charger type" id="time-level">
          <LeadFormSelect id="time-level" value={level} onChange={(e) => setLevel(e.target.value as typeof level)}>
            <option value="l1">Level 1 (120V outlet, ~5 mi/hr)</option>
            <option value="l2">Level 2 (240V, adjustable)</option>
            <option value="dc">DC fast (public, very rough)</option>
          </LeadFormSelect>
        </LeadFormField>

        {level === "l2" && (
          <LeadFormField label="Miles per hour (your setup)" id="time-l2mph">
            <input
              id="time-l2mph"
              type="range"
              min={18}
              max={45}
              value={l2Mph}
              onChange={(e) => setL2Mph(Number(e.target.value))}
              className="w-full accent-primary h-2 cursor-pointer"
            />
            <p className="evo-muted text-xs mt-1">About {l2Mph} mi/hr</p>
          </LeadFormField>
        )}

        {level === "dc" && (
          <p className="evo-body-sm text-muted-foreground">
            DC fast charging slows as the battery fills; long road-trip stops are real-world, not lab-smooth.
          </p>
        )}
      </div>

      <div className="rounded-xl bg-background/35 p-4 ring-1 ring-inset ring-white/[0.06] sm:p-5">
        <p className="text-[0.9375rem] text-foreground sm:text-base">
          Ballpark time: <span className="font-semibold text-primary">{hours.toFixed(1)} hours</span>
        </p>
        <p className="evo-muted text-xs mt-1">
          {level === "l1" && "Great for light daily drivers with time to spare overnight."}
          {level === "l2" && "What most owners rely on for everyday charging at home."}
          {level === "dc" && "For trips and quick top-ups—not the typical full home solution."}
        </p>
      </div>
    </div>
  );
}

export function ChargingChecklistPrint({ className }: { className?: string }) {
  return (
    <div className={cn(toolSurfaceClass, className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">Installer-ready checklist</h2>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted-foreground/90 sm:text-sm">
            Print or save this list for your electrician. It stays high-level on purpose.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="shrink-0 rounded-lg bg-background/50 px-4 py-2.5 text-sm font-medium text-foreground ring-1 ring-inset ring-white/[0.08] transition-colors hover:bg-muted/40 evo-focus-ring"
        >
          Print checklist
        </button>
      </div>
      <ul
        id="charging-install-checklist"
        className="mt-6 list-disc space-y-2.5 pl-5 text-[13px] leading-relaxed text-muted-foreground/90 sm:text-sm print:text-black"
      >
        <li>Where will the charger or 240V outlet live (indoor wall, garage, carport, driveway)?</li>
        <li>Approximate distance from electrical panel to the parking spot</li>
        <li>Panel space for a dedicated circuit (your electrician confirms)</li>
        <li>Whether you want a hardwired wall unit or a 240V outlet + portable cord</li>
        <li>Wi‑Fi / smart scheduling features (optional) and whether your utility offers time-of-use rates</li>
        <li>Local permit and inspection requirements (your installer usually handles this)</li>
        <li>Photos of your panel label and parking area (helpful for quotes)</li>
      </ul>
    </div>
  );
}
