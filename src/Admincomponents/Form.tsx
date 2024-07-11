// components/Form.tsx
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebase.config";

const Form: React.FC = () => {
  const [itemName, setItemName] = useState("");
  const [sizes, setSizes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "items"), {
        name: itemName,
        price: price,
        sizes: sizes,
        url: imageUrl,
        url2: imageUrl2,
        url3: imageUrl3,
        gender: gender,
        category: category,
        desc: desc,
      });
      alert("Item added Successfully!!");
      console.log("Item added with ID:", docRef.id);
      setItemName("");
      setSizes("");
      setImageUrl("");
      setImageUrl2("");
      setImageUrl3("");
      setPrice("");
      setGender("");
      setCategory("");
      setDesc("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full m-4  bg-gray-100 rounded-lg shadow-lg p-6"
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
          htmlFor="imageUrl2"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL 2:
        </label>
        <input
          type="url"
          id="imageUrl2"
          value={imageUrl2}
          onChange={(e) => setImageUrl2(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="imageUrl3"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL 3:
        </label>
        <input
          type="url"
          id="imageUrl3"
          value={imageUrl3}
          onChange={(e) => setImageUrl3(e.target.value)}
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
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

      <div className="mb-4">
        <label
          htmlFor="desc"
          className="block text-sm font-medium text-gray-700"
        >
          Description:
        </label>
        <textarea
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-400 to-purple-600 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Add Item
      </button>
    </form>
  );
};

export default Form;
