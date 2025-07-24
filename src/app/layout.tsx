import type { Metadata } from 'next';
import { Playfair_Display, Roboto } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import FooterSection from '@/components/common/FooterSection';
import Loader from '@/components/common/Loader';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lake Bishoftu Resort',
  description: 'Experience Ethiopian luxury at Lake Bishoftu Resort',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${roboto.variable} antialiased`}>
        <Loader />
        <Navbar />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}