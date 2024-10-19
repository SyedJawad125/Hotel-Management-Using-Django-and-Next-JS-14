'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const BookingCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext); // Provide a default value for permissions
  const [records, setRecords] = useState([]); // Booking records
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;

  useEffect(() => {
    const receiveData = async () => {
      try {
        const res = await AxiosInstance.get('/hotel/booking');
        if (res && res.data && res.data.data.data) {
          setRecords(res.data.data.data); // Set booking records
          setFilteredRecords(res.data.data.data); // Initialize filteredRecords with all records
        } else {
          console.error('Unexpected response structure:', res);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    receiveData();
  }, []);

  const DetailRecord = (bookingid) => {
    router.push(`/bookingdetail?bookingid=${bookingid}`);
  };

  const updateRecord = async (bookingid) => {
    router.push(`/updatebookingpage?bookingid=${bookingid}`);
  };

  const deleteRecord = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/hotel/booking?id=${id}`);
      if (res) {
        setFilteredRecords(filteredRecords.filter(record => record.id !== id));
        toast.success('Booking deleted successfully!');
      }
    } catch (error) {
      toast.error('Error deleting booking!');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = records.filter((record) => {
      const idMatch = record.id.toString() === value;
      const nameMatch = record.name.toLowerCase().includes(value);
      return idMatch || nameMatch;
    });

    setFilteredRecords(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Log permissions to debug
  console.log('User permissions:', permissions);

  return (
    <div className="container mx-auto my-4 w-full bg-black ml-5">
      <h2 className="text-2xl font-bold mb-4">List Of Bookings</h2>

      {/* Conditionally render the Add Booking button based on user permissions */}
      {permissions.create_booking && (
        <button
          className='btn btn-primary mt-3 bg-blue-500 text-white py-2 px-4 rounded'
          onClick={() => router.push('/addbookingpage')}
        >
          Add Booking
        </button>
      )}

      <br />
      <br />

      <p>Total: {filteredRecords.length}</p>

      {/* Search Bar */}
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 w-1/2 rounded-md border bg-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="container mt-5 mr-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentRecords.length > 0 ? (
            currentRecords.map((item) => (
              <div key={item.id} className="col mb-4">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">Id: {item.id}</p>
                    <h5 className="card-title text-lg font-bold">Check In: {item.check_in}</h5>
                    <p className="card-text">Check Out: {item.check_out}</p>
                    <p className="card-text">Total Price: {item.total_price}</p>
                    <p className="card-text">Adults: {item.adults}</p>
                    <p className="card-text">Children: {item.children}</p>
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

                    <div className="flex">
                      <button
                        className="btn btn-danger bg-green-500 text-white mr-2 py-2 px-4 rounded hover:bg-green-600"
                        onClick={() => DetailRecord(item.id)}>
                        Detail
                      </button>
                      <button
                        className="btn btn-primary bg-blue-500 text-white mr-2 py-2 px-4 rounded"
                        onClick={() => updateRecord(item.id)}>
                        Update
                      </button>
                      <button
                        className="btn btn-danger bg-red-500 text-white mr-2 py-2 px-4 rounded mr-2"
                        onClick={() => deleteRecord(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No bookings found</p>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="pagination flex">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button
                  onClick={() => paginate(i + 1)}
                  className="page-link bg-gray-800 text-white py-2 px-3 rounded mx-1"
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ToastContainer />
    </div>
  );
};

export default BookingCom;
