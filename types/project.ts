export type ProjectCategory = 'galpones' | 'radieres' | 'otros';
export type ProjectStatus = 'Publicado' | 'Borrador';

export interface Project {
  id: string;
  company_id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  image: string;           // public_id from Cloudinary
  images?: string[];       // gallery of images
  location: string;
  year: number;
  area?: string;
  client?: string;
  highlights?: string[];
  created_at?: string;
  updated_at?: string;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  galpones: 'Galpones',
  radieres: 'Radieres',
  otros: 'Otros',
};

export const categoryIcons: Record<ProjectCategory, string> = {
  galpones: '🏭',
  radieres: '🏗️',
  otros: '📦',
};
