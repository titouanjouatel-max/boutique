import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Cursor } from "@/components/Cursor";
import { Intro } from "@/components/Intro";
import "./globals.css";

// Inter variable : 400 → 700 pour le texte, 900 pour les titres d'affichage
// (substitut de Wise Sans).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BRAISE™ | Chauffe-mains rechargeable",
  description:
    "Le chauffe-mains rechargeable BRAISE™ : chauffe double face, 3 niveaux de chaleur, batterie externe USB. Vos mains au chaud tout l'hiver.",
};

export const viewport: Viewport = {
  themeColor: "#163300",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Intro />
        <Providers>
          {children}
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
