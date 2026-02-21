import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-light text-text">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
