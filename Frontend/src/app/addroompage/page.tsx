'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router
import AxiosInstance from "@/components/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

interface Booking {
  id: number;
  name: string;
  category: string;
  room_number: string;
}

const AddRoom = () => {
  const router = useRouter();

  const [room_number, setRoom_number] = useState('');
  const [category, setCategory] = useState('');
  const [price_per_night, setPrice_per_night] = useState(''); // Default value set to '1'
  const [capacity, setCapacity] = useState(''); // Default value set to '1'

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { room_number, category, price_per_night, capacity }; // Send the array of room IDs
      const response = await AxiosInstance.post('/hotel/room', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response) {
        console.log('Response:', response.data);
        toast.success('Booking successful!');
        router.push('/bookingpage');
      }
    } catch (error: any) {
      console.error('Error submitting the form:', error);

      // Display error message in toast if there's a response from the server
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Show the error message in toast
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    }
  };

  const generateOptions = (count: number) => {
    return Array.from({ length: count }, (_, i) => i + 1).map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ));
  };

  return (
    <div className="container mx-auto px-4 ml-24">
      <ToastContainer /> {/* Toast container to display notifications */}
      <h2 className="mt-4 text-2xl font-bold mt-5 mb-10">Add Room Here:</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="check_in" className="block text-sm font-medium text-gray-1000">
            Room Number
          </label>
          <input
            type="room_number" // Add date picker
            id="room_number"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={room_number}
            onChange={(e) => setRoom_number(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="check_out" className="block text-sm font-medium text-gray-1000">
            Room Category
          </label>
          <input
            type="category" // Add date picker
            id="category"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Adults Dropdown */}
        <div className="mb-4">
          <label htmlFor="adults" className="block text-sm font-medium text-gray-1000">
            Price Per Night
          </label>
          <select
            id="adults"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={price_per_night}
            onChange={(e) => setPrice_per_night(e.target.value)}>
          </select>
        </div>

        {/* Children Dropdown */}
        <div className="mb-4">
          <label htmlFor="children" className="block text-sm font-medium text-gray-1000">
            Capacity
          </label>
          <select
            id="children"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}>
          </select>
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
