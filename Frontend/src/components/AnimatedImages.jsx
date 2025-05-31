// 'use client';
// import { useEffect, useState, useRef } from 'react';
// import Image from 'next/image';
// import AxiosInstance from "@/components/AxiosInstance"; // Ensure AxiosInstance is properly configured

// export default function Home() {
//   const [images, setImages] = useState([]);
//   const imageRefs = useRef([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await AxiosInstance.get('/images/publicimages?imagescategory=animatedimagaeshome');
//         if (res && res.data && res.data.data) {
//           setImages(res.data.data.data); // Assuming the images are inside data.data
//         } else {
//           console.error('Unexpected response structure:', res);
//         }
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     };

//     fetchImages();
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('glow'); // Add class to trigger animation
//           }
//         });
//       },
//       { threshold: 0.1 } // Trigger when 10% of the image is visible
//     );

//     imageRefs.current.forEach((img) => {
//       if (img) {
//         observer.observe(img);
//       }
//     });

//     return () => {
//       if (imageRefs.current) {
//         imageRefs.current.forEach((img) => {
//           if (img) observer.unobserve(img);
//         });
//       }
//     };
//   }, [images]); // Run after images are loaded

//   return (
//     <div className="grid grid-cols-4 gap-4 ml-32 mt-10 mr-32">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           ref={(el) => (imageRefs.current[index] = el)}
//           className="relative w-[300px] h-[200px] opacity-0 transition-opacity duration-700 ease-in-out transform translate-y-5"
//         >
//           <Image
//             src={`http://localhost:8000${image.image}`} // Adjust according to your API response
//             alt={image.title || `Image ${index + 1}`}
//             fill
//             className="object-cover rounded-md"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }



'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import AxiosInstance from "@/components/AxiosInstance";

export default function Home() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const imageRefs = useRef([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosInstance.get('/images/publicimages?imagescategory=animatedimagaeshome');
        if (res && res.data && res.data.data) {
          setImages(res.data.data.data);
        } else {
          console.error('Unexpected response structure:', res);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentImageRefs = imageRefs.current;

    currentImageRefs.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => {
      currentImageRefs.forEach((img) => {
        if (img) observer.unobserve(img);
      });
    };
  }, [images]);

  return (
    <div className="min-h-screen bg-gradient-to-b bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Luxury Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extralight text-black mb-3">
          <span className="font-serif italic">Luxury</span> 
          <span className="text-gold-500 mx-2">|</span> 
          <span className="font-serif italic">Collection</span>
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto"></div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full h-10 w-10 bg-gold-700 opacity-70"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 px-2">
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className="relative group overflow-hidden rounded-lg shadow-lg opacity-0 transition-all duration-500 ease-in-out hover:shadow-gold-500/20"
            >
              <div className="aspect-square w-full">
                <Image
                  src={`http://localhost:8000${image.image}`}
                  alt={image.title || `Image ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 p-3 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white text-sm font-serif line-clamp-1">{image.title || 'Untitled'}</h3>
              </div>
              
              <div className="absolute inset-0 border border-transparent group-hover:border-gold-500/30 transition-all duration-300 z-30 pointer-events-none"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}