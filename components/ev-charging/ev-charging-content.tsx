import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Section, SiteContainer } from "@/components/layout";
import { ContactForm } from "@/components/forms";
import {
  EvChargingCalculators,
  ChargingChecklistPrint,
} from "@/components/ev-charging/ev-charging-calculators";
import { LifestyleChargingGuide } from "@/components/ev-charging/lifestyle-charging-guide";
import { cn } from "@/lib/utils";

const external = {
  pgeEvPlans: "https://www.pge.com/en/account/rate-plans/electric-vehicles.html",
  pgeEvCalculator: "https://ev.pge.com/rates",
  pgeEvHome: "https://www.pge.com/en_US/residential/save-energy-money/analyze-your-usage/your-home-or-business-use/charging-your-electric-vehicle.page",
  doeHomeCharging: "https://www.energy.gov/eere/electricvehicles/charging-home",
  afdc: "https://afdc.energy.gov/fuels/electricity_charging.html",
  energyStarEvse: "https://www.energystar.gov/productfinder/product/certified-ev-chargers/results",
} as const;

function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-4 text-[0.9375rem] leading-[1.65] text-muted-foreground/90",
        className
      )}
    >
      {children}
    </div>
  );
}

function Subheading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={cn("evo-section-heading text-foreground", className)}>{children}</h2>;
}

function CardGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>{children}</div>
  );
}

function LevelCard({
  title,
  tag,
  children,
}: {
  title: string;
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-muted/10 p-5 ring-1 ring-inset ring-white/[0.05] transition-colors duration-200 hover:bg-muted/[0.14] sm:p-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">{tag}</p>
        <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">{title}</h3>
      </div>
      <div className="text-[13px] leading-relaxed text-muted-foreground/90 sm:text-sm flex-1">{children}</div>
    </div>
  );
}

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl bg-muted/10 ring-1 ring-inset ring-white/[0.05] transition-colors duration-200 open:bg-muted/[0.14] open:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left text-[0.9375rem] font-medium leading-snug text-foreground sm:px-5 sm:py-[1.125rem] [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 pr-2">{q}</span>
        <ChevronDown
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-open:rotate-180"
          strokeWidth={2}
          aria-hidden
        />
      </summary>
      <div className="border-t border-white/[0.06] px-4 pb-4 pt-3 text-[13px] leading-relaxed text-muted-foreground/90 sm:px-5 sm:text-sm">
        {children}
      </div>
    </details>
  );
}

export function EvChargingContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#0a0a0a]">
        {/* Mobile Hero Image */}
        <Image
          src="/hero/Charging_Hero_Phone.webp"
          alt="EV charging station"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top md:hidden"
        />
        {/* Desktop Hero Image */}
        <Image
          src="/hero/Charging_Hero.webp"
          alt="EV charging station"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center hidden md:block"
        />
        {/* Gradients for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:hidden" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent hidden md:block" aria-hidden />
        
        <SiteContainer className="relative z-10 flex min-h-[85svh] flex-col justify-center py-20 sm:min-h-[480px] sm:justify-end sm:pb-20 lg:min-h-[600px] lg:py-28">
          <div className="max-w-xl [text-shadow:_0_2px_16px_rgb(0_0_0_/_0.8)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary drop-shadow-md sm:text-[11px]">
              Bay Area charging guidance
            </p>
            <h1 className="mt-4 text-[2.25rem] font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-6xl">
              Charging an EV is easier&nbsp;than&nbsp;you&nbsp;think
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
              Most driving is covered overnight at home. Public fast charging is
              for road trips—not daily stress.
            </p>
            <div className="mt-10 flex flex-row gap-2 sm:gap-4">
              <a
                href="#cost-calculator"
                className="flex-1 inline-flex h-12 items-center justify-center rounded-lg bg-primary px-4 py-3 text-[13px] font-semibold text-primary-foreground no-underline shadow-[0_0_20px_-5px_var(--glow-subtle)] transition-all hover:opacity-90 sm:h-11 sm:px-6 sm:text-sm"
              >
                Cost estimator
              </a>
              <Link
                href="/contact"
                className="flex-1 inline-flex h-12 items-center justify-center rounded-lg bg-white/10 px-4 py-3 text-[13px] font-medium text-white no-underline ring-1 ring-inset ring-white/20 backdrop-blur-md transition-colors hover:bg-white/[0.15] sm:h-11 sm:px-6 sm:text-sm"
              >
                Ask a question
              </Link>
            </div>
          </div>
        </SiteContainer>
      </section>

      <SiteContainer className="max-w-6xl">
        <Section spacing="tight" className="pt-12 sm:pt-16 lg:pt-20 pb-14 sm:pb-16 lg:pb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/75">
            Start here
          </p>
          <CardGrid className="mt-6 max-w-5xl gap-3 sm:mt-8 sm:gap-4">
            <LevelCard title="Level 1" tag="120V outlet">
              <p>Normal household plug. Slowest and simplest—works when the car sits for long stretches.</p>
            </LevelCard>
            <LevelCard title="Level 2" tag="240V home">
              <p>Typical home setup. Overnight plug-in; most daily driving never needs a public stop.</p>
            </LevelCard>
            <LevelCard title="DC fast" tag="Public">
              <p>Road-trip and quick top-ups. Handy when you are far from home—often a higher per-kWh cost.</p>
            </LevelCard>
          </CardGrid>
          <Subheading className="mt-8 max-w-xl text-2xl font-semibold tracking-tight sm:mt-10 sm:text-[1.75rem] sm:leading-tight">
            Which one fits your lifestyle?
          </Subheading>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted-foreground/90 sm:mt-5 sm:max-w-lg sm:text-[0.9375rem]">
            Choose the situation closest to yours—we show one path at a time.
          </p>
          <LifestyleChargingGuide className="mt-8 sm:mt-10" />
        </Section>

        <Section spacing="tight" className="border-t border-white/[0.06] pt-12 sm:pt-14 lg:pt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/65">Reference</p>
          <Subheading className="mt-2 max-w-xl text-xl font-semibold tracking-tight text-foreground/95 sm:text-2xl">
            The charging types behind the recommendations
          </Subheading>
          <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-muted-foreground/90 sm:mt-5 sm:max-w-2xl sm:text-[0.9375rem]">
            Quick labels for what you will hear in the showroom—home charging first, fast public charging when you are
            on the move. The DOE commonly cites about{" "}
            <span className="font-medium text-foreground/95">5 miles of range per hour</span> on a regular 120V outlet;
            240V home charging is the usual upgrade; DC fast is for stops away from home.
          </p>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground/70">
            Sources:{" "}
            <a href={external.doeHomeCharging} className="text-primary underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
              DOE — charging at home
            </a>
            {" · "}
            <a href={external.afdc} className="text-primary underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
              AFDC — connectors & basics
            </a>
          </p>
        </Section>

        <Section spacing="tight">
          <Subheading className="max-w-xl">Which charging fits me?</Subheading>
          <Prose className="mt-4 sm:mt-5">
            <p>
              <strong className="text-foreground">Do I actually need anything installed at home?</strong> If you have
              a dedicated parking spot, a normal outlet you can reach safely, and modest daily miles, Level 1 might be
              enough to start. If you want predictable overnight fills or drive more, Level 2 is usually worth it. DC
              fast charging does not replace home charging for daily life—it complements it.
            </p>
          </Prose>
        </Section>

        <Section spacing="tight">
          <Subheading className="max-w-2xl">Can my house handle it?</Subheading>
          <Prose className="mt-4 sm:mt-5">
            <p>
              <strong className="text-foreground">Standard outlet vs 240V:</strong> Level 1 uses a normal household
              circuit; long-term use should be checked for circuit suitability (DOE). Level 2 equipment typically uses
              208/240V—like an electric dryer circuit—and usually needs a dedicated circuit installed by an electrician.
            </p>
            <p>
              <strong className="text-foreground">When panel capacity matters:</strong> Older homes or panels that are
              already full may need a review before adding a 240V circuit. Many installs are straightforward; some need
              a panel upgrade. Either way, it is a known, solvable project—not a mystery.
            </p>
            <p>
              <strong className="text-foreground">Ask an electrician:</strong> A short site visit beats guessing from
              photos online. Bring your vehicle’s max charge rate and where you park; they will size the circuit and
              talk permits.
            </p>
          </Prose>
        </Section>

        <Section spacing="tight">
          <Subheading className="max-w-2xl text-balance">
            {"PG&E rates: peak, off-peak, and why midnight matters"}
          </Subheading>
          <Prose className="mt-4 sm:mt-5">
            <p>
              Many Bay Area homes are on time-of-use pricing: electricity costs more during peak hours (often late
              afternoon and evening) and less overnight (and on some EV plans, during lower-demand midday hours too).
              PG&E highlights residential EV plans (such as EV2-A) where{" "}
              <strong className="text-foreground">charging outside peak—often overnight—can cost much less</strong>{" "}
              than charging while the grid is busiest. Always confirm the exact windows on your plan sheet or in the
              calculator below.
            </p>
            <p>
              Simple example: the same miles use the same kWh, but{" "}
              <strong className="text-foreground">off-peak kWh can be noticeably cheaper</strong> than peak kWh—so
              scheduling charging (or using a smart charger) can show up on your bill.
            </p>
          </Prose>
          <ul className="mt-6 flex max-w-xl flex-col gap-2.5 text-[13px] leading-snug text-muted-foreground/90 sm:text-sm">
            <li>
              <a
                href={external.pgeEvCalculator}
                className="text-primary font-medium underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                PG&E — EV savings calculator (rates)
              </a>
              <span className="text-muted-foreground"> — personalize EV2-A vs other plans</span>
            </li>
            <li>
              <a
                href={external.pgeEvPlans}
                className="text-primary font-medium underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                PG&E — electric vehicle rate plans
              </a>
              <span className="text-muted-foreground"> (official plan details)</span>
            </li>
            <li>
              <a
                href={external.pgeEvHome}
                className="text-primary font-medium underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                PG&E — charging your electric vehicle at home
              </a>
            </li>
          </ul>
        </Section>

        <div id="cost-calculator" className="scroll-mt-28">
          <Section spacing="tight">
            <Subheading className="max-w-xl">Monthly cost vs gas</Subheading>
            <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground/90 sm:mt-5">
              Plug in rough miles, where you charge, and a PG&E-style rate assumption. This is a conversation starter—not
              tax or utility advice.
            </p>
            <div className="mt-8 sm:mt-10">
              <EvChargingCalculators />
            </div>
          </Section>
        </div>

        <Section spacing="tight">
          <Subheading className="max-w-xl">Road trips and public charging</Subheading>
          <Prose className="mt-4 sm:mt-5">
            <p>
              <strong className="text-foreground">“Can I drive to Tahoe?”</strong> For most modern EVs, yes—with a
              little planning on where to fast-charge along the route. Home charging still covers the bulk of yearly
              miles; fast charging is for the long legs.
            </p>
            <p>
              <strong className="text-foreground">“What if I forget to charge?”</strong> You will use a public Level 2
              or DC station, pay a bit more per kWh than at home, and learn your buffer. It happens—and it is why
              networks exist.
            </p>
            <p>
              <strong className="text-foreground">“Do I need Tesla chargers only?”</strong> No. Networks and connector
              types vary by vehicle; adapters and native support change over time. The AFDC summarizes broad Level 1/2
              compatibility and evolving fast-charge connectors (including Tesla / NACS context).
            </p>
          </Prose>
        </Section>

        <Section spacing="tight">
          <Subheading className="max-w-md">What most owners actually do</Subheading>
          <Prose className="mt-4 sm:mt-5">
            <ul className="list-disc pl-5 space-y-2">
              <li>Plug in at home overnight (or whenever the car sits).</li>
              <li>Wake up with enough range for the day.</li>
              <li>Use fast charging mostly on trips—not every grocery run.</li>
              <li>Stop thinking about charging every single day once the routine clicks.</li>
            </ul>
          </Prose>
        </Section>

        <Section spacing="tight">
          <Subheading className="max-w-md">Myths vs reality</Subheading>
          <div className="mt-6 grid max-w-5xl gap-2.5 sm:grid-cols-2 sm:gap-3">
            {[
              { myth: "I need a fast charger at home.", truth: "Most people do not. Level 2 is the common home setup." },
              { myth: "I will definitely need a panel upgrade.", truth: "Sometimes yes—often no. An electrician tells you quickly." },
              { myth: "I will live at public chargers.", truth: "Most charging happens at home; public fills in the edges." },
              { myth: "Off-peak does not matter.", truth: "On PG&E-style TOU plans it can matter a lot." },
              { myth: "Battery range vanishes overnight.", truth: "Real-world loss is nothing like the scary stories." },
            ].map((row) => (
              <div
                key={row.myth}
                className="rounded-xl bg-muted/10 p-4 ring-1 ring-inset ring-white/[0.04] sm:p-5"
              >
                <p className="text-[13px] font-medium leading-snug text-foreground sm:text-sm">
                  Myth: {row.myth}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground/90 sm:text-sm">
                  Reality: {row.truth}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section spacing="tight">
          <Subheading className="max-w-xs">FAQ</Subheading>
          <div className="mt-6 max-w-2xl space-y-1.5">
            <FaqItem q="Is Level 1 ‘enough’ forever?">
              <p>
                It can be enough for low miles and long plug-in windows. Many owners still move to Level 2 for speed
                and peace of mind—especially in winter or with two EVs.
              </p>
            </FaqItem>
            <FaqItem q="Wall charger vs NEMA outlet?">
              <p>
                A hardwired wall unit can look cleaner and add features (scheduling, metering). A 240V outlet plus a
                portable cord can be flexible if you move. Your electrician can price both.
              </p>
            </FaqItem>
            <FaqItem q="Indoor vs outdoor install?">
              <p>
                Outdoor-rated equipment exists; weather and cable routing matter. Installers handle enclosures and code
                requirements every day.
              </p>
            </FaqItem>
            <FaqItem q="Will charging hurt my battery?">
              <p>
                Modern cars manage charging carefully. Daily charging to a comfortable level (not always 100%) is normal;
                check your owner’s manual for the brand’s simple guidance.
              </p>
            </FaqItem>
            <FaqItem q="Why is public charging more expensive?">
              <p>
                Stations pay for equipment, maintenance, and demand charges. You are buying convenience and speed—not
                the same economics as your garage.
              </p>
            </FaqItem>
          </div>
        </Section>

        <Section spacing="tight">
          <Subheading className="max-w-lg">Installation: keep it practical</Subheading>
          <Prose className="mt-4 sm:mt-5">
            <ul className="list-disc pl-5 space-y-2">
              <li>Wall-mounted EVSE vs 240V outlet—both are common; pick with your electrician.</li>
              <li>Indoor and outdoor installs both work when equipment is rated for the location.</li>
              <li>Permits and inspection may be required; good installers build that into the job.</li>
              <li>Smart chargers can align charging with off-peak windows on PG&E-style rates.</li>
              <li>
                ENERGY STAR lists certified chargers with efficient standby use—handy when comparing models (
                <a
                  href={external.energyStarEvse}
                  className="text-primary underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ENERGY STAR EV chargers
                </a>
                ).
              </li>
            </ul>
            <p>
              We can connect you with a local installer when you are ready—ask us when you pick your vehicle.
            </p>
          </Prose>
          <div className="mt-8 print:shadow-none sm:mt-10">
            <ChargingChecklistPrint />
          </div>
        </Section>

        <Section spacing="tight">
          <Subheading className="max-w-lg">Utility and local incentives</Subheading>
          <Prose className="mt-4 sm:mt-5">
            <p>
              Programs change often. Watch for utility rebates on chargers, panel-upgrade incentives, income-qualified
              offers, and federal tax credits where they apply. We keep this section short on purpose—verify dates and
              eligibility on official PG&E, state, and IRS pages before you buy.
            </p>
          </Prose>
        </Section>

        <Section spacing="tight">
          <Subheading className="max-w-2xl text-balance sm:text-pretty">
            Bay Area guidance, from people who sell EVs every day
          </Subheading>
          <Prose className="mt-4 sm:mt-5">
            <p>
              We focus on PG&E-style examples because that is who most of our customers have at home. If your panel,
              rental rules, or commute are unusual,{" "}
              <strong className="text-foreground">ask us before you buy</strong>—we would rather set expectations than
              surprise you after delivery.
            </p>
          </Prose>
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-2xl bg-muted/10 p-6 ring-1 ring-inset ring-white/[0.05] sm:p-8">
              <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                Need help figuring out home charging?
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground/90 sm:text-sm">
                Tell us your housing situation (house, condo, rent), approximate commute, and whether you already have
                240V in the garage.
              </p>
              <div className="mt-6">
                <ContactForm
                  source="ev-charging-page"
                  fieldIdPrefix="evc-"
                  messagePlaceholder="Parking situation, commute, any electrical concerns…"
                  defaultMessage="I'd like Bay Area charging guidance before I buy."
                  submitLabel="Request charging guidance"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-primary/[0.07] p-6 ring-1 ring-inset ring-primary/20 sm:p-8">
              <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">Ready to pick a car?</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground/90 sm:text-sm">
                Browse inventory or tell us what you are looking for—we will factor charging into the recommendation.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/inventory"
                  className="inline-flex justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90 evo-focus-ring"
                >
                  View inventory
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground no-underline transition-colors hover:bg-muted/50 evo-focus-ring"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </SiteContainer>
    </>
  );
}
