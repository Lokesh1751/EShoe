"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebase.config";

const RecyclingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    shoeType: "",
    quantity: 1,
    instructions: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(
        collection(FIRESTORE_DB, "recyclingRequests"),
        formData
      );
      console.log("Recycling request submitted with ID: ", docRef.id);
      // Optionally, provide feedback to the user about successful submission
    } catch (error) {
      console.error("Error submitting recycling request: ", error);
      // Handle error feedback to the user
    }
  };

  return (
    <div
      className="w-screen relative h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white p-12 rounded-xl w-[500px]">
        <h2 className="text-2xl font-bold mb-4">Recycling Request Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="shoeType"
              className="block text-sm font-medium text-gray-700"
            >
              Shoe Type
            </label>
            <input
              type="text"
              id="shoeType"
              name="shoeType"
              value={formData.shoeType}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min={1}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-700"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={3}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-purple-600 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecyclingForm;
