import type { Metadata } from "next";
import { Inter, Montserrat, Orbitron, Share_Tech_Mono } from "next/font/google";
import { PageLoader } from "@/components/motion/page-loader";
import { brand } from "@/data/site-content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "optional",
  weight: ["800"],
  preload: true,
  adjustFontFallback: true,
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["700"],
  preload: false,
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-share-tech",
  display: "swap",
  weight: "400",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${montserrat.variable} ${orbitron.variable} ${shareTechMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background font-sans antialiased"
        suppressHydrationWarning
      >
        <PageLoader />
        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}
