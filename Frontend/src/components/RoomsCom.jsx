'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const RoomCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext); // Provide a default value for permissions
  const [rooms, setRooms] = useState([]); // Adjusted variable name
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const receiveData = async () => {
      try {
        const res = await AxiosInstance.get('/hotel/room', {
          params: {
            limit: recordsPerPage,
            offset: (currentPage - 1) * recordsPerPage,
          },
        });

        if (res && res.data && Array.isArray(res.data.data.data)) {
          setRooms(res.data.data.data); // Set room data correctly
          setTotalPages(Math.ceil(res.data.data.count / recordsPerPage)); // Calculate total pages
        } else {
          console.error('Unexpected response structure:', res);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    receiveData();
  }, [currentPage]);

  const deleteRoom = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/hotel/room?id=${id}`);
      if (res) {
        toast.success('Room deleted successfully!');
        setCurrentPage(1); // Reset to the first page after deletion
      }
    } catch (error) {
      toast.error('Error deleting room!');
    }
  };

  const updateRoom = (roomId) => {
    router.push(`/updateroompage?roomid=${roomId}`);
  };

  const detailRoom = (roomId) => {
    router.push(`/roomdetail?RoomId=${roomId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Filter rooms based on search term
  const filteredRooms = Array.isArray(rooms) ? rooms.filter((room) => {
    const roomNumberMatch = room.room_number?.toLowerCase().includes(searchTerm);
    const categoryMatch = room.category?.toLowerCase().includes(searchTerm);
    return roomNumberMatch || categoryMatch;
  }) : [];

  return (
    <div className="container mx-auto my-4 w-full bg-black ml-5">
  <ToastContainer />
  <h2 className="text-2xl font-bold mb-4 text-center text-white">Rooms Record</h2>

  {permissions.create_employee && (
    <button
      className="btn btn-primary mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      onClick={() => router.push('/addroompage')}
    >
      Add Room
    </button>
  )}

  <br />
  <br />

  <div className="flex justify-center mb-5">
    <input
      type="text"
      placeholder="Search by Room Number or Category"
      value={searchTerm}
      onChange={handleSearch}
      className="px-4 py-2 w-1/2 rounded-md border bg-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="container mt-5 mr-10">
    {filteredRooms.length > 0 ? (
      <div>
        {/* Header Row */}
        <div className="grid grid-cols-5 gap-4 text-white font-bold bg-gray-900 p-2 rounded-t-lg">
          <span className="text-left">S.No</span>
          <span className="text-left -ml-20">ID</span>
          <span className="text-left -ml-28">Room Number</span>
          <span className="text-left -ml-28">Category</span>
          {/* <span className="text-left">Actions</span> */}
        </div>

        {/* Data Rows */}
        <ul className="list-none">
          {filteredRooms.map((room, index) => (
            <li key={room.id} className="grid grid-cols-5 gap-4 bg-gray-800 text-white p-2 border-t border-gray-700 mt-4">
              <span className="text-left">{(currentPage - 1) * recordsPerPage + index + 1}</span>
              <span className="text-left -ml-20">{room.id}</span>
              <span className="text-left -ml-28">{room.room_number}</span>
              <span className="text-left -ml-28">{room.category}</span>

              <div className="flex justify-end space-x-2 mb-1 mr-10">
                <button
                  className="btn btn-danger bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                  onClick={() => detailRoom(room.id)}
                >
                  Detail
                </button>
                {permissions.update_employee && (
                  <button
                    className="btn btn-primary bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                    onClick={() => updateRoom(room.id)}
                  >
                    Update
                  </button>
                )}
                {permissions.delete_employee && (
                  <button
                    className="btn btn-danger bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    onClick={() => deleteRoom(room.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    ) : (
      <p className="text-white">No Rooms found.</p>
    )}
  </div>
</div>

  );
};

export default RoomCom;
