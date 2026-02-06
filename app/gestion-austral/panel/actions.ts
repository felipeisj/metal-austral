'use server'

import cloudinary from '@/lib/cloudinary'
import { supabase } from '@/lib/supabase'
import { Project } from '@/types/project'
import { Client } from '@/types/client'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils'

/**
 * Creates a new project in Supabase
 */
export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        ...project,
        company_id: process.env.NEXT_PUBLIC_COMPANY_ID
      }])
      .select()

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/gestion-austral/panel')
    revalidatePath('/proyectos')
    return { success: true, data }
  } catch (error) {
    return { success: false, error: (error as any)?.message || 'Failed to create project' }
  }
}

/**
 * Updates an existing project
 */
export async function updateProject(id: string, updates: Partial<Project>) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)
      .select()

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/gestion-austral/panel')
    revalidatePath('/proyectos')
    return { success: true, data }
  } catch (error) {
    return { success: false, error: (error as any)?.message || 'Failed to update project' }
  }
}

/**
 * Deletes a project
 */
export async function deleteProject(id: string) {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/gestion-austral/panel')
    revalidatePath('/proyectos')
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as any)?.message || 'Failed to delete project' }
  }
}

/**
 * Uploads an image to Cloudinary in a specific project folder
 */
export async function uploadImage(formData: FormData, folder: string) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise<{ success: boolean; public_id?: string; error?: string }>((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `${process.env.CLOUDINARY_FOLDER}/${slugify(folder)}`,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            resolve({ success: false, error: 'Upload failed' });
          } else {
            resolve({ success: true, public_id: result?.public_id });
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    return { success: false, error: (error as any)?.message || 'Upload process failed' };
  }
}

// ============ CLIENT ACTIONS ============

/**
 * Creates a new client in Supabase
 */
export async function createClient(client: Omit<Client, 'id' | 'created_at' | 'updated_at'>) {
  console.log('createClient action called with:', client)
  console.log('company_id env:', process.env.NEXT_PUBLIC_COMPANY_ID)

  try {
    const clientToInsert = {
      ...client,
      company_id: process.env.NEXT_PUBLIC_COMPANY_ID
    }
    console.log('Inserting client:', clientToInsert)

    const { data, error } = await supabase
      .from('clients')
      .insert([clientToInsert])
      .select()

    console.log('Supabase response - data:', data, 'error:', error)

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/gestion-austral/panel')
    return { success: true, data }
  } catch (error) {
    return { success: false, error: (error as any)?.message || 'Failed to create client' }
  }
}

/**
 * Updates an existing client
 */
export async function updateClient(id: string, updates: Partial<Client>) {
  try {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)
      .select()

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/gestion-austral/panel')
    return { success: true, data }
  } catch (error) {
    return { success: false, error: (error as any)?.message || 'Failed to update client' }
  }
}

/**
 * Deletes a client
 */
export async function deleteClient(id: string) {
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
      .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/gestion-austral/panel')
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as any)?.message || 'Failed to delete client' }
  }
}

