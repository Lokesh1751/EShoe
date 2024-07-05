"use client";
import React, { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../../../firebase.config";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";

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
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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
    const ordersRef = collection(FIRESTORE_DB, "orders");
    const subs = onSnapshot(ordersRef, {
      next: (snapshot) => {
        const updatedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          orderItems: doc.data().orderitems, // Adjust this based on your Firestore structure
        })) as Order[];
        setLoading(false);
        setOrders(updatedOrders);
      },
    });

    // Cleanup subscription on unmount
    return () => subs();
  }, []);

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
  if (loading) {
    return (
      <div
        className="w-screen relative h-screen p-10 flex items-center justify-center text-white font-bold text-3xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        Loading...
      </div>
    ); // Render loading indicator while fetching data
  }
  return (
    <div
      className="w-screen relative h-screen p-10 flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-2xl font-bold mb-4 text-white">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
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
                    <p className="text-gray-600">Price: ${item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
