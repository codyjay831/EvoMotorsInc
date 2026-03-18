import type { Metadata } from "next";
import { DevPreviewBanner } from "@/components/layout";
import {
  Badge,
  GhostButton,
  GlowButton,
  OutlineButton,
  SectionHeading,
  SurfaceCard,
  TrustItem,
} from "@/components/website";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand preview",
  robots: { index: false, follow: false },
};

export default function BrandPreviewPage() {
  return (
    <>
      <DevPreviewBanner />
      <div className="evo-content-width evo-section space-y-24">
      <header className="space-y-4">
        <p className="evo-eyebrow">Design system</p>
        <h1 className="evo-display text-foreground">Evo Motors Brand Preview</h1>
        <p className="evo-body text-muted-foreground max-w-2xl">
          Visual QA for tokens, typography, buttons, cards, and layout. No production content.
        </p>
      </header>

      {/* Color palette */}
      <section className="space-y-6">
        <SectionHeading eyebrow="Tokens">Color palette</SectionHeading>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {[
            { name: "Background", token: "background", bg: "bg-background", border: true },
            { name: "Foreground", token: "foreground", bg: "bg-foreground" },
            { name: "Surface", token: "surface", bg: "bg-surface", border: true },
            { name: "Muted", token: "muted", bg: "bg-muted", border: true },
            { name: "Primary", token: "primary", bg: "bg-primary" },
            { name: "Glow", token: "glow", bg: "bg-glow" },
            { name: "Destructive", token: "destructive", bg: "bg-destructive" },
            { name: "Warning", token: "warning", bg: "bg-warning" },
          ].map(({ name, token, bg, border }) => (
            <div
              key={token}
              className={`rounded-lg p-4 ${bg} ${border ? "border border-border" : ""} ${border ? "text-foreground" : "text-primary-foreground"}`}
            >
              <p className="text-xs font-medium opacity-80">{name}</p>
              <p className="evo-muted mt-1 text-xs">{token}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-6">
        <SectionHeading eyebrow="Type scale">Typography</SectionHeading>
        <div className="space-y-8 rounded-xl border border-border bg-surface/40 p-6 evo-panel">
          <div>
            <p className="evo-muted mb-1">Display / hero</p>
            <h2 className="evo-display text-foreground">Electric. Premium.</h2>
          </div>
          <div>
            <p className="evo-muted mb-1">Section heading</p>
            <h3 className="evo-section-heading text-foreground">Built for the road ahead</h3>
          </div>
          <div>
            <p className="evo-muted mb-1">Card title</p>
            <p className="evo-card-title text-foreground">Model E9 Signature</p>
          </div>
          <div>
            <p className="evo-muted mb-1">Body</p>
            <p className="evo-body text-foreground">
              Clean, punch, glow. Modern electric vehicle feel with premium black and electric teal.
            </p>
          </div>
          <div>
            <p className="evo-muted mb-1">Muted</p>
            <p className="evo-muted">Secondary information and captions.</p>
          </div>
          <div>
            <p className="evo-muted mb-1">Eyebrow / label</p>
            <p className="evo-eyebrow">Inventory</p>
          </div>
          <div>
            <p className="evo-muted mb-1">Gradient accent (teal)</p>
            <p className="evo-text-gradient-teal text-2xl font-semibold">Evo Motors</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-6">
        <SectionHeading eyebrow="CTAs">Buttons</SectionHeading>
        <div className="flex flex-wrap gap-4">
          <GlowButton size="lg">Primary CTA</GlowButton>
          <GhostButton size="lg">Secondary</GhostButton>
          <OutlineButton size="lg">Outline</OutlineButton>
        </div>
        <div className="flex flex-wrap gap-3">
          <GlowButton size="default">Default size</GlowButton>
          <GhostButton>Ghost</GhostButton>
          <OutlineButton>Outline</OutlineButton>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-6">
        <SectionHeading eyebrow="Surfaces">Cards</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <SurfaceCard variant="default" className="p-6">
            <Badge variant="default" className="mb-3">Default</Badge>
            <h3 className="evo-card-title text-foreground mb-2">Content card</h3>
            <p className="evo-muted">Standard elevated surface for content blocks.</p>
          </SurfaceCard>
          <SurfaceCard variant="glow" className="p-6">
            <Badge variant="primary" className="mb-3">Glow</Badge>
            <h3 className="evo-card-title text-foreground mb-2">Vehicle / highlight</h3>
            <p className="evo-muted">Teal glow on hover for featured items.</p>
          </SurfaceCard>
          <SurfaceCard variant="muted" className="p-6">
            <Badge variant="muted" className="mb-3">Muted</Badge>
            <h3 className="evo-card-title text-foreground mb-2">Trust / stat</h3>
            <p className="evo-muted">Subtle background for stats and trust blocks.</p>
          </SurfaceCard>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-6">
        <SectionHeading eyebrow="Labels">Badges</SectionHeading>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="muted">Muted</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      {/* Section heading + Trust items */}
      <section className="space-y-6">
        <SectionHeading eyebrow="Why Evo" as="h2">
          Trust block example
        </SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TrustItem
            label="Range"
            value="320 mi"
            icon={<Zap className="size-4" />}
          />
          <TrustItem label="Warranty" value="8 yr / 100k mi" />
          <TrustItem label="Delivery" value="Contact for ETA" />
        </div>
      </section>

      {/* Layout blocks */}
      <section className="space-y-6">
        <SectionHeading eyebrow="Layout">Sample blocks</SectionHeading>
        <div className="evo-section space-y-12 rounded-xl border border-border bg-surface/30 p-8 evo-panel">
          <div className="evo-content-narrow text-center">
            <p className="evo-eyebrow mb-2">Narrow content</p>
            <h3 className="evo-section-heading text-foreground mb-4">Centered narrow block</h3>
            <p className="evo-body text-muted-foreground">
              Use .evo-content-narrow for intro text or forms.
            </p>
          </div>
          <div>
            <p className="evo-eyebrow mb-2">Full content width</p>
            <p className="evo-body text-muted-foreground">
              .evo-content-width and .evo-section provide consistent spacing. Glow and muted cards
              use shared tokens.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
