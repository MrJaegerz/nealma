import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

// TODO: Remplacer par la police locale Eschaton quand le fichier .woff2 sera disponible
// import localFont from "next/font/local";
// const eschaton = localFont({ src: "../../public/fonts/Eschaton.woff2", ... });
const eschaton = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://nealma.fr"),
  title: {
    default: "Néalma | Infirmière spécialisée en accompagnement périnatal",
    template: "%s | Néalma",
  },
  description:
    "Accompagnement périnatal en Île-de-France : massages prénatal et post-partum, bain enveloppé bébé, soutien à l'allaitement. Soins à domicile par une infirmière diplômée.",
  keywords: [
    "accompagnement périnatal",
    "massage prénatal",
    "massage post-partum",
    "bain bébé",
    "allaitement",
    "infirmière",
    "Île-de-France",
    "soins à domicile",
  ],
  authors: [{ name: "Néalma" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://nealma.fr",
    siteName: "Néalma",
    title: "Néalma | Accompagnement périnatal en Île-de-France",
    description:
      "Massages, bain bébé, allaitement — soins périnataux à domicile par une infirmière diplômée.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Néalma | Accompagnement périnatal",
    description:
      "Soins périnataux à domicile en Île-de-France par une infirmière spécialisée.",
  },
  icons: {
    icon: "/images/icon-192.png",
    apple: "/images/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${eschaton.variable} antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
