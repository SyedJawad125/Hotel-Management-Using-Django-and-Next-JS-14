'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import { FiX, FiCalendar, FiUsers, FiHome } from 'react-icons/fi';

interface Booking {
  id: number;
  name: string;
  category: string;
  room_number: string;
  price?: number;
}

const AddBooking = () => {
  const router = useRouter();

  const [check_in, setCheck_in] = useState('');
  const [check_out, setCheck_out] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [roomRecords, setRoomRecords] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosInstance.get('/hotel/publicroom');
        if (res?.data?.data?.data) {
          // Add mock prices for demonstration
          const roomsWithPrices = res.data.data.data.map((room: Booking) => ({
            ...room,
            price: Math.floor(Math.random() * 300) + 100 // Random price between 100-400
          }));
          setRoomRecords(roomsWithPrices);
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('Error occurred while fetching rooms:', error);
        toast.error('Error fetching room data!');
      } finally {
        setIsLoading(false);
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
        generateReceipt();
        setCheck_in('');
        setCheck_out('');
        setAdults('1');
        setChildren('0');
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

  const calculateNights = () => {
    if (!check_in || !check_out) return 0;
    const diffTime = Math.abs(new Date(check_out).getTime() - new Date(check_in).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const generateReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('LUXURY HOTEL ISLAMABAD', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(120, 120, 120);
    doc.setFont('helvetica', 'normal');
    doc.text('Booking Confirmation', 105, 30, { align: 'center' });

    // Add decorative line
    doc.setDrawColor(200, 170, 100);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Booking details
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text(`Check-In Date: ${new Date(check_in).toLocaleDateString()}`, 20, 50);
    doc.text(`Check-Out Date: ${new Date(check_out).toLocaleDateString()}`, 20, 60);
    doc.text(`Guests: ${adults} Adults, ${children} Children`, 20, 70);

    // Selected rooms
    doc.setFontSize(14);
    doc.setTextColor(200, 170, 100);
    doc.text('Selected Rooms:', 20, 90);
    
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    let yPosition = 100;
    let totalPrice = 0;
    
    selectedRooms.forEach((roomId, index) => {
      const room = roomRecords.find(item => item.id === roomId);
      if (room) {
        doc.text(
          `${index + 1}. ${room.category} - Room ${room.room_number}`,
          20,
          yPosition
        );
        doc.text(
          `$${room.price} per night`,
          160,
          yPosition,
          { align: 'right' }
        );
        yPosition += 10;
        totalPrice += room.price ? room.price : 0;
      }
    });

    // Total price
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Total Estimated Price:', 20, yPosition + 10);
    doc.setFontSize(16);
    doc.setTextColor(200, 170, 100);
    doc.text(`$${totalPrice * calculateNights()}`, 160, yPosition + 10, { align: 'right' });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text('Thank you for choosing Luxury Hotel Islamabad', 105, 280, { align: 'center' });
    doc.text('123 Luxury Avenue, Islamabad, Pakistan | Phone: +92 300 1234567', 105, 285, { align: 'center' });

    doc.save('Luxury_Hotel_Booking_Confirmation.pdf');
  };

  const generateOptions = (count: number) =>
    Array.from({ length: count }, (_, i) => i + 1).map(num => (
      <option key={num} value={num}>{num}</option>
    ));

  const handleRemoveRoom = (roomId: number) => {
    setSelectedRooms(prevSelected => prevSelected.filter(id => id !== roomId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-center" />
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Column - Booking Form */}
            <div className="lg:col-span-2 p-8 lg:p-12">
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Book Your Stay</h2>
              <p className="text-gray-500 mb-8">Experience luxury at its finest</p>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Check-in */}
                  <div className="relative">
                    <label htmlFor="check_in" className="block text-sm font-medium text-gray-700 mb-1">
                      Check-In Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="check_in"
                        className="block w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        value={check_in}
                        onChange={(e) => setCheck_in(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Check-out */}
                  <div className="relative">
                    <label htmlFor="check_out" className="block text-sm font-medium text-gray-700 mb-1">
                      Check-Out Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="check_out"
                        className="block w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        value={check_out}
                        onChange={(e) => setCheck_out(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Adults */}
                  <div>
                    <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
                      Adults
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUsers className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="adults"
                        className="block w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        value={adults}
                        onChange={(e) => setAdults(e.target.value)}
                        required
                      >
                        {generateOptions(10)}
                      </select>
                    </div>
                  </div>

                  {/* Children */}
                  <div>
                    <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
                      Children
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUsers className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="children"
                        className="block w-full pl-10 pr-3 py-2 border text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                      >
                        <option value="0">0</option>
                        {generateOptions(10)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Room Selection */}
                <div>
                  <label htmlFor="roomSelection" className="block text-sm font-medium text-gray-700 mb-1">
                    Available Rooms
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiHome className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="roomSelection"
                      className="block w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      onChange={(e) => handleRoomSelection(Number(e.target.value))}
                      disabled={isLoading}
                    >
                      <option value="">{isLoading ? 'Loading rooms...' : 'Select a room'}</option>
                      {roomRecords.map(room => (
                        <option key={room.id} value={room.id}>
                          {room.category} - Room {room.room_number} (${room.price}/night)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!check_in || !check_out || selectedRooms.length === 0}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 ${
                      !check_in || !check_out || selectedRooms.length === 0
                        ? 'bg-gray-900 cursor-not-allowed'
                        : 'bg-yellow-600 hover:bg-yellow-700 shadow-lg'
                    }`}
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="bg-gray-50 p-8 lg:p-12 border-l border-gray-200">
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Your Booking Summary</h3>
              
              {selectedRooms.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                    <FiHome className="h-6 w-6 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-1">No rooms selected</h4>
                  <p className="text-gray-500">Please select rooms to see your booking details</p>
                </div>
              ) : (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">Stay Duration</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(check_in).toLocaleDateString()} - {new Date(check_out).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {calculateNights()} {calculateNights() === 1 ? 'Night' : 'Nights'}
                      </span>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Guests</h4>
                      <p className="text-gray-600">
                        {adults} {adults === '1' ? 'Adult' : 'Adults'}{children !== '0' ? `, ${children} ${children === '1' ? 'Child' : 'Children'}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-4">Selected Rooms</h4>
                    
                    <div className="space-y-4">
                      {selectedRooms.map(roomId => {
                        const room = roomRecords.find(item => item.id === roomId);
                        return room ? (
                          <div key={room.id} className="flex justify-between items-start border-b border-gray-100 pb-4">
                            <div>
                              <p className="font-medium text-gray-800">{room.category}</p>
                              <p className="text-sm text-gray-500">Room {room.room_number}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-yellow-600">${room.price} <span className="text-gray-400 text-sm">/ night</span></p>
                              <button
                                onClick={() => handleRemoveRoom(room.id)}
                                className="text-sm text-red-500 hover:text-red-700 mt-1"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal ({calculateNights()} nights)</span>
                        <span className="font-medium">
                          ${selectedRooms.reduce((total, roomId) => {
                            const room = roomRecords.find(r => r.id === roomId);
                            return total + (room?.price ? room.price * calculateNights() : 0);
                          }, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold text-gray-800 mt-4">
                        <span>Total</span>
                        <span className="text-yellow-600">
                          ${selectedRooms.reduce((total, roomId) => {
                            const room = roomRecords.find(r => r.id === roomId);
                            return total + (room?.price ? room.price * calculateNights() : 0);
                          }, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBooking;