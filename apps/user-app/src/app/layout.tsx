import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paymnt App",
  description: "Transfer Payment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <Script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon={`{"token": ${process.env.NEXT_CLOUDFARE_TOKEN}}`} strategy="afterInteractive"></Script>
      </body>
      
    </html>
  );
}
