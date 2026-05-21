import type { Metadata } from "next";
import { Sora, Geist_Mono } from "next/font/google";
import { seoConfig, ogImageUrl } from "@/lib/seo-config";
import "./globals.css";
import { OrganizationStructuredData } from "@/components/seo/organization-structured-data";
import { SiteAnalytics } from "@/components/analytics/site-analytics";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultOgImage = ogImageUrl(seoConfig.defaultOgImagePath);
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  ...(gscVerification
    ? { verification: { google: gscVerification } }
    : {}),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: seoConfig.siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/branding/logo.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/branding/logo.png", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sora.variable} ${geistMono.variable} font-sans`}>
      <body className={`${sora.className} flex min-h-screen flex-col bg-background text-foreground`}>
        <OrganizationStructuredData />
        <SiteAnalytics />
        {children}
      </body>
    </html>
  );
}
