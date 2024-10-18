'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router
import AxiosInstance from "@/components/AxiosInstance";

interface Category {
  id: number;
  name: string;
  category: string;
  description: string;
  bulletsdescription: string;
}

const AddProduct = () => {
  const router = useRouter();

  const [check_in, setCheck_in] = useState('');
  const [check_out, setCheck_out] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [rooms, setRooms] = useState('');
  const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await AxiosInstance.get('/hotel/room');
        console.log('Category API response:', res.data); // Check the response
        if (res?.data?.data?.data) {
          setCategoryRecords(res.data.data.data);
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('Error occurred while fetching categories:', error);
      }
    };
    fetchMenu();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
        const payload = {"check_in":check_in , "check_out":check_out,"adults":adults, 
            "children":children, "rooms":rooms}
      const response = await AxiosInstance.post('/hotel/booking', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response) {
        console.log('Response:', response.data);
        router.push('/imagespage');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };


  return (
    <div className="container mx-auto px-4 ml-20">
      <h2 className="mt-4 text-2xl font-bold mt-5 mb-10">Add Product Here:</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-1000">
            Name
          </label>
          <input
            type="text"
            id="check_in"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={check_in}
            onChange={(e) => setCheck_in(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-1000">
            Check Out
          </label>
          <input
            type="text"
            id="description"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={check_in}
            onChange={(e) => setCheck_out(e.target.value)}
            placeholder="• Type Description here if need"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-1000">
            Adults
          </label>
          <input
            type="text"
            id="adults"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            placeholder="• Type Description here if need"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-1000">
            Children
          </label>
          <input
            type="text"
            id="description"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            placeholder="• Type Description here if need"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-black">
            Select Category
          </label>
          <select
            id="imagescategory"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-black"
            onChange={(e) => setImagesCategory(e.target.value)}>
            <option value="" className="text-black">Select Category</option>
            {categoryRecords.length > 0 ? (
              categoryRecords.map((item, index) => (
                <React.Fragment key={item.id}>
                  {index > 0 && (
                    <option disabled className="text-gray-500">───────────────</option> 
                  )}
                  <option value={item.id} className="text-black">
                    {item.category}
                  </option>
                </React.Fragment>
              ))
            ) : (
              <option value="" className="text-black">No categories available</option>
            )}
          </select>
        </div>
        <button
          type="submit"
          className="mt-3 w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
          text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
