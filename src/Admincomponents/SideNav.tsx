"use client";
import React, { useContext } from "react";
import Link from "next/link";
import {
  MdAssignment,
  MdShoppingCart,
  MdPerson,
  MdPlaylistAdd,
  MdTag,
} from "react-icons/md";
import { AdminContext } from "@/context/AdminContext";

function SideNav() {
  const adminContext = useContext(AdminContext);
  if (!adminContext) return null;

  const { handleLogout } = adminContext;

  return (
    <div className="bg-white  shadow-md rounded-lg p-6">
      <div className="flex flex-wrap gap-16 justify-evenly items-center">
        <Link
          href="/CurrentItems"
          className="text-2xl font-bold flex items-center text-gray-800 hover:text-blue-600 transition"
        >
          <MdPlaylistAdd className="mr-2" /> Items
        </Link>
        <Link
          href="/Orders"
          className="text-2xl font-bold flex items-center text-gray-800 hover:text-blue-600 transition"
        >
          <MdShoppingCart className="mr-2" /> Orders
        </Link>
        <Link
          href="/Profile"
          className="text-2xl font-bold flex items-center text-gray-800 hover:text-blue-600 transition"
        >
          <MdPerson className="mr-2" /> Profile
        </Link>
        <Link
          href="/Requests"
          className="text-2xl font-bold flex items-center text-gray-800 hover:text-blue-600 transition"
        >
          <MdAssignment className="mr-2" /> Requests
        </Link>
        <Link
          href="/Coupons"
          className="text-2xl font-bold flex items-center text-gray-800 hover:text-blue-600 transition"
        >
          <MdTag className="mr-2" /> Add Coupan
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideNav;
