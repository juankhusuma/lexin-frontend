"use client"

import { ThemeProvider } from '@mui/material/styles';
import { LexinLightTheme } from "@/utils/theme/theme";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider theme={LexinLightTheme}>
        <body>
          <Navbar />
          <main className="bg-offwhite min-h-screen">
            {children}
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}