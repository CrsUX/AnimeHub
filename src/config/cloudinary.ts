export const CLOUDINARY_CLOUD_NAME = 'dnsadmpzf';
export const CLOUDINARY_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const IMAGE_QUALITY = {
  LOW: 'q_auto:low',
  MEDIUM: 'q_auto:good',
  HIGH: 'q_auto:best'
} as const;

export const IMAGE_TRANSFORMATIONS = {
  HERO: 'w_1920,h_1080,c_fill,g_auto,f_auto,e_brightness:-10,e_contrast:10,e_saturation:-20,co_rgb:0F110C,e_colorize:20',
  THUMBNAIL: 'w_400,h_600,c_fill,g_auto,f_auto',
  AVATAR: 'w_100,h_100,c_fill,g_face,f_auto'
} as const;