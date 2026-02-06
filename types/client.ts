export interface Client {
  id: string;
  company_id: string;
  name: string;           // Nombre de la empresa cliente
  description: string;    // Descripción del proyecto realizado
  year: string;          // Año(s) del proyecto
  logo?: string;         // public_id de Cloudinary (opcional)
  order: number;         // Para ordenar en el carousel
  created_at?: string;
  updated_at?: string;
}
