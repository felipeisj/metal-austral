'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Project, categoryLabels } from '@/types/project';
import { getCloudinaryUrl } from '@/lib/cloudinary-helper';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Combine single image and gallery images, fallback to single if no gallery
  const allImages = [...new Set([project.image, ...(project.images || [])])].filter(Boolean);
  const [selectedImage, setSelectedImage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Preload images
  useEffect(() => {
    if (isOpen && mounted) {
      allImages.forEach((img, idx) => {
        const preloadImg = new window.Image();
        preloadImg.src = getCloudinaryUrl(img, 'hero') || '';
        preloadImg.onload = () => {
          setLoadedImages(prev => new Set([...prev, idx]));
        };
      });
    }
  }, [isOpen, mounted, allImages]);

  // Handle modal body scroll & reset state
  useEffect(() => {
    if (isOpen) {
      setSelectedImage(0);
      setIsDescriptionExpanded(false);

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setSelectedImage(prev => (prev > 0 ? prev - 1 : allImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImage(prev => (prev < allImages.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allImages.length, onClose]);

  if (!isOpen || !mounted) return null;

  const nextImage = () => {
    setSelectedImage(prev => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setSelectedImage(prev => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleWhatsApp = () => {
    const phoneNumber = '569'; // Placeholder, user might want to change it
    const message = `¡Hola! Me interesa saber más acerca del proyecto: ${project.title}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const modalContent = (
    <div className="fixed inset-0 z-[60] overflow-y-auto overscroll-none touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/80 transition-opacity backdrop-blur-sm overscroll-none"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-start md:items-center justify-center p-0 md:p-4 relative">
        <div className="relative flex flex-col bg-white h-[100dvh] md:h-[90vh] md:rounded-3xl shadow-2xl max-w-6xl w-full mx-auto overflow-hidden transform transition-all">

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[70] md:hidden bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Desktop Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 hidden md:flex bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-slate-100 transition-all hover:scale-105"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex-1 overflow-y-auto overscroll-contain md:overflow-hidden flex flex-col md:flex-row bg-white relative min-h-0">
            {/* Left side: Images */}
            <div className="w-full md:w-1/2 bg-slate-100 shrink-0 p-4 pt-14 md:pt-6 md:p-6 md:overflow-y-auto relative">
              {/* Main Image View */}
              <div className="relative aspect-[4/3] bg-slate-200 rounded-2xl overflow-hidden mb-4 group shadow-inner">
                {allImages.map((img, idx) => (
                  <Image
                    key={`img-${idx}`}
                    src={getCloudinaryUrl(img, 'hero') || '/fallback.png'}
                    alt={`${project.title} - Foto ${idx + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-300 ${selectedImage === idx ? 'opacity-100' : 'opacity-0'}`}
                    style={{ zIndex: selectedImage === idx ? 5 : 1 }}
                    priority={idx < 2}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ))}

                {/* Loading indicator */}
                {!loadedImages.has(selectedImage) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-200 z-20">
                    <div className="w-8 h-8 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                  </div>
                )}

                {/* Category badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg z-30">
                  {categoryLabels[project.category]}
                </div>

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-2 rounded-full hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-lg z-40"
                    >
                      <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-2 rounded-full hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-lg z-40"
                    >
                      <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/70 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-white shadow-lg z-30">
                    {selectedImage + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery (if multiple) */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300 ${selectedImage === idx
                        ? 'ring-4 ring-blue-600 ring-offset-2 scale-95 shadow-md'
                        : 'opacity-60 hover:opacity-100 hover:scale-[1.02]'
                        }`}
                    >
                      <Image
                        src={getCloudinaryUrl(img, 'gallery') || '/fallback.png'}
                        alt={`${project.title} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 12vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right side: Project Details */}
            <div className="w-full md:w-1/2 p-6 md:p-10 pb-10 md:pb-10 shrink-0 md:shrink md:overflow-y-auto relative flex flex-col min-h-0 bg-white">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                  {project.title}
                </h2>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.highlights.map((h, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100">
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                <div className="prose prose-slate prose-p:leading-relaxed max-w-none text-slate-600">
                  <p>
                    {isDescriptionExpanded
                      ? project.description
                      : (project.description.length > 250
                        ? project.description.substring(0, 250) + '...'
                        : project.description)}
                  </p>
                  {project.description.length > 250 && (
                    <button
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="text-blue-600 font-bold mt-2 hover:text-blue-800 transition-colors inline-block"
                    >
                      {isDescriptionExpanded ? 'Mostrar menos ↑' : 'Continuar leyendo ↓'}
                    </button>
                  )}
                </div>
              </div>

              {/* Specifications / Summary Data */}
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-10 mt-auto">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col shadow-sm">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Cliente
                  </span>
                  <span className="text-lg font-black text-slate-900">{project.client || 'No especificado'}</span>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col shadow-sm">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                    Superficie
                  </span>
                  <span className="text-lg font-black text-slate-900">{project.area || 'No especificada'}</span>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col shadow-sm">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Ubicación
                  </span>
                  <span className="text-lg font-black text-slate-900">{project.location || 'No especificada'}</span>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col shadow-sm">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Año
                  </span>
                  <span className="text-lg font-black text-slate-900">{project.year}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center space-x-3"
                >
                  <span>¿Tienes un proyecto similar? Contáctanos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
