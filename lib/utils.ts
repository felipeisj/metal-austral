/**
 * Utility functions for the application
 */

/**
 * Formats a number with thousands separator (Chilean format)
 */
export const formatNumber = (value: number | undefined): string => {
  if (value === undefined || value === null) {
    return '';
  }
  return new Intl.NumberFormat('es-CL', {
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats a string to be used as a Cloudinary folder name
 */
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Capitalize first letter of a string
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
