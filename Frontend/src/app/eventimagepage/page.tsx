import React from 'react'
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import EventImageCom from "@/components/EventImageCom";
import FooterCom from "@/components/FooterCom";



const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <EventImageCom/>
      <FooterCom/>
    </div>
  )
}

export default page