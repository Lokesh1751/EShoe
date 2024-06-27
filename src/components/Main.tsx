import React, { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col p-10 xl:flex-row xl:justify-between space-y-3 xl:space-y-0">
      <div className="flex flex-row justify-between items-center w-full xl:w-auto">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl">EShoe</h1>
          <img
            src="https://img.freepik.com/premium-photo/single-continuous-line-drawing-safety-hiking-boots_804788-5097.jpg"
            className="w-14 h-12"
            alt="Eshoe logo"
          />
        </div>
        <div className="xl:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-500 focus:outline-none"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col space-y-6 xl:space-y-0 xl:space-x-6 xl:flex xl:flex-row items-center w-full xl:w-auto mt-4 xl:mt-0`}
      >
        <p className="text-gray-500 cursor-pointer">Men</p>
        <p className="text-gray-500 cursor-pointer">Women</p>
        <p className="text-gray-500 cursor-pointer">Kids</p>
      </div>

      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col space-y-6 xl:space-y-0 xl:space-x-10 xl:flex xl:flex-row items-center w-full xl:w-auto mt-4 xl:mt-0`}
      >
        <p className="text-gray-500 cursor-pointer">Login</p>
        <p className="text-gray-500 cursor-pointer">Contact</p>
        <div className="flex gap-2 text-gray-500 rounded-full cursor-pointer">
          <FaShoppingCart size={24} /> <p>Cart</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
