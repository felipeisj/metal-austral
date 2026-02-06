// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Container } from './ui/Container';
import { Logo } from './ui/Logo';
import { supabase } from '@/lib/supabase';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on a subpage (not home)
  const isSubpage = pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check auth state
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: { user: any } | null) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  // Función para scroll suave con offset
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = isScrolled ? 60 : 80;
      const targetPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Inicio', href: '/', target: 'hero', isLink: true },
    { name: 'Nosotros', href: '/#nosotros', target: 'nosotros', isLink: isSubpage },
    { name: 'Servicios', href: '/#servicios', target: 'servicios', isLink: isSubpage },
  ];

  const projectCategories = [
    { name: 'Todos los Proyectos', href: '/proyectos', icon: '🏗️' },
    { name: 'Galpones', href: '/proyectos?categoria=galpones', icon: '🏭' },
    { name: 'Radieres', href: '/proyectos?categoria=radieres', icon: '🏗️' },
    { name: 'Otros', href: '/proyectos?categoria=otros', icon: '📦' },
  ];

  // Determine if navbar should be solid (scrolled OR on subpage)
  const isSolid = isScrolled || isSubpage;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${isSolid
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center min-w-max">
            <Link href="/" className="flex items-center group">
              <Logo isScrolled={isSolid} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isLink ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-all duration-300 ease-out hover:scale-105 group cursor-pointer ${isSolid ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-out group-hover:w-full ${isSolid ? 'bg-blue-600' : 'bg-blue-200'
                    }`}></span>
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => smoothScrollTo(link.target)}
                  className={`relative text-sm font-medium transition-all duration-300 ease-out hover:scale-105 group cursor-pointer ${isSolid ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-out group-hover:w-full ${isSolid ? 'bg-blue-600' : 'bg-blue-200'
                    }`}></span>
                </button>
              )
            ))}

            {/* Proyectos Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProjectsDropdownOpen(true)}
              onMouseLeave={() => setIsProjectsDropdownOpen(false)}
            >
              <button
                className={`relative text-sm font-medium transition-all duration-300 ease-out hover:scale-105 group cursor-pointer flex items-center gap-1 ${isSolid ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                  }`}
              >
                Proyectos
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isProjectsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-out group-hover:w-full ${isSolid ? 'bg-blue-600' : 'bg-blue-200'
                  }`}></span>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 transition-all duration-300 ${isProjectsDropdownOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2'
                  }`}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-2">
                  {projectCategories.map((category, index) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all ${index === 0 ? 'border-b border-gray-100 mb-1 pb-3' : ''
                        }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Admin Controls - Only visible when logged in */}
            {user && (
              <div
                className="relative"
                onMouseEnter={() => setIsAdminDropdownOpen(true)}
                onMouseLeave={() => setIsAdminDropdownOpen(false)}
              >
                <button
                  className={`relative text-sm font-medium transition-all duration-300 ease-out hover:scale-105 group cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full ${isSolid
                    ? 'text-green-700 bg-green-50 hover:bg-green-100'
                    : 'text-white bg-white/20 hover:bg-white/30'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Admin
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${isAdminDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Admin Dropdown Menu */}
                <div
                  className={`absolute top-full right-0 mt-2 w-48 transition-all duration-300 ${isAdminDropdownOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                    }`}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-2">
                    <Link
                      href="/gestion-austral/panel"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span>Ir al Panel</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                if (isSubpage) {
                  window.location.href = '/#contacto';
                } else {
                  smoothScrollTo('contacto');
                }
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg cursor-pointer ${isSolid
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md'
                : 'bg-white/90 text-blue-700 hover:bg-white hover:shadow-xl backdrop-blur-sm'
                }`}
            >
              Contáctanos
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-out hover:scale-110 ${isSolid ? 'hover:bg-gray-100' : 'hover:bg-white/10'
              }`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg
              className={`w-6 h-6 transition-all duration-300 ease-out ${isSolid ? 'text-gray-700' : 'text-white'
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
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="bg-white/95 backdrop-blur-md mt-4 rounded-2xl p-6 shadow-xl border border-gray-100">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                link.isLink ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={toggleMenu}
                    className={`text-left text-gray-700 hover:text-blue-600 transition-all duration-300 ease-out transform hover:translate-x-2 hover:font-medium cursor-pointer ${isMenuOpen ? 'animate-slideInUp' : ''
                      }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => {
                      smoothScrollTo(link.target);
                      toggleMenu();
                    }}
                    className={`text-left text-gray-700 hover:text-blue-600 transition-all duration-300 ease-out transform hover:translate-x-2 hover:font-medium cursor-pointer ${isMenuOpen ? 'animate-slideInUp' : ''
                      }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {link.name}
                  </button>
                )
              ))}

              {/* Mobile Proyectos Section */}
              <div className="border-t border-gray-100 pt-4 mt-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Proyectos</p>
                {projectCategories.map((category, index) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    onClick={toggleMenu}
                    className={`flex items-center gap-3 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 ease-out transform hover:translate-x-2 ${isMenuOpen ? 'animate-slideInUp' : ''
                      }`}
                    style={{ animationDelay: `${(navLinks.length + index) * 100}ms` }}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Admin Section - Only visible when logged in */}
              {user && (
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Admin
                  </p>
                  <Link
                    href="/gestion-austral/panel"
                    onClick={toggleMenu}
                    className={`flex items-center gap-3 py-2 text-gray-700 hover:text-blue-600 transition-all ${isMenuOpen ? 'animate-slideInUp' : ''}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>Ir al Panel</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className={`flex items-center gap-3 py-2 text-red-600 hover:text-red-700 transition-all ${isMenuOpen ? 'animate-slideInUp' : ''}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  if (isSubpage) {
                    window.location.href = '/#contacto';
                  } else {
                    smoothScrollTo('contacto');
                  }
                  toggleMenu();
                }}
                className={`px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ease-out transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer ${isMenuOpen ? 'animate-slideInUp' : ''
                  }`}
                style={{ animationDelay: `${(navLinks.length + projectCategories.length) * 100}ms` }}
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