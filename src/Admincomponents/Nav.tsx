"use client";
import React from "react";
import Link from "next/link";
import {
  MdAssignment,
  MdShoppingCart,
  MdPerson,
  MdPlaylistAdd,
  MdTag,
  MdAddBox,
} from "react-icons/md";

function SideNav() {
  const iconStyles = [
    { color: "#3498db", size: 40 },
    { color: "#2ecc71", size: 40 },
    { color: "#e74c3c", size: 40 },
    { color: "#9b59b6", size: 40 },
    { color: "#f39c12", size: 40 },
    { color: "#e67e22", size: 40 },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-4  justify-center">
      <div className="flex gap-4 w-full">
        <Link
          href="/AddItem"
          className="text-2xl font-bold flex flex-col items-center bg-white p-6 rounded shadow-md flex-1 hover:bg-gray-100 transition"
          style={{ flexBasis: "calc(50% - 0.5rem)" }}
        >
          <MdAddBox style={iconStyles[0]} size={43} />
          <span>Add Item</span>
        </Link>
        <Link
          href="/CurrentItems"
          className="text-2xl font-bold flex flex-col items-center bg-white p-6 rounded shadow-md flex-1 hover:bg-gray-100 transition"
          style={{ flexBasis: "calc(50% - 0.5rem)" }}
        >
          <MdPlaylistAdd style={iconStyles[1]} size={43} />
          <span>Items</span>
        </Link>
      </div>
      <div className="flex gap-4 w-full">
        <Link
          href="/Orders"
          className="text-2xl font-bold flex flex-col items-center bg-white p-6 rounded shadow-md flex-1 hover:bg-gray-100 transition"
          style={{ flexBasis: "calc(50% - 0.5rem)" }}
        >
          <MdShoppingCart style={iconStyles[2]} size={43} />
          <span>Orders</span>
        </Link>
        <Link
          href="/Profile"
          className="text-2xl font-bold flex flex-col items-center bg-white p-6 rounded shadow-md flex-1 hover:bg-gray-100 transition"
          style={{ flexBasis: "calc(50% - 0.5rem)" }}
        >
          <MdPerson style={iconStyles[3]} size={43} />
          <span>Profile</span>
        </Link>
      </div>
      <div className="flex gap-4 w-full">
        <Link
          href="/Requests"
          className="text-2xl font-bold flex flex-col items-center bg-white p-6 rounded shadow-md flex-1 hover:bg-gray-100 transition"
          style={{ flexBasis: "calc(50% - 0.5rem)" }}
        >
          <MdAssignment style={iconStyles[4]} size={43} />
          <span>Requests</span>
        </Link>
        <Link
          href="/Coupons"
          className="text-2xl font-bold flex flex-col items-center bg-white p-6 rounded shadow-md flex-1 hover:bg-gray-100 transition"
          style={{ flexBasis: "calc(50% - 0.5rem)" }}
        >
          <MdTag style={iconStyles[5]} size={43} />
          <span>Add Coupons</span>
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
