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
