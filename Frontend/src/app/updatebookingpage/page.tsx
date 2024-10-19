'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router
import AxiosInstance from "@/components/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

interface RoomDetails {
  id: number;
  room_number: string;
  category: string;
}

const UpdateBooking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingid'); // Get the booking id from the query parameters

  const [check_in, setCheck_in] = useState('');
  const [check_out, setCheck_out] = useState('');
  const [adults, setAdults] = useState(''); 
  const [children, setChildren] = useState(''); 
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [roomRecords, setRoomRecords] = useState<RoomDetails[]>([]);
  const [availableRooms, setAvailableRooms] = useState<string>(''); // For displaying selected room numbers

  // Fetch booking data based on bookingId
  useEffect(() => {
    const fetchBookingData = async () => {
      if (bookingId) {
        try {
          const res = await AxiosInstance.get(`/hotel/booking?id=${bookingId}`);
          const bookingData = res.data.data.data[0]; // Adjust according to your API response structure

          if (bookingData) {
            console.log("Booking Data: ", bookingData); // DEBUGGING
            setCheck_in(bookingData.check_in);
            setCheck_out(bookingData.check_out);
            setAdults(bookingData.adults);
            setChildren(bookingData.children);
            
            // Extract selected room IDs from room_num array
            const roomIds = bookingData.room_num.map((room: RoomDetails) => room.id);
            setSelectedRooms(roomIds);
            
            console.log("Selected Room IDs: ", roomIds); // DEBUGGING
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
  }, [bookingId]);

  // Fetch available rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await AxiosInstance.get('/hotel/room');
        console.log('Room API response:', res.data); // DEBUGGING
        if (res?.data?.data?.data) {
          setRoomRecords(res.data.data.data);
          console.log('Room Records: ', res.data.data.data); // DEBUGGING
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

  // Update available room numbers based on selectedRooms and roomRecords
  useEffect(() => {
    if (selectedRooms.length > 0 && roomRecords.length > 0) {
      const roomNumbers = selectedRooms
        .map(roomId => {
          const foundRoom = roomRecords.find(room => room.id === roomId);
          console.log('Mapping Room ID:', roomId, 'to Room Number:', foundRoom?.room_number); // DEBUGGING
          return foundRoom?.room_number || ''; // If no room is found, return an empty string
        })
        .filter(roomNumber => roomNumber !== '') // Filter out any undefined room numbers
        .join(', ');
      
      console.log('Mapped Room Numbers: ', roomNumbers); // DEBUGGING
      setAvailableRooms(roomNumbers);
    }
  }, [selectedRooms, roomRecords]);

  const handleRoomSelection = (roomId: number) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter(id => id !== roomId)); // Remove if already selected
    } else {
      setSelectedRooms([...selectedRooms, roomId]); // Add to selection
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { 
        id: bookingId as string, 
        check_in, 
        check_out, 
        adults, 
        children, 
        rooms: selectedRooms // Make sure this is correctly structured for your API
      };
      const response = await AxiosInstance.patch(`/hotel/booking`, payload, {
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
                <label htmlFor={`room-${room.id}`} className="ml-2 text-sm">
                  {room.room_number} - {room.category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
          Update Booking
        </button>
      </form>
      <ToastContainer /> {/* Toast notifications */}
    </div>
  );
};

export default UpdateBooking;
