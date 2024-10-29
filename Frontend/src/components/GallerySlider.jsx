'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import AxiosInstance from "@/components/AxiosInstance";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Slider() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/publicimages?imagescategory=gallerysliderhome');
        if (res && res.data && res.data.data) {
          setImages(res.data.data.data); 
        } else {
          console.error('Unexpected response structure:', res);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); 

    return () => clearInterval(interval); 
  }, [images.length]);

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
    <div className='ml-10 mr-10'>
      <div className="relative w-full h-[500px] overflow-hidden flex items-center justify-center mb-20">
        <div className="relative flex items-center justify-center w-[80%] gap-3"> {/* Adjusted gap */}
          {images.map((image, index) => {
            let imageClass = "opacity-100 scale-75";
            if (index === currentIndex) {
              imageClass = "opacity-100 scale-100"; 
            } else if (
              index === (currentIndex + 1) % images.length || 
              index === (currentIndex - 1 + images.length) % images.length
            ) {
              imageClass = "opacity-100 scale-90"; 
            }

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out w-[24%] h-[400px] ${imageClass} z-${index === currentIndex ? '10' : '0'}`} // Changed width to 22%
                style={{
                  left: `${25 + (index - currentIndex) * 25}%`, // Adjusted for 4 images
                  transform: `translateX(-50%)`,
                  backgroundImage: `url(http://localhost:8000${image.image})`, 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                }}
              >
                <div className="rounded-lg w-full h-full"></div>
              </div>
            );
          })}
        </div>

        <button
            className="absolute left-0 bg-black-500 text-white p-4 rounded-full hover:bg-black-600 focus:outline-none transition-all duration-300 shadow-lg transform hover:scale-105"
            onClick={handlePrev}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            className="absolute right-0 bg-black-500 text-white p-4 rounded-full hover:bg-black-600 focus:outline-none transition-all duration-300 shadow-lg transform hover:scale-105"
            onClick={handleNext}
          >
            <ChevronRightIcon className="h-6 w-6" />
        </button>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-0">
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg">
            View More
          </button>
        </div>
      </div>
    </div>
  );
}
