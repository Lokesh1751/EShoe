"use client";
import HeaderSection from "@/HomePageComponents/HeaderSection";
import Logo from "@/HomePageComponents/Logo";
import AboutUs from "@/HomePageComponents/AboutUs";
import Process from "@/HomePageComponents/Process";
import PosterSection from "@/HomePageComponents/PosterSection";
import Recycle from "@/HomePageComponents/Recycle";
import CompanyMoto from "@/HomePageComponents/CompanyMoto";
import Services from "@/HomePageComponents/Services";
import NewArrivels from "@/HomePageComponents/NewArrivels";
export default function Page() {
  return (
    <div>
      <HeaderSection />
      <Logo />
      <AboutUs />
      <Process />
      <PosterSection />
      <Recycle />
      <NewArrivels />
      <CompanyMoto />
      <Services />
    </div>
  );
}
