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
    <div className="relative bg-cover bg-center h-screen flex items-center justify-center text-white">
      
      {/* Left side: Text content with left margin */}
      <div className="w-1/2 text-left pl-40"> {/* Added left padding (pl-8) for margin */}
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
      <div className="w-1/2 grid grid-cols-3 gap-6 pr-40"> {/* Added right padding (pr-8) for margin */}
        <div className="flex flex-col items-center">
          <Image src={banner5} alt="Fitness Center" width={180} height={120} objectFit="cover"/>
          <h3 className="text-lg mt-2">Fitness Center</h3>
        </div>
        <div className="flex flex-col items-center">
          <Image src={banner6} alt="Free Wifi" width={180} height={120} objectFit="cover"/>
          <h3 className="text-lg mt-2">Free Wifi</h3>
        </div>
        <div className="flex flex-col items-center">
          <Image src={banner5} alt="Free Breakfast Buffet" width={180} height={120} objectFit="cover"/>
          <h3 className="text-lg mt-2">Free Breakfast Buffet</h3>
        </div>
        <div className="flex flex-col items-center">
          <Image src={banner6} alt="Laundry Service" width={180} height={120} objectFit="cover"/>
          <h3 className="text-lg mt-2">Laundry Service</h3>
        </div>
        <div className="flex flex-col items-center">
          <Image src={banner5} alt="Meeting Room" width={180} height={120} objectFit="cover"/>
          <h3 className="text-lg mt-2">Meeting Room</h3>
        </div>
        <div className="flex flex-col items-center">
          <Image src={banner6} alt="Free Parking" width={180} height={120} objectFit="cover"/>
          <h3 className="text-lg mt-2">Free Parking</h3>
        </div>
      </div>
      
    </div>
  );
}
