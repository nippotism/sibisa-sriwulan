import NavbarDesktop from "@/components/navbar/navbar-desktop";
import NavMobile from "@/components/navbar/navbar-mobile";
import type { Metadata } from "next";
import { Poppins, Inter, Montserrat, Raleway, Freehand } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const freehand = Freehand({
  subsets: ["latin"],
  variable: "--font-freehand",
  weight: ["400"],
});


export const metadata: Metadata = {
  title: "SIBISA",
  description: "WEB APP BANK Sampah dengan fitur monitoring suhu kotoran sapi",
  icons: {
    icon: "/images/logo-sibisa.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`scroll-smooth font-montserrat bg-gray-950 dark:bg-white` + ` ${inter.variable} ${montserrat.variable} ${raleway.variable} ${freehand.variable}`}>
        {/* <NavMobile /> */}
        {/* <NavbarDesktop /> */}
        {children}
      </body>
    </html>
  );
}
