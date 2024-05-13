import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { AppWrapper } from "@/components/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deal Findr",
  description: "Deal Findr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>
          <Header />
          <main className="pl-40 pt-4 pb-8">{children}</main>
        </AppWrapper>
      </body>
    </html>
  );
}
