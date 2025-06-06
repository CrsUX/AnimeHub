import { CLOUDINARY_URL, IMAGE_QUALITY, IMAGE_TRANSFORMATIONS } from '../config/cloudinary';

type TransformationType = keyof typeof IMAGE_TRANSFORMATIONS;
type QualityType = keyof typeof IMAGE_QUALITY;

export function getCloudinaryUrl(
  publicId: string,
  transformation: TransformationType,
  quality: QualityType = 'HIGH'
): string {
  return `${CLOUDINARY_URL}/${IMAGE_TRANSFORMATIONS[transformation]}/${IMAGE_QUALITY[quality]}/${publicId}`;
}