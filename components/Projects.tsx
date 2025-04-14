// components/Projects.tsx
'use client';

import { useState } from 'react';
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
}

export const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Planta de Producción Aceros del Sur',
      description: 'Construcción de planta industrial de 5000m² para procesamiento de acero.',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070',
      location: 'Puerto Montt, Chile',
      year: 2023
    },
    {
      id: 2,
      title: 'Centro Comercial Las Acacias',
      description: 'Proyecto llave en mano para centro comercial con estructura metálica.',
      category: 'comercial',
      image: '/images/proyecto11.jpeg',
      location: 'Osorno, Chile',
      year: 2022
    },
    {
      id: 3,
      title: 'Centro de Distribución LogisFast',
      description: 'Galpón logístico de 8000m² con sistema automatizado de almacenamiento.',
      category: 'logistico',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
      location: 'Concepción, Chile',
      year: 2023
    },
    {
      id: 4,
      title: 'Fábrica de Lácteos Valle Fresco',
      description: 'Construcción de planta de procesamiento de lácteos con normativa alimentaria.',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069',
      location: 'Valdivia, Chile',
      year: 2021
    },
    {
      id: 5,
      title: 'Bodega Agrícola San Clemente',
      description: 'Galpón agrícola para almacenamiento y procesamiento de productos.',
      category: 'logistico',
      image: '/images/proyecto_4_1.jpeg',
      location: 'Temuco, Chile',
      year: 2022
    },
    {
      id: 6,
      title: 'Showroom AutoMotriz Pacific',
      description: 'Estructura metálica con diseño arquitectónico para exposición de vehículos.',
      category: 'comercial',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070',
      location: 'Puerto Varas, Chile',
      year: 2023
    }
  ];

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('todos');

  const filteredProjects = activeCategory === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const categories = [
    { id: 'todos', name: 'Todos los proyectos' },
    { id: 'industrial', name: 'Industrial' },
    { id: 'comercial', name: 'Comercial' },
    { id: 'logistico', name: 'Logístico' }
  ];

  return (
    <section id="proyectos" className="py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Proyectos
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Conoce algunos de nuestros proyectos más destacados y cómo hemos 
            ayudado a diferentes empresas a expandir sus operaciones.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as ProjectCategory)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-56">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                  <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {project.year}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
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
                  {project.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};