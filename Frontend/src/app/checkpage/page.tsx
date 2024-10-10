import React from 'react'
import NavbarCom from "@/components/NavbarCom";
import CheckPage from "@/components/CheckPage";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";


const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <CheckPage/>
      <FooterCom/>
    </div>
  )
}

export default page