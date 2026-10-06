import type { Metadata, Viewport } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import MobileFrameWrapper from "@/components/MobileFrameWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "UNIPOD — Uniforms That Inspire Brighter Tomorrows",
  description: "Professional uniforms for schools, colleges and institutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#030B12] font-sans antialiased text-[#FFFDF9]">
        <SmoothScroll>
          <MobileFrameWrapper>
            <Navbar />
            <PageTransition>
              <main className="w-full relative flex flex-col">{children}</main>
            </PageTransition>
          </MobileFrameWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
