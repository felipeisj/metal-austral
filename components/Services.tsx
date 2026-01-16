'use client';

import { useState, useRef } from 'react';
import { Container } from './ui/Container';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface Service {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  icon: string;
  features: string[];
  image?: string;
  color: string;
  gradient: string;
}

export const Services = () => {
  const [activeService, setActiveService] = useState<number>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const services: Service[] = [
    {
      id: 1,
      title: 'Galpones Industriales',
      description: 'Construcción de galpones industriales de alto rendimiento con ingeniería de vanguardia.',
      longDescription: 'Diseñamos y construimos espacios que maximizan la eficiencia operativa. Utilizamos las mejores aleaciones de acero y técnicas de montaje rápido para minimizar tiempos de entrega sin comprometer la integridad estructural.',
      icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
      features: [
        'Estructuras de acero de alta resistencia (ASTM A36/A572)',
        'Techos con aislación térmica y acústica superior',
        'Cálculo estructural sismorresistente bajo norma NCh',
        'Pisos industriales de alta capacidad de carga'
      ],
      image: '/images/proyecto_3.jpeg',
      color: 'blue',
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      id: 2,
      title: 'Proyectos Llave en Mano',
      description: 'Gestión total: desde la idea inicial hasta la entrega de llaves.',
      longDescription: 'Nos encargamos de todo el ciclo de vida del proyecto. Desde la arquitectura básica, especialidades, obtención de permisos municipales hasta la construcción y recepción final.',
      icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
      features: [
        'Planificación estratégica y cronograma estricto',
        'Tramitación completa de permisos y recepciones',
        'Integración de especialidades (Eléctrica, Clima, Sanitaria)',
        'Garantía de cumplimiento de presupuesto'
      ],
      image: '/images/galpones-industriales.jpeg',
      color: 'emerald',
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      id: 3,
      title: 'Mantenimiento y Ampliaciones',
      description: 'Extendemos la vida útil y capacidad de su infraestructura actual.',
      longDescription: 'Realizamos auditorías estructurales para detectar fatiga o necesidad de refuerzo. Ampliamos galpones existentes manteniendo la continuidad operativa de su empresa.',
      icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
      features: [
        'Reforzamiento estructural para nuevas cargas',
        'Cambio de cubiertas y revestimientos',
        'Limpieza y pintura industrial (Sandblasting)',
        'Modernización de sistemas de drenaje y ventilación'
      ],
      image: '/images/proyecto_4_2.jpeg',
      color: 'purple',
      gradient: 'from-fuchsia-600 to-purple-600'
    }
  ];

  const activeServiceData = services.find(s => s.id === activeService);

  return (
    <section ref={sectionRef} id="servicios" className="py-32 bg-slate-50 relative overflow-hidden">
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
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
            Nuestra Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight">
            Especialistas en <span className="text-blue-600">Construcción Industrial</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed font-light">
            No solo levantamos estructuras; diseñamos los pilares donde su empresa crecerá.
            Calidad certificada y compromiso absoluto con sus plazos.
          </p>
        </motion.div>

        {/* Cards de servicios - Grid más moderno */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveService(service.id)}
              className={`group relative p-10 rounded-[2.5rem] transition-all duration-500 cursor-pointer overflow-hidden ${activeService === service.id
                ? `bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] scale-[1.02] border-t-4 border-blue-600`
                : 'bg-white/50 hover:bg-white border border-slate-100 hover:shadow-xl'
                }`}
            >
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${activeService === service.id
                  ? `bg-blue-600 text-white`
                  : `bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600`
                  }`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                <div className={`flex items-center text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeService === service.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'
                  }`}>
                  <span>Ver Especificaciones</span>
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sección de detalles expansiva */}
        {activeServiceData && (
          <motion.div
            layoutId="activeServiceCard"
            className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={`content-${activeService}`}
                >
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight flex items-center">
                    <span className={`w-12 h-1 bg-blue-600 mr-4 rounded-full`} />
                    {activeServiceData.title}
                  </h3>
                  <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light">
                    {activeServiceData.longDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {activeServiceData.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200">
                    Solicitar Cotización Técnica
                  </button>
                </motion.div>
              </div>

              <div className="relative min-h-[400px] lg:min-h-full overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={`image-${activeService}`}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeServiceData.image || ''}
                    alt={activeServiceData.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${activeServiceData.gradient} opacity-20`} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
};