// 'use client';
// import React, { useEffect, useState } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";
// import Image from 'next/image';

// export default function EventImageCom() {
//   const [halls, setHalls] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await AxiosInstance.get('/images/publicimages?imagescategory=meetingsandeventshome');
//         if (res && res.data && res.data.data) {
//           setHalls(res.data.data.data); // Set only the filtered halls to state
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
//       <h2 className="text-3xl font-bold text-center mb-10">Meetings & Events</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {halls.map((hall, index) => (
//           <div key={index} className="bg-gray-50 shadow-lg rounded-lg overflow-hidden mb-16">
//             <div className="relative h-60 w-full">
//               <Image
//                 src={`http://localhost:8000${hall.image}`} // Adjust according to your API response structure
//                 alt={hall.title}
//                 width={500}
//                 height={400}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h3 className="text-lg mt-2 text-gray-800 text-sm ml-6 mr-6 mb-6">{hall.description}</h3>
//             {/* <div className="p-10">
//               <h3 className="text-xl text-gray-600 font-bold mb-1">{hall.title}</h3>
//               <p className="text-gray-600">{hall.description}</p>
//             </div> */}
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

export default function EventImageCom() {
  const [halls, setHalls] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/publicimages?imagescategory=meetingsandeventshome');
        if (res && res.data && res.data.data) {
          setHalls(res.data.data.data);
        } else {
          console.error('Unexpected response structure:', res);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Luxurious Header */}
        <div className="text-center mb-16 -mt-8">
          <p className="text-sm uppercase tracking-[0.3em] text-gold-500 mb-4">Exquisite Venues</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
            Our <span className="font-medium text-gold-600">Elegant</span> Event Spaces
          </h2>
          <div className="w-24 h-0.5 bg-gold-400 mx-auto"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {halls.map((hall, index) => (
            <div 
              key={index}
              className="relative group overflow-hidden rounded-none shadow-xl transition-all duration-500 hover:shadow-2xl"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={`http://localhost:8000${hall.image}`}
                  alt={hall.title}
                  fill
                  className={`object-cover transition-transform duration-700 ${hoveredCard === index ? 'scale-105' : 'scale-100'}`}
                  quality={100}
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500 ${hoveredCard === index ? 'opacity-90' : 'opacity-70'}`}></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 p-8 w-full text-white transition-all duration-500 transform">
                <div className={`transition-all duration-500 ${hoveredCard === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'}`}>
                  <h3 className="text-2xl font-serif font-medium mb-2">{hall.title}</h3>
                  {/* <p className="text-white/90 font-light mb-4">{hall.description}</p> */}
                </div>
                <button 
                  className={`bg-transparent border border-white text-white px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:bg-white hover:text-black`}
                >
                  View Details
                </button>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold-400 transition-all duration-300 opacity-80"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold-400 transition-all duration-300 opacity-80"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        {/* <div className="mt-24 text-center">
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg font-light">
            Each of our venues is meticulously designed to create unforgettable experiences for your special events.
          </p>
          <button className="bg-gold-500 hover:bg-gold-600 text-black px-10 py-4 uppercase tracking-wider text-sm font-medium transition-all duration-300">
            Request a Private Tour
          </button>
        </div> */}
      </div>
    </div>
  );
}