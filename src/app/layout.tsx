"use client"

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import LexinThemeProvider from "./utils/theme";
import { Suspense } from "react";
import Loading from "@/components/layout/Loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <LexinThemeProvider>
            <Suspense fallback={<Loading />}>
              <Navbar />
              <main className="bg-offwhite min-h-[calc(100vh-96px)] pt-24">
                {children}
              </main>
            </Suspense>
          </LexinThemeProvider>
        </body>
    </html>
  );
}