'use client'
import Image from "next/image";
import Link from 'next/link';
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";
import BannerSliderHomeCom from "@/components/BannerSliderHomeCom";
// import CheckInOut from "@/components/CheckInOut";
import InvitationCom from "@/components/InvitationCom";
import EventImageCom from "@/components/EventImageCom";
// import ContentpageHome from "@/components/ContentpageHome";
import ExploreRoomsCom from "@/components/ExploreRoomsCom";
import FeaturedAmenities from "@/components/FeaturedAmenities";
import AnimatedImages from "@/components/AnimatedImages";
import GallerySlider from "@/components/GallerySlider";
import MeetingEventsGroups from "@/components/MeetingEventsGroups";
import AdModal from "@/components/AdModal";


export default function Home() {
  return (
    <>
    <AdModal />
    <TopNavbarCom />
    <NavbarCom />
    <BannerSliderHomeCom />
    {/* <CheckInOut/> */}
    <InvitationCom/>
    <AnimatedImages/>
    <EventImageCom />
    <FeaturedAmenities/>
    {/* <ContentpageHome/> */}
    <ExploreRoomsCom/>
    <GallerySlider/>
    <MeetingEventsGroups/>
    <FooterCom />
  </>
  );
}

// "next": "^15.0.2",
