'use client';

import { useState, useRef } from 'react';
import { Container } from './ui/Container';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Service {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

export const Services = () => {
  const [activeService, setActiveService] = useState<number>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const services: Service[] = [
    {
      id: 1,
      title: 'Galpones y Naves Industriales',
      shortTitle: 'Galpones',
      description: 'Para almacenamiento, logística o procesos productivos. Estructuras de acero de alta resistencia con aislación térmica y acústica superior.',
      icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
      features: [
        'Cálculo estructural sismorresistente NCh',
        'Techos con aislación térmica superior',
        'Pisos industriales de alta carga',
        'Tiempos de entrega optimizados'
      ],
      image: '/images/proyecto_3.jpeg'
    },
    {
      id: 2,
      title: 'Pasillos Pesqueros y Cabezales',
      shortTitle: 'Pesquero',
      description: 'Diseñados especialmente para el sector acuícola. Estructuras resistentes a ambientes marinos con materiales anticorrosivos.',
      icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
      features: [
        'Resistencia a ambientes salinos',
        'Galvanizado en caliente',
        'Cabezales estructurales reforzados',
        'Cumplimiento normativo pesquero'
      ],
      image: '/images/galpones-industriales.jpeg'
    },
    {
      id: 3,
      title: 'Escaleras, Altillos y Entrepisos',
      shortTitle: 'Altillos',
      description: 'Optimizan espacios verticales cumpliendo todas las normas de seguridad. Diseños personalizados según requerimientos específicos.',
      icon: 'M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21l3.75-3.75',
      features: [
        'Optimización de espacios',
        'Normas de seguridad vigentes',
        'Diseños personalizados',
        'Instalación profesional'
      ],
      image: '/images/proyecto11.jpeg'
    },
    {
      id: 4,
      title: 'Oficinas Modulares en Isopanel',
      shortTitle: 'Oficinas',
      description: 'Confort y aislamiento en zonas industriales. Soluciones rápidas de instalar con excelente aislación térmica y acústica.',
      icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z',
      features: [
        'Aislación térmica y acústica',
        'Montaje rápido',
        'Diseño modular flexible',
        'Ideal para faenas'
      ],
      image: '/images/proyecto_4_1.jpeg'
    },
    {
      id: 5,
      title: 'Losas Colaborantes y Radieres',
      shortTitle: 'Radieres',
      description: 'Pisos estructurales resistentes para alto tránsito y cargas pesadas. Terminaciones de alta calidad para uso industrial.',
      icon: 'M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122',
      features: [
        'Alta capacidad de carga',
        'Resistencia a tránsito pesado',
        'Terminaciones industriales',
        'Durabilidad garantizada'
      ],
      image: '/images/proyecto_4_2.jpeg'
    },
    {
      id: 6,
      title: 'Cubiertas y Terminaciones',
      shortTitle: 'Cubiertas',
      description: 'Cubiertas en planchas zinc que protegen y prolongan la vida útil de las construcciones. Instalación profesional garantizada.',
      icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
      features: [
        'Planchas zinc de calidad',
        'Protección contra elementos',
        'Instalación certificada',
        'Garantía extendida'
      ],
      image: '/images/proyecto22.jpeg'
    },
    {
      id: 7,
      title: 'Estanques y Estructuras Especiales',
      shortTitle: 'Especiales',
      description: 'Fabricaciones personalizadas según cada proyecto. Soluciones a medida para requerimientos únicos.',
      icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z',
      features: [
        'Diseño personalizado',
        'Fabricación a medida',
        'Ingeniería especializada',
        'Proyectos únicos'
      ],
      image: '/images/proyecto_3.jpeg'
    }
  ];

  const activeServiceData = services.find(s => s.id === activeService);

  return (
    <section ref={sectionRef} id="servicios" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Soluciones <span className="text-blue-600">Estructurales Metálicas</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed font-light">
            A medida para la industria, el comercio y el sector pesquero del sur de Chile.
          </p>
        </motion.div>

        {/* Layout: Services Tabs + Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Service Tabs - Vertical on desktop */}
          <div className="lg:col-span-4">
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-3">
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setActiveService(service.id)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all duration-300 ${activeService === service.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-100'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${activeService === service.id ? 'bg-white/20' : 'bg-slate-100'
                    }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                    </svg>
                  </div>
                  <span className="font-bold text-sm lg:text-base">{service.shortTitle}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active Service Detail */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeServiceData && (
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative h-48 md:h-64 w-full">
                    <Image
                      src={activeServiceData.image}
                      alt={activeServiceData.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>

                  {/* Content Section */}
                  <div className="p-8 lg:p-10 -mt-12 relative">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={activeServiceData.icon} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2">
                          {activeServiceData.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {activeServiceData.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {activeServiceData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-slate-700 font-medium text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      Solicitar Cotización
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};