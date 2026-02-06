'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import { Container } from './ui/Container';
import { supabase } from '@/lib/supabase';
import { Client } from '@/types/client';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/lib/cloudinary-helper';

// Datos de fallback para cuando no hay clientes en la base de datos
const fallbackClients: Omit<Client, 'id' | 'company_id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'Zerocorp SpA',
    description: 'Fabricación y montaje de planta de tratamiento de lixiviados en Maullín',
    year: '2024 - 2025',
    order: 1
  },
  {
    name: 'Gallega S.A.',
    description: 'Fabricación y montaje de galpón metálico de 500 m²',
    year: '2022',
    order: 2
  },
  {
    name: 'Copec',
    description: 'Fabricación y montaje de galpón metálico de 450 m²',
    year: '2021',
    order: 3
  },
  {
    name: 'Cruz del Sur',
    description: 'Fabricación y montaje de techumbre',
    year: '2020',
    order: 4
  },
  {
    name: 'Walbusch S.A.',
    description: 'Pasillos pesqueros y fabricación de cabezales',
    year: '2017',
    order: 5
  },
  {
    name: 'Ingered',
    description: 'Fabricación y montaje de planta de tratamiento de redes',
    year: '2012',
    order: 6
  },
  {
    name: 'Oxxean',
    description: 'Pasillos pesqueros',
    year: '2009',
    order: 7
  }
];

export const Clients = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [clients, setClients] = useState<(Client | typeof fallbackClients[0])[]>(fallbackClients);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    async function fetchClients() {
      try {
        const { data } = await supabase
          .from('clients')
          .select('*')
          .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)
          .order('order', { ascending: true });

        if (data && data.length > 0) {
          setClients(data);
        }
      } catch (e) {
        // Use fallback clients if table doesn't exist
        console.log('Using fallback clients');
      }
    }
    fetchClients();
  }, []);

  // Framer Motion animation for infinite scroll
  const cardWidth = 320;
  const gap = 24;
  const totalWidth = (cardWidth + gap) * clients.length;

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: -totalWidth,
        transition: {
          duration: clients.length * 6,
          ease: 'linear',
          repeat: Infinity,
        }
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls, totalWidth, clients.length]);

  // Duplicate for infinite effect
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section ref={sectionRef} id="clientes" className="py-24 bg-white relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
            Clientes Destacados
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Empresas que <span className="text-blue-600">Confían</span> en Nosotros
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed font-light">
            Empresas que han confiado en Metal Austral SpA para el desarrollo de sus proyectos industriales y pesqueros.
          </p>
        </motion.div>
      </Container>

      {/* Infinite Carousel */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            animate={controls}
            className="flex gap-6 pl-6"
            style={{ width: 'max-content' }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${('id' in client ? client.id : client.name)}-${index}`}
                className="w-[320px] flex-shrink-0 bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  {('logo' in client && client.logo) ? (
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-100 flex-shrink-0">
                      <Image
                        src={getCloudinaryUrl(client.logo, 'thumbnail')}
                        alt={client.name}
                        width={56}
                        height={56}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                      {client.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">{client.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{client.year}</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm line-clamp-3">
                  {client.description}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>

      {/* Stats Banner */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 p-10 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-blue-700 to-indigo-900 text-white relative overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                ¿Su empresa será la próxima?
              </h3>
              <p className="text-lg text-blue-100 font-light mb-8 max-w-lg leading-relaxed">
                Únase a las empresas que han confiado su infraestructura en nuestras manos expertas desde 2005.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20"
                >
                  Iniciar Cotización
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl">
                <p className="text-3xl font-black text-white mb-1">20+</p>
                <p className="text-sm font-medium text-blue-200">Años de experiencia</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl">
                <p className="text-3xl font-black text-white mb-1">500+</p>
                <p className="text-sm font-medium text-blue-200">Proyectos entregados</p>
              </div>
            </div>
          </div>

          {/* Decorative patterns */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-[80px] -mr-36 -mt-36" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-[60px] -ml-24 -mb-24" />
        </motion.div>
      </Container>
    </section>
  );
};
