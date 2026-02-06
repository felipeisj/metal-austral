'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide navbar/footer on admin panel pages
  const isGestionRoute = pathname?.startsWith('/gestion-austral');
  const hideChrome = isGestionRoute;

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
