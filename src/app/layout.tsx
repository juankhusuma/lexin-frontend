"use client"

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import LexinThemeProvider from "./utils/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <Navbar />
          <LexinThemeProvider>
            <main className="bg-offwhite min-h-screen pt-24">
              {children}
            </main>
          </LexinThemeProvider>
        </body>
    </html>
  );
}