"use client";
import React, { useState, useEffect } from "react";
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
  email: string;
  orderItems: OrderItem[];
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const userRef = collection(FIRESTORE_DB, "orders");
    const subs = onSnapshot(userRef, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Order, "id">),
      }));
      setOrders(users);

      // Calculate the total amount
      let total = 0;
      users.forEach((order) => {
        if (order.orderItems) {
          order.orderItems.forEach((item) => {
            total += item.price * item.quantity;
          });
        }
      });
      setTotalAmount(total);
    });

    // Cleanup subscription on unmount
    return () => subs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h2 className="text-xl mb-2">{order.email}</h2>
            <ul>
              {order.orderItems &&
                order.orderItems.map((item, idx) => (
                  <li key={idx} className="mb-2">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-24 h-24 object-cover mb-2"
                    />
                    <p>{item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Total Amount: ${totalAmount}</h2>
      </div>
    </div>
  );
}

export default OrdersPage;
