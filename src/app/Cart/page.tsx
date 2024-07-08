"use client";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { CartContext } from "@/context/CartContext";

const Cart: React.FC = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <div>Loading...</div>;
  }

  const { cartItems, handleDeleteCartItem, handleClearCart, handleOrderPlace } =
    cartContext;

  return (
    <div className="cart-container max-w-6xl mx-auto p-4">
      {cartItems.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li
                key={item.id + index} // Use unique key for each item
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
                  onClick={() => handleDeleteCartItem(index)} // Pass index to delete only this item
                >
                  <FaTrash className="text-lg" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-5">
            <button
              className="bg-red-600 p-2 rounded-xl text-white text-l mt-6 cursor-pointer"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button
              className="bg-red-600 p-2 rounded-xl text-white text-l mt-6 cursor-pointer"
              onClick={handleOrderPlace}
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/026/442/original/empty-shopping-cart-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
            alt=""
            className="w-[500px] h-[500px]"
          />
          <p className="text-3xl font-bold">Cart is Empty!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
