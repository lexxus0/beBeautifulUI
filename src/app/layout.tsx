"use client";
// import type { Metadata } from "next";
import { Roboto, Lato, Poppins, Open_Sans, Inter } from "next/font/google";
// import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "@/store/provider";
import { sourceSansPro } from "@/fonts/fonts";
import Header from "@/components/ui/Header/header"; // header
import Footer from "@/components/ui/Footer/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { refreshAndLoadUser } from "@/store/auth/operations";
import { hasAuthTokens } from "@/helpers/authUtils";
import { setAuthHeader } from "@/store/init";
import { clearAuth } from "@/store/auth/slice";
import Loader from "@/components/ui/Loader/Loader";
import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Science Be Beautiful",
//   description:
//     "Чесна українська косметика, створена жінкою-хіміком. Активи з Європи. Натуральні формули, що дбають про шкіру та простір навколо.",
// };

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
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [pathname]);

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
        <div className="pageLayout">
          <Providers>
            <ReduxInitializer />
            <Header />
            <main className="pageContent">{children}</main>
            <Footer />
          </Providers>
        </div>
        <ScrollToTop />
        {loading && <Loader />}
      </body>
    </html>
  );
}

function ReduxInitializer() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    // Set auth header from persisted state if available
    if (accessToken) {
      setAuthHeader(accessToken);
    } else if (user && typeof window !== 'undefined') {
      // If user exists but no accessToken in Redux, try to get it from localStorage
      const tokenFromStorage = localStorage.getItem('accessToken');
      if (tokenFromStorage) {
        console.log("Found token in localStorage, setting auth header");
        setAuthHeader(tokenFromStorage);
      } else {
        // If user exists but no token found anywhere, clear the invalid auth state
        console.log("User exists but no token found, clearing invalid auth state");
        dispatch(clearAuth());
      }
    }
  }, [accessToken, user, dispatch]);

  useEffect(() => {
    // Only try to refresh if there are valid tokens in localStorage
    if (hasAuthTokens()) {
      dispatch(refreshAndLoadUser()).catch((error) => {
        // Silently handle auth errors - user will need to log in again
        console.warn("Auth initialization failed:", error);
        // Clear invalid tokens from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      });
    }
  }, [dispatch]);

  return null;
}
