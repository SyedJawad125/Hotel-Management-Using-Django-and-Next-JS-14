'use client';
import React, { useEffect, useState } from 'react';
import AxiosInstance from "@/components/AxiosInstance";
import Image from 'next/image';

export default function EventImageCom() {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/publicimages?imagescategory=meetingsandeventshome');
        if (res && res.data && res.data.data) {
          setHalls(res.data.data.data); // Set only the filtered halls to state
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
    <div className="container mx-auto px-32 py-32">
      <h2 className="text-3xl font-bold text-center mb-10">Meetings & Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {halls.map((hall, index) => (
          <div key={index} className="bg-gray-50 shadow-lg rounded-lg overflow-hidden mb-16">
            <div className="relative h-60 w-full">
              <Image
                src={`http://localhost:8000${hall.image}`} // Adjust according to your API response structure
                alt={hall.title}
                width={500}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg mt-2 text-gray-800 text-sm ml-6 mr-6 mb-6">{hall.description}</h3>
            {/* <div className="p-10">
              <h3 className="text-xl text-gray-600 font-bold mb-1">{hall.title}</h3>
              <p className="text-gray-600">{hall.description}</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
