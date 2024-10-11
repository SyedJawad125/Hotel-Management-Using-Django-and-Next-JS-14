import React from 'react'
import NavbarCom from "@/components/NavbarCom";
import ExploreRoomsCom from "@/components/ExploreRoomsCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";


const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <ExploreRoomsCom/>
      <FooterCom/>
    </div>
  )
}

export default page