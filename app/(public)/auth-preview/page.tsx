import type { Metadata } from "next";
import { Section, PageHeader, DevPreviewBanner, SiteContainer } from "@/components/layout";
import { SectionHeading, SurfaceCard } from "@/components/website";
import {
  authBridgeConfig,
  buildAppUrl,
  buildLoginUrl,
  buildPortalUrl,
  buildRegisterUrl,
} from "@/lib/auth-bridge";

export const metadata: Metadata = {
  title: "Auth bridge preview",
  robots: { index: false, follow: false },
};

export default function AuthPreviewPage() {
  const loginUrl = buildLoginUrl();
  const registerUrl = buildRegisterUrl();
  const portalUrl = buildPortalUrl();
  const appUrl = buildAppUrl();

  const withReturn = buildLoginUrl({
    returnTo: "https://evomotors.com/inventory",
  });

  return (
    <>
      <DevPreviewBanner />
      <SiteContainer>
      <Section>
      <div className="space-y-12">
        <header>
          <PageHeader
            title="Auth bridge preview"
            description="Computed Vehiclix auth/app URLs for development and QA. Use these to verify env and query params."
          />
          <p className="evo-muted mt-2">
            Dealer: <code className="rounded bg-muted px-1">{authBridgeConfig.dealerSlug}</code>
          </p>
        </header>

        <section className="space-y-4">
          <SectionHeading eyebrow="Config">Resolved config</SectionHeading>
          <SurfaceCard variant="default" className="p-6">
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="evo-muted">loginUrl</dt>
                <dd className="font-mono text-foreground break-all">{authBridgeConfig.loginUrl}</dd>
              </div>
              <div>
                <dt className="evo-muted">registerUrl</dt>
                <dd className="font-mono text-foreground break-all">{authBridgeConfig.registerUrl}</dd>
              </div>
              <div>
                <dt className="evo-muted">portalUrl</dt>
                <dd className="font-mono text-foreground break-all">{authBridgeConfig.portalUrl}</dd>
              </div>
              <div>
                <dt className="evo-muted">appUrl</dt>
                <dd className="font-mono text-foreground break-all">{authBridgeConfig.appUrl}</dd>
              </div>
            </dl>
          </SurfaceCard>
        </section>

        <section className="space-y-4">
          <SectionHeading eyebrow="Helpers">Computed links (used by header/footer)</SectionHeading>
          <SurfaceCard variant="default" className="p-6">
            <ul className="space-y-4">
              <li>
                <p className="evo-eyebrow text-foreground/80 mb-1">buildLoginUrl()</p>
                <a
                  href={loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="evo-body-sm font-mono text-primary break-all hover:underline"
                >
                  {loginUrl}
                </a>
              </li>
              <li>
                <p className="evo-eyebrow text-foreground/80 mb-1">buildRegisterUrl()</p>
                <a
                  href={registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="evo-body-sm font-mono text-primary break-all hover:underline"
                >
                  {registerUrl}
                </a>
              </li>
              <li>
                <p className="evo-eyebrow text-foreground/80 mb-1">buildPortalUrl()</p>
                <a
                  href={portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="evo-body-sm font-mono text-primary break-all hover:underline"
                >
                  {portalUrl}
                </a>
              </li>
              <li>
                <p className="evo-eyebrow text-foreground/80 mb-1">buildAppUrl()</p>
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="evo-body-sm font-mono text-primary break-all hover:underline"
                >
                  {appUrl}
                </a>
              </li>
              <li>
                <p className="evo-eyebrow text-foreground/80 mb-1">buildLoginUrl(returnTo)</p>
                <a
                  href={withReturn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="evo-body-sm font-mono text-primary break-all hover:underline"
                >
                  {withReturn}
                </a>
              </li>
            </ul>
          </SurfaceCard>
        </section>
      </div>
    </Section>
    </SiteContainer>
    </>
  );
}
