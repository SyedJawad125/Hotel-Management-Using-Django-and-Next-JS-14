'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router
import AxiosInstance from "@/components/AxiosInstance";

interface Category {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

const UpdateImage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageId = searchParams.get('imgid'); // Get the id from the query parameters

  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [imagescategory, setImagesCategory] = useState('');
  const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);
  const [description, setDescription] = useState('');
  const [bulletsdescription, setBulletsdescription] = useState('• ');

  // Fetch product data based on imgid
  useEffect(() => {
    const fetchProductData = async () => {
      if (imageId) {
        try {
          const res = await AxiosInstance.get(`/images/publicimages?id=${imageId}`);
          const productData = res?.data?.data?.data[0]; // Assuming the data is an array
          if (productData) {
            setName(productData.name);
            setDescription(productData.description);
            setImagesCategory(productData.imagescategory);
            setBulletsdescription(productData.bulletsdescription || '• ');

            // Log the image URL to check what is being returned
            console.log('Image data:', productData.image);

            if (productData.image) {
              // Assuming `employeeData.image` contains just the image filename
              const baseUrl = ' http://127.0.0.1:8000/'; 
              setImagePreview(`${baseUrl}${productData.image}`);
            } else {
              console.log('No image found for this employee.');
            }
          } else {
            console.error('No product found with this ID:', imageId);
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      }
    };

    fetchProductData();
  }, [imageId]);

  // Fetch categories for the dropdown list
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await AxiosInstance.get('/images/categories');
        if (res?.data?.data?.data) {
          setCategoryRecords(res.data.data.data);
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('Error occurred while fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Handle image input and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // Validate image type
    if (file && !file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string); // Set preview URL
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); // Clear preview if no file is selected
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', imageId as string); // Directly append the imageId as a string
      formData.append('name', name);
      if (image) formData.append('image', image); // Append new image only if selected
      formData.append('imagescategory', imagescategory);
      formData.append('description', description);
      formData.append('bulletsdescription', bulletsdescription);

      const response = await AxiosInstance.patch(`/images/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        console.log('Response:', response.data);
        router.push('/imagespage');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBulletsInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let value = (e.target as HTMLTextAreaElement).value;

    if (e.key === 'Enter') {
      e.preventDefault();
      setBulletsdescription(value + '\n• ');
    } else {
      setBulletsdescription(value);
    }
  };

  return (
    <div className="container mx-auto px-4 ml-20">
      <h2 className="mt-4 text-2xl font-bold mb-10">Update Images Here:</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-1000">Name</label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center space-x-4">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-1000">Upload Image</label>
            <input
              type="file"
              id="image"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg 
              file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 
              hover:file:bg-indigo-100"
              onChange={handleImageChange}
            />
          </div>

          {imagePreview && (
            <div className="w-40 h-25">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="imagescategory" className="block text-sm font-medium text-black">Select Category</label>
          <select
            id="imagescategory"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-black"
            value={imagescategory}
            onChange={(e) => setImagesCategory(e.target.value)}>
            <option value="" className="text-black">Select Category</option>
            {categoryRecords.length > 0 ? (
              categoryRecords.map((item, index) => (
                <React.Fragment key={item.id}>
                  {index > 0 && (
                    <option disabled className="text-gray-500">───────────────</option>
                  )}
                  <option value={item.id} className="text-black">{item.category}</option>
                </React.Fragment>
              ))
            ) : (
              <option value="" className="text-black">No categories available</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-1000">Description</label>
          <input
            type="text"
            id="description"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="• Type Description here if needed"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bulletsdescription" className="block text-sm font-medium text-gray-1000">Bullets Description</label>
          <textarea
            id="bulletsdescription"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={bulletsdescription}
            onChange={(e) => setBulletsdescription(e.target.value)}
            onKeyDown={handleBulletsInput}
            placeholder="• Type your first bullet here, then press Enter for the next..."
            rows={5}
          />
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

export default UpdateImage;
