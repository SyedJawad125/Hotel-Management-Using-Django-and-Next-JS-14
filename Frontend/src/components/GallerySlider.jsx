'use client';

import { useState } from 'react';
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

  return (
    <div className="relative w-full h-64 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-64 flex-shrink-0">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button
          className="bg-black text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className="bg-black text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
