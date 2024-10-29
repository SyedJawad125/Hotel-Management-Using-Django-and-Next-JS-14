'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from '@/components/AxiosInstance';

const BookingDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [booking, setBooking] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    // Get booking ID from search params
    const id = searchParams.get('bookingid');
    setBookingId(id);
  }, [searchParams]);

  useEffect(() => {
    if (bookingId) {
      const fetchBooking = async () => {
        try {
          const res = await AxiosInstance.get(`/hotel/booking?id=${bookingId}`);
          console.log('API response:', res);
          if (res && res.data && res.data.data && res.data.data.data.length > 0) {
            setBooking(res.data.data.data[0]);
          } else {
            console.error('Unexpected API response structure:', res.data);
          }
        } catch (error) {
          console.error('Error fetching booking:', error);
        }
      };
      fetchBooking();
    }
  }, [bookingId]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Suspense fallback={<div>Loading booking details...</div>}>
      <div className="container mx-auto my-0 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white ml-5">Booking Details</h2>

        {booking ? (
          <div className="flex flex-col md:flex-row gap-4 text-gray-400 leading-relaxed text-sm md:text-base lg:text-lg ml-5">
            <div className="md:w-2/3">
              <p><strong>ID:</strong> {booking.id}</p>
              <p><strong>Check In:</strong> {formatDate(booking.check_in)}</p>
              <p><strong>Check Out:</strong> {formatDate(booking.check_out)}</p>
              <p><strong>Total Price:</strong> {booking.total_price} PKR</p>
              <p><strong>Adults:</strong> {booking.adults}</p>
              <p><strong>Children:</strong> {booking.children}</p>
              <p className="card-text">
                <strong>Room Numbers:</strong>{' '}
                {booking.room_num && booking.room_num.length > 0 ? (
                  booking.room_num.map((room, index) => (
                    <span key={index}>
                      {room.room_number}
                      {index < booking.room_num.length - 1 && ', '}
                    </span>
                  ))
                ) : (
                  'No rooms assigned'
                )}
              </p>
              <p className="card-text">
                <strong>Room Category:</strong>{' '}
                {booking.room_category && booking.room_category.length > 0 ? (
                  booking.room_category.join(', ')
                ) : (
                  'No category available'
                )}
              </p>
              <p><strong>Username:</strong> {booking.username}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Email:</strong> {booking.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No booking details available.</p>
        )}

        <button
          className="mt-4 bg-blue-700 text-white py-2 px-4 rounded ml-5"
          onClick={() => router.push('/bookingpage')}
        >
          Back to Booking List
        </button>
      </div>
    </Suspense>
  );
};

export default BookingDetail;
