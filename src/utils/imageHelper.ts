/**
 * Helper para construir URLs de imágenes del backend
 * @param imagePath - Ruta relativa de la imagen (ej: "uploads/imagen.jpg")
 * @returns URL completa de la imagen
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "";

  // Si ya es una URL completa, devolverla tal cual
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Construir URL completa usando la variable de entorno
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  return `${backendUrl}${imagePath}`;
};

/**
 * Helper para arrays de imágenes
 * @param images - Array de rutas de imágenes
 * @returns Array de URLs completas
 */
export const getImageUrls = (images: string[]): string[] => {
  return images.map((image) => getImageUrl(image));
};

/**
 * Helper para obtener la primera imagen de una propiedad, manejando diferentes formatos
 * @param images - Array de imágenes o string JSON
 * @returns URL completa de la primera imagen
 */
export const getFirstImageUrl = (images: string[] | string): string => {
  let imageArray: string[];

  if (Array.isArray(images)) {
    imageArray = images;
  } else if (typeof images === "string") {
    try {
      imageArray = JSON.parse(images);
    } catch (error) {
      console.error("Error parsing images JSON:", error);
      return "";
    }
  } else {
    console.error("Invalid images format:", images);
    return "";
  }

  if (imageArray.length === 0) return "";

  return getImageUrl(imageArray[0]);
};
