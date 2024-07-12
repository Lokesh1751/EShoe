"use client";
import React, { useContext, useState } from "react";
import { AdminContext } from "@/context/AdminContext";
import { FIRESTORE_DB } from "../../../firebase.config";
import { addDoc, collection } from "firebase/firestore";

function Page() {
  const adminContext = useContext(AdminContext);
  if (!adminContext) return null;

  const { loggedIn, loading } = adminContext;
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [minPrice, setMinPrice] = useState("");

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission
    try {
      await addDoc(collection(FIRESTORE_DB, "coupans"), {
        coupancode: couponCode,
        discount: discount,
        minprice: minPrice,
      });
      // Clear the input fields after adding
      setCouponCode("");
      setDiscount("");
      setMinPrice("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (loading) {
    return (
      <div
        className="w-screen h-screen flex justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-white text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div
        className="w-screen h-screen flex items-center justify-center text-white text-2xl font-bold"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        You are not logged in as admin. Please login as admin.
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        className="bg-white p-12 rounded-lg shadow-lg flex flex-col space-y-4"
        onSubmit={handleAdd}
      >
        <h2 className="text-center text-xl font-bold text-gray-800">
          Add Coupon
        </h2>

        <div>
          <label htmlFor="couponCode" className="block text-gray-700">
            Coupon Code
          </label>
          <input
            type="text"
            id="couponCode"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter coupon code"
            required
          />
        </div>

        <div>
          <label htmlFor="discount" className="block text-gray-700">
            Discount
          </label>
          <input
            type="text"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter discount"
            required
          />
        </div>

        <div>
          <label htmlFor="minPrice" className="block text-gray-700">
            Min Price
          </label>
          <input
            type="text"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter minimum price"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-blue-400 to-purple-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Page;
