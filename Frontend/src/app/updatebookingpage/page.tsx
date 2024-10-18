'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router
import AxiosInstance from "@/components/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

interface Booking {
  id: number;
  name: string;
  category: string;
  room_number: string;
}

const UpdateBooking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id'); // Get the booking id from the query parameters

  const [check_in, setCheck_in] = useState('');
  const [check_out, setCheck_out] = useState('');
  const [adults, setAdults] = useState(''); 
  const [children, setChildren] = useState(''); 
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]); // Ensure this is always initialized
  const [roomRecords, setRoomRecords] = useState<Booking[]>([]);
  const [availableRooms, setAvailableRooms] = useState<string>(''); // For displaying selected room numbers

  // Fetch booking data based on bookingId
  useEffect(() => {
    const fetchBookingData = async () => {
      if (bookingId) {
        try {
          const res = await AxiosInstance.get(`/hotel/booking/${bookingId}`);
          const bookingData = res.data.data; // Adjust according to your API response structure
          
          if (bookingData) {
            setCheck_in(bookingData.check_in);
            setCheck_out(bookingData.check_out);
            setAdults(bookingData.adults);
            setChildren(bookingData.children);
            setSelectedRooms(bookingData.rooms || []); // Default to an empty array if undefined

            // Convert selected room IDs to room numbers
            const roomNumbers = bookingData.rooms?.map((roomId: number) => {
              const room = roomRecords.find(r => r.id === roomId);
              return room ? room.room_number : '';
            }).join(', ') || ''; // Join with commas, default to empty string
            setAvailableRooms(roomNumbers);
          } else {
            console.error('No booking found with this ID:', bookingId);
          }
        } catch (error) {
          console.error('Error fetching booking data:', error);
          toast.error('Error fetching booking data!');
        }
      }
    };

    fetchBookingData();
  }, [bookingId, roomRecords]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await AxiosInstance.get('/hotel/room');
        console.log('Room API response:', res.data);
        if (res?.data?.data?.data) {
          setRoomRecords(res.data.data.data);
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('Error occurred while fetching room data:', error);
        toast.error('Error fetching room data!');
      }
    };
    fetchRooms();
  }, []);

  const handleRoomSelection = (roomId: number) => {
    // Prevents errors when selectedRooms is undefined
    if (selectedRooms) {
      if (selectedRooms.includes(roomId)) {
        setSelectedRooms(selectedRooms.filter(id => id !== roomId)); // Remove if already selected
      } else {
        setSelectedRooms([...selectedRooms, roomId]); // Add to selection
      }
  
      // Update the available rooms string
      const updatedRoomNumbers = selectedRooms.includes(roomId)
        ? availableRooms.split(', ').filter(num => num !== roomRecords.find(r => r.id === roomId)?.room_number).join(', ')
        : `${availableRooms}, ${roomRecords.find(r => r.id === roomId)?.room_number}`.replace(/, ,/g, ', ').trim();
      
      setAvailableRooms(updatedRoomNumbers);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { check_in, check_out, adults, children, rooms: selectedRooms };
      const response = await AxiosInstance.patch(`/hotel/booking/${bookingId}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response) {
        console.log('Response:', response.data);
        toast.success('Booking updated successfully!');
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
    <div className="container mx-auto px-4 ml-20">
      <h2 className="mt-4 text-2xl font-bold mb-10">Update Booking Here:</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="check_in" className="block text-sm font-medium text-gray-1000">Check In</label>
          <input
            type="date"
            id="check_in"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={check_in}
            onChange={(e) => setCheck_in(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="check_out" className="block text-sm font-medium text-gray-1000">Check Out</label>
          <input
            type="date"
            id="check_out"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={check_out}
            onChange={(e) => setCheck_out(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="adults" className="block text-sm font-medium text-gray-1000">Adults</label>
          <input
            type="number"
            id="adults"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            min="1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="children" className="block text-sm font-medium text-gray-1000">Children</label>
          <input
            type="number"
            id="children"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            min="0"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-1000">Selected Rooms</label>
          <input
            type="text"
            value={availableRooms} // Display selected room numbers
            readOnly
            className="mt-1 block w-2/4 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none sm:text-md text-gray-900"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-1000">All Rooms</label>
          <div className="flex flex-wrap">
            {roomRecords.map(room => (
              <div key={room.id} className="mr-4 mb-2">
                <input
                  type="checkbox"
                  id={`room-${room.id}`}
                  checked={selectedRooms.includes(room.id)}
                  onChange={() => handleRoomSelection(room.id)}
                />
                <label htmlFor={`room-${room.id}`} className="ml-2 text-gray-900">{room.room_number}</label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-3 w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
          text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Booking
        </button>
      </form>
      <ToastContainer /> {/* Toast notifications */}
    </div>
  );
};

export default UpdateBooking;
