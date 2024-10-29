'use client'; // Ensure this component is client-side rendered

import React, { useEffect, useState } from 'react';
import AxiosInstance from "@/components/AxiosInstance"; // Assuming you have AxiosInstance set up
import Image from 'next/image';

export default function Home() {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/publicimages?imagescategory=exploretheroomshome');
        if (res && res.data && res.data.data) {
          setHalls(res.data.data.data); // Assuming API response structure has a nested data array
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
      <h1 className="text-3xl font-bold text-center mb-10">Explore the Rooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {halls.map((hall, index) => (
          <div key={index} className="bg-gray-50 shadow-lg rounded-lg overflow-hidden mb-16">
            <div className="relative h-60 w-full">
              <Image
                src={`http://localhost:8000${hall.image}`} // Adjust based on your API's response
                alt={hall.title}
                width={500} // Fixed width
                height={400} // Fixed height
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-10">
              <h2 className="text-xl text-gray-900 font-bold mb-4">{hall.name}</h2>
              <div>
                {/* Check if bulletsdescription exists and is a string */}
                {hall.bulletsdescription && typeof hall.bulletsdescription === 'string' && (
                  hall.bulletsdescription.split(',').map((bullet, index) => (
                    <h4 key={index} className="text-sm text-gray-700 mb-4">
                      {bullet.trim()} {/* Trim to remove extra spaces */}
                    </h4>
                  ))
                )}
              </div>

              {/* Uncomment if needed for additional details
              <div className="text-gray-600">
                <ul className="list-disc list-inside text-sm">
                  <li>Max Occupancy: {hall.name}</li> 
                  <li>Beds: {hall.beds}</li>
                  <li>Views: {hall.views}</li> 
                </ul>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
