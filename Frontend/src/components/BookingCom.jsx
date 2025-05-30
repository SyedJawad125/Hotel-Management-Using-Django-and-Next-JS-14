// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const BookingCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext); // Provide a default value for permissions
//   const [records, setRecords] = useState([]); // Booking records
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 12;

//   useEffect(() => {
//     const receiveData = async () => {
//       try {
//         const res = await AxiosInstance.get('/hotel/booking');
//         if (res && res.data && res.data.data.data) {
//           setRecords(res.data.data.data); // Set booking records
//           setFilteredRecords(res.data.data.data); // Initialize filteredRecords with all records
//         } else {
//           console.error('Unexpected response structure:', res);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//       }
//     };

//     receiveData();
//   }, []);

//   const DetailRecord = (bookingid) => {
//     router.push(`/bookingdetail?bookingid=${bookingid}`);
//   };

//   const updateRecord = async (bookingid) => {
//     router.push(`/updatebookingpage?bookingid=${bookingid}`);
//   };

//   const deleteRecord = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/hotel/booking?id=${id}`);
//       if (res) {
//         setFilteredRecords(filteredRecords.filter(record => record.id !== id));
//         toast.success('Booking deleted successfully!');
//       }
//     } catch (error) {
//       toast.error('Error deleting booking!');
//     }
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = records.filter((record) => {
//       const idMatch = record.id.toString() === value;
//       const nameMatch = record.name.toLowerCase().includes(value);
//       return idMatch || nameMatch;
//     });

//     setFilteredRecords(filtered);
//     setCurrentPage(1); // Reset to the first page
//   };

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Log permissions to debug
//   console.log('User permissions:', permissions);

//   return (
//     <div className="container mx-auto my-4 w-full bg-black ml-5">
//       <h2 className="text-2xl font-bold mb-4">List Of Bookings</h2>

//       {/* Conditionally render the Add Booking button based on user permissions */}
//       {/* {permissions.create_booking && ( */}
//         <button
//           className='btn btn-primary mt-3 bg-blue-500 text-white py-2 px-4 rounded'
//           onClick={() => router.push('/addbookingpage')}
//         >
//           Add Booking
//         </button>
//       {/* )} */}

//       <br />
//       <br />

//       <p>Total: {filteredRecords.length}</p>

//       {/* Search Bar */}
//       <div className="flex justify-center mb-5">
//         <input
//           type="text"
//           placeholder="Search by ID or Name"
//           value={searchTerm}
//           onChange={handleSearch}
//           className="px-4 py-2 w-1/2 rounded-md border bg-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="container mt-5 mr-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {currentRecords.length > 0 ? (
//             currentRecords.map((item) => (
//               <div key={item.id} className="col mb-4">
//                 <div className="card">
//                   <div className="card-body">
//                     <p className="card-text">Id: {item.id}</p>
//                     <h5 className="card-title text-lg font-bold">Check In: {item.check_in}</h5>
//                     <p className="card-text">Check Out: {item.check_out}</p>
//                     <p className="card-text">Total Price: {item.total_price}</p>
//                     <p className="card-text">Adults: {item.adults}</p>
//                     <p className="card-text">Children: {item.children}</p>
//                     <p className="card-text">
//                       Room Category: {item.room_category && item.room_category.length > 0 ? (
//                         item.room_category.map((category, index) => (
//                           <span key={index}>
//                             {category}{index < item.room_category.length - 1 && ', '}
//                           </span>
//                         ))
//                       ) : (
//                         'No category available'
//                       )}
//                     </p>

//                     {/* Display room numbers */}
//                     <p className="card-text">
//                       Room Numbers: {item.room_num && item.room_num.length > 0 ? (
//                         item.room_num.map((room, index) => (
//                           <span key={index}>
//                             {room.room_number}{index < item.room_num.length - 1 && ', '}
//                           </span>
//                         ))
//                       ) : (
//                         'No rooms assigned'
//                       )}
//                     </p>
//                     {/* Display user info */}
//                     <p className="card-text">Username: {item.username}</p>
//                     <p className="card-text">Phone: {item.phone}</p>
//                     <p className="card-text">Email: {item.email}</p>

//                     <div className="flex">
//                       <button
//                         className="btn btn-danger bg-green-500 text-white mr-2 py-2 px-4 rounded hover:bg-green-600"
//                         onClick={() => DetailRecord(item.id)}>
//                         Detail
//                       </button>
//                       <button
//                         className="btn btn-primary bg-blue-500 text-white mr-2 py-2 px-4 rounded"
//                         onClick={() => updateRecord(item.id)}>
//                         Update
//                       </button>
//                       <button
//                         className="btn btn-danger bg-red-500 text-white mr-2 py-2 px-4 rounded mr-2"
//                         onClick={() => deleteRecord(item.id)}>
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No bookings found</p>
//           )}
//         </div>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-6">
//         <nav>
//           <ul className="pagination flex">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                 <button
//                   onClick={() => paginate(i + 1)}
//                   className="page-link bg-gray-800 text-white py-2 px-3 rounded mx-1"
//                 >
//                   {i + 1}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default BookingCom;



'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';
import { FiSearch, FiEdit, FiTrash2, FiEye, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

const BookingCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const recordsPerPage = 12;

  useEffect(() => {
    const receiveData = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosInstance.get('/hotel/booking');
        if (res && res.data && res.data.data.data) {
          setRecords(res.data.data.data);
          setFilteredRecords(res.data.data.data);
        } else {
          console.error('Unexpected response structure:', res);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      } finally {
        setIsLoading(false);
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
        toast.success('Booking deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: {
            backgroundColor: '#10B981',
          }
        });
      }
    } catch (error) {
      toast.error('Error deleting booking!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          backgroundColor: '#EF4444',
        }
      });
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
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Booking Management</h1>
            <p className="text-gray-600 mt-2">Manage all hotel reservations and guest information</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
            onClick={() => router.push('/addbookingpage')}
          >
            <FiPlus className="mr-2" />
            Add New Booking
          </motion.button>
        </motion.div>

        {/* Stats and Search */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">{filteredRecords.length}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Current Page</p>
                <p className="text-2xl font-bold text-gray-800">{currentPage}/{totalPages}</p>
              </div>
            </div>
            
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by ID or Name..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>
          </div>
        </motion.div>

        {/* Booking Cards */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRecords.length > 0 ? (
              currentRecords.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full mb-2">
                          Booking #{item.id}
                        </span>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{item.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-indigo-600">${item.total_price}</p>
                        <p className="text-xs text-gray-500">{item.adults} adults, {item.children} children</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Check-in</span>
                        <span className="text-sm font-medium text-gray-800">{item.check_in}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Check-out</span>
                        <span className="text-sm font-medium text-gray-800">{item.check_out}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Rooms</span>
                        <span className="text-sm font-medium text-gray-800">
                          {item.room_num && item.room_num.length > 0 ? (
                            item.room_num.map((room, index) => (
                              <span key={index}>
                                {room.room_number}{index < item.room_num.length - 1 && ', '}
                              </span>
                            ))
                          ) : (
                            'Not assigned'
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-2">
                      <button
                        onClick={() => DetailRecord(item.id)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200"
                        title="View Details"
                      >
                        <FiEye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => updateRecord(item.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                        title="Edit"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteRecord(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                        title="Delete"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700">No bookings found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search or create a new booking</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-10"
          >
            <nav className="inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-l-lg border border-gray-300 ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === pageNum ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-r-lg border border-gray-300 ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Next
              </button>
            </nav>
          </motion.div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default BookingCom;