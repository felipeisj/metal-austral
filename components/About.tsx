'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from './ui/Container';
import Image from 'next/image';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    { label: 'Años de Experiencia', value: '20+' },
    { label: 'Proyectos Entregados', value: '500+' },
    { label: 'Cobertura Regional', value: 'Temuco a Coyhaique' },
    { label: 'Desde', value: '2005' },
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
                compromiso con la seguridad, calidad y cumplimiento de plazos.
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
              Sobre Metal Austral
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              Más de <span className="text-blue-600">20 Años</span> Construyendo Confianza
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              <p>
                En <span className="font-bold text-slate-900">Metal Austral SpA</span> contamos con más de 20 años de experiencia en estructuras metálicas, destacando por nuestra seriedad, calidad y cumplimiento.
              </p>
              <p>
                Desde 2005 en Puerto Montt, somos liderados por <span className="font-medium text-slate-800">Eduardo Pérez Barra</span>, Gerente General, y <span className="font-medium text-slate-800">Eduardo Pérez Mejías</span>, Ingeniero en Construcción y Encargado de Proyectos.
              </p>
              <p>
                Con un equipo calificado, desarrollamos proyectos industriales, comerciales y pesqueros desde Temuco hasta Coyhaique, entregando soluciones a medida, respaldo técnico y la tranquilidad de un trabajo bien hecho.
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
          </motion.div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2rem] text-white"
          >
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
            <p className="text-blue-100 leading-relaxed">
              Entregar soluciones estructurales metálicas de alta calidad, adaptadas a las necesidades específicas de cada cliente, respaldadas por un equipo técnico calificado y un firme compromiso con la seguridad, eficiencia y cumplimiento de plazos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-900 p-10 rounded-[2rem] text-white"
          >
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
            <p className="text-slate-300 leading-relaxed">
              Ser la empresa líder en soluciones estructurales metálicas del sur de Chile, destacándonos desde Temuco hasta Coyhaique por nuestra seriedad, calidad técnica e innovación continua. Aspiramos a ser el aliado preferido de industrias, comercios y proyectos pesqueros.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
