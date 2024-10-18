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

const AddBooking = () => {
  const router = useRouter();

  const [check_in, setCheck_in] = useState('');
  const [check_out, setCheck_out] = useState('');
  const [adults, setAdults] = useState(''); // Default value set to '1'
  const [children, setChildren] = useState(''); // Default value set to '1'
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [roomRecords, setRoomRecords] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await AxiosInstance.get('/hotel/room');
        console.log('Category API response:', res.data); // Check the response
        if (res?.data?.data?.data) {
          setRoomRecords(res.data.data.data);
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('Error occurred while fetching categories:', error);
        toast.error('Error fetching room data!'); // Show toast notification for fetch error
      }
    };
    fetchMenu();
  }, []);

  const handleRoomSelection = (roomId: number) => {
    if (selectedRooms.includes(roomId)) {
      // If room is already selected, remove it
      setSelectedRooms(selectedRooms.filter(id => id !== roomId));
    } else {
      // Otherwise, add it to the selection
      setSelectedRooms([...selectedRooms, roomId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { check_in, check_out, adults, children, rooms: selectedRooms }; // Send the array of room IDs
      const response = await AxiosInstance.post('/hotel/booking', payload, {
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

  // Function to handle removal of selected rooms
  const handleRemoveRoom = (roomId: number) => {
    setSelectedRooms(prevSelected => prevSelected.filter(id => id !== roomId));
  };

  return (
    <div className="container mx-auto px-4 ml-24">
      <ToastContainer /> {/* Toast container to display notifications */}
      <h2 className="mt-4 text-2xl font-bold mt-5 mb-10">Room Booking Here:</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="check_in" className="block text-sm font-medium text-gray-1000">
            Check In
          </label>
          <input
            type="date" // Add date picker
            id="check_in"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={check_in}
            onChange={(e) => setCheck_in(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="check_out" className="block text-sm font-medium text-gray-1000">
            Check Out
          </label>
          <input
            type="date" // Add date picker
            id="check_out"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={check_out}
            onChange={(e) => setCheck_out(e.target.value)}
          />
        </div>

        {/* Adults Dropdown */}
        <div className="mb-4">
          <label htmlFor="adults" className="block text-sm font-medium text-gray-1000">
            Adults
          </label>
          <select
            id="adults"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
          >
            <option value="">Select Adults</option>
            {generateOptions(10)}
          </select>
        </div>

        {/* Children Dropdown */}
        <div className="mb-4">
          <label htmlFor="children" className="block text-sm font-medium text-gray-1000">
            Children
          </label>
          <select
            id="children"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
          >
            <option value="">Select Children</option>
            <option value="0">0</option>
            {generateOptions(10)}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-black">
            Select Room(s)
          </label>
          <select
            id="roomSelection"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-black"
            onChange={(e) => handleRoomSelection(Number(e.target.value))}>
            <option value="" className="text-black">Select Room</option>
            {roomRecords.length > 0 ? (
              roomRecords.map((item) => (
                <option key={item.id} value={item.id} className="text-black">
                  {item.room_number} - {item.category}
                </option>
              ))
            ) : (
              <option value="" className="text-black">No rooms available</option>
            )}
          </select>
        </div>

        {/* Display Selected Rooms */}
        {selectedRooms.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-1000">Selected Rooms:</h3>
            <ul className="mt-2">
              {selectedRooms.map(roomId => {
                const room = roomRecords.find(item => item.id === roomId);
                return room ? (
                  <li key={room.id} className="text-gray-100 flex justify-between items-center">
                    <p>Room Id is {room.id} - Number is {room.room_number} - {room.category}</p>
                    <button
                      onClick={() => handleRemoveRoom(room.id)} // Call function to remove the room
                      className="ml-4 mr-80 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}

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

export default AddBooking;
