import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-[#F1F1EF] flex flex-wrap gap-10 flex-row p-6 md:p-10 xl:p-14 justify-between">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl">Eshoe</h1>
        <p className="text-lg text-gray-400 max-w-[320px]">
          Eshoe Company is dedicated to sustainable practices, including the
          recycling of shoes. We believe in minimizing waste and maximizing
          resources by refurbishing and repurposing footwear.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl">Shop</h1>
        <Link href={"/Men"}>
          <p className="text-lg text-gray-400">Shop Men</p>
        </Link>
        <Link href={"/Women"}>
          <p className="text-lg text-gray-400">Shop Women</p>
        </Link>
        <Link href={"/Login"}>
          <p className="text-lg text-gray-400">Login</p>
        </Link>
        <Link href={"/FeedBacks"}>
          <p className="text-lg text-gray-400">FeedBacks</p>
        </Link>
        <Link href={"/Recycle"}>
          <p className="text-lg text-gray-400">Recycle Request</p>
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-lg text-gray-400 max-w-[320px]">
          © 2024 Recycled Shoe Store. All rights reserved. Designed and Powered
          by Recycled Shoe Store, dedicated to sustainable practices in footwear
          innovation and recycling, making every step count towards a greener
          future.
        </p>
        <div>
          <img
            src="https://websitedemos.net/recycled-shoe-store/wp-content/uploads/sites/983/2021/11/payment-icons.png"
            alt="Payment Icons"
            className="w-[240px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
