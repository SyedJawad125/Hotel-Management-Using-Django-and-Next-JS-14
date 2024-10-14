'use client';
import React, { useEffect, useState } from 'react';
import AxiosInstance from '@/components/AxiosInstance'; // Import your Axios instance
import Image from 'next/image';

export default function Home() {
  const [banners, setBanners] = useState([]);

  // Fetch images from backend API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/images?imagescategory=featuredamenitieshome');
        if (res && res.data && res.data.data) {
          setBanners(res.data.data.data); // Adjust based on API response structure
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
    <div className="relative bg-cover bg-center h-[calc(100vh-15rem)] flex items-center justify-center text-white my-2">
      {/* Left side: Text content with left margin */}
      <div className="w-1/2 text-left pl-40">
        <h4 className="text-lg text-pink-500 font-semibold mb-4">Welcoming Atmosphere</h4>
        <h1 className="text-5xl font-bold mb-4">Featured Amenities</h1>
        <p className="text-xl max-w-xl mb-6 leading-relaxed">
          Free Wi-Fi, Breakfast, Swimming Pool, Fitness Centre, Spa and Wellness
          Facilities, Restaurant and Bar, Room Service, 24-Hour Front Desk, Concierge
          Service, Business Centre, Airport Shuttle, Parking, Laundry Services, Safety
          and Security, Accessible Facilities.
        </p>
      </div>

      {/* Right side: Image grid with right margin */}
      <div className="w-1/2 grid grid-cols-3 gap-6 pr-40">
        {banners.map((banner, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden flex flex-col items-center">
            <div className="relative w-[180px] h-[120px]">
              <Image
                src={`http://localhost:8000/${banner.image}`} // Adjust according to your API response structure
                alt={banner.title} // Assuming title is part of the API response
                width={300} // Fixed width
                height={200} // Fixed height
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg mt-2">{banner.name}</h3> {/* Assuming 'title' is a part of the API response */}
          </div>
        ))}
      </div>
    </div>
  );
}
