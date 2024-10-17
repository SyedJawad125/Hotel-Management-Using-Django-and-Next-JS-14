// 'use client';
// import { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const BookingForm = () => {
//     const [check_in, setCheck_in] = useState<Date>(new Date());  // Initialize as Date
//     const [check_out, setCheck_out] = useState<Date>(new Date());  // Initialize as Date
//     const [rooms, setRooms] = useState<number>(1);  // Single room selection
// //  const [rooms, setRooms] = useState<number[]>([]);  // Assuming you store room IDs
//     const [adults, setAdults] = useState<number>(1);
//     const [children, setChildren] = useState<number>(0);

//   // Function to handle form submission (will send data to backend)
//   const handleBooking = () => {
//     const bookingData = {
//       check_in,
//       check_out,
//       rooms,  // Sending selected room IDs
//       adults,
//       children,
//       total_price: calculateTotalPrice(),  // Optional: You might calculate the total price here
//     };

//     console.log('Booking Data:', bookingData);
//     // Add API call here to send the data to the backend
//   };

//   const calculateTotalPrice = () => {
//     // Logic for calculating total price can go here
//     return 0;  // Placeholder
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between space-x-4">
//       {/* Check-In Date */}
//       <div className="flex flex-col">
//         <label htmlFor="checkInDate" className="text-sm font-medium">CHECK-IN DATE</label>
//         <DatePicker
//           selected={check_in}
//           onChange={(date) => setCheck_in(date)}
//           dateFormat="MM-dd-yyyy"
//           className="border rounded p-2"
//           minDate={new Date()}
//         />
//       </div>

//       {/* Check-Out Date */}
//       <div className="flex flex-col">
//         <label htmlFor="checkOutDate" className="text-sm font-medium">CHECK-OUT DATE</label>
//         <DatePicker
//           selected={check_out}
//           onChange={(date) => setCheck_out(date)}
//           dateFormat="MM-dd-yyyy"
//           className="border rounded p-2"
//           minDate={check_in} // Checkout cannot be before check-in
//         />
//       </div>

//       {/* Rooms Selection */}
//       <div className="flex flex-col">
//         <label htmlFor="rooms" className="text-sm font-medium">ROOMS</label>
//         <select
//           id="rooms"
//           className="border rounded p-2"
//           multiple
//           value={rooms}
//           onChange={(e) => {
//             const selectedRooms = Array.from(e.target.selectedOptions, option => Number(option.value));
//             setRooms(selectedRooms);
//           }}
//         >
//           {/* Assuming you fetch available room data from the backend */}
//           {[...Array(9).keys()].map(i => (
//             <option key={i + 1} value={i + 1}>Room {i + 1}</option>
//           ))}
//         </select>
//       </div>

//       {/* Adults Dropdown */}
//       <div className="flex flex-col">
//         <label htmlFor="adults" className="text-sm font-medium">ADULTS</label>
//         <select
//           id="adults"
//           className="border rounded p-2"
//           value={adults}
//           onChange={(e) => setAdults(Number(e.target.value))}
//         >
//           {[...Array(4).keys()].map(i => (
//             <option key={i + 1} value={i + 1}>{i + 1}</option>
//           ))}
//         </select>
//       </div>

//       {/* Children Dropdown */}
//       <div className="flex flex-col">
//         <label htmlFor="children" className="text-sm font-medium">CHILDREN</label>
//         <select
//           id="children"
//           className="border rounded p-2"
//           value={children}
//           onChange={(e) => setChildren(Number(e.target.value))}
//         >
//           {[...Array(5).keys()].map(i => (
//             <option key={i} value={i}>{i}</option>
//           ))}
//         </select>
//       </div>

//       {/* Book Rooms Button */}
//       <button 
//         className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
//         onClick={handleBooking}
//       >
//         BOOK ROOMS
//       </button>
//     </div>
//   );
// };

// export default BookingForm;
