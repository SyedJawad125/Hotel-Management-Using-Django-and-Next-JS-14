'use client';
import React from 'react';
import Image from 'next/image';
import img1 from '../../public/images/1. licensed-image.jpg';

const Overview = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-white overflow-hidden  h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={img1}
          alt="image"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>
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
          With a stay at our Ramada Islamabad hotel, you will be perfectly positioned to explore the city and reach the area is top attractions. 
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
