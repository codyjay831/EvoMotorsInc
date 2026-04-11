import Link from "next/link";
import { Section, SiteContainer } from "@/components/layout";
import { ContactForm } from "@/components/forms";
import {
  EvChargingCalculators,
  ChargingChecklistPrint,
} from "@/components/ev-charging/ev-charging-calculators";
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
  return <div className={cn("evo-body text-muted-foreground space-y-4 max-w-3xl", className)}>{children}</div>;
}

function Subheading({ children }: { children: React.ReactNode }) {
  return <h2 className="evo-section-heading text-foreground">{children}</h2>;
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
    <div className="rounded-xl border border-border bg-surface/60 p-5 flex flex-col gap-3">
      <div>
        <p className="evo-eyebrow text-primary">{tag}</p>
        <h3 className="evo-card-title text-foreground mt-1">{title}</h3>
      </div>
      <div className="evo-body-sm text-muted-foreground space-y-2 flex-1">{children}</div>
    </div>
  );
}

function LifestyleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-5">
      <h3 className="evo-card-title text-foreground">{title}</h3>
      <p className="evo-body-sm text-muted-foreground mt-2">{body}</p>
    </div>
  );
}

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl border border-border bg-surface/40 open:bg-surface/60 transition-colors">
      <summary className="evo-body-sm font-medium text-foreground cursor-pointer list-none px-4 py-3.5 flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
        <span>{q}</span>
        <span className="text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform" aria-hidden>
          +
        </span>
      </summary>
      <div className="px-4 pb-4 evo-body-sm text-muted-foreground border-t border-border/60 pt-3">
        {children}
      </div>
    </details>
  );
}

export function EvChargingContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/10 via-background to-background">
        <SiteContainer className="py-16 sm:py-20 lg:py-28">
          <p className="evo-eyebrow text-primary">Bay Area charging guidance</p>
          <h1 className="evo-display text-foreground mt-3 max-w-4xl">
            Charging an EV is easier than people think
          </h1>
          <p className="evo-body text-muted-foreground mt-6 max-w-2xl text-lg">
            Most driving is covered at home. Fast public charging is for trips and “I forgot” moments—not something
            most owners stress about every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#cost-calculator"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90 evo-focus-ring"
            >
              Try the cost estimator
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground no-underline transition-colors hover:bg-muted/50 evo-focus-ring"
            >
              Ask us before you buy
            </Link>
          </div>
        </SiteContainer>
      </section>

      <SiteContainer>
        <Section spacing="tight">
          <Subheading>Level 1, Level 2, and fast charging</Subheading>
          <p className="evo-body text-muted-foreground mt-3 max-w-3xl">
            Start with a simple picture: overnight at home vs. a quick stop on the highway. The U.S. Department of
            Energy commonly cites about{" "}
            <span className="text-foreground">5 miles of range per hour</span> on Level 1 (a regular 120V outlet).
            Level 2 (240V) is the usual home upgrade and adds meaningfully more depending on your vehicle and
            equipment. DC fast charging is what you use on road trips and for a fast top-up—not typically how people
            charge at home.
          </p>
          <CardGrid className="mt-8">
            <LevelCard title="Level 1" tag="120V outlet">
              <p>Slow but simple. Best when daily miles are low and you can leave the car plugged in for many hours.</p>
            </LevelCard>
            <LevelCard title="Level 2" tag="240V home">
              <p>The everyday solution for most owners: plug in at night, wake up with plenty of range.</p>
            </LevelCard>
            <LevelCard title="DC fast" tag="Public">
              <p>Quick sessions on the go. Handy for Tahoe weekends and long drives—usually pricier per kWh than home.</p>
            </LevelCard>
          </CardGrid>
          <p className="evo-muted mt-6">
            More detail:{" "}
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
          <Subheading>Which charging fits me?</Subheading>
          <Prose className="mt-3">
            <p>
              <strong className="text-foreground">Do I actually need anything installed at home?</strong> If you have
              a dedicated parking spot, a normal outlet you can reach safely, and modest daily miles, Level 1 might be
              enough to start. If you want predictable overnight fills or drive more, Level 2 is usually worth it. DC
              fast charging does not replace home charging for daily life—it complements it.
            </p>
          </Prose>
        </Section>

        <Section spacing="tight">
          <Subheading>Which one fits your lifestyle?</Subheading>
          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            <LifestyleCard
              title="Apartment or shared parking"
              body="Focus on where you can plug in reliably. If that is a 120V outlet you control, start there; if not, ask about building rules and shared Level 2. Public fast charging can fill gaps but costs more per mile than home."
            />
            <LifestyleCard
              title="House with a garage or driveway"
              body="Most owners add Level 2 once they know they are keeping the car. It is the calm default: come home, plug in, forget about it until morning."
            />
            <LifestyleCard
              title="Long commute"
              body="You will value faster overnight charging or a solid daytime top-up plan. Level 2 is usually the comfort upgrade."
            />
            <LifestyleCard
              title="Short commute + errands"
              body="You might live happily on Level 1 for a while. Still worth planning for Level 2 if your miles grow or you want headroom for cold weather and cabin heating."
            />
          </div>
        </Section>

        <Section spacing="tight">
          <Subheading>Can my house handle it?</Subheading>
          <Prose className="mt-3">
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
          <Subheading>PG&E rates: peak, off-peak, and why midnight matters</Subheading>
          <Prose className="mt-3">
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
          <ul className="mt-6 flex flex-col gap-2 evo-body-sm">
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
            <Subheading>Monthly cost vs gas</Subheading>
            <p className="evo-body text-muted-foreground mt-3 max-w-3xl">
              Plug in rough miles, where you charge, and a PG&E-style rate assumption. This is a conversation starter—not
              tax or utility advice.
            </p>
            <div className="mt-8">
              <EvChargingCalculators />
            </div>
          </Section>
        </div>

        <Section spacing="tight">
          <Subheading>Road trips and public charging</Subheading>
          <Prose className="mt-3">
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
          <Subheading>What most owners actually do</Subheading>
          <Prose className="mt-3">
            <ul className="list-disc pl-5 space-y-2">
              <li>Plug in at home overnight (or whenever the car sits).</li>
              <li>Wake up with enough range for the day.</li>
              <li>Use fast charging mostly on trips—not every grocery run.</li>
              <li>Stop thinking about charging every single day once the routine clicks.</li>
            </ul>
          </Prose>
        </Section>

        <Section spacing="tight">
          <Subheading>Myths vs reality</Subheading>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { myth: "I need a fast charger at home.", truth: "Most people do not. Level 2 is the common home setup." },
              { myth: "I will definitely need a panel upgrade.", truth: "Sometimes yes—often no. An electrician tells you quickly." },
              { myth: "I will live at public chargers.", truth: "Most charging happens at home; public fills in the edges." },
              { myth: "Off-peak does not matter.", truth: "On PG&E-style TOU plans it can matter a lot." },
              { myth: "Battery range vanishes overnight.", truth: "Real-world loss is nothing like the scary stories." },
            ].map((row) => (
              <div key={row.myth} className="rounded-xl border border-border bg-muted/20 p-4">
                <p className="evo-body-sm font-medium text-foreground">Myth: {row.myth}</p>
                <p className="evo-body-sm text-muted-foreground mt-2">Reality: {row.truth}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section spacing="tight">
          <Subheading>FAQ</Subheading>
          <div className="mt-6 space-y-2 max-w-3xl">
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
          <Subheading>Installation: keep it practical</Subheading>
          <Prose className="mt-3">
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
          <div className="mt-8 print:shadow-none">
            <ChargingChecklistPrint />
          </div>
        </Section>

        <Section spacing="tight">
          <Subheading>Utility and local incentives</Subheading>
          <Prose className="mt-3">
            <p>
              Programs change often. Watch for utility rebates on chargers, panel-upgrade incentives, income-qualified
              offers, and federal tax credits where they apply. We keep this section short on purpose—verify dates and
              eligibility on official PG&E, state, and IRS pages before you buy.
            </p>
          </Prose>
        </Section>

        <Section spacing="tight">
          <Subheading>Bay Area guidance, from people who sell EVs every day</Subheading>
          <Prose className="mt-3">
            <p>
              We focus on PG&E-style examples because that is who most of our customers have at home. If your panel,
              rental rules, or commute are unusual,{" "}
              <strong className="text-foreground">ask us before you buy</strong>—we would rather set expectations than
              surprise you after delivery.
            </p>
          </Prose>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface/40 p-6 sm:p-8">
              <h3 className="evo-card-title text-foreground">Need help figuring out home charging?</h3>
              <p className="evo-body-sm text-muted-foreground mt-2">
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
            <div className="flex flex-col justify-center rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
              <h3 className="evo-card-title text-foreground">Ready to pick a car?</h3>
              <p className="evo-body-sm text-muted-foreground mt-2">
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
