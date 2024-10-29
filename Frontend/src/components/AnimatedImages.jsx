'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import AxiosInstance from "@/components/AxiosInstance"; // Ensure AxiosInstance is properly configured

export default function Home() {
  const [images, setImages] = useState([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/publicimages?imagescategory=animatedimagaeshome');
        if (res && res.data && res.data.data) {
          setImages(res.data.data.data); // Assuming the images are inside data.data
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('glow'); // Add class to trigger animation
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the image is visible
    );

    imageRefs.current.forEach((img) => {
      if (img) {
        observer.observe(img);
      }
    });

    return () => {
      if (imageRefs.current) {
        imageRefs.current.forEach((img) => {
          if (img) observer.unobserve(img);
        });
      }
    };
  }, [images]); // Run after images are loaded

  return (
    <div className="grid grid-cols-4 gap-4 ml-32 mt-10 mr-32">
      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          className="relative w-[300px] h-[200px] opacity-0 transition-opacity duration-700 ease-in-out transform translate-y-5"
        >
          <Image
            src={`http://localhost:8000${image.image}`} // Adjust according to your API response
            alt={image.title || `Image ${index + 1}`}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}
