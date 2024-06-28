"use client"
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../firebase.config";
import { FaTrash } from 'react-icons/fa';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  url: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Unsubscribe when component unmounts
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user && user.email) {
          const q = query(
            collection(FIRESTORE_DB, "carts"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);

          const cartItemsData: CartItem[] = [];
          querySnapshot.forEach((doc) => {
            const { items } = doc.data();
            items.forEach((item: any) => {
              const { name, price, url } = item;
              const cartItem: CartItem = {
                id: doc.id,
                name,
                price: Number(price),
                quantity: 1,
                url,
              };
              cartItemsData.push(cartItem);
            });
          });

          setCartItems(cartItemsData);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  const handleDeleteCartItem = async (itemIndex: number) => {
    try {
      if (user && user.email) {
        const itemIdToDelete = cartItems[itemIndex].id; // Get ID of item to delete
        await deleteDoc(doc(FIRESTORE_DB, "carts", itemIdToDelete)); // Delete item from Firestore

        // Update local state to reflect deletion
        const updatedCartItems = cartItems.filter((item, index) => index !== itemIndex);
        setCartItems(updatedCartItems);

        console.log(`Item at index ${itemIndex} deleted successfully.`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="cart-container max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4">
            <div className="flex items-center space-x-4">
              <img src={item.url} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
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
    </div>
  );
};

export default Cart;
