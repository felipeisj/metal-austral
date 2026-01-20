'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from './ui/Container';
import Image from 'next/image';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    { label: 'Años de Experiencia', value: '15+' },
    { label: 'Proyectos Entregados', value: '500+' },
    { label: 'Regiones Cubiertas', value: '4' },
    { label: 'Expertos Técnicos', value: '45' },
  ];

  return (
    <section ref={ref} id="nosotros" className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/proyecto22.jpeg"
                alt="Nuestro Equipo"
                width={800}
                height={1000}
                className="object-cover h-[600px] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-4 right-4 sm:-bottom-8 sm:-right-8 z-20 bg-blue-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl max-w-[220px] sm:max-w-[280px]"
            >
              <p className="text-4xl font-black mb-2 tracking-tight">100%</p>
              <p className="text-blue-100 font-medium leading-tight lowercase">
                compromiso con la seguridad y calidad estructural chilena.
              </p>
            </motion.div>

            {/* Decorative circles */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-50 rounded-full -z-10" />
            <div className="absolute top-1/2 -right-12 w-24 h-24 bg-indigo-50 rounded-full -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full mb-6">
              Sobre Galpón Austral
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              Ingeniería en Acero que <span className="text-blue-600">Impulsa</span> su Industria
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              <p>
                Fundada con la visión de transformar el panorama industrial del sur de Chile,
                <span className="font-bold text-slate-900"> Galpón Austral</span> se ha consolidado como el referente en soluciones metálicas de alta complejidad.
              </p>
              <p>
                No solo vendemos estructuras; entregamos confianza. Cada perno, cada viga y cada plano pasa por un riguroso control de calidad que supera los estándares nacionales. Nuestra misión es que su inversión sea eterna.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4 sm:pl-6 py-2">
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-[10px] sm:text-sm text-slate-500 font-medium uppercase tracking-wider leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <button className="flex items-center space-x-3 text-slate-900 font-bold hover:text-blue-600 transition-colors group">
                <span className="text-lg">Conocer nuestra historia completa</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
