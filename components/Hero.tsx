// components/Hero.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from './ui/Container';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Imagen de fondo con efecto parallax */}
      <div className="absolute inset-0 z-0">
        {/* Overlay con gradiente más suave */}
        <div 
          className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-blue-900/60"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.75) 50%, rgba(29, 78, 216, 0.65) 100%)
            `
          }}
        />
        
        {/* Background con múltiples capas */}
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out scale-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069')",
            transform: `scale(1.05) translate(-${mousePosition.x * 0.01}px, -${mousePosition.y * 0.01}px)`
          }}
        />
        
        {/* Elementos decorativos flotantes */}
        <div className="absolute inset-0 z-5">
          <div 
            className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"
            style={{ animationDelay: '0s' }}
          />
          <div 
            className="absolute top-32 right-20 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <div 
            className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50 animate-pulse"
            style={{ animationDelay: '4s' }}
          />
        </div>
      </div>
      
      <Container className="relative z-20">
        <div className={`max-w-4xl text-white transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="mb-6">
            <span className={`inline-block px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 text-sm font-medium transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '200ms' }}>
              ✨ Especialistas en construcción industrial
            </span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-gray-100 to-blue-100 bg-clip-text text-transparent transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '400ms' }}>
            Construimos el
            <span className="block text-blue-400 animate-pulse">futuro de tu empresa</span>
          </h1>
          
          <p className={`text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '600ms' }}>
            Transformamos tus ideas en{' '}
            <span className="text-blue-300 font-semibold">estructuras sólidas</span>. 
            Especializados en galpones industriales y construcciones metálicas de 
            <span className="text-blue-300 font-semibold"> alta calidad</span>, 
            con soluciones personalizadas para tu negocio.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '800ms' }}>
            <Link 
              href="#servicios"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl text-center transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 relative overflow-hidden"
            >
              <span className="relative z-10">Descubre nuestros servicios</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              href="#contacto"
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-2xl text-center transition-all duration-300 ease-out transform hover:scale-105 hover:bg-white/20 hover:shadow-xl hover:shadow-white/10 relative overflow-hidden"
            >
              <span className="relative z-10">Solicitar presupuesto</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
          
          {/* Indicador de scroll animado */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '1000ms' }}>
            <div className="flex flex-col items-center text-white/70 hover:text-white/90 transition-colors duration-300">
              <span className="text-sm mb-2 font-medium">Descubre más</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};