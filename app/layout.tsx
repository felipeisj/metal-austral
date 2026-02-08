import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";
import LayoutWrapper from '@/components/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Metal Austral | Construcción de Galpones Industriales',
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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}