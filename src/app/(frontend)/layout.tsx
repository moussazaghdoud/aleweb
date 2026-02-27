import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PreviewBanner } from "@/components/PreviewBanner";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/GoogleTagManager";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { getSiteConfig } from "@/lib/payload";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.al-enterprise.com"),
  title: {
    default: "Alcatel-Lucent Enterprise | Enterprise Technology for the AI Era",
    template: "%s | Alcatel-Lucent Enterprise",
  },
  description:
    "Enterprise technology that transforms industries. Cloud communications, secure networking, and AI-driven operations for healthcare, education, hospitality, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Alcatel-Lucent Enterprise",
    title: "Alcatel-Lucent Enterprise | Enterprise Technology for the AI Era",
    description:
      "Enterprise technology that transforms industries. Cloud communications, secure networking, and AI-driven operations for healthcare, education, hospitality, and more.",
    images: [
      {
        url: "https://www.al-enterprise.com/-/media/assets/internet/images/ale-logo-og.png",
        width: 1200,
        height: 630,
        alt: "Alcatel-Lucent Enterprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alcatel-Lucent Enterprise | Enterprise Technology for the AI Era",
    description:
      "Enterprise technology that transforms industries. Cloud communications, secure networking, and AI-driven operations.",
  },
  alternates: {
    canonical: "https://www.al-enterprise.com",
    languages: {
      "en": "https://www.al-enterprise.com",
      "fr": "https://www.al-enterprise.com/fr",
      "x-default": "https://www.al-enterprise.com",
    },
  },
};

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isPreview } = await draftMode();

  let siteConfig: Awaited<ReturnType<typeof getSiteConfig>> | null = null;
  try {
    siteConfig = await getSiteConfig();
  } catch {
    // CMS unavailable — render without dynamic config
  }

  const gaId = siteConfig?.analytics?.googleAnalyticsId;
  const gtmId = siteConfig?.analytics?.googleTagManagerId;
  const consentConfig = siteConfig?.consent;

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='system'?window.matchMedia('(prefers-color-scheme:dark)').matches:t==='dark';if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <GoogleAnalytics gaId={gaId} />
        <GoogleTagManager gtmId={gtmId} />
        <OrganizationJsonLd />
      </head>
      <body className={`font-sans antialiased bg-light text-text${isPreview ? ' pt-10' : ''}`}>
        <GoogleTagManagerNoScript gtmId={gtmId} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ale focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        {isPreview && <PreviewBanner />}
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieConsent config={consentConfig} />
      </body>
    </html>
  );
}
