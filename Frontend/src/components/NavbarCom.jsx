// 'use client';
// import React, { useCallback, useMemo } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';

// const NavbarCom = () => {
//   const pathname = usePathname();
//   const router = useRouter();

//   const navItems = useMemo(
//     () => [
//       { name: 'Home', path: '/' },
//       { name: 'About', path: '/about' },
//       { name: 'Services', path: '/services' },
//       { name: 'Check', path: '/checkpage' },
//       { name: 'Contact', path: '/contactus' },
//       { name: 'Booking', path: '/bookingonhomepage' },

//     ],
//     []
//   );

//   const handleNavigation = useCallback((path) => {
//     if (pathname !== path) router.push(path);
//   }, [pathname, router]);

//   return (
//     <nav className="bg-blue-700 w-full">
//       <div className="container mx-auto flex justify-between items-center p-0">
//         <div className="text-white text-1xl font-bold ml-10">
//           <Link href="/">HOTEL MANAGEMENT SYSTEM</Link>
//         </div>
//         <ul className="flex space-x-10 ml-auto mr-10">
//           {navItems.map((item) => (
//             <li key={item.path}>
//               <button
//                 onClick={() => handleNavigation(item.path)}
//                 className={`${
//                   pathname === item.path ? 'text-red-500' : 'text-white'
//                 } hover:text-black px-3 py-2 text-lg`}
//               >
//                 {item.name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default NavbarCom;


'use client';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NavbarCom = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50; // Adjusted scroll threshold
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = useMemo(
    () => [
       { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Check', path: '/checkpage' },
      { name: 'Contact', path: '/contactus' },
      { name: 'Book Now', path: '/bookingonhomepage', isCta: true }
    ],
    []
  );

  const handleNavigation = useCallback((path) => {
    if (pathname !== path) router.push(path);
  }, [pathname, router]);

  return (
    <>
      {/* Top Announcement Bar (shown only when not scrolled) */}
      

      {/* Main Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? 'top-0 bg-black bg-opacity-95 py-2 shadow-lg' : 'top-8 bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo - transforms when scrolled */}
            <div className="flex items-center">
              <Link href="/" className={`font-serif tracking-widest transition-all duration-300 ${scrolled ? 'text-xl' : 'text-3xl'}`}>
                <span className="text-white">GRAND</span>
                <span className="text-amber-400">HOTEL</span>
              </Link>
            </div>

            {/* Navigation Items */}
            <ul className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  {item.isCta ? (
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`bg-amber-600 hover:bg-amber-700 text-black mt-1 px-5 py-2 rounded-sm font-medium tracking-wide transition-all duration-200 hover:scale-105 shadow-md ${scrolled ? 'text-sm px-4 py-1' : 'text-base px-5 py-2'}`}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`${
                        pathname === item.path 
                          ? 'text-amber-400 border-b border-amber-400' 
                          : 'text-white hover:text-amber-300'
                      } font-medium tracking-wide transition-all duration-200 ${scrolled ? 'text-sm' : 'text-base'}`}
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-white focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarCom;



// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// // import HoverBox from './HoverBox'; // Adjust the import path based on your project structure
// import HoverBox from '@/components/HoverBox';


// const NavbarCom = () => {
//   const pathname = usePathname(); // Hook to get the current path
//   const [hovering, setHovering] = useState(false);

//   const sampleProducts = [
//     { id: 1, img1: 'images/1.jpg', name: 'Leather Bag' },
//     { id: 2, img2: 'images/2.jpg', name: 'Pent Coat' },
//   ];

//   return (
//     <nav className="bg-blue-700 w-full">
//     <div className="container mx-auto flex justify-between items-center p-0">
//       <div className="text-white text-xl font-bold ml-10"> <Link href="/">ONLINE SHOP</Link></div>
//       <ul className="flex space-x-10 ml-auto mr-20">
//         {[
//           { name: 'Home', path: '/' },
//           { name: 'About', path: '/about' },
//           { name: 'Services', path: '/services' },
//           { name: 'New In', path: '/newarrivalspage' }, // "New In" moved here
//           { name: 'Products', path: '/publicproducts' },
//           { name: 'Categories', path: '/publiccategories' },
//           { name: 'Contact', path: '/contact' },
//           { name: 'Admin', path: '/admindashboard' },
//         ].map((item) => (
//           <li
//             key={item.path}
//             className={`relative mt-2 ${
//               item.name === 'New In' ? 'hover-group' : ''
//             }`}
//             onMouseEnter={() => item.name === 'New In' && setHovering(true)}
//             onMouseLeave={() => item.name === 'New In' && setHovering(false)}
//           >
//             <Link href={item.path}>
//               <div
//                 className={`${
//                   pathname === item.path ? 'text-red-500' : 'text-white'
//                 } hover:text-black px-3 py-2`}
//               >
//                 {item.name}
//               </div>
//             </Link>
//             {item.name === 'New In' && hovering && (
//               <HoverBox products={sampleProducts} />
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   </nav>
  
//   );
// };




// 'use client'
// import React from 'react'
// import Link from 'next/link';
// import HoverBox from "@/components/HoverBox";


// const [hovering, setHovering] = useState(false);

// const NavbarCom = () => {

//   const sampleProducts = [
//     { id: 1, img1: '1.jpg', name: 'Leather Bag' },
//     { id: 2, img2: '2.jpg', name: 'Pent Coat' },
//   ];
  
//   return (
//     <>
//     <nav className="bg-blue-700 w-full">
//   <div className="container mx-auto flex justify-between items-center p-2">
//     <div className="text-white text-xl font-bold">
//       ONLINE SHOP
//     </div>
//     <ul className="flex space-x-10 ml-auto mr-20">
//       <li>
//         <Link href="/">
//           <div className="text-white hover:text-gray-300">Home</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/about">
//           <div className="text-white hover:text-gray-300">About</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/services">
//           <div className="text-white hover:text-gray-300">Services</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/publicproducts">
//           <div className="text-white hover:text-gray-300">Products</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/publiccategories">
//           <div className="text-white hover:text-gray-300">Categories</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/contact">
//           <div className="text-white hover:text-gray-300">Contact</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/admindashboard">
//           <div className="text-white hover:text-gray-300">Admin</div>
//         </Link>
//       </li>
//     </ul>
//   </div>
// </nav>

//     </>
//   )
// }

// export default NavbarCom