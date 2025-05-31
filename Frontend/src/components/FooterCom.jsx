// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import logo from '../../public/images/logo5.jpg'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

// const Footer = () => {
//     return (
//         <footer id="footer" className="bg-gray-800 text-white py-8">
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//             <div className="flex justify-center md:justify-start ml-20">
//                 <a href="/">
//                     <Image src={logo} alt="Logo" width={150} height={75} className="footer-logo" />
//                 </a>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">SUPPORT</h2>
//                 <ul>
//                     <li className="mb-2"><a href="/faq" className="hover:underline">FAQ</a></li>
//                     <li className="mb-2"><a href="/contact" className="hover:underline">Contact Us</a></li>
//                     <li className="mb-2"><a href="/returns" className="hover:underline">Returns</a></li>
//                 </ul>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">Useful Links</h2>
//                 <ul>
//                     <li className="mb-2"><a href="/" className="hover:underline">Home</a></li>
//                     <li className="mb-2"><a href="/about" className="hover:underline">About Us</a></li>
//                     <li className="mb-2"><a href="/contact" className="hover:underline">Contact Us</a></li>
//                 </ul>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">Our Services</h2>
//                 <ul>
//                     <li className="mb-2"><a href="/publicproduct" className="hover:underline">Products</a></li>
//                     <li className="mb-2"><a href="/publiccategory" className="hover:underline">Categories</a></li>
//                     <li className="mb-2"><a href="/publiccategory" className="hover:underline">Categories</a></li>
//                 </ul>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
//                 <ul>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />DHA 2, Islamabad Pakistan.</li>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faPhone} className="mr-2" />(+92) 333 1906382</li>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faPhone} className="mr-2" />(+92) 51 0000000</li>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faEnvelope} className="mr-2" />nicenick1992@gmail.com</li>
//                 </ul>
//                 <div className="flex justify-center md:justify-start space-x-4 mt-4">
//                     <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaFacebookF />
//                     </a>
//                     <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaTwitter />
//                     </a>
//                     <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaInstagram />
//                     </a>
//                     <a href="https://wa.me/923331906382" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaWhatsapp />
//                     </a>
//                     <a href="https://www.linkedin.com/in/syed-jawad-ali-080286b9/" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaLinkedinIn />
//                     </a>
//                     <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaYoutube />
//                     </a>
//                 </div>
//             </div>
//         </div>
//         <div className="text-center mt-8">
//             <p>&copy; 2024 Your Company. All rights reserved.</p>
//         </div>
//     </footer>

//     );
// };

// export default Footer;



'use client';
import React from 'react';
import Image from 'next/image';
import logo from '../../public/images/logo5.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn, FaTripadvisor } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id="footer" className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gold-500">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Hotel Logo and Description */}
                    <div className="space-y-4">
                        <div className="flex justify-center md:justify-start">
                            <a href="/">
                                <Image 
                                    src={logo} 
                                    alt="Luxury Hotel Logo" 
                                    width={180} 
                                    height={90} 
                                    className="filter brightness-125"
                                />
                            </a>
                        </div>
                        <p className="text-sm leading-relaxed">
                            Experience unparalleled luxury at our exquisite hotel. We offer world-class amenities, 
                            exceptional service, and unforgettable memories in the heart of the city.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <FaFacebookF className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <FaTwitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <FaInstagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <FaPinterestP className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <FaLinkedinIn className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <FaTripadvisor className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold text-white mb-4 pb-2 border-b border-gold-500">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-white transition-colors duration-300">Home</a></li>
                            <li><a href="/rooms" className="hover:text-white transition-colors duration-300">Rooms & Suites</a></li>
                            <li><a href="/dining" className="hover:text-white transition-colors duration-300">Dining</a></li>
                            <li><a href="/spa" className="hover:text-white transition-colors duration-300">Spa & Wellness</a></li>
                            <li><a href="/events" className="hover:text-white transition-colors duration-300">Events</a></li>
                            <li><a href="/gallery" className="hover:text-white transition-colors duration-300">Gallery</a></li>
                            <li><a href="/contact" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold text-white mb-4 pb-2 border-b border-gold-500">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-gold-500" />
                                <span>DHA 2, Islamabad Pakistan</span>
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faPhone} className="mr-3 text-gold-500" />
                                <span>(+92) 333 1906382</span>
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faPhone} className="mr-3 text-gold-500" />
                                <span>(+92) 51 0000000</span>
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-gold-500" />
                                <span>reservations@luxuryhotel.com</span>
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faClock} className="mr-3 text-gold-500" />
                                <span>24/7 Reception</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold text-white mb-4 pb-2 border-b border-gold-500">Newsletter</h3>
                        <p className="mb-4 text-sm">Subscribe to our newsletter for special offers and updates.</p>
                        <form className="space-y-3">
                            <input 
                                type="email" 
                                placeholder="Your Email Address" 
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 focus:border-gold-500 focus:outline-none text-white"
                                required
                            />
                            <button 
                                type="submit" 
                                className="bg-gold-600 hover:bg-gold-700 text-white font-medium py-2 px-6 transition-colors duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Luxury Hotel. All Rights Reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="/privacy-policy" className="text-sm text-gray-500 hover:text-white">Privacy Policy</a>
                        <a href="/terms" className="text-sm text-gray-500 hover:text-white">Terms of Service</a>
                        <a href="/sitemap" className="text-sm text-gray-500 hover:text-white">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;