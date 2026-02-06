// components/Hero.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
        {/* Overlay con gradiente más sofisticado */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-blue-900/70"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 50%, rgba(29, 78, 216, 0.7) 100%)
            `
          }}
        />

        {/* Background con múltiples capas */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out"
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

      <Container className="relative z-20 pt-40 md:pt-48">
        <div className="max-w-4xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-medium">
              ✨ Líderes en Infraestructura Industrial en Chile
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-[1.2] tracking-tight overflow-visible"
          >
            Ingeniería en Acero <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent italic pl-1 pr-24 py-4 -mr-20 inline-block leading-normal tracking-normal overflow-visible transform translate-x-1">
              para el Sur de Chile.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed max-w-2xl font-light"
          >
            Desde el diseño conceptual hasta la entrega final. En
            <span className="text-white font-bold"> Metal Austral</span>,
            convertimos visiones industriales en realidades estructurales con
            <span className="text-blue-300"> precisión quirúrgica</span> y eficiencia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link
              href="#servicios"
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-2xl text-center transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] relative overflow-hidden"
            >
              <span className="relative z-10 text-lg">Explorar Servicios</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="#contacto"
              className="group px-10 py-5 bg-white/5 backdrop-blur-md border-2 border-white/20 text-white font-bold rounded-2xl text-center transition-all duration-300 ease-out transform hover:scale-105 hover:bg-white/10 hover:shadow-xl relative overflow-hidden"
            >
              <span className="relative z-10 text-lg">Cotizar Proyecto</span>
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Indicador de scroll animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="flex flex-col items-center text-white/50">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-blue-400 rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};