// src/utils/imageUtils.js

/**
 * Fonction pour obtenir l'URL correcte d'une image
 * @param {string} imagePath - Le chemin de l'image
 * @returns {string} - L'URL complète de l'image
 */
export const getImageUrl = (imagePath) => {
    if (!imagePath) {
        return '/placeholder.webp';
    }

    // Si c'est déjà une URL absolue (http, https, data:)
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
        return imagePath;
    }

    // Pour les images dans src/assets/
    try {
        // Nettoyer le chemin
        let cleanPath = imagePath;

        // Si le chemin commence par /src/assets/, le garder tel quel
        if (cleanPath.startsWith('/src/assets/')) {
            // Pour Vite, on peut importer dynamiquement
            return new URL(cleanPath, import.meta.url).href;
        }

        // Si c'est juste le nom du fichier
        if (cleanPath.includes('.webp') || cleanPath.includes('.jpg') || cleanPath.includes('.png')) {
            // Supposons que l'image est dans /src/assets/images/
            const fullPath = `/src/assets/images/${cleanPath}`;
            return new URL(fullPath, import.meta.url).href;
        }

        return cleanPath;
    } catch (error) {
        console.error(`Erreur lors du chargement de l'image: ${imagePath}`, error);
        return '/placeholder.webp';
    }
};

/**
 * Fonction pour précharger les images
 * @param {Array} images - Liste des chemins d'images
 */
export const preloadImages = (images) => {
    images.forEach(imagePath => {
        if (imagePath) {
            const img = new Image();
            img.src = getImageUrl(imagePath);
        }
    });
};