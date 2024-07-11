"use client";
import Main from "@/HomePageComponents/Main";
import HeaderSection from "@/HomePageComponents/HeaderSection";
import Logo from "@/HomePageComponents/Logo";
import AboutUs from "@/HomePageComponents/AboutUs";
import Process from "@/HomePageComponents/Process";
import PosterSection from "@/HomePageComponents/PosterSection";
import Recycle from "@/HomePageComponents/Recycle";
import CompanyMoto from "@/HomePageComponents/CompanyMoto";
import Services from "@/HomePageComponents/Services";
import NewArrivels from "@/HomePageComponents/NewArrivels";
import Footer from "@/HomePageComponents/Footer";
export default function Page() {
  return (
    <div>
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
