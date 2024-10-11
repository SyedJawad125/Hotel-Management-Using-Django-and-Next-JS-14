'use client';

import Image from 'next/image';
import banner1 from '../../public/images/Hotelbanner1.webp';
import banner2 from '../../public/images/Hotelbanner2.webp';
import banner3 from '../../public/images/Hotelbanner3.jpg';
import banner4 from '../../public/images/Hotelbanner4.jpg';
import banner5 from '../../public/images/Hotelbanner5.png';
import banner6 from '../../public/images/Hotelbanner6.png';

export default function Home() {
  return (
    <div className="relative bg-cover bg-center h-[calc(100vh-15rem)] flex items-center justify-center text-white my-2">
      {/* Left side: Text content with left margin */}
      <div className="w-1/2 text-left pl-40">
        <h4 className="text-lg text-pink-500 font-semibold mb-2">Welcoming Atmosphere</h4>
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
        {[
          { src: banner1, alt: 'Fitness Center', title: 'Fitness Center' },
          { src: banner2, alt: 'Free Wifi', title: 'Free Wifi' },
          { src: banner3, alt: 'Free Breakfast Buffet', title: 'Free Breakfast Buffet' },
          { src: banner4, alt: 'Laundry Service', title: 'Laundry Service' },
          { src: banner5, alt: 'Meeting Room', title: 'Meeting Room' },
          { src: banner6, alt: 'Free Parking', title: 'Free Parking' },
        ].map(({ src, alt, title }) => (
          <div key={title} className="border border-gray-300 rounded-lg overflow-hidden flex flex-col items-center">
            <div className="relative w-[180px] h-[120px]">
              <Image 
                src={src} 
                alt={alt} 
                fill 
                style={{ objectFit: 'cover' }} 
                priority // Optional: Use this to prioritize loading the image
              />
            </div>
            <h3 className="text-lg mt-2">{title}</h3>
          </div>
        ))}
      </div>
      
    </div>
  );
}
