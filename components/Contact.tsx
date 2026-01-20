'use client';

import { useState, FormEvent, useRef } from 'react';
import { Container } from './ui/Container';
import { motion, useInView } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'industrial',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: 'industrial',
        message: '',
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contacto" className="py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 translate-x-1/2" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 rounded-full">
              Canales de Comunicación
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight leading-none">
              Iniciemos su <br />
              <span className="text-blue-400">Próxima Obra</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 font-light leading-relaxed max-w-lg">
              Estamos listos para dimensionar su proyecto. Nuestro equipo técnico responderá con una propuesta preliminar en menos de 24 horas.
            </p>

            <div className="space-y-10">
              <div className="flex items-center group">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-blue-600 transition-colors">
                  <svg className="w-6 h-6 text-blue-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">Central Telefónica</p>
                  <p className="text-xl font-bold">+56 9 8234 5678</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-blue-600 transition-colors">
                  <svg className="w-6 h-6 text-blue-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">Email Corporativo</p>
                  <p className="text-xl font-bold">proyectos@galponaustral.cl</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-blue-600 transition-colors">
                  <svg className="w-6 h-6 text-blue-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">Oficina Central</p>
                  <p className="text-xl font-bold">Ruta 5 Sur Km 1023, Puerto Montt</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Corporativo</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                    placeholder="ejemplo@empresa.cl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Teléfono de Contacto</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                    placeholder="+56 9 ..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo de Proyecto</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all font-medium appearance-none"
                  >
                    <option value="industrial">Galpón Industrial</option>
                    <option value="commercial">Local Comercial</option>
                    <option value="logistics">Centro Logístico</option>
                    <option value="other">Estructura Especial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Descripción del Proyecto</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all font-medium resize-none"
                  placeholder="Cuéntanos un poco sobre las dimensiones, ubicación y propósito de la obra..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-bold text-white transition-all transform hover:scale-[1.02] shadow-xl ${isSubmitting ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                  }`}
              >
                {isSubmitting ? 'Procesando Envío...' : 'Enviar Solicitud de Presupuesto'}
              </button>

              {submitStatus === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-center text-sm font-bold">
                  ✓ Mensaje enviado. Nos contactaremos a la brevedad.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};