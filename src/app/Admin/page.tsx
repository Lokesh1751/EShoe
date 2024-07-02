"use client";
import React, { useState } from "react";
import { FIRESTORE_DB } from "../../../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

function Admin() {
  const [itemName, setItemName] = useState("");
  const [sizes, setSizes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [category, setcategory] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Logging input values for debugging
      console.log("Submitting with:", {
        itemName,
        sizes,
        imageUrl,
        price,
        gender,
      });

      const docRef = await addDoc(collection(FIRESTORE_DB, "items"), {
        name: itemName,
        price: price,
        sizes: sizes,
        url: imageUrl,
        gender: gender,
        category: category,
      });
      alert("Item added Successfully!!");
      console.log("Item added with ID:", docRef.id);
      // Optionally reset state after successful submission
      setItemName("");
      setSizes("");
      setImageUrl("");
      setPrice("");
      setGender("");
      setcategory("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div
      className="w-screen relative h-screen p-10 flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link href={"/"}>
        <div className="absolute top-10 left-10">
          <FaHome size={34} color="white" />
        </div>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-100 rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl mb-4 text-center">Add New Shoe Item</h2>
        <div className="mb-4">
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-700"
          >
            Shoe Name:
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="sizes"
            className="block text-sm font-medium text-gray-700"
          >
            Sizes Available:
          </label>
          <input
            type="text"
            id="sizes"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL:
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender:
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category:
          </label>
          <select
            id="Category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Category</option>
            <option value="Athletic">Athletic</option>
            <option value="Casual">Casual</option>
            <option value="Dress">Dress</option>
            <option value="Boots">Boots</option>
            <option value="Sandals">Sandals</option>
            <option value="Specialty">Specialty</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Formal">Formal</option>
            <option value="Sneakers">Sneakers</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-400 to-purple-600 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default Admin;
