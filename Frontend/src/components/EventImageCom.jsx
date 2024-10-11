'use client';
import Image from 'next/image';
import banner1 from '../../public/images/Hotelbanner1.webp';
import banner2 from '../../public/images/Hotelbanner2.webp';
import banner3 from '../../public/images/Hotelbanner3.jpg';
import banner4 from '../../public/images/Hotelbanner4.jpg';

const halls = [
  {
    title: 'Exclusive Board Rooms',
    description:
      'The twin board rooms are a value option if you are looking for mid-size meetings or discussion sessions upto 30 invitees.',
    imgSrc: banner1,
  },
  {
    title: 'Noor Hall',
    description:
      'Noor Hall, located in the basement level of Ramada Islamabad is a value option if you are looking for corporate meetings, launch events or sales meets.',
    imgSrc: banner2,
  },
  {
    title: 'Mashal Hall',
    description:
      'Mashal Hall, situated on basement level, shares the same space and service capabilities of Noor Hall at Ramada Islamabad.',
    imgSrc: banner3,
  },
];

export default function Home() {
  return (
    <div className="container bg-white mx-auto px-20 py-20"> {/* Added px-20 for left/right padding */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {halls.map((hall, index) => (
          <div key={index} className="bg-gray-100 shadow-lg rounded-lg overflow-hidden"> {/* Set background to gray-100 */}
            <div className="relative h-60 w-full">
              <Image
                src={hall.imgSrc}
                alt={hall.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-10">
              <h3 className="text-xl text-gray-600 font-bold mb-1">{hall.title}</h3>
              <p className="text-gray-600">{hall.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
