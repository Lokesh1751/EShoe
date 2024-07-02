"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../firebase.config";
import { FaTrash } from "react-icons/fa";

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
              const { name, price, url, quantity = 1 } = item;
              const cartItem: CartItem = {
                id: doc.id,
                name,
                price: Number(price),
                quantity,
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
        const cartRef = doc(FIRESTORE_DB, "carts", user.email);
        const cartSnapshot = await getDocs(
          query(
            collection(FIRESTORE_DB, "carts"),
            where("email", "==", user.email)
          )
        );

        if (!cartSnapshot.empty) {
          const cartDoc = cartSnapshot.docs[0];
          const cartData = cartDoc.data();

          const updatedItems = cartData.items.filter(
            (_: any, index: any) => index !== itemIndex
          );

          await setDoc(cartRef, { ...cartData, items: updatedItems });

          setCartItems(updatedItems);
          console.log(`Item at index ${itemIndex} deleted successfully.`);
        }
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      if (user && user.email) {
        const q = query(
          collection(FIRESTORE_DB, "carts"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map((doc) =>
          deleteDoc(doc.ref)
        );
        await Promise.all(deletePromises);

        setCartItems([]);
        console.log("Cart cleared successfully.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

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
          <button
            className="bg-red-600 p-2 rounded-xl text-white text-l mt-6 cursor-pointer"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/026/442/original/empty-shopping-cart-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
            alt=""
            className="w-[500px] h-[500px]"
          />{" "}
          <p className=" text-3xl font-bold">Cart is Empty!</p>{" "}
        </div>
      )}
    </div>
  );
};

export default Cart;
