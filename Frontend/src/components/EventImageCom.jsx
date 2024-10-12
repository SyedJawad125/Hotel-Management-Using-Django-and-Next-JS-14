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
  {
    title: 'Grand Ballroom',
    description:
      'The Grand Ballroom is a perfect option for weddings, large events, and conferences, offering luxurious amenities and a grand setup.',
    imgSrc: banner4,
  },
  {
    title: 'Emerald Hall',
    description:
      'Emerald Hall provides a cozy atmosphere for small-scale meetings, perfect for business discussions and workshops.',
    imgSrc: banner5,
  },
  {
    title: 'Pearl Hall',
    description:
      'Pearl Hall is an excellent choice for private events, offering state-of-the-art facilities in a sleek and modern environment.',
    imgSrc: banner6,
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-20 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Meetings & Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {halls.map((hall, index) => (
          <div key={index} className="bg-gray-50 shadow-lg rounded-lg overflow-hidden mb-16">
            <div className="relative h-60 w-full">
              <Image
                src={hall.imgSrc}
                alt={hall.title}
                width={500} // Fixed width
                height={400} // Fixed height
                className="w-full h-full object-cover"
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
