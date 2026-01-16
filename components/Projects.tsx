'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Container } from './ui/Container';

type ProjectCategory = 'todos' | 'industrial' | 'comercial' | 'logistico';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  image: string;
  location: string;
  year: number;
  area: string;
  client: string;
  highlights: string[];
}

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('todos');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const projects: Project[] = [
    {
      id: 1,
      title: 'Planta Industrial Aceros del Sur',
      description: 'Ingeniería y construcción de planta de procesamiento pesado de 5.000m².',
      longDescription: 'Un proyecto de alta complejidad técnica que incluyó el montaje de estructuras para puentes grúa de 20 toneladas y fundaciones especiales para maquinaria de vibración constante.',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070',
      location: 'Puerto Montt, Región de Los Lagos',
      year: 2023,
      area: '5,000 m²',
      client: 'Aceros del Sur S.A.',
      highlights: ['Estructura Heavy Duty', 'Montaje en Tiempo Récord', 'Iluminación Natural 30%']
    },
    {
      id: 2,
      title: 'Centro Comercial Las Acacias',
      description: 'Diseño arquitectónico y estructural para complejo comercial de retail.',
      longDescription: 'Desarrollamos una estructura mixta de acero y hormigón que permitió grandes luces libres para los locales comerciales, optimizando el flujo de clientes y la flexibilidad del espacio.',
      category: 'comercial',
      image: '/images/proyecto11.jpeg',
      location: 'Osorno, Región de Los Lagos',
      year: 2022,
      area: '8,500 m²',
      client: 'Inmobiliaria Las Acacias',
      highlights: ['Cubiertas PV4', 'Grandes Luces Libres', 'Eficiencia Energética']
    },
    {
      id: 3,
      title: 'Centro de Distribución LogisFast',
      description: 'Nave logística automatizada con altos estándares de almacenamiento.',
      longDescription: 'Implementación de galpón logístico con 14 metros de altura libre, diseñado específicamente para sistemas de racks automatizados y alto flujo de transportes pesados.',
      category: 'logistico',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
      location: 'Concepción, Región del Biobío',
      year: 2023,
      area: '8,000 m²',
      client: 'LogisFast Chile SpA',
      highlights: ['14m Altura Libre', 'Pisos Super Planos', 'Andenes Automatizados']
    },
    {
      id: 4,
      title: 'Planta Valle Fresco',
      description: 'Construcción bajo norma sanitaria para procesamiento de lácteos.',
      longDescription: 'Espacio diseñado con materiales asépticos y sistemas de drenaje especializados, garantizando el cumplimiento de todas las normativas de seguridad alimentaria internacional.',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069',
      location: 'Valdivia, Región de Los Ríos',
      year: 2021,
      area: '3,200 m²',
      client: 'Valle Fresco Ltda.',
      highlights: ['Acero Inoxidable', 'Climatización Controlada', 'Revestimientos Grado FDA']
    },
    {
      id: 5,
      title: 'Multibodegas San Clemente',
      description: 'Complejo de bodegaje modular altamente escalable.',
      longDescription: 'Serie de galpones modulares interconectados que permiten a la empresa crecer de forma rápida según la demanda estacional del sector agrícola.',
      category: 'logistico',
      image: '/images/proyecto_4_1.jpeg',
      location: 'Temuco, Región de la Araucanía',
      year: 2022,
      area: '6,800 m²',
      client: 'Agrícola San Clemente',
      highlights: ['Sistema Modular', 'Ventilación Forzada', 'Bajo Mantenimiento']
    },
    {
      id: 6,
      title: 'Showroom Automotriz Pacific',
      description: 'Estructura metálica vista con amplios ventanales panorámicos.',
      longDescription: 'Un desafío estético donde la estructura de acero se convierte en parte integral de la arquitectura del showroom, utilizando acabados de pintura industrial premium.',
      category: 'comercial',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070',
      location: 'Puerto Varas, Región de Los Lagos',
      year: 2023,
      area: '2,400 m²',
      client: 'AutoMotriz Pacific',
      highlights: ['Acero a la Vista', 'Ventanales Panorámicos', 'Diseño Minimalista']
    }
  ];

  const filteredProjects = activeCategory === 'todos'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🏗️' },
    { id: 'industrial', name: 'Industrial', icon: '🏭' },
    { id: 'comercial', name: 'Comercial', icon: '🏢' },
    { id: 'logistico', name: 'Logístico', icon: '📦' }
  ];

  return (
    <section ref={sectionRef} id="proyectos" className="py-32 bg-white relative overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
              Portafolio de Obras
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
              Nuestros <span className="text-blue-600">Hitos </span>
              Estructurales
            </h2>
          </motion.div>

          {/* Filtros de categorías */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as ProjectCategory)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center space-x-2 ${activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent transition-opacity duration-300 group-hover:opacity-100" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.highlights.map((h, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white font-bold uppercase tracking-widest rounded-full">
                        {h}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-sm font-light line-clamp-2 mb-6 group-hover:line-clamp-none transition-all duration-500">
                    {project.longDescription}
                  </p>

                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="text-white">
                      <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Cliente</p>
                      <p className="text-xs font-bold">{project.client}</p>
                    </div>
                    <div className="text-right text-white">
                      <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Superficie</p>
                      <p className="text-xs font-bold">{project.area}</p>
                    </div>
                  </div>
                </div>

                {/* Badge Category */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-blue-700 to-indigo-900 text-white relative overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                ¿Su próximo proyecto <br /> industrial comienza aquí?
              </h3>
              <p className="text-xl text-blue-100 font-light mb-10 max-w-lg leading-relaxed">
                Únase a las más de 500 empresas que han confiado su infraestructura en nuestras manos expertas.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-10 py-5 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20">
                  Iniciar Cotización
                </button>
                <button className="px-10 py-5 bg-blue-600/30 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
                  Descargar Brochure
                </button>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-6">
              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
                <p className="text-4xl font-black text-blue-400 mb-2">100%</p>
                <p className="text-sm font-medium text-blue-100">Responsabilidad Civil</p>
              </div>
              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl mt-8">
                <p className="text-4xl font-black text-blue-400 mb-2">ISO</p>
                <p className="text-sm font-medium text-blue-100">Estándares de Calidad</p>
              </div>
            </div>
          </div>

          {/* Decorative patterns */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] -ml-32 -mb-32" />
        </motion.div>
      </Container>
    </section>
  );
};