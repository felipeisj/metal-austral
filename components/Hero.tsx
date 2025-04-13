// components/Hero.tsx
import Link from 'next/link';
import { Container } from './ui/Container';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"
          aria-hidden="true"
        />
        <div 
          className="w-full h-full bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069')" 
          }}
        />
      </div>
      
      <Container className="relative z-20">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Construimos el futuro de tu empresa
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Somos especialistas en diseño y construcción de galpones industriales 
            y estructuras metálicas de alta calidad, con soluciones a medida 
            para tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="#servicios"
              className="px-6 py-3 bg-blue-700 text-white font-medium rounded-md text-center hover:bg-blue-800 transition-colors"
            >
              Nuestros servicios
            </Link>
            <Link 
              href="#contacto"
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md text-center hover:bg-white/10 transition-colors"
            >
              Solicitar presupuesto
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};