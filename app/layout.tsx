import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Galpón Austral | Construcción de Galpones Industriales',
  description: 'Empresa líder en construcción de galpones industriales con más de 15 años de experiencia.',
  keywords: 'galpones industriales, construcción, metal, acero, estructuras metálicas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}