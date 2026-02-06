/**
 * Cloudinary image URL helper with optimized presets
 * Ensures consistent image optimization across the app
 */

export const imagePresets = {
  thumbnail: 'c_fill,g_auto,w_400,h_300,q_auto,f_auto',
  card: 'c_fill,g_auto,w_600,h_450,q_auto,f_auto',
  hero: 'c_fill,g_auto,w_1200,h_900,q_auto,f_auto',
  gallery: 'c_fill,g_auto,w_200,h_150,q_auto,f_auto',
  adminThumb: 'c_fill,g_auto,w_100,h_100,q_auto,f_auto',
  projectCard: 'c_fill,g_auto,w_800,h_600,q_auto,f_auto',
};

export function getCloudinaryUrl(publicId: string, preset: keyof typeof imagePresets = 'card') {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    if (publicId.startsWith('http')) return publicId;
    return publicId;
  }

  if (publicId.startsWith('http')) return publicId;

  const transform = imagePresets[preset];
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${publicId}`;
}
