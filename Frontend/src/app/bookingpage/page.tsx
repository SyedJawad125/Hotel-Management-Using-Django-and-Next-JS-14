'use client'
import React from 'react'
import BookingCom from "@/components/BookingCom";
import AdminSideNavbarCom from "@/components/AdminSideNavbarCom";

const page = () => {
  return (
    <div className="flex h-screen">
    <div className="w-[12%] bg-gray-800 text-white">
      <AdminSideNavbarCom />
    </div>
    <div className="w-[85%] p-6 bg-black">
    <BookingCom/> 
    </div>
  </div> 
  )
}

export default page