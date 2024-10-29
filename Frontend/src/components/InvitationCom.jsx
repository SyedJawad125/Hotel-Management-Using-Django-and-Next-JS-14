'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AxiosInstance from "@/components/AxiosInstance";

const Overview = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/publicimages?imagescategory=invitationbgimage');
        if (res && res.data && res.data.data) {
          setImages(res.data.data.data); // Assuming the API response has a data structure with a list of images
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
    <div className="relative flex items-center justify-center h-screen bg-white overflow-hidden h-[600px]">
      {/* Background Image */}
      {images.length > 0 && (
        <div className="absolute inset-0 z-0">
          <Image
            src={`http://localhost:8000${images[0].image}`} // Adjust the API response path
            alt={images[0].title} // Provide a default title or alt text
            fill
            className="object-cover object-center"
            priority
          />
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
      )}
      <div className="max-w-2xl text-center p-6 relative z-10">
        {/* Heading */}
        <h1 className="text-md text-red-500 font-medium mb-2">Overview to Ramada</h1>
        <h2 className="text-5xl font-bold mb-8">
          <span className="text-red-500">An Invitation To Islamabad</span>
        </h2>

        {/* First Paragraph - 3 Lines */}
        <p className="text-base font-semibold mb-6 text-white-900 leading-relaxed max-w-2xl mx-auto">
          We believe in creating a warm and welcoming experience for all our guests. 
          At Ramada by Wyndham Islamabad we offer a tranquil space to unwind with our elegantly appointed guest rooms. 
          Staying with us, explore both Islamabad the capital leisure attractions and business district right at your doorstep. 
          It is your perfect base to discover the twin city.
        </p>

        {/* Second Paragraph - 5 Lines */}
        <div className="max-w-full px-0">
          <p className="text-base mb-6 text-white-700 leading-relaxed max-w-3xl mx-auto">
            With a stay at our Ramada Islamabad hotel, you will be perfectly positioned to explore the city and reach the area’s top attractions. 
            We are located across the street from Rawal Lake and next to the exclusive Islamabad Club, which offers golf, polo, and horseback riding. 
            Our amenity-rich hotel features an indoor pool, onsite spa, and four restaurants, along with a rooftop lounge boasting views of the city 
            and Margalla Hills. We also provide easy access to the Diplomatic Enclave, Federal Government Ministries, and Benazir Bhutto International 
            Airport (ISB). If you are planning a business meeting or special event, our venue can host up to 600 guests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
