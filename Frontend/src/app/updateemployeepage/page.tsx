'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router
import AxiosInstance from "@/components/AxiosInstance";
import Image from 'next/image';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  hire_date: string;
  position: string;
  department: string;
  salary: number;
}

const UpdateEmployee = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get('empid'); // Extract employee ID from query params

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [hire_date, setHireDate] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [employeeRecords, setEmployeeRecords] = useState<Employee[]>([]);

  // Fetch employee data based on employeeId
  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (employeeId) {
        try {
          const res = await AxiosInstance.get(`/hotel/employee?id=${employeeId}`);
          const employeeData = res?.data?.data?.data[0]; // Assuming the data is an array
          if (employeeData) {
            // Set employee details
            setFirstName(employeeData.first_name);
            setLastName(employeeData.last_name);
            setEmail(employeeData.email);
            setPhoneNumber(employeeData.phone_number);
            setDateOfBirth(employeeData.date_of_birth);
            setHireDate(employeeData.hire_date);
            setPosition(employeeData.position);
            setDepartment(employeeData.department);
            setSalary(employeeData.salary.toString());
  
            // Handle image preview if employee has an image
            if (employeeData.image) {
              // Assuming `employeeData.image` contains just the image filename
              const baseUrl = ' http://127.0.0.1:8000/'; // Replace with your actual backend base URL
              setImagePreview(`${baseUrl}${employeeData.image}`);
            } else {
              console.log('No image found for this employee.');
            }
          } else {
            console.error('No employee found with this ID:', employeeId);
          }
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      }
    };
  
    fetchEmployeeData();
  }, [employeeId]);
  

  // Handle image input and preview
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

  // Handle form submission to update employee details
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', employeeId as string); // Directly append the employee ID as a string
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('email', email);
      formData.append('phone_number', phone_number);
      formData.append('date_of_birth', date_of_birth);
      formData.append('hire_date', hire_date);
      formData.append('position', position);
      formData.append('department', department);
      formData.append('salary', salary);

      if (image) formData.append('image', image); // Append new image only if selected

      const response = await AxiosInstance.patch(`/hotel/employee`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        console.log('Response:', response.data);
        router.push('/employeepage');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 ml-20">
  <h2 className="mt-4 text-2xl font-bold mb-10">Update Employee Details:</h2>
  <form className="mt-2" onSubmit={handleSubmit}>
    {/* First Name and Last Name */}
    <div className="flex mb-4 space-x-20">
      <div className="w-1/3">
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-1000">First Name</label>
        <input
          type="text"
          id="first_name"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="w-1/3">
        <label htmlFor="last_name" className="block text-sm font-medium text-gray-1000">Last Name</label>
        <input
          type="text"
          id="last_name"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
    </div>

    {/* Email and Phone Number */}
    <div className="flex mb-4 space-x-20">
      <div className="w-1/3">
        <label htmlFor="email" className="block text-sm font-medium text-gray-1000">Email</label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-1/3">
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-1000">Phone Number</label>
        <input
          type="text"
          id="phone_number"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
    </div>

    {/* Date of Birth and Hire Date */}
    <div className="flex mb-4 space-x-20">
      <div className="w-1/3">
        <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-1000">Date of Birth</label>
        <input
          type="date"
          id="date_of_birth"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          value={date_of_birth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>
      <div className="w-1/3">
        <label htmlFor="hire_date" className="block text-sm font-medium text-gray-1000">Hire Date</label>
        <input
          type="date"
          id="hire_date"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          value={hire_date}
          onChange={(e) => setHireDate(e.target.value)}
        />
      </div>
    </div>

    {/* Position and Department */}
    <div className="flex mb-4 space-x-20">
      <div className="w-1/3">
        <label htmlFor="position" className="block text-sm font-medium text-gray-1000">Position</label>
        <input
          type="text"
          id="position"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div className="w-1/3">
        <label htmlFor="department" className="block text-sm font-medium text-gray-1000">Department</label>
        <input
          type="text"
          id="department"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
    </div>

    {/* Salary */}
    <div className="mb-4 w-2/3">
      <label htmlFor="salary" className="block text-sm font-medium text-gray-1000">Salary</label>
      <input
        type="number"
        id="salary"
        className="mt-1 block w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
    </div>

    {/* Image Upload */}
    <div className="mb-4 flex items-center space-x-4">
      <div className="relative">
        <label htmlFor="image" className="block text-sm font-medium text-gray-1000">Employee Image</label>
        <input
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label
          htmlFor="image"
          className="mt-1 inline-block px-4 py-2 border text-white rounded-lg cursor-pointer hover:bg-blue-600"
        >
          Choose Image
        </label>
        <span className="ml-4 text-sm text-gray-600">
          {image ? image.name : "No file chosen"}
        </span>
      </div>
      {imagePreview && (
        <div className="w-40 h-25">
          <Image src={imagePreview.trim()}
          alt="Employee" 
          className="h-24 w-24 object-cover"
          width={160}
          height={120}
           />
        </div>
      )}
    </div>

    <button
      type="submit"
      className="px-6 py-2 mb-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
    >
      Update Employee
    </button>
  </form>
</div>

  );
};

export default UpdateEmployee;
