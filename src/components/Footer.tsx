import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-[#F1F1EF] flex flex-wrap gap-10 flex-row   p-10 xl:justify-between">
      <div className="flex flex-col gap-9">
        <h1 className="text-3xl">Eshoe</h1>
        <p className="text-lg text-gray-400 w-[320px] ">
          Praesent eget tortor sit risus egestas nulla pharetra ornare quis
          bibendum est bibendum sapien proin nascetur
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">Shop</h1>
        <Link href={"/Men"}>
          {" "}
          <p className="text-lg text-gray-400 w-[400px] ">Shop Men</p>
        </Link>
        <Link href={"/Women"}>
          <p className="text-lg text-gray-400 w-[400px] ">Shop Women</p>
        </Link>
        <Link href={"/Login"}>
          {" "}
          <p className="text-lg text-gray-400 w-[400px] ">Login</p>
        </Link>
        <Link href={"/Contact"}>
          <p className="text-lg text-gray-400 w-[400px] ">Contact Us</p>
        </Link>
      </div>
      <div className="flex flex-col gap-9 ">
        <p className="text-gray-400">
          {" "}
          © 2024 Recycled Shoe Store. Powered by Recycled Shoe Store.{" "}
        </p>
        <div>
          <img
            src="https://websitedemos.net/recycled-shoe-store/wp-content/uploads/sites/983/2021/11/payment-icons.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
