'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import Image from 'next/image';

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
  const imageId = searchParams.get('imgid');

  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagescategory, setImagesCategory] = useState('');
  const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);
  const [description, setDescription] = useState('');
  const [bulletsdescription, setBulletsdescription] = useState('• ');

  useEffect(() => {
    const fetchProductData = async () => {
      if (imageId) {
        try {
          const res = await AxiosInstance.get(`/images/publicimages?id=${imageId}`);
          const productData = res?.data?.data?.data[0];
          if (productData) {
            setName(productData.name || '');
            setDescription(productData.description || '');
            setImagesCategory(productData.imagescategory || '');
            setBulletsdescription(productData.bulletsdescription || '• ');
            if (productData.image) {
              const baseUrl = 'http://127.0.0.1:8000/';
              setImagePreview(`${baseUrl}${productData.image}`.trim());
            }
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      }
    };

    fetchProductData();
  }, [imageId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await AxiosInstance.get('/images/categories');
        if (res?.data?.data?.data) {
          setCategoryRecords(res.data.data.data);
        }
      } catch (error) {
        console.error('Error occurred while fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && !file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', imageId as string);
      formData.append('name', name || '');
      if (image) formData.append('image', image);
      formData.append('imagescategory', imagescategory || '');
      formData.append('description', description || '');
      formData.append('bulletsdescription', bulletsdescription || '');

      const response = await AxiosInstance.patch(`/images/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
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
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-1000">Description</label>
          <textarea
            id="description"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imagescategory" className="block text-sm font-medium text-gray-1000">Image Category</label>
          <input
            type="text"
            id="imagescategory"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={imagescategory || ''}
            onChange={(e) => setImagesCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bulletsdescription" className="block text-sm font-medium text-gray-1000">Bulleted Description</label>
          <textarea
            id="bulletsdescription"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={bulletsdescription || ''}
            onChange={(e) => setBulletsdescription(e.target.value)}
            onKeyDown={handleBulletsInput}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-1000">Upload Image</label>
          <input
            type="file"
            id="image"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            onChange={handleImageChange}
          />
        </div>
        {imagePreview && (
          <div className="mb-4">
            <Image
              src={imagePreview}
              alt="Image Preview"
              width={160}
              height={120}
              className="object-contain border border-gray-300 rounded-lg"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateImage;
