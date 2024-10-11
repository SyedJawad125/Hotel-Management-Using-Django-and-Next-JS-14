'use client';
import Image from 'next/image';
import banner1 from '../../public/images/Hotelbanner1.webp';
import banner2 from '../../public/images/Hotelbanner2.webp';
import banner3 from '../../public/images/Hotelbanner3.jpg';
import banner4 from '../../public/images/Hotelbanner4.jpg';
import banner5 from '../../public/images/Hotelbanner5.png';
import banner6 from '../../public/images/Hotelbanner6.png';

const halls = [
    {
      title: 'Deluxe Rooms',
      description: (
        <ul className="list-disc list-inside text-sm">
          <li>Max Occupancy: 3</li>
          <li>Beds: 1 Master bed , 2 single (Optional)</li>
          <li>Views: City view / Hill View</li>
        </ul>
      ),
      imgSrc: banner1,
    },
    {
      title: 'Executive Rooms',
      description: (
        <ul className="list-disc list-inside text-sm">
          <li>Max Occupancy: 2</li>
          <li>Beds: 1 King, 2 Twin (Optional)</li>
          <li>Views: City view/Hill View</li>
        </ul>
      ),
      imgSrc: banner2,
    },
    {
      title: 'Deluxe Suites',
      description: (
        <ul className="list-disc list-inside text-sm">
          <li>Max Occupancy: 3</li>
          <li>Beds: 1 king , 1 sofa set</li>
          <li>Views: City view</li>
        </ul>
      ),
      imgSrc: banner3,
    },
    // Adding three more hall entries below
    {
      title: 'Panoramic Suites',
      description: (
        <ul className="list-disc list-inside text-sm">
          <li>Max Occupancy: 3</li>
          <li>Beds: 1 King</li>
          <li>Views: Lake view</li>
        </ul>
      ),
      imgSrc: banner4,
    },
    {
      title: 'Royal Suites',
      description: (
        <ul className="list-disc list-inside text-sm">
          <li>Max Occupancy: 3</li>
          <li>Beds: 1 King</li>
          <li>Views: City with lake view / Margalla hills Lake view</li>
        </ul>
      ),
      imgSrc: banner5,
    },
    {
      title: 'Royal Suites',
      description: (
        <ul className="list-disc list-inside text-sm">
          <li>Max Occupancy: 3</li>
          <li>Beds: 1 King</li>
          <li>Views: City with lake view / Margalla hills Lake view</li>
        </ul>
      ),
      imgSrc: banner6,
    },
  ];
  
  export default function Home() {
    return (
      <div className="container mx-auto px-20 py-20">
        {/* <p className="text font-bold text-center mb-10">Rooms</p> */}
        <h1 className="text-3xl font-bold text-center mb-10">Explore the rooms</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {halls.map((hall, index) => (
            <div key={index} className="bg-gray-50 shadow-lg rounded-lg overflow-hidden mb-16"> {/* Off-white using gray-50 */}
              <div className="relative h-60 w-full">
                <Image
                  src={hall.imgSrc}
                  alt={hall.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-10">
                <h3 className="text-xl text-gray-600 font-bold mb-4">{hall.title}</h3>
                <p className="text-gray-600">{hall.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }