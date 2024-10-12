import Image from 'next/image';
import Link from 'next/link';
import img1 from '../../public/images/MeetingRoom_Image.jpg';

const MeetingsSection = () => {
  return (
    <section className="relative h-[600px] mb-4">
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <Image
          src={img1} 
          alt="Meeting Rooms"
          fill // This ensures the image fills the container
          objectFit="cover" // Makes sure the image covers the entire container
          // objectPosition="center" // Centers the image
          priority
        />
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black opacity-45"></div>
      </div>

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
};

export default MeetingsSection;
