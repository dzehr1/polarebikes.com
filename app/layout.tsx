import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "POLAREBIKES | Arctic Luxury E-Bikes",
    template: "%s | POLAREBIKES",
  },
  description:
    "Premium electric bikes from Polarebikes LLC — engineered for range, speed, and cold-weather performance.",
  metadataBase: new URL("https://polarebikes.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable}`}>
      <body className="min-h-screen font-sans">
        <SiteHeader />
        <main className="min-h-screen pt-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
