import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

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

const GTM_ID = "GTM-T3MQNZ4Q";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full'>
      <head>
        {/* Google Tag Manager Script */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen relative flex flex-col`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Suspense>
          <MetaPixelProvider />
        </Suspense>
        <AppWrapper>
          <React.Suspense>
            <Header />
          </React.Suspense>
          <main className='flex-1 w-full'>{children}</main>
          <Footer />
        </AppWrapper>
      </body>
    </html>
  );
}
