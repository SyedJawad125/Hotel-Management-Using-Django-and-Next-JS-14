'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router
import AxiosInstance from "@/components/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const ROOM_CATEGORIES = [
  { value: 'SINGLE', label: 'Single Room' },
  { value: 'DOUBLE', label: 'Double Room' },
  { value: 'SUITE', label: 'Suite' },
];

const AddRoom = () => {
  const router = useRouter();

  const [room_number, setRoom_number] = useState('');
  const [category, setCategory] = useState('SINGLE'); // Default category set to 'SINGLE'
  const [price_per_night, setPrice_per_night] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { room_number, category, price_per_night, capacity };
      const response = await AxiosInstance.post('/hotel/room', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response) {
        console.log('Response:', response.data);
        toast.success('Room added successfully!');
        router.push('/bookingpage');
      }
    } catch (error: any) {
      console.error('Error submitting the form:', error);

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 ml-24">
      <ToastContainer />
      <h2 className="mt-4 text-2xl font-bold mt-5 mb-10">Add Room Here:</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="room_number" className="block text-sm font-medium text-gray-1000">
            Room Number
          </label>
          <input
            type="text"
            id="room_number"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={room_number}
            onChange={(e) => setRoom_number(e.target.value)}
          />
        </div>
        
        {/* Room Category Dropdown */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-1000">
            Select Category
          </label>
          <select
            id="category"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" className="text-black">Select Category</option>
            {ROOM_CATEGORIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Per Night */}
        <div className="mb-4">
          <label htmlFor="price_per_night" className="block text-sm font-medium text-gray-1000">
            Price Per Night
          </label>
          <input
            type="text"
            id="price_per_night"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={price_per_night}
            onChange={(e) => setPrice_per_night(e.target.value)}
          />
        </div>

        {/* Capacity */}
        <div className="mb-4">
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-1000">
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-3 w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
          text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
