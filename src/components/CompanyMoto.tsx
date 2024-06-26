import React from "react";

function CompanyMoto() {
  return (
    <div
      className="w-full h-[500px] mr-4 p-14 md:p-8 gap-4 flex flex-col justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D)`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-white text-3xl text-center mb-8">
        Step into sustainable style with Eshoe: Redefining footwear with
        eco-friendly innovation and timeless design
      </h1>
      <div className="flex flex-col md:flex-row gap-20">
        <ul className="flex flex-col gap-4 list-disc md:gap-0">
          <li className="text-white text-xl">Commitment to Sustainability</li>
          <li className="text-white text-xl">Customer-Centric Approach</li>
        </ul>
        <ul className="flex flex-col list-disc gap-4 md:gap-0">
          <li className="text-white text-xl">Innovation in Design</li>
          <li className="text-white text-xl">Continuous Improvement</li>
        </ul>
      </div>
    </div>
  );
}

export default CompanyMoto;
