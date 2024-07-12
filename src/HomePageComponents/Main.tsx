"use client";
import React, { useState, useEffect, useContext } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { FIREBASE_AUTH } from "../../firebase.config";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cont = useContext(UserContext);

  if (!cont) {
    return null;
  }

  const { user, setUser, cartItems, wishlist } = cont;

  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();

      alert("Logged out successfully.");
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    }
  };

  return (
    <div className="flex flex-col p-4 xl:flex-row xl:justify-between space-y-3 xl:space-y-0 xl:p-3">
      <div className="flex flex-row justify-between items-center w-full cursor-pointer xl:w-auto">
        <Link href={"/"}>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl xl:text-4xl">EShoe</h1>
            <img
              src="https://img.freepik.com/premium-photo/single-continuous-line-drawing-safety-hiking-boots_804788-5097.jpg"
              className="w-14 h-12 xl:w-16 xl:h-20"
              alt="Eshoe logo"
            />
          </div>
        </Link>
        <div className="flex  items-center gap-5 ml-4 xl:ml-10">
          <Link href={user ? "/Wishlist" : "/Login"}>
            <div className="relative">
              <p className="flex items-center gap-1 text-gray-500 rounded-full cursor-pointer">
                <FaHeart size={24} />
                {wishlist.length > 0 && user && (
                  <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {wishlist.length}
                  </span>
                )}
              </p>
            </div>
          </Link>
          <Link href={user ? "/Cart" : "/Login"}>
            <div className="relative">
              <p className="flex items-center gap-1 text-gray-500 rounded-full cursor-pointer">
                <FaShoppingCart size={24} />
                {cartItems.length > 0 && user && (
                  <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </p>
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-500 focus:outline-none xl:hidden"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col space-y-6 xl:space-y-0 xl:space-x-10 xl:flex xl:flex-row items-center w-full xl:w-auto mt-4 xl:mt-0`}
      >
        <div className="flex items-center mr-[0px] flex-col gap-5 cursor-pointer xl:flex-row xl:mr-[330px] xl:gap-12">
          <Link href={"/Men"}>
            {" "}
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Men
            </span>
          </Link>
          <Link href={"/Women"}>
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Women
            </span>
          </Link>
          <Link href={"/Kids"}>
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Kids
            </span>
          </Link>
        </div>
        {user ? (
          <div className="flex items-center space-x-2"   onClick={() => setMenuOpen(!menuOpen)}>
            <div className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl">
              {user.email.slice(0, 1).toUpperCase()}
            </div>
            <button
              onClick={handleSignOut}
              className="text-gray-500 cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-500 cursor-pointer"   onClick={() => setMenuOpen(!menuOpen)}>
            <Link href={"/Login"}>Login</Link>
          </p>
        )}
        <p
          className="text-gray-500 cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          <Link href={"/FeedBacks"}>FeedBacks</Link>
        </p>
      </div>
    </div>
  );
}

export default Home;
