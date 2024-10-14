'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AxiosInstance from "@/components/AxiosInstance";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";

const NextJsCarousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/images?imagescategory=bannerimagaeshome');
        if (res && res.data && res.data.data) {
          setBanners(res.data.data.data); // Assuming 'data' contains the image data
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
    <div className="w-full">
      <Carousel 
        showThumbs={false} 
        autoPlay 
        infiniteLoop 
        interval={3000}
        showStatus={false}
      >
        {banners.map((banner, index) => (
          <div key={index}>
            <Image
              src={`http://localhost:8000/${banner.image}`} // Adjust according to your API structure
              alt={`Banner ${index + 1}`}
              className="w-full h-[87vh] object-cover"
              width={1920}
              height={1080} // Adjust dimensions as needed
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default NextJsCarousel;
