'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { supabase } from '@/lib/supabase';
import { Project, ProjectCategory, categoryLabels } from '@/types/project';
import { getCloudinaryUrl } from '@/lib/cloudinary-helper';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'todos'>('todos');

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)
        .eq('status', 'Publicado')
        .order('year', { ascending: false });

      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'todos'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'todos' as const, name: 'Todos', icon: '🏗️' },
    { id: 'galpones' as const, name: 'Galpones', icon: '🏭' },
    { id: 'radieres' as const, name: 'Radieres', icon: '🏗️' },
    { id: 'otros' as const, name: 'Otros', icon: '📦' },
  ];

  return (
    <main className="pt-24 pb-32 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full"
          >
            Portafolio de Obras
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6"
          >
            Nuestros <span className="text-blue-600">Proyectos</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Explora nuestra trayectoria en construcción de galpones, radieres y estructuras metálicas de alta calidad.
          </motion.p>
        </div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center space-x-2 ${activeCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Grid de proyectos */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 mb-6">
                  <Image
                    src={getCloudinaryUrl(project.image, 'projectCard')}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.highlights.slice(0, 3).map((h, i) => (
                          <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white font-bold uppercase tracking-widest rounded-full">
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 text-sm font-light line-clamp-2 mb-6 group-hover:line-clamp-none transition-all duration-500">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <div className="text-white">
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Cliente</p>
                        <p className="text-xs font-bold">{project.client || 'N/A'}</p>
                      </div>
                      <div className="text-right text-white">
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Superficie</p>
                        <p className="text-xs font-bold">{project.area || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Badge Category */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg">
                      {categoryLabels[project.category]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-slate-400 text-lg">No hay proyectos disponibles en esta categoría.</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <Link
            href="/#contacto"
            className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-xl shadow-blue-200"
          >
            ¿Tienes un proyecto? Contáctanos
          </Link>
        </motion.div>
      </Container>
    </main>
  );
}
