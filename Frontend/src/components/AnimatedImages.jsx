import { useEffect, useRef } from 'react';
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
import banner11 from '../../public/images/Hotelbanner5.png';
import banner12 from '../../public/images/Hotelbanner6.png';
import banner13 from '../../public/images/Hotelbanner1.webp';
import banner14 from '../../public/images/Hotelbanner2.webp';
import banner15 from '../../public/images/Hotelbanner3.jpg';
import banner16 from '../../public/images/Hotelbanner4.jpg';

export default function Home() {
  const imageRefs = useRef([]);

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
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 ml-32 mt-10 mr-32">
      {[banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8, banner9, banner10,
       banner11, banner12, banner13, banner14, banner15, banner16].map((banner, index) => (
        <div
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          className="relative w-[300px] h-[200px] opacity-0 transition-opacity duration-700 ease-in-out transform translate-y-5"
        >
          <Image
            src={banner}
            alt={`Hotel image ${index + 1}`}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}