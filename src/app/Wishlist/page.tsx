"use client";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";

const Cart: React.FC = () => {
  const cartContext = useContext(UserContext);

  if (!cartContext) {
    return <div>Loading...</div>;
  }

  const { wishlist, handleDeletewishlistitem } = cartContext;

  return (
    <div className="cart-container max-w-6xl mx-auto p-4">
      {wishlist.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
          <ul>
            {wishlist.map((item) => (
              <li
                key={item.id} // Ensure item.id is unique for each item
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                  onClick={() => handleDeletewishlistitem(item.id)} // Assuming item.id uniquely identifies each item
                >
                  <FaTrash className="text-lg" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/026/442/original/empty-shopping-cart-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
            alt="Empty Wishlist"
            className="w-[500px] h-[500px]"
          />
          <p className="text-3xl font-bold">Wishlist is Empty!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
