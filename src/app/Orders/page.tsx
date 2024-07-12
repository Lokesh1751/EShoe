"use client";
import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "@/context/AdminContext";
import { FIRESTORE_DB } from "../../../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  url: string;
}

interface Order {
  id: string;
  email: string;
  orderItems: OrderItem[];
  price: number; // Ensure price is included
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true); // Separate loading state

  const adminContext = useContext(AdminContext);

  if (!adminContext) {
    return null; // Return null if context is not available
  }

  const { loggedIn, loading, setLoading } = adminContext;

  useEffect(() => {
    if (!loggedIn) {
      setLoadingOrders(false); // If not logged in as admin, stop loading orders
      return;
    }

    const ordersRef = collection(FIRESTORE_DB, "orders");
    const subs = onSnapshot(ordersRef, {
      next: (snapshot) => {
        const updatedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          orderItems: doc.data().orderItems,
          price: doc.data().price, // Fetch the price from Firestore
        })) as Order[];
        console.log("Fetched Orders:", updatedOrders); // Debugging line
        setLoading(false);
        setLoadingOrders(false); // Stop loading orders once fetched
        setOrders(updatedOrders);
      },
      error: (error) => {
        console.error("Error fetching orders:", error);
        setLoading(false); // Set loading to false even on error
        setLoadingOrders(false); // Stop loading orders on error
      },
    });

    // Cleanup subscription on unmount
    return () => subs();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div
        className="w-screen h-screen flex items-center justify-center text-white text-2xl font-bold"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        You are not logged in as admin. Please login as admin.
      </div>
    );
  }

  if (loadingOrders) {
    return (
      <div
        className="w-screen h-screen flex items-center justify-center text-white font-bold text-3xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen p-10 flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-2xl font-bold mb-4 text-white">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 bg-white rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">
                Ordered by: {order.email}
              </h2>
              <ul className="flex flex-col gap-4">
                {order.orderItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex flex-col">
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-gray-600">Price: ₹{item.price}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-red-500 mt-2 font-bold">
                Total Price: ₹{order.price}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white">No orders available.</p>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
