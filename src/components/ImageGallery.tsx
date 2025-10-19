import React from 'react';
import ImageGallery from 'react-image-gallery';
import { motion } from 'framer-motion';
import 'react-image-gallery/styles/css/image-gallery.css';

interface ImageGalleryProps {
    images: string[];
}

const ImageGalleryComponent: React.FC<ImageGalleryProps> = ({ images }) => {
    if (!images || images.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg"
            >
                <p className="text-gray-500">No hay imágenes disponibles</p>
            </motion.div>
        );
    }

    const galleryImages = images.map((image) => ({
        original: image,
        thumbnail: image,
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <ImageGallery
                items={galleryImages}
                showThumbnails={true}
                showFullscreenButton={true}
                showPlayButton={false}
                showBullets={true}
                autoPlay={false}
                lazyLoad={true}
                additionalClass="image-gallery-custom"
            />
        </motion.div>
    );
};

export default ImageGalleryComponent;