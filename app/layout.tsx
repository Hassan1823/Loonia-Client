"use client";

import { Toaster } from "react-hot-toast";
import "./globals.css";

import { Providers } from "./Provider";

import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";
import React from "react";
import CheckPart from "./components/CheckPart";

const inter = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap children in a div */}
        <Toaster position="bottom-left" reverseOrder={true} />
        <Providers>
          <SessionProvider>
            <div>
              {children}

              <CheckPart />
            </div>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
