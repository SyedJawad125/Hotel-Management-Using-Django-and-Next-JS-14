// import { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const BookingForm = () => {
//   const [checkInDate, setCheckInDate] = useState<Date | null>(new Date());
//   const [checkOutDate, setCheckOutDate] = useState<Date | null>(new Date());
//   const [rooms, setRooms] = useState(1);
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between space-x-4">
//       {/* Check-In Date */}
//       <div className="flex flex-col">
//         <label htmlFor="checkInDate" className="text-sm font-medium">CHECK-IN DATE</label>
//         <DatePicker
//           selected={checkInDate}
//           onChange={(date) => setCheckInDate(date)}
//           dateFormat="MM-dd-yyyy"
//           className="border rounded p-2"
//           minDate={new Date()}
//         />
//       </div>

//       {/* Check-Out Date */}
//       <div className="flex flex-col">
//         <label htmlFor="checkOutDate" className="text-sm font-medium">CHECK-OUT DATE</label>
//         <DatePicker
//           selected={checkOutDate}
//           onChange={(date) => setCheckOutDate(date)}
//           dateFormat="MM-dd-yyyy"
//           className="border rounded p-2"
//           minDate={checkInDate} // Checkout cannot be before check-in
//         />
//       </div>

//       {/* Rooms Dropdown */}
//       <div className="flex flex-col">
//         <label htmlFor="rooms" className="text-sm font-medium">ROOMS</label>
//         <select
//           id="rooms"
//           className="border rounded p-2"
//           value={rooms}
//           onChange={(e) => setRooms(Number(e.target.value))}
//         >
//           {[...Array(9).keys()].map(i => (
//             <option key={i + 1} value={i + 1}>{i + 1}</option>
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
//       <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg">
//         BOOK ROOMS
//       </button>
//     </div>
//   );
// };

// export default BookingForm;
