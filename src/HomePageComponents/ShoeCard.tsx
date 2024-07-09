import React, { useContext } from "react";
import Link from "next/link";

interface Shoe {
  id: string;
  name: string;
  url: string;
  url2: string;
  url3: string;
  price: string;
  sizes: string;
  gender: string;
  category: string;
  desc: string;
}

interface ShoeCardProps {
  shoe: Shoe;
}

function ShoeCard({ shoe }: ShoeCardProps) {
  if (!shoe) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg h-[460px] overflow-hidden transform transition duration-300 hover:scale-105 w-full sm:w-80 md:w-96">
      <img
        src={shoe.url}
        alt={shoe.name}
        className="w-full h-[300px] object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{shoe.name}</h2>
        <h2 className="text-xl text-red-700 font-bold mb-2">
          Price: ₹{shoe.price}
        </h2>
        <div className="flex justify-between items-center">
          <Link href={`/Itemdetails/${shoe.id}`}>
            <p className="mt-4 text-gray-600 hover:text-gray-900 font-bold rounded focus:outline-none focus:shadow-outline">
              See More
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShoeCard;
