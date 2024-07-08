"use client";
import React, { createContext, useState, useEffect } from "react";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  url: string;
}

interface Shoe {
  id: string;
  name: string;
  url: string;
  url2: string;
  url3: string;
  price: string;
  sizes: string;
  gender: string;
  category: string;
  desc: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleDeleteCartItem: (itemIndex: number) => Promise<void>;
  handleClearCart: () => Promise<void>;
  handleOrderPlace: () => Promise<void>;
  handleAddToCart: (shoe: Shoe) => Promise<void>;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
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

  const handleAddToCart = async (shoe: Shoe) => {
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
        id: shoe.id,
        name: shoe.name,
        url: shoe.url,
        price: Number(shoe.price),
        quantity: 1, // Set default quantity to 1
        addedAt: new Date().toISOString(),
      };

      updatedCartItems.push(newItem); // Add new item to local array

      await setDoc(cartRef, {
        email: user.email,
        items: updatedCartItems,
      });

      setCartItems(updatedCartItems);
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart. Please Login First.");
    }
  };

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

  const handleOrderPlace = async () => {
    try {
      await addDoc(collection(FIRESTORE_DB, "orders"), {
        orderItems: cartItems,
        email: user.email,
      });
      alert("Order Placed Successfully!!");
      handleClearCart();
      setCartItems([]);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        handleAddToCart,
        handleDeleteCartItem,
        handleClearCart,
        handleOrderPlace,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
