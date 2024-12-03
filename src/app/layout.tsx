import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from '@/components/Header/Header';
import { AppWrapper } from '@/components/context';
import { Footer } from '@/components/Footer/Footer';

import './globals.css';
import MetaPixelProvider from '@/components/MetaProvider/MetaProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Deal Findr',
  description: 'Deal Findr',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full'>
      <body
        className={`${inter.className} min-h-screen relative flex flex-col`}
      >
        <Suspense>
          <MetaPixelProvider />
        </Suspense>
        <AppWrapper>
          <React.Suspense>
            <Header />
          </React.Suspense>
          <main className='flex-1 px-4 md:px-6 lg:px-40 pt-4 pb-12 w-full'>
            {children}
          </main>
          <Footer />
        </AppWrapper>
      </body>
    </html>
  );
}
