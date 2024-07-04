"use client";
import HeaderSection from "@/HomePageComponents/HeaderSection";
import Main from "@/HomePageComponents/Main";
import Logo from "@/HomePageComponents/Logo";
import AboutUs from "@/HomePageComponents/AboutUs";
import Process from "@/HomePageComponents/Process";
import PosterSection from "@/HomePageComponents/PosterSection";
import Recycle from "@/HomePageComponents/Recycle";
import CompanyMoto from "@/HomePageComponents/CompanyMoto";
import Services from "@/HomePageComponents/Services";
import Footer from "@/HomePageComponents/Footer";
import NewArrivels from "@/HomePageComponents/NewArrivels";
export default function Page() {
  return (
    <div className="m-0">
      <Main />
      <HeaderSection />
      <Logo />
      <AboutUs />
      <Process />
      <PosterSection />
      <Recycle />
      <NewArrivels />
      <CompanyMoto />
      <Services />
      <Footer />
    </div>
  );
}
