import type { Metadata } from 'next';
import { Inter, Readex_Pro } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { Header, Background } from '@/components/header';
import { TITLE } from '@/models/constants';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const readexPro = Readex_Pro({
  variable: '--font-readex-pro',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: TITLE,
  description: 'Your gaming time, your legacy of fun.',
  openGraph: {
    title: TITLE,
    description: 'Your gaming time, your legacy of fun.',
    url: 'https://aerotime.vercel.app/',
    siteName: 'AeroTime',
    images: [
      {
        url: '/ss.png',
        width: 427,
        height: 514,
        alt: 'AeroTime - Your gaming time, your legacy of fun.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${readexPro.variable} ${inter.style} font-[family-name:var(--font-inter)] antialiased relative`}
      >
        <Header />
        {children}
        <Background />
        <Toaster
          position="bottom-center"
          toastOptions={{
            unstyled: true,
          }}
        />
      </body>
    </html>
  );
}
