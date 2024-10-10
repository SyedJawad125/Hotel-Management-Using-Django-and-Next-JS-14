"use client";
import Image from 'next/image';
import banner1 from '../../public/images/Hotelbanner1.webp';
import banner2 from '../../public/images/Hotelbanner2.webp';
import banner3 from '../../public/images/Hotelbanner3.jpg';
import banner4 from '../../public/images/Hotelbanner4.jpg';

export default function HotelPage() {
  return (
    <div className="container mx-auto p-4 overflow-hidden ml-20">
      {/* Breadcrumb Navigation */}
      <div className="text-sm mb-4">
        <a href="/" className="text-blue-600">Home</a> {'>'} 
        <a href="/countries" className="text-blue-600">Countries</a> {'>'} 
        <a href="/countries/pakistan" className="text-blue-600">Pakistan</a> {'>'} 
        <span className="text-gray-500">Islamabad Marriott Hotel</span>
      </div>

      {/* Hotel Main Content */}
      <div className="flex flex-wrap gap-4">
        {/* Main Image */}
        <div className="w-2/3">
          <Image
            src={banner1}
            alt="Islamabad Marriott Hotel"
            width={800}
            height={500}
            className="shadow-lg"
            priority={true} // Eagerly load the main banner
          />
        </div>

        {/* Right Side Thumbnails */}
        <div className="w-1/3 flex flex-col justify-between">
          <div className="flex gap-2">
            <Image
              src={banner2}
              alt="Restaurant"
              width={200}
              height={150}
              className="shadow-lg"
            />
            <Image
              src={banner3}
              alt="Pool"
              width={200}
              height={150}
              className="shadow-lg"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Image
              src={banner4}
              alt="Lobby"
              width={200}
              height={180}
              className="shadow-lg"
            />
            <Image
              src={banner2}
              alt="Conference Room"
              width={200}
              height={180}
              className="shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="mt-4">
        <h1 className="text-2xl font-bold">Islamabad Marriott Hotel</h1>
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
