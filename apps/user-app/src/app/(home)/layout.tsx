"use client";

import AppBar from "./components/AppBar";
import { Inter } from "next/font/google";
import SideBar from "./components/SideBar";
import { Providers } from "@/providers";
import { Toaster } from "sonner";
import BaseComponent from "./base";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <BaseComponent>{children}</BaseComponent>
        </Providers>
        <Toaster richColors position="top-right" duration={2000} closeButton />
      </body>
    </html>
  );
}
