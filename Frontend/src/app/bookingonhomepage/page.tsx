'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [roomRecords, setRoomRecords] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await AxiosInstance.get('/hotel/publicroom');
        if (res?.data?.data?.data) {
          setRoomRecords(res.data.data.data);
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('Error occurred while fetching rooms:', error);
        toast.error('Error fetching room data!');
      }
    };
    fetchMenu();
  }, []);

  const handleRoomSelection = (roomId: number) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter(id => id !== roomId));
    } else {
      setSelectedRooms([...selectedRooms, roomId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { check_in, check_out, adults, children, rooms: selectedRooms };
      const response = await AxiosInstance.post('/hotel/publicbooking', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response) {
        toast.success('Booking successful!');
        // router.push('/');
        setCheck_in('');
        setCheck_out('');
        setAdults('');
        setChildren('');
        setSelectedRooms([]);
      }
      
    } catch (error: any) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    }
  };

  const generateOptions = (count: number) => (
    Array.from({ length: count }, (_, i) => i + 1).map(num => (
      <option key={num} value={num}>{num}</option>
    ))
  );
   // Function to handle removal of selected rooms
  const handleRemoveRoom = (roomId: number) => {
    setSelectedRooms(prevSelected => prevSelected.filter(id => id !== roomId));
  };
  return (
    <div className="container mx-auto px-4">
  <ToastContainer />
  <form className="flex flex-wrap gap-4 mt-8" onSubmit={handleSubmit}>
    {/* First Row */}
    <div className="flex flex-wrap gap-4 w-full">
      <div>
        <label htmlFor="check_in" className="block text-sm font-medium text-gray-100">
          Check-In Date
        </label>
        <input
          type="date"
          id="check_in"
          className="w-48 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg"
          value={check_in}
          onChange={(e) => setCheck_in(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="check_out" className="block text-sm font-medium text-gray-100">
          Check-Out Date
        </label>
        <input
          type="date"
          id="check_out"
          className="w-48 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg"
          value={check_out}
          onChange={(e) => setCheck_out(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="adults" className="block text-sm font-medium text-gray-100">
          Adults
        </label>
        <select
          id="adults"
          className="w-30 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg"
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
        >
          <option value="">Adults</option>
          {generateOptions(10)}
        </select>
      </div>

      <div>
        <label htmlFor="children" className="block text-sm font-medium text-gray-100">
          Children
        </label>
        <select
          id="children"
          className="w-30 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg"
          value={children}
          onChange={(e) => setChildren(e.target.value)}
        >
          <option value="">Children</option>
          <option value="0">0</option>
          {generateOptions(10)}
        </select>
      </div>

      <div>
        <label htmlFor="roomSelection" className="block text-sm font-medium text-gray-100">
          Select Room
        </label>
        <select
          id="roomSelection"
          className="w-48 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg"
          onChange={(e) => handleRoomSelection(Number(e.target.value))}
        >
          <option value="">Rooms</option>
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

      <button
        type="submit"
        className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 self-end"
      >
        Book Rooms
      </button>
    </div>

    {/* Second Row */}
    {selectedRooms.length > 0 && (
      <div className="w-full mt-4">
        <h3 className="text-sm font-medium text-gray-800 mb-2">Selected Rooms:</h3>
        <ul className="flex flex-wrap gap-4">
          {selectedRooms.map((roomId) => {
            const room = roomRecords.find((item) => item.id === roomId);
            return room ? (
              <li
                key={room.id}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg flex items-center justify-between space-x-4"
              >
                <span>
                  Room Id: {room.id}, Number: {room.room_number}, {room.category}
                </span>
                <button
                  onClick={() => handleRemoveRoom(room.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    )}
  </form>
</div>

  );
};

export default AddBooking;
