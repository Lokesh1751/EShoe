"use client";
import React, { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../../../firebase.config"; // Adjust the path to your Firebase configuration
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function Page() {
  const [items, setItems] = useState<Shoe[]>([]);
  const [editItem, setEditItem] = useState<Shoe | null>(null); // State to hold item being edited

  interface Shoe {
    id: string;
    name: string;
    url: string;
    price: string;
    desc: string;
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "items"));
        const fetchedItems: Shoe[] = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() } as Shoe);
        });
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (itemId: string) => {
    try {
      await deleteDoc(doc(FIRESTORE_DB, "items", itemId));
      setItems(items.filter((item) => item.id !== itemId));
      console.log("Item successfully deleted!");
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const handleEdit = (item: Shoe) => {
    setEditItem(item); // Set the item to be edited
  };

  const handleSaveEdit = async (
    itemId: string,
    newName: string,
    newPrice: string,
    newDesc: string
  ) => {
    try {
      await updateDoc(doc(FIRESTORE_DB, "items", itemId), {
        name: newName,
        price: newPrice,
        desc: newDesc,
      });
      setItems(
        items.map((item) =>
          item.id === itemId
            ? { ...item, name: newName, price: newPrice, desc: newDesc }
            : item
        )
      );
      setEditItem(null); // Clear the edit state
      console.log("Item successfully updated!");
    } catch (error) {
      console.error("Error updating item: ", error);
    }
  };

  return (
    <div
      className="w-full relative h-full p-10 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-3xl text-white  font-bold mb-4">Items List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md h-[400px]  rounded-lg p-4"
          >
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <img
              src={item.url}
              alt={item.name}
              className="mb-2 rounded-lg"
              style={{ width: "100%", height: "60%" }}
            />
            <p className="text-gray-700 mb-2">Price: ${item.price}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                <AiOutlineEdit size={24} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                <AiOutlineDelete size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editItem && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2">Edit Shoe Item</h2>
            <input
              type="text"
              value={editItem.name}
              onChange={(e) =>
                setEditItem({ ...editItem, name: e.target.value })
              }
              className="mb-2 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={editItem.price}
              onChange={(e) =>
                setEditItem({ ...editItem, price: e.target.value })
              }
              className="mb-2 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={editItem.desc}
              onChange={(e) =>
                setEditItem({ ...editItem, desc: e.target.value })
              }
              className="mb-2 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() =>
                  handleSaveEdit(
                    editItem.id,
                    editItem.name,
                    editItem.price,
                    editItem.desc
                  )
                }
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditItem(null)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
