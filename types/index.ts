// types/index.ts
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'industrial' | 'comercial' | 'logistico';
  image: string;
  location: string;
  year: number;
}