"use client";
import React, { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../../../firebase.config";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Admin() {
  const [itemName, setItemName] = useState("");
  const [sizes, setSizes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [requests, setRequests] = useState<RecyclingRequest[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();
  interface RecyclingRequest {
    id: string;
    name: string;
    email: string;
    address: string;
    shoeType: string;
    quantity: number;
    approved: boolean;
    declined: boolean;
  }
  interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    url: string;
  }

  interface Order {
    email: string;
    orderItems: OrderItem[];
  }
  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const docRef = doc(FIRESTORE_DB, "admincred", "admincred"); // Replace with actual document ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { loggedIn } = docSnap.data();
          setLoggedIn(loggedIn);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchAdminStatus();
  }, []);

  useEffect(() => {
    const userRef = collection(FIRESTORE_DB, "recyclingRequests");
    const subs = onSnapshot(userRef, {
      next: (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<RecyclingRequest, "id">),
        }));
        setRequests(users);
      },
    });

    // Cleanup subscription on unmount
    return () => subs();
  }, []);
  useEffect(() => {
    const userRef = collection(FIRESTORE_DB, "orders");
    const subs = onSnapshot(userRef, {
      next: (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Order, "id">),
        }));
        setOrders(users);
      },
    });

    // Cleanup subscription on unmount
    return () => subs();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
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
      setItemName("");
      setSizes("");
      setImageUrl("");
      setPrice("");
      setGender("");
      setCategory("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const docRef = doc(FIRESTORE_DB, "admincred", "admincred"); // Replace with actual document ID
      await updateDoc(docRef, {
        loggedIn: false,
      });
      setLoggedIn(false);
      router.push("/AdminLogin");
    } catch (error) {
      console.error("Error updating document:", error);
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
      {loggedIn && (
        <div>
          <Link href={"/Requests"}>
          <div className="absolute top-10 cursor-pointer text-black bg-white p-1 rounded-lg right-10 flex items-center">
            <span className="mr-2 text-lg font-bold ">Recycle Requests</span>
            <span className="bg-red-700 text-white p-2 rounded-full flex items-center justify-center text-sm font-bold w-6 h-6">
              {requests.length}
            </span>
          </div>
         
        </Link>
        <Link href={'/Orders'}>
         <div className="absolute top-20 cursor-pointer text-black bg-white p-1 rounded-lg m-2 right-20 flex items-center">
            <span className="mr-2 text-lg font-bold ">Orders</span>
            <span className="bg-red-700 text-white p-2 rounded-full flex items-center justify-center text-sm font-bold w-6 h-6">
              {orders.length}
            </span>
          </div>
        </Link>
        </div>
      )}

      {loggedIn ? (
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
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-600 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Add Item
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Logout
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold mb-4 text-white">
            You are not logged in.
          </p>
          <p
            onClick={() => router.push("/AdminLogin")} // Using router for navigation
            className="text-white transition duration-300 ease-in-out inline-block cursor-pointer"
          >
            Login as Admin
          </p>
        </div>
      )}
    </div>
  );
}

export default Admin;
