"use client";
import Image from 'next/image';
import banner1 from '../../public/images/Hotelbanner1.webp';
import banner2 from '../../public/images/Hotelbanner2.webp';
import banner3 from '../../public/images/Hotelbanner3.jpg';
import banner4 from '../../public/images/Hotelbanner4.jpg';

export default function HotelPage() {
  return (
    <div className="container mx-auto p-4 overflow-hidden overflow-x-hidden"> 
      {/* Breadcrumb Navigation */}
      <div className="text-sm mb-6 ml-20 mt-4">
        <a href="/" className="text-blue-600">Home</a> {'>'} 
        <a href="/countries" className="text-blue-600">Countries</a> {'>'} 
        <a href="/countries/pakistan" className="text-blue-600">Pakistan</a> {'>'} 
        <span className="text-gray-500">Islamabad Hotel</span>
      </div>

      {/* Hotel Main Content */}
      <div className="flex gap-0 ml-20"> {/* Reduced the gap between main image and thumbnails */}
        {/* Main Image */}
        <div className="flex-grow">
          <Image
            src={banner1}
            alt="Islamabad Marriott Hotel"
            width={850}
            height={700} 
            className="shadow-lg"
            priority={true} // Eagerly load the main banner
          />
        </div>

        {/* Thumbnails in two rows of two images */}
        <div className="w-1/3 flex flex-wrap gap-0"> {/* Removed gaps between thumbnails */}
          <div className="flex w-full">
            <Image
              src={banner2}
              alt="Restaurant"
              width={220}
              height={220} 
              className="shadow-lg"
            />
            <Image
              src={banner3}
              alt="Pool"
              width={220}
              height={220}  
              className="shadow-lg"
            />
          </div>
          <div className="flex w-full mt-1">
            <Image
              src={banner4}
              alt="Lobby"
              width={220}
              height={220}  
              className="shadow-lg"
            />
            <Image
              src={banner2}
              alt="Conference Room"
              width={220}
              height={220}  
              className="shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="mt-8 ml-20 mb-24">
        <h1 className="text-2xl font-bold">Islamabad Hotel</h1>
        <p className="text-gray-600">Aga Khan Road, Shalimar 5, Islamabad, 46000, Pakistan</p>
        <div className="flex items-center mt-2">
          {/* Star Ratings */}
          <div className="flex">
            {Array(5).fill(0).map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.3l6.2 3.7-1.7-7.4 5.5-4.7-7.4-.6L12 2.3 9.4 8.3 2 8.9l5.5 4.7-1.7 7.4z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
