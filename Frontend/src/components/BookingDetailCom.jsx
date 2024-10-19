'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from '@/components/AxiosInstance';

const BookingDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const bookingId = searchParams.get('bookingid');

    if (bookingId) {
      const fetchBooking = async () => {
        try {
          const res = await AxiosInstance.get(`/hotel/booking?id=${bookingId}`);
          if (res && res.data && res.data.data) {
            setBookings(res.data.data.data); // Convert to array if it's a single object
          } else {
            console.error('Unexpected API response structure:', res.data);
          }
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      };
      fetchBooking();
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto my-0 p-6 bg-gray-800 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-white ml-5">Booking Details</h2>
  
    {bookings.length ? (
      bookings.map((booking) => (
        <div key={booking.id} className="flex flex-col md:flex-row gap-4 text-gray-400 leading-relaxed text-sm md:text-base lg:text-lg ml-5">
          {/* <div className="flex flex-col items-center md:items-start md:w-1/3">
            {employee.image && (
              <div className="flex flex-col items-center md:items-start mt-5">
                <img 
                  src={`http://localhost:8000/${employee.image}`} 
                  alt={`${employee.first_name} ${employee.last_name}`} 
                  className="rounded-lg shadow-lg w-48 h-48 object-cover mb-2" 
                />
                <p className="text-white font-semibold mb-5">{`${employee.first_name} ${employee.last_name}`}</p>
              </div>
            )}
          </div> */}
          <div className="md:w-2/3">
            <p><strong>ID:</strong> {booking.id}</p>
            <p><strong>First Name:</strong> {booking.check_in}</p>
            <p><strong>Last Name:</strong> {booking.check_out}</p>
            <p><strong>Email:</strong> {booking.total_price}</p>
            <p><strong>Phone Number:</strong> {booking.adults}</p>
            <p><strong>Date of Birth:</strong> {booking.children}</p>
            <p className="card-text">
                      Room Category: {item.room_category && item.room_category.length > 0 ? (
                        item.room_category.map((category, index) => (
                          <span key={index}>
                            {category}{index < item.room_category.length - 1 && ', '}
                          </span>
                        ))
                      ) : (
                        'No category available'
                      )}
                    </p>

                    {/* Display room numbers */}
                    <p className="card-text">
                      Room Numbers: {item.room_num && item.room_num.length > 0 ? (
                        item.room_num.map((room, index) => (
                          <span key={index}>
                            {room.room_number}{index < item.room_num.length - 1 && ', '}
                          </span>
                        ))
                      ) : (
                        'No rooms assigned'
                      )}
                    </p>
                    {/* Display user info */}
                    <p className="card-text">Username: {item.username}</p>
                    <p className="card-text">Phone: {item.phone}</p>
                    <p className="card-text">Email: {item.email}</p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-400">No Booking details available.</p>
    )}
    <button
      className="mt-4 bg-blue-700 text-white py-2 px-4 rounded ml-5"
      onClick={() => router.push('/bookingpage')}
    >
      Back to Booking List
    </button>
  </div>
  

  );
};

export default BookingDetail;