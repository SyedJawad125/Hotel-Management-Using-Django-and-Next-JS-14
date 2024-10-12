'use client'
import Image from "next/image";
import Link from 'next/link';
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";
import BannerSliderHomeCom from "@/components/BannerSliderHomeCom";
import InvitationCom from "@/components/InvitationCom";
import EventImageCom from "@/components/EventImageCom";
// import ContentpageHome from "@/components/ContentpageHome";
import ExploreRoomsCom from "@/components/ExploreRoomsCom";
import FeaturedAmenities from "@/components/FeaturedAmenities";
import AnimatedImages from "@/components/AnimatedImages";
import MeetingRooms from "@/components/MeetingRooms";
import AdModal from "@/components/AdModal";


export default function Home() {
  return (
    <>
    <AdModal />
    <TopNavbarCom />
    <NavbarCom />
    <BannerSliderHomeCom />
    <InvitationCom/>
    <AnimatedImages/>
    <EventImageCom />
    <FeaturedAmenities/>
    {/* <ContentpageHome/> */}
    <ExploreRoomsCom/>
    <MeetingRooms/>
    <FooterCom />
  </>
  );
}

{/* <>
    <TopNavbarCom />
    <NavbarCom />
    <div className="flex flex-col min-h-screen">  
      {/* Container for main and footer */}
      // <main className="flex grow">  
        {/* Grow ensures main takes up available space */}
    //     <LeftSideSliderCom />
    //     <div className="ml-[15%] w-[85%]">
    //       <BannerSliderHomeCom />
    //     </div>
    //   </main>
    //   <FooterCom />
    // </div>
  // </> */}