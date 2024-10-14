'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router
import AxiosInstance from "@/components/AxiosInstance";

interface Category {
  id: number;
  name: string;
  price: number;
  category: string;
  // Add other fields if necessary
}

const UpdateProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageId = searchParams.get('id'); // Get the id from the query parameters

  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagescategory, setImagesCategory] = useState('');
  const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);

  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState('');
  // const [image, setImage] = useState<File | null>(null);
  // const [prodHasCategory, setProdHasCategory] = useState('');
  // const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);

  // Fetch product details if there's an ID
  useEffect(() => {

    // Fetch categories for the dropdown list
    console.log('id')
    console.log(imageId)
    const fetchMenu = async () => {
      try {
        const res = await AxiosInstance.get('/images/categories');
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

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (image) formData.append('image', image);
      formData.append('imagescategory', imagescategory);

      const response = await AxiosInstance.patch(`/images/images/?id=${imageId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        console.log('Response:', response.data);
        router.push('/products');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 ml-20">
      <h2 className="mt-4 text-2xl font-bold mt-5 mb-10">Update Product Here:</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-1000">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-1000">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg 
            file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 
            hover:file:bg-indigo-100"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
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
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
