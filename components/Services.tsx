// components/Services.tsx
'use client';

import { useState } from 'react';
import { Container } from './ui/Container';
import Image from 'next/image';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const Services = () => {
  const services: Service[] = [
    {
      id: 1,
      title: 'Galpones Industriales',
      description: 'Construimos galpones industriales con las más altas especificaciones técnicas y de seguridad.',
      icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
      features: [
        'Estructuras de acero de alta resistencia',
        'Techos y cerramientos personalizados',
        'Diseño adaptado a tus necesidades',
        'Fundaciones sismorresistentes'
      ]
    },
    {
      id: 2,
      title: 'Proyectos Llave en Mano',
      description: 'Gestionamos tu proyecto desde el diseño hasta la entrega final con todo incluido.',
      icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
      features: [
        'Gestión integral del proyecto',
        'Trámites y permisos municipales',
        'Instalaciones eléctricas y sanitarias',
        'Cumplimiento de plazos y presupuesto'
      ]
    },
    {
      id: 3,
      title: 'Mantenimiento y Ampliaciones',
      description: 'Servicio completo de mantenimiento y ampliación de estructuras existentes.',
      icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
      features: [
        'Reforzamiento de estructuras',
        'Ampliaciones y modificaciones',
        'Modernización de instalaciones',
        'Inspección y mantenimiento preventivo'
      ]
    }
  ];

  const [activeService, setActiveService] = useState<number>(1);

  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Ofrecemos soluciones integrales en construcción industrial, adaptadas 
            a las necesidades específicas de cada cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`p-6 rounded-lg transition-all duration-300 cursor-pointer ${
                activeService === service.id 
                  ? 'bg-blue-700 text-white shadow-lg' 
                  : 'bg-white hover:shadow-md'
              }`}
              onClick={() => setActiveService(service.id)}
            >
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 mr-3 ${
                    activeService === service.id ? 'text-white' : 'text-blue-700'
                  }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                </svg>
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              <p className={activeService === service.id ? 'text-gray-100' : 'text-gray-600'}>
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {services.find(s => s.id === activeService)?.title}
              </h3>
              <p className="text-gray-700 mb-6">
                {services.find(s => s.id === activeService)?.description}
              </p>
              <ul className="space-y-3">
                {services.find(s => s.id === activeService)?.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-700 mr-2 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg relative">
              {/* Aquí puedes colocar una imagen relacionada con el servicio */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500 text-center">Imagen del servicio</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};