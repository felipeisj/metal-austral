// components/Projects.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Container } from './ui/Container';

type ProjectCategory = 'todos' | 'industrial' | 'comercial' | 'logistico';

interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  location: string;
  year: number;
  area?: string;
  client?: string;
}

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('todos');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Planta de Producción Aceros del Sur',
      description: 'Construcción de planta industrial de 5000m² para procesamiento de acero con tecnología de punta.',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070',
      location: 'Puerto Montt, Chile',
      year: 2023,
      area: '5,000 m²',
      client: 'Aceros del Sur'
    },
    {
      id: 2,
      title: 'Centro Comercial Las Acacias',
      description: 'Proyecto llave en mano para centro comercial con estructura metálica y diseño arquitectónico moderno.',
      category: 'comercial',
      image: '/images/proyecto11.jpeg',
      location: 'Osorno, Chile',
      year: 2022,
      area: '8,500 m²',
      client: 'Inmobiliaria Las Acacias'
    },
    {
      id: 3,
      title: 'Centro de Distribución LogisFast',
      description: 'Galpón logístico de 8000m² con sistema automatizado de almacenamiento y control de inventario.',
      category: 'logistico',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
      location: 'Concepción, Chile',
      year: 2023,
      area: '8,000 m²',
      client: 'LogisFast Chile'
    },
    {
      id: 4,
      title: 'Fábrica de Lácteos Valle Fresco',
      description: 'Construcción de planta de procesamiento de lácteos con normativa alimentaria internacional.',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069',
      location: 'Valdivia, Chile',
      year: 2021,
      area: '3,200 m²',
      client: 'Valle Fresco Ltda.'
    },
    {
      id: 5,
      title: 'Bodega Agrícola San Clemente',
      description: 'Galpón agrícola para almacenamiento y procesamiento de productos con control de temperatura.',
      category: 'logistico',
      image: '/images/proyecto_4_1.jpeg',
      location: 'Temuco, Chile',
      year: 2022,
      area: '6,800 m²',
      client: 'Agrícola San Clemente'
    },
    {
      id: 6,
      title: 'Showroom AutoMotriz Pacific',
      description: 'Estructura metálica con diseño arquitectónico para exposición de vehículos de lujo.',
      category: 'comercial',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070',
      location: 'Puerto Varas, Chile',
      year: 2023,
      area: '2,400 m²',
      client: 'AutoMotriz Pacific'
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

  const filteredProjects = activeCategory === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const categories = [
    { id: 'todos', name: 'Todos los proyectos', icon: '🏗️', count: projects.length },
    { id: 'industrial', name: 'Industrial', icon: '🏭', count: projects.filter(p => p.category === 'industrial').length },
    { id: 'comercial', name: 'Comercial', icon: '🏢', count: projects.filter(p => p.category === 'comercial').length },
    { id: 'logistico', name: 'Logístico', icon: '📦', count: projects.filter(p => p.category === 'logistico').length }
  ];

  const getCategoryColor = (categoryId: string) => {
    const colors = {
      'todos': 'from-blue-500 to-cyan-500',
      'industrial': 'from-orange-500 to-red-500',
      'comercial': 'from-green-500 to-emerald-500',
      'logistico': 'from-purple-500 to-pink-500'
    };
    return colors[categoryId as keyof typeof colors] || colors.todos;
  };

  return (
    <section ref={sectionRef} id="proyectos" className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-sm font-medium">
              🚀 Nuestro portafolio
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Proyectos Destacados
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            Conoce algunos de nuestros proyectos más destacados y cómo hemos 
            ayudado a diferentes empresas a expandir sus operaciones con soluciones innovadoras.
          </p>
        </div>

        {/* Filtros de categorías */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '200ms' }}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as ProjectCategory)}
              className={`group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ease-out transform hover:scale-105 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${getCategoryColor(category.id)} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:text-gray-900 hover:shadow-md border border-gray-200'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${200 + index * 100}ms`
              }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">{category.icon}</span>
                <span>{category.name}</span>
                <span className={`inline-flex items-center justify-center w-5 h-5 text-xs rounded-full ${
                  activeCategory === category.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </div>
              
              {/* Efecto de brillo en hover */}
              {activeCategory !== category.id && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
              )}
            </button>
          ))}
        </div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge de año */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800">
                    ✨ {project.year}
                  </span>
                </div>

                {/* Información adicional en hover */}
                <div className={`absolute bottom-4 left-4 right-4 transform transition-all duration-300 ease-out ${
                  hoveredProject === project.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-gray-700">📐 {project.area}</span>
                      <span className="text-gray-600">{project.client}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-medium">{project.location}</span>
                  </div>
                  
                  <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-300 group/btn">
                    <span>Ver más</span>
                    <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Conversemos sobre tu próximo proyecto y cómo podemos ayudarte a hacerlo realidad
              con la calidad y profesionalismo que nos caracteriza.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              Iniciar mi proyecto
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};