import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebase.config";

interface Shoe {
  id: string;
  name: string;
  url: string;
  price: string;
  gender: string;
  sizes: string;
  category: string;
}

interface ShoeCardProps {
  shoe: Shoe;
}

function ShoeCard({ shoe }: ShoeCardProps) {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleAddToCart = async () => {
    try {
      if (!user || !user.email) {
        throw new Error("User not authenticated.");
      }

      const db = FIRESTORE_DB;
      const cartRef = doc(db, "carts", user.email);

      // Fetch current cart items from Firestore and update with new item
      const cartSnapshot = await getDoc(cartRef);
      let updatedCartItems: any[] = [];

      if (cartSnapshot.exists()) {
        const cartData = cartSnapshot.data();
        updatedCartItems = cartData.items || [];
      }

      const newItem = {
        name: shoe.name,
        url: shoe.url,
        price: shoe.price,
        addedAt: new Date().toISOString(),
      };

      updatedCartItems.push(newItem); // Add new item to local array

      await setDoc(cartRef, {
        email: user.email,
        items: updatedCartItems,
      });

      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart. Please Login First.");
    }
  };

  if (!shoe) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 w-full sm:w-80 md:w-96">
      <img
        src={shoe.url}
        alt={shoe.name}
        className="w-full h-[300px] object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{shoe.name}</h2>

        <button
          onClick={handleAddToCart}
          className="mt-4 bg-gradient-to-r from-blue-400 to-purple-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ShoeCard;
