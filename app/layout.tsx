import type { Metadata } from "next";
import { Geist, Geist_Mono, Lemonada } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lemonada = Lemonada({
  variable: "--font-lemonada",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "H-Tube | HyperTube",
  description: "A cinematic movie streaming frontend for HyperTube.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lemonada.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" />
      </body>

      {/* <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body> */}

    </html>
  );
}
