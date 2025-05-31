// 'use client'; // Ensure this component is client-side rendered

// import React, { useEffect, useState } from 'react';
// import AxiosInstance from "@/components/AxiosInstance"; // Assuming you have AxiosInstance set up
// import Image from 'next/image';

// export default function Home() {
//   const [halls, setHalls] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await AxiosInstance.get('/images/publicimages?imagescategory=exploretheroomshome');
//         if (res && res.data && res.data.data) {
//           setHalls(res.data.data.data); // Assuming API response structure has a nested data array
//         } else {
//           console.error('Unexpected response structure:', res);
//         }
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     };

//     fetchImages();
//   }, []);

//   return (
//     <div className="container mx-auto px-32 py-32">
//       <h1 className="text-3xl font-bold text-center mb-10">Explore the Rooms</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {halls.map((hall, index) => (
//           <div key={index} className="bg-gray-50 shadow-lg rounded-lg overflow-hidden mb-16">
//             <div className="relative h-60 w-full">
//               <Image
//                 src={`http://localhost:8000${hall.image}`} // Adjust based on your API's response
//                 alt={hall.title}
//                 width={500} // Fixed width
//                 height={400} // Fixed height
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="p-10">
//               <h2 className="text-xl text-gray-900 font-bold mb-4">{hall.name}</h2>
//               <div>
//                 {/* Check if bulletsdescription exists and is a string */}
//                 {hall.bulletsdescription && typeof hall.bulletsdescription === 'string' && (
//                   hall.bulletsdescription.split(',').map((bullet, index) => (
//                     <h4 key={index} className="text-sm text-gray-700 mb-4">
//                       {bullet.trim()} {/* Trim to remove extra spaces */}
//                     </h4>
//                   ))
//                 )}
//               </div>

//               {/* Uncomment if needed for additional details
//               <div className="text-gray-600">
//                 <ul className="list-disc list-inside text-sm">
//                   <li>Max Occupancy: {hall.name}</li> 
//                   <li>Beds: {hall.beds}</li>
//                   <li>Views: {hall.views}</li> 
//                 </ul>
//               </div> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




'use client';
import React, { useEffect, useState } from 'react';
import AxiosInstance from "@/components/AxiosInstance";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/publicimages?imagescategory=exploretheroomshome');
        if (res && res.data && res.data.data) {
          setHalls(res.data.data.data);
        } else {
          console.error('Unexpected response structure:', res);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-amber-200 rounded-full mb-4"></div>
          <p className="text-amber-800 font-light">Loading luxury accommodations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <Image
          src="/luxury-hotel-lobby.jpg" // Replace with your actual hero image
          alt="Luxury Hotel"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif text-white mb-6"
          >
            Our Suites & Rooms
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-amber-100 max-w-2xl font-light"
          >
            Experience unparalleled luxury in our meticulously designed accommodations
          </motion.p>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="container w-4/5 mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {halls.map((hall, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={`http://localhost:8000${hall.image}`}
                  alt={hall.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {hall.category || "Premium"}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h2 className="text-2xl font-serif text-gray-800 mb-4">{hall.name}</h2>
                
                <div className="mb-6">
                  {hall.bulletsdescription && typeof hall.bulletsdescription === 'string' && (
                    <ul className="space-y-2">
                      {hall.bulletsdescription.split(',').map((bullet, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600 font-light">{bullet.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-amber-100">
                  <div>
                    <p className="text-xs text-gray-500">Starting from</p>
                    <p className="text-2xl font-serif text-amber-700">$450</p>
                  </div>
                  <Link href="/bookingonhomepage" passHref>
                    <button className="px-6 py-2 bg-amber-600 text-white text-sm font-medium rounded-full hover:bg-amber-700 transition-colors duration-300">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-amber-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-6">Need Help Choosing Your Suite?</h2>
          <p className="max-w-2xl mx-auto text-amber-100 mb-8 font-light">
            Our concierge team is available 24/7 to help you select the perfect accommodation for your stay.
          </p>
          <button className="px-8 py-3 bg-white text-amber-800 font-medium rounded-full hover:bg-amber-100 transition-colors duration-300">
            Contact Our Concierge
          </button>
        </div>
      </div>
    </div>
  );
}