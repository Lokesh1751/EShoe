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
  size: number;
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
  wishlist: CartItem[];
  user: any | null;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  tprice: number;
  settprice: React.Dispatch<React.SetStateAction<number>>;
  setwishlist: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  handleDeleteCartItem: (itemIndex: number) => Promise<void>;
  handleClearCart: () => Promise<void>;
  handleOrderPlace: (address: any) => Promise<void>;
  handleAddToCart: (shoe: Shoe, sze: number) => Promise<void>;
  handleAddToWishlist: (shoe: Shoe) => Promise<void>;
  handleDeletewishlistitem: (itemId: string) => Promise<void>;
}

export const UserContext = createContext<CartContextProps | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any | null>(null);
  const [wishlist, setwishlist] = useState<CartItem[]>([]);
  const [tprice, settprice] = useState(0);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
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
              const { name, price, url, quantity = 1, size } = item; // Include size here
              const cartItem: CartItem = {
                id: doc.id,
                name,
                price: Number(price),
                quantity,
                url,
                size, // Include size here
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

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        if (user && user.email) {
          const q = query(
            collection(FIRESTORE_DB, "wishlist"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);

          const wishlistItemsData: CartItem[] = [];
          querySnapshot.forEach((doc) => {
            const { items } = doc.data();
            items.forEach((item: any) => {
              const { id, name, price, url } = item;
              const wishlistItem: any = {
                id,
                name,
                price: Number(price),
                quantity: 1,
                url,
              };
              wishlistItemsData.push(wishlistItem);
            });
          });

          setwishlist(wishlistItemsData);
        }
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchWishlistItems();
  }, [user]);

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    settprice(totalPrice);
  }, [cartItems]);

  const handleAddToCart = async (shoe: Shoe, sze: number) => {
    try {
      if (!user || !user.email) {
        throw new Error("User not authenticated.");
      }

      const db = FIRESTORE_DB;
      const cartRef = doc(db, "carts", user.email);

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
        quantity: 1,
        addedAt: new Date().toISOString(),
        size: sze,
      };

      updatedCartItems.push(newItem);

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
        const cartSnapshot = await getDoc(cartRef);

        if (cartSnapshot.exists()) {
          const cartData = cartSnapshot.data();
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
        settprice(0); // Reset total price
        console.log("Cart cleared successfully.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleOrderPlace = async (address: any) => {
    try {
      await addDoc(collection(FIRESTORE_DB, "orders"), {
        orderItems: cartItems,
        email: user.email,
        price: tprice,
        orderaddress: address,
      });
      alert("Order Placed Successfully!!");
      handleClearCart();
      settprice(0);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleAddToWishlist = async (shoe: Shoe) => {
    try {
      if (!user || !user.email) {
        throw new Error("User not authenticated.");
      }

      const db = FIRESTORE_DB;
      const wishlistRef = doc(db, "wishlist", user.email);

      const wishlistSnapshot = await getDoc(wishlistRef);
      let updatedWishlistItems: any[] = [];

      if (wishlistSnapshot.exists()) {
        const wishlistData = wishlistSnapshot.data();
        updatedWishlistItems = wishlistData.items || [];
      }

      const newItem = {
        id: shoe.id,
        name: shoe.name,
        url: shoe.url,
        price: Number(shoe.price),
        quantity: 1,
        addedAt: new Date().toISOString(),
      };

      updatedWishlistItems.push(newItem);

      await setDoc(wishlistRef, {
        email: user.email,
        items: updatedWishlistItems,
      });

      setwishlist(updatedWishlistItems);
      alert("Item added to wishlist!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      alert("Failed to add item to wishlist. Please Login First.");
    }
  };

  const handleDeletewishlistitem = async (itemId: string) => {
    try {
      if (user && user.email) {
        const wishlistRef = doc(FIRESTORE_DB, "wishlist", user.email);
        const wishlistSnapshot = await getDoc(wishlistRef);

        if (wishlistSnapshot.exists()) {
          const wishlistData = wishlistSnapshot.data();
          const updatedItems = wishlistData.items.filter(
            (item: any) => item.id !== itemId
          );

          await setDoc(wishlistRef, { ...wishlistData, items: updatedItems });

          setwishlist(updatedItems);
          alert("Item deleted from wishlist!");
          console.log(
            `Item with ID ${itemId} deleted successfully from wishlist.`
          );
        }
      }
    } catch (error) {
      console.error("Error deleting item from wishlist:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        cartItems,
        setCartItems,
        wishlist,
        user,
        tprice,
        settprice,
        setUser,
        setwishlist,
        handleAddToCart,
        handleDeleteCartItem,
        handleClearCart,
        handleOrderPlace,
        handleAddToWishlist,
        handleDeletewishlistitem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
