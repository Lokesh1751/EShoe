import React from "react";
import Link from "next/link";
import {
  MdAssignment,
  MdShoppingCart,
  MdPerson,
  MdPlaylistAdd,
} from "react-icons/md";

function SideNav() {
  return (
    <div>
      <div className="bg-white flex flex-wrap gap-8 justify-evenly items-center w-screen p-6">
        <Link
          href={"/CurrentItems"}
          className="text-2xl font-bold flex items-center"
        >
          <MdPlaylistAdd className="mr-2" /> Items
        </Link>
        <Link href={"/Orders"} className="text-2xl font-bold flex items-center">
          <MdShoppingCart className="mr-2" /> Orders
        </Link>
        <Link
          href={"/Profile"}
          className="text-2xl font-bold flex items-center"
        >
          <MdPerson className="mr-2" /> Profile
        </Link>
        <Link
          href={"/Requests"}
          className="text-2xl font-bold flex items-center"
        >
          <MdAssignment className="mr-2" /> Requests
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
