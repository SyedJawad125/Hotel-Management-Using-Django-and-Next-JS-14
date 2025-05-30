// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const RoomCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext); // Provide a default value for permissions
//   const [rooms, setRooms] = useState([]); // Adjusted variable name
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const receiveData = async () => {
//       try {
//         const res = await AxiosInstance.get('/hotel/room', {
//           params: {
//             limit: recordsPerPage,
//             offset: (currentPage - 1) * recordsPerPage,
//           },
//         });

//         if (res && res.data && Array.isArray(res.data.data.data)) {
//           setRooms(res.data.data.data); // Set room data correctly
//           setTotalPages(Math.ceil(res.data.data.count / recordsPerPage)); // Calculate total pages
//         } else {
//           console.error('Unexpected response structure:', res);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//       }
//     };

//     receiveData();
//   }, [currentPage]);

//   const deleteRoom = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/hotel/room?id=${id}`);
//       if (res) {
//         toast.success('Room deleted successfully!');
//         setCurrentPage(1); // Reset to the first page after deletion
//       }
//     } catch (error) {
//       toast.error('Error deleting room!');
//     }
//   };

//   const updateRoom = (roomId) => {
//     router.push(`/updateroompage?roomId=${roomId}`);
//   };

//   const detailRoom = (roomId) => {
//     router.push(`/roomdetail?RoomId=${roomId}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     setCurrentPage(1); // Reset to the first page after search
//   };

//   // Filter rooms based on search term
//   const filteredRooms = Array.isArray(rooms) ? rooms.filter((room) => {
//     const roomNumberMatch = room.room_number?.toLowerCase().includes(searchTerm);
//     const categoryMatch = room.category?.toLowerCase().includes(searchTerm);
//     return roomNumberMatch || categoryMatch;
//   }) : [];

//   return (
//     <div className="container mx-auto my-4 w-full bg-black ml-5">
//   <ToastContainer />
//   <h2 className="text-2xl font-bold mb-4 text-center text-white">Rooms Record</h2>

//   {permissions.create_employee && (
//     <button
//       className="btn btn-primary mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//       onClick={() => router.push('/addroompage')}
//     >
//       Add Room
//     </button>
//   )}

//   <br />
//   <br />

//   <div className="flex justify-center mb-5">
//     <input
//       type="text"
//       placeholder="Search by Room Number or Category"
//       value={searchTerm}
//       onChange={handleSearch}
//       className="px-4 py-2 w-1/2 rounded-md border bg-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>

//   <div className="container mt-5 mr-10">
//     {filteredRooms.length > 0 ? (
//       <div>
//         {/* Header Row */}
//         <div className="grid grid-cols-5 gap-4 text-white font-bold bg-gray-900 p-2 rounded-t-lg">
//           <span className="text-left">S.No</span>
//           <span className="text-left -ml-40">ID</span>
//           <span className="text-left -ml-80">Room Number</span>
//           <span className="text-left -ml-80">Category</span>
//           <span className="text-left -ml-80">Price</span>
//           {/* <span className="text-left">Actions</span> */}
//         </div>

//         {/* Data Rows */}
//         <ul className="list-none">
//           {filteredRooms.map((room, index) => (
//             <li key={room.id} className="grid grid-cols-6 gap-4 bg-gray-800 text-white p-2 border-t border-gray-700 mt-4">
//               <span className="text-left">{(currentPage - 1) * recordsPerPage + index + 1}</span>
//               <span className="text-left -ml-28">{room.id}</span>
//               <span className="text-left -ml-60">{room.room_number}</span>
//               <span className="text-left -ml-52">{room.category}</span>
//               <span className="text-left -ml-52">{room.price_per_night}</span>


//               <div className="flex justify-end space-x-2 mb-1 mr-2">
//                 <button
//                   className="btn btn-danger bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
//                   onClick={() => detailRoom(room.id)}
//                 >
//                   Detail
//                 </button>
//                 {permissions.update_employee && (
//                   <button
//                     className="btn btn-primary bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
//                     onClick={() => updateRoom(room.id)}
//                   >
//                     Update
//                   </button>
//                 )}
//                 {permissions.delete_employee && (
//                   <button
//                     className="btn btn-danger bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
//                     onClick={() => deleteRoom(room.id)}
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>

//         {/* Pagination Controls */}
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => setCurrentPage(index + 1)}
//               className={`px-3 py-1 mx-1 rounded ${
//                 currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     ) : (
//       <p className="text-white">No Rooms found.</p>
//     )}
//   </div>
// </div>

//   );
// };

// export default RoomCom;



'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const RoomCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const recordsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const receiveData = async () => {
      setIsLoading(true);
      try {
        const res = await AxiosInstance.get('/hotel/room', {
          params: {
            limit: recordsPerPage,
            offset: (currentPage - 1) * recordsPerPage,
          },
        });

        if (res && res.data && Array.isArray(res.data.data.data)) {
          setRooms(res.data.data.data);
          setTotalPages(Math.ceil(res.data.data.count / recordsPerPage));
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
  }, [currentPage]);

  const deleteRoom = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/hotel/room?id=${id}`);
      if (res) {
        toast.success('Room deleted successfully!');
        setCurrentPage(1);
      }
    } catch (error) {
      toast.error('Error deleting room!');
    }
  };

  const updateRoom = (roomId) => {
    router.push(`/updateroompage?roomId=${roomId}`);
  };

  const detailRoom = (roomId) => {
    router.push(`/roomdetail?RoomId=${roomId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const filteredRooms = Array.isArray(rooms) ? rooms.filter((room) => {
    const roomNumberMatch = room.room_number?.toLowerCase().includes(searchTerm);
    const categoryMatch = room.category?.toLowerCase().includes(searchTerm);
    return roomNumberMatch || categoryMatch;
  }) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Room Management</h1>
            <p className="text-gray-400">Manage all hotel rooms and their details</p>
          </div>
          
          {permissions.create_employee && (
            <button
              className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 mt-4 md:mt-0"
              onClick={() => router.push('/addroompage')}
            >
              <FiPlus className="mr-2" />
              Add New Room
            </button>
          )}
        </div>

        {/* Search and Stats Section */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 mb-8 border border-gray-700 shadow-2xl">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Room Number or Category..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Rooms Table Section */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-900 text-gray-300 font-semibold uppercase text-sm tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-2">ID</div>
            <div className="col-span-2">Room No.</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-2">Price/Night</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              <p className="mt-2 text-gray-400">Loading rooms...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredRooms.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-400 text-lg">No rooms found</p>
            </div>
          )}

          {/* Rooms List */}
          {!isLoading && filteredRooms.length > 0 && (
            <ul className="divide-y divide-gray-700">
              {filteredRooms.map((room, index) => (
                <li 
                  key={room.id} 
                  className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-700 hover:bg-opacity-30 transition-all duration-200"
                >
                  <div className="col-span-1 text-gray-300">{(currentPage - 1) * recordsPerPage + index + 1}</div>
                  <div className="col-span-2 text-gray-300 font-mono">{room.id}</div>
                  <div className="col-span-2 text-white font-medium">{room.room_number}</div>
                  <div className="col-span-3">
                    <span className="inline-block bg-purple-900 bg-opacity-30 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {room.category}
                    </span>
                  </div>
                  <div className="col-span-2 text-green-400 font-medium">
                    ${room.price_per_night}
                  </div>
                  <div className="col-span-2 flex justify-end space-x-2">
                    <button
                      onClick={() => detailRoom(room.id)}
                      className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      title="View Details"
                    >
                      <FiEye size={18} />
                    </button>
                    {permissions.update_employee && (
                      <button
                        onClick={() => updateRoom(room.id)}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                    )}
                    {permissions.delete_employee && (
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-red-400 hover:text-red-300 transition-colors duration-200"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <FiChevronLeft className="text-gray-300" size={20} />
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
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    } transition-all duration-200`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="text-gray-400 mx-1">...</span>
              )}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentPage === totalPages
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  } transition-all duration-200`}
                >
                  {totalPages}
                </button>
              )}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <FiChevronRight className="text-gray-300" size={20} />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCom;