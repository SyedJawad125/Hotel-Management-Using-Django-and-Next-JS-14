'use client';
import React, { useEffect, useState } from 'react';
import AxiosInstance from "@/components/AxiosInstance";
import Image from 'next/image';
import Link from 'next/link';

export default function MeetingsSection() {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/publicimages?imagescategory=meetingsroomsgroupshome');
        if (res && res.data && res.data.data) {
          setHalls(res.data.data.data); // Set the fetched images
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
    <section className="relative h-[600px] mb-4">
      {halls.length > 0 ? (
        <div className="absolute inset-0 z-0">
          {/* Display the first image from the API as the background */}
          <Image
            src={`http://localhost:8000/${halls[0].image}`} // Adjust the API path if needed
            alt={halls[0].title}
            fill
            className="object-cover rounded-md"
            priority
          />
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black opacity-45"></div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {/* Overlay Text */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-10">
        <p className="text-sm text-red-300 mb-2 tracking-wider uppercase">Meeting Rooms</p>
        <h1 className="text-5xl font-bold text-white mb-4">
          Meetings, <span className="text-red-500">Events</span> & Groups
        </h1>
        <p className="text-white text-lg max-w-xl text-center mb-8">
          Plan your next special event or business meeting with us. Featuring 1,544 square meters of event space, our hotel offers a meeting room
          that accommodates up to 350 conference or 600 banquet guests. We can also arrange great rates for groups of all sizes.
        </p>
        <Link
          href="/learn-more"
          className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition-all duration-300"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
