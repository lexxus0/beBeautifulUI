import type { Metadata } from "next";
import { Roboto, Lato, Poppins, Open_Sans, Inter } from "next/font/google";
// import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "@/store/provider";
import { sourceSansPro } from "@/fonts/fonts";
import Header from "@/components/ui/Header/header";
import Footer from "@/components/ui/Footer/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Science Be Beautiful",
  description:
    "Чесна українська косметика, створена жінкою-хіміком. Активи з Європи. Натуральні формули, що дбають про шкіру та простір навколо.",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400"], // light, regular
  variable: "--font-roboto",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"], // regular, bold
  variable: "--font-lato",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400"], // extraLight, regular
  variable: "--font-poppins",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400"], // regular
  variable: "--font-open-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"], // regular
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
        ${roboto.variable}
        ${lato.variable}
        ${poppins.variable}
        ${openSans.variable}
        ${inter.variable}
        ${sourceSansPro.variable}
      `}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}
