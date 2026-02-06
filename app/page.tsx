import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Clients } from '@/components/Clients';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Clients />
      <Contact />
    </>
  );
}