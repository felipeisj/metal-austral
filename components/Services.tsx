// components/Services.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Container } from './ui/Container';
import Image from 'next/image';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
  color: string;
  gradient: string;
}

export const Services = () => {
  const [activeService, setActiveService] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const services: Service[] = [
    {
      id: 1,
      title: 'Galpones Industriales',
      description: 'Construimos galpones industriales con las más altas especificaciones técnicas y de seguridad, diseñados para optimizar tu productividad.',
      icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
      features: [
        'Estructuras de acero de alta resistencia',
        'Techos y cerramientos personalizados',
        'Diseño adaptado a tus necesidades',
        'Fundaciones sismorresistentes'
      ],
      image: '/images/proyecto_3.jpeg',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Proyectos Llave en Mano',
      description: 'Gestionamos tu proyecto desde el diseño hasta la entrega final con todo incluido, para que te enfoques en tu negocio.',
      icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
      features: [
        'Gestión integral del proyecto',
        'Trámites y permisos municipales',
        'Instalaciones eléctricas y sanitarias',
        'Cumplimiento de plazos y presupuesto'
      ],
      image: '/images/galpones-industriales.jpeg',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 3,
      title: 'Mantenimiento y Ampliaciones',
      description: 'Servicio completo de mantenimiento y ampliación de estructuras existentes para mantener tu operación en perfecto estado.',
      icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
      features: [
        'Reforzamiento de estructuras',
        'Ampliaciones y modificaciones',
        'Modernización de instalaciones',
        'Inspección y mantenimiento preventivo'
      ],
      image: '/images/proyecto_4_2.jpeg',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeServiceData = services.find(s => s.id === activeService);

  return (
    <section ref={sectionRef} id="servicios" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              💼 Lo que hacemos
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Nuestros Servicios
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            Ofrecemos soluciones integrales en construcción industrial, adaptadas 
            a las necesidades específicas de cada cliente con la más alta calidad.
          </p>
        </div>

        {/* Cards de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`group relative p-8 rounded-3xl transition-all duration-500 ease-out cursor-pointer transform hover:scale-105 ${
                activeService === service.id 
                  ? `bg-gradient-to-br ${service.gradient} text-white shadow-2xl shadow-${service.color}-500/25` 
                  : 'bg-white hover:shadow-xl hover:shadow-gray-200/50 border border-gray-100'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onClick={() => setActiveService(service.id)}
            >
              {/* Efecto de brillo en hover */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                activeService === service.id ? '' : 'bg-gradient-to-r from-transparent via-white/5 to-transparent'
              }`}></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-2xl mr-4 transition-all duration-300 ${
                    activeService === service.id 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : `bg-gradient-to-br ${service.gradient} text-white`
                  }`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                
                <p className={`leading-relaxed ${
                  activeService === service.id ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>

                {/* Indicador de selección */}
                <div className={`mt-6 flex items-center text-sm font-medium transition-all duration-300 ${
                  activeService === service.id ? 'text-white/80' : `text-${service.color}-600`
                }`}>
                  <span>Ver detalles</span>
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de detalles del servicio activo */}
        {activeServiceData && (
          <div className={`bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${activeServiceData.gradient} text-white text-sm font-medium mb-4`}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeServiceData.icon} />
                    </svg>
                    Servicio destacado
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {activeServiceData.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {activeServiceData.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    ✨ Lo que incluye:
                  </h4>
                  {activeServiceData.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start group transition-all duration-300 ease-out hover:translate-x-2 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${800 + index * 100}ms` }}
                    >
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${activeServiceData.gradient} flex items-center justify-center mr-4 mt-0.5 group-hover:scale-110 transition-transform duration-300`}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button className={`px-8 py-4 rounded-2xl bg-gradient-to-r ${activeServiceData.gradient} text-white font-semibold transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg hover:shadow-${activeServiceData.color}-500/25`}>
                    Solicitar información
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src={activeServiceData.image || ''}
                    alt={activeServiceData.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Overlay con gradiente */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
                
                {/* Elementos decorativos */}
                <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r ${activeServiceData.gradient} rounded-full opacity-20 animate-pulse`}></div>
                <div className={`absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r ${activeServiceData.gradient} rounded-full opacity-10 animate-pulse`} style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};