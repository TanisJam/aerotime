import type { Metadata } from 'next';
import { Inter, Readex_Pro } from 'next/font/google';
import './globals.css';
import { Header, Layout } from '@/components/header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const readexPro = Readex_Pro({
  variable: '--font-readex-pro',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AeroTime',
  description: 'Your gaming time, your legacy of fun.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="pointer-events-none ">
      <body
        className={`${inter.variable} ${readexPro.variable} antialiased relative pointer-events-none`}
      >
        <Header />
        {children}
        <Layout />
      </body>
    </html>
  );
}
