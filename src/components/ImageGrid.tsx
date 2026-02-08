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
        rotate: [0, -5, 5, -5, 5, 0],
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.6 },
      }
    : {};

  // Random subtle rotations for polaroid effect
  const getRotation = (index: number) => {
    const rotations = [-3, 2, -2, 3, -1,1];
    return rotations[index % rotations.length];
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-12 px-4">
      {/* Polaroid Photo Collage - Single Row */}
      <div className="flex flex-row gap-4 justify-center items-center overflow-x-auto pb-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              rotate: getRotation(index),
              ...shakeAnimation
            }}
            transition={{ 
              delay: index * 0.15,
              type: 'spring',
              stiffness: 200,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0,
              zIndex: 10,
              transition: { type: 'spring', stiffness: 300 }
            }}
            className="relative flex-shrink-0"
            style={{
              rotate: `${getRotation(index)}deg`
            }}
          >
            {/* Polaroid Card */}
            <div className="bg-white p-2 rounded-lg shadow-2xl hover:shadow-3xl transition-shadow">
              {/* Pin Icon */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-6 h-6 bg-red-500 rounded-full shadow-md flex items-center justify-center text-xs">
                  📌
                </div>
              </div>

              {/* Image Container - Smaller size for 4 images */}
              <div className="w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 bg-gray-100 rounded overflow-hidden">
                {imageErrors[image] ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 text-5xl">
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
              </div>

              {/* Polaroid Caption Space */}
              <div className="h-6 flex items-center justify-center text-gray-400 text-xs font-handwriting">
                #{index + 1}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
