// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// interface Room {
//   id: number;
//   room_number: string;
//   category: string;
//   price_per_night: string;
//   capacity: string;
//   status: string;
// }

// const ROOM_CATEGORIES = [
//   { value: 'SINGLE', label: 'Single Room' },
//   { value: 'DOUBLE', label: 'Double Room' },
//   { value: 'SUITE', label: 'Suite' },
// ];

// const ROOM_STATUSES = [
//   { value: 'AVAILABLE', label: 'Available' },
//   { value: 'OCCUPIED', label: 'Occupied' },
//   { value: 'MAINTENANCE', label: 'Maintenance' },
// ];

// const UpdateRoom = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const roomId = searchParams.get('roomId');

//   const [room_number, setRoom_number] = useState('');
//   const [category, setCategory] = useState('SINGLE');
//   const [price_per_night, setPrice_per_night] = useState('');
//   const [capacity, setCapacity] = useState('');
//   const [status, setStatus] = useState('AVAILABLE');

//   // Fetch room data based on roomId
//   useEffect(() => {
//     const fetchRoomData = async () => {
//       if (roomId) {
//         try {
//           const res = await AxiosInstance.get(`/hotel/room?id=${roomId}`);
//           const roomData = res?.data?.data?.data[0];
          
//           if (roomData) {
//             setRoom_number(roomData.room_number);
//             setCategory(roomData.category);
//             setPrice_per_night(roomData.price_per_night);
//             setCapacity(roomData.capacity);
//             setStatus(roomData.status || 'AVAILABLE');
//           } else {
//             console.error('No room found with this ID:', roomId);
//             toast.error('Room not found');
//             router.push('/roomspage');
//           }
//         } catch (error) {
//           console.error('Error fetching room data:', error);
//           toast.error('Failed to fetch room data');
//           router.push('/roomspage');
//         }
//       }
//     };

//     fetchRoomData();
//   }, [roomId, router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const payload = { 
//         id: roomId,
//         room_number, 
//         category, 
//         price_per_night, 
//         capacity,
//         status
//       };
      
//       const response = await AxiosInstance.patch('/hotel/room', payload, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       if (response) {
//         console.log('Response:', response.data);
//         toast.success('Room updated successfully!');
//         router.push('/roomspage');
//       }
//     } catch (error: any) {
//       console.error('Error updating the room:', error);

//       if (error.response && error.response.data && error.response.data.error) {
//         toast.error(error.response.data.error);
//       } else {
//         toast.error('Something went wrong. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 ml-24">
//       <ToastContainer />
//       <h2 className="mt-4 text-2xl font-bold mt-5 mb-10">Update Room Details:</h2>
//       <form className="mt-3" onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="room_number" className="block text-sm font-medium text-gray-1000">
//             Room Number
//           </label>
//           <input
//             type="text"
//             id="room_number"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={room_number}
//             onChange={(e) => setRoom_number(e.target.value)}
//             required
//           />
//         </div>
        
//         {/* Room Category Dropdown */}
//         <div className="mb-4">
//           <label htmlFor="category" className="block text-sm font-medium text-gray-1000">
//             Select Category
//           </label>
//           <select
//             id="category"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           >
//             {ROOM_CATEGORIES.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Price Per Night */}
//         <div className="mb-4">
//           <label htmlFor="price_per_night" className="block text-sm font-medium text-gray-1000">
//             Price Per Night
//           </label>
//           <input
//             type="text"
//             id="price_per_night"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={price_per_night}
//             onChange={(e) => setPrice_per_night(e.target.value)}
//             required
//           />
//         </div>

//         {/* Capacity */}
//         <div className="mb-4">
//           <label htmlFor="capacity" className="block text-sm font-medium text-gray-1000">
//             Capacity
//           </label>
//           <input
//             type="number"
//             id="capacity"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={capacity}
//             onChange={(e) => setCapacity(e.target.value)}
//             required
//           />
//         </div>

//         {/* Room Status Dropdown */}
//         <div className="mb-4">
//           <label htmlFor="status" className="block text-sm font-medium text-gray-1000">
//             Room Status
//           </label>
//           <select
//             id="status"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             required
//           >
//             {ROOM_STATUSES.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="mt-3 w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
//           text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
//           focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Update Room
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateRoom;





'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSave, FiArrowLeft, FiStar, FiUser, FiDollarSign, FiHome, FiCheckCircle } from 'react-icons/fi';

interface Room {
  id: number;
  room_number: string;
  category: string;
  price_per_night: string;
  capacity: string;
  status: string;
}

const ROOM_CATEGORIES = [
  { value: 'SINGLE', label: 'Single Room', icon: <FiUser className="mr-2" /> },
  { value: 'DOUBLE', label: 'Double Room', icon: <FiUser className="mr-2" /> },
  { value: 'SUITE', label: 'Suite', icon: <FiStar className="mr-2" /> },
];

const ROOM_STATUSES = [
  { value: 'AVAILABLE', label: 'Available', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'OCCUPIED', label: 'Occupied', color: 'bg-amber-100 text-amber-800' },
  { value: 'MAINTENANCE', label: 'Maintenance', color: 'bg-rose-100 text-rose-800' },
];

const UpdateRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    room_number: '',
    category: 'SINGLE',
    price_per_night: '',
    capacity: '',
    status: 'AVAILABLE'
  });

  // Fetch room data based on roomId
  useEffect(() => {
    const fetchRoomData = async () => {
      if (roomId) {
        try {
          setIsLoading(true);
          const res = await AxiosInstance.get(`/hotel/room?id=${roomId}`);
          const roomData = res?.data?.data?.data[0];
          
          if (roomData) {
            setFormData({
              room_number: roomData.room_number,
              category: roomData.category,
              price_per_night: roomData.price_per_night,
              capacity: roomData.capacity,
              status: roomData.status || 'AVAILABLE'
            });
          } else {
            console.error('No room found with this ID:', roomId);
            toast.error('Room not found');
            router.push('/roomspage');
          }
        } catch (error) {
          console.error('Error fetching room data:', error);
          toast.error('Failed to fetch room data');
          router.push('/roomspage');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRoomData();
  }, [roomId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { 
        id: roomId,
        ...formData
      };
      
      const response = await AxiosInstance.patch('/hotel/room', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response) {
        toast.success('Room updated successfully!', {
          icon: <FiCheckCircle className="text-emerald-500 text-xl" />
        });
        setTimeout(() => router.push('/roomspage'), 1500);
      }
    } catch (error: any) {
      console.error('Error updating the room:', error);

      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading room details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200 mr-4"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Update Room <span className="text-purple-600">#{formData.room_number}</span>
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {/* Room Number */}
              <div className="mb-8">
                <label htmlFor="room_number" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiHome className="mr-2 text-purple-600" />
                  Room Number
                </label>
                <input
                  type="text"
                  id="room_number"
                  name="room_number"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  transition-all duration-200 text-gray-900 placeholder-gray-400"
                  value={formData.room_number}
                  onChange={handleChange}
                  required
                  placeholder="Enter room number"
                />
              </div>
              
              {/* Grid Layout for Category, Price, Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Room Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FiStar className="mr-2 text-purple-600" />
                    Room Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    transition-all duration-200 text-gray-900"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    {ROOM_CATEGORIES.map((option) => (
                      <option key={option.value} value={option.value} className="flex items-center">
                        {option.icon}
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Per Night */}
                <div>
                  <label htmlFor="price_per_night" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FiDollarSign className="mr-2 text-purple-600" />
                    Price Per Night
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                    <input
                      type="text"
                      id="price_per_night"
                      name="price_per_night"
                      className="mt-1 block w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                      transition-all duration-200 text-gray-900 placeholder-gray-400"
                      value={formData.price_per_night}
                      onChange={handleChange}
                      required
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FiUser className="mr-2 text-purple-600" />
                    Guest Capacity
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    min="1"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    transition-all duration-200 text-gray-900 placeholder-gray-400"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    placeholder="Number of guests"
                  />
                </div>
              </div>

              {/* Room Status */}
              <div className="mb-8">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Room Status
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ROOM_STATUSES.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`status-${option.value}`}
                        name="status"
                        value={option.value}
                        checked={formData.status === option.value}
                        onChange={handleChange}
                        className="hidden peer"
                        required
                      />
                      <label 
                        htmlFor={`status-${option.value}`}
                        className={`w-full px-4 py-3 border rounded-lg cursor-pointer transition-all duration-200
                        ${formData.status === option.value ? 
                          `${option.color} border-transparent ring-2 ring-purple-500 ring-opacity-50` : 
                          'bg-white border-gray-300 hover:border-purple-300'}
                        flex items-center justify-center font-medium`}
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full md:w-auto flex items-center justify-center px-8 py-4 border border-transparent 
                  text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-500 
                  hover:from-purple-700 hover:to-blue-600 shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <FiSave className="mr-2" />
                  Update Room Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;