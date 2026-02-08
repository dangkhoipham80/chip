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
    <div className="w-full max-w-[95vw] mx-auto mb-8 px-2">
      {/* Polaroid Photo Collage - Expanded Spotlight - No Scroll */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 lg:gap-8 justify-center items-center py-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              rotate: getRotation(index),
              y: [0, -10, 0],
              ...shakeAnimation
            }}
            transition={{ 
              opacity: { duration: 0.5 },
              scale: { type: 'spring', stiffness: 200, damping: 15, delay: index * 0.15 },
              y: { 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: Math.random() * 2 
              },
              ...shakeAnimation.transition
            }}
            whileHover={{ 
              scale: 1.1, 
              rotate: 0,
              y: -20,
              zIndex: 10,
              transition: { type: 'spring', stiffness: 300 }
            }}
            className="relative"
          >
            {/* Polaroid Card - Fluid Size */}
            <div className="bg-white p-2 sm:p-3 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] transition-all">
              {/* Pin Icon */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full shadow-lg flex items-center justify-center text-xs sm:text-sm border-2 border-white/20">
                  📌
                </div>
              </div>

              {/* Image Container - Responsive fluidity to avoid scroll */}
              <div className="w-48 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 bg-white rounded-md overflow-hidden border-2 border-gray-100">
                {imageErrors[image] ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 text-5xl">
                    🖼️
                  </div>
                ) : (
                  <img
                    src={image}
                    alt={`Gợi ý ${index + 1}`}
                    className="w-full h-full object-contain"
                    onError={() => handleImageError(image)}
                    loading="lazy"
                  />
                )}
              </div>

              {/* Polaroid Caption Space */}
              <div className="h-6 sm:h-8 flex items-center justify-center text-gray-500 text-sm sm:text-lg font-handwriting mt-1 sm:mt-2">
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
