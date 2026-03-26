import React, { useState } from 'react';
import { getImageUrl } from './imageUtils';
import './ImageGallery.css';

const ImageGallery = ({ images, productName, highLoadRated = false }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [imageError, setImageError] = useState({});

    // Si pas d'images, afficher un placeholder
    if (!images || images.length === 0) {
        return (
            <div className="image-gallery">
                <div className="main-image">
                    <img
                        src="/placeholder.webp"
                        alt="Image non disponible"
                        className="fallback-image"
                    />
                    <div className="image-badge">Image non disponible</div>
                </div>
            </div>
        );
    }

    const handleImageError = (index) => {
        console.error(`❌ Erreur chargement image ${index + 1}: ${images[index]}`);
        setImageError(prev => ({ ...prev, [index]: true }));
    };

    const getSafeImageUrl = (imagePath, index) => {
        if (imageError[index]) {
            return '/placeholder.webp';
        }
        return getImageUrl(imagePath);
    };

    return (
        <div className="image-gallery">
            {/* Image principale */}
            <div className="main-image-container">
                <img
                    src={getSafeImageUrl(images[selectedImage], selectedImage)}
                    alt={`${productName} - vue ${selectedImage + 1}`}
                    className="main-image"
                    onError={() => handleImageError(selectedImage)}
                    loading="eager"
                />
                {highLoadRated && (
                    <div className="image-badge high-load">
                        🏗️ Haute Charge
                    </div>
                )}
            </div>

            {/* Miniatures */}
            <div className="thumbnail-grid">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                        onClick={() => setSelectedImage(index)}
                    >
                        <img
                            src={getSafeImageUrl(image, index)}
                            alt={`${productName} - miniature ${index + 1}`}
                            onError={() => handleImageError(index)}
                            loading="lazy"
                        />
                        {selectedImage === index && (
                            <div className="thumbnail-active-overlay"></div>
                        )}
                    </div>
                ))}

                {/* Option vidéo (si disponible) */}
                {productName && (
                    <div className="thumbnail thumbnail-play">
                        <span className="material-symbols-outlined">play_circle</span>
                        <span className="thumbnail-label">Vidéo</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageGallery;