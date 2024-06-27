import React from 'react';

interface Shoe {
  shoe: {
    id: string;
    name: string;
    url: string;
    price: string;
    gender:string
  };
}

function ShoeCard({ shoe }: Shoe) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 w-full sm:w-80 md:w-96">
      <img src={shoe.url} alt={shoe.name} className="w-full h-[300px] object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{shoe.name}</h2>
        <p className="text-gray-600">${shoe.price}</p>
        <p className="text-gray-600">{shoe.gender}</p>
      </div>
    </div>
  );
}

export default ShoeCard;
