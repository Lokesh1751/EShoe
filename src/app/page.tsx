"use client";
import HeaderSection from "@/components/HeaderSection";
import Main from "@/components/Main";
import Logo from "@/components/Logo";
import AboutUs from "@/components/AboutUs";
import Process from "@/components/Process";
import PosterSection from "@/components/PosterSection";
import Recycle from "@/components/Recycle";
import CompanyMoto from "@/components/CompanyMoto";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import NewArrivels from "@/components/NewArrivels";
export default function Home() {
  return (
    <div className="ml-8 xl:ml-0">
      <Main />
      <HeaderSection />
      <Logo />
      <hr />
      <AboutUs />
      <Process />
      <PosterSection />
      <Recycle />
      <NewArrivels />
      <CompanyMoto />
      <Services />
      <hr />
      <Footer />
    </div>
  );
}
