import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface ImageGridProps {
  images: string[];
  shouldShake: boolean;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, shouldShake }) => {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => ({ ...prev, [imageUrl]: true }));
  };

  const shakeAnimation = shouldShake
    ? {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 },
      }
    : {};

  // Determine grid layout based on number of images
  const getGridClass = (count: number) => {
    if (count === 2) return 'grid-cols-1 md:grid-cols-2';
    if (count === 3) return 'grid-cols-2 md:grid-cols-3';
    if (count === 4) return 'grid-cols-2 md:grid-cols-2';
    if (count === 5) return 'grid-cols-2 md:grid-cols-3';
    return 'grid-cols-2 md:grid-cols-3';
  };

  return (
    <div className={`grid ${getGridClass(images.length)} gap-6 max-w-4xl mx-auto mb-8`}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          animate={shakeAnimation}
          className="w-full h-48 sm:h-56 md:h-64 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
        >
          {imageErrors[image] ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pastel-blue to-pastel-pink text-7xl">
              🖼️
            </div>
          ) : (
            <img
              src={image}
              alt={`Gợi ý ${index + 1}`}
              className="w-full h-full object-cover"
              onError={() => handleImageError(image)}
              loading="lazy"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;
