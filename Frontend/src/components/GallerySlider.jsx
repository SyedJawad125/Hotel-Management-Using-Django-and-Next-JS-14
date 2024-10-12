'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import banner1 from '../../public/images/Hotelbanner1.webp';
import banner2 from '../../public/images/Hotelbanner2.webp';
import banner3 from '../../public/images/Hotelbanner3.jpg';
import banner4 from '../../public/images/Hotelbanner4.jpg';
import banner5 from '../../public/images/Hotelbanner5.png';
import banner6 from '../../public/images/Hotelbanner6.png';
import banner7 from '../../public/images/Hotelbanner1.webp';
import banner8 from '../../public/images/Hotelbanner2.webp';
import banner9 from '../../public/images/Hotelbanner3.jpg';
import banner10 from '../../public/images/Hotelbanner4.jpg';

const images = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  banner7,
  banner8,
  banner9,
  banner10,
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden flex items-center justify-center">
      <div className="relative flex items-center justify-center w-[80%]">
        {images.map((image, index) => {
          // Calculate relative positions and sizes for each image
          let imageClass = "opacity-50 scale-75"; // Smaller, faded image
          if (index === currentIndex) {
            imageClass = "opacity-100 scale-100"; // Center image, full size
          } else if (index === (currentIndex + 1) % images.length || index === (currentIndex - 1 + images.length) % images.length) {
            imageClass = "opacity-75 scale-90"; // Adjacent images, slightly larger
          }

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 ease-in-out w-[30%] h-[400px] ${imageClass} z-${index === currentIndex ? '10' : '0'}`}
              style={{
                left: `${50 + (index - currentIndex) * 30}%`,
                transform: `translateX(-50%)`,
              }}
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-lg"
              />
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <button
        className="absolute left-0 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 focus:outline-none"
        onClick={handlePrev}
      >
        <span className="material-icons">arrow_back_ios</span>
      </button>
      <button
        className="absolute right-0 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 focus:outline-none"
        onClick={handleNext}
      >
        <span className="material-icons">arrow_forward_ios</span>
      </button>

      {/* View More button */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button className="bg-red-500 text-white px-6 py-2 rounded-lg">
          View More
        </button>
      </div>
    </div>
  );
}
