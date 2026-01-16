// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from './ui/Container';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para scroll suave con offset
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = isScrolled ? 80 : 100; // Altura aproximada del navbar
      const targetPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Inicio', href: '#', target: 'hero' },
    { name: 'Nosotros', href: '#nosotros', target: 'nosotros' },
    { name: 'Servicios', href: '#servicios', target: 'servicios' },
    { name: 'Proyectos', href: '#proyectos', target: 'proyectos' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 py-3'
        : 'bg-transparent py-6'
        }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo.svg"
              alt="Galpón Austral"
              width={200}
              height={45}
              className={`object-contain transition-all duration-500 ease-out group-hover:scale-105 ${isScrolled ? '' : 'invert'
                }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (link.target === 'hero') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    smoothScrollTo(link.target);
                  }
                }}
                className={`relative text-sm font-medium transition-all duration-300 ease-out hover:scale-105 group cursor-pointer ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                  }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-out group-hover:w-full ${isScrolled ? 'bg-blue-600' : 'bg-blue-200'
                  }`}></span>
              </button>
            ))}
            <button
              onClick={() => smoothScrollTo('contacto')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg cursor-pointer ${isScrolled
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md'
                : 'bg-white/90 text-blue-700 hover:bg-white hover:shadow-xl backdrop-blur-sm'
                }`}
            >
              Contáctanos
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-out hover:scale-110 ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
              }`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg
              className={`w-6 h-6 transition-all duration-300 ease-out ${isScrolled ? 'text-gray-700' : 'text-white'
                } ${isMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="bg-white/95 backdrop-blur-md mt-4 rounded-2xl p-6 shadow-xl border border-gray-100">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.target === 'hero') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      smoothScrollTo(link.target);
                    }
                    toggleMenu();
                  }}
                  className={`text-left text-gray-700 hover:text-blue-600 transition-all duration-300 ease-out transform hover:translate-x-2 hover:font-medium cursor-pointer ${isMenuOpen ? 'animate-slideInUp' : ''
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  smoothScrollTo('contacto');
                  toggleMenu();
                }}
                className={`px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ease-out transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer ${isMenuOpen ? 'animate-slideInUp' : ''
                  }`}
                style={{ animationDelay: `${navLinks.length * 100}ms` }}
              >
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
      `}</style>
    </header>
  );
};