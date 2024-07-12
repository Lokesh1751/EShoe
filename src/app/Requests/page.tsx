"use client";
import React, { useState, useEffect, useContext } from "react";
import { FIRESTORE_DB } from "../../../firebase.config";
import { AdminContext } from "@/context/AdminContext";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

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

function Page() {
  const [requests, setRequests] = useState<RecyclingRequest[]>([]);
  const adminContext = useContext(AdminContext);
  if (!adminContext) {
    return;
  }
  const { loggedIn, loading } = adminContext;

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

  const handleApprove = async (id: string) => {
    try {
      const docRef = doc(FIRESTORE_DB, "recyclingRequests", id);
      await updateDoc(docRef, { approved: true });
      // Optionally, you can update state or provide feedback to the user
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleDecline = async (id: string) => {
    try {
      const docRef = doc(FIRESTORE_DB, "recyclingRequests", id);
      await updateDoc(docRef, { declined: true });
      // Optionally, you can update state or provide feedback to the user
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };
  if (loading) {
    return (
      <div
        className="w-full relative h-full p-10 flex items-center justify-center text-white font-bold text-3xl"
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

  return (
    <div
      className="w-screen relative h-full p-10 flex flex-col xl:h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-2xl font-bold mb-4 text-white">Recycling Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2">{request.name}</h2>
            <p className="text-gray-600 mb-2">{request.email}</p>
            <p className="text-gray-600 mb-2">{request.shoeType}</p>
            <p className="text-gray-600 mb-4">{request.address}</p>
            <div className="flex space-x-4">
              {!request.approved && !request.declined && (
                <>
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(request.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                  >
                    Decline
                  </button>
                </>
              )}
              {request.approved && (
                <span className="text-green-500 font-semibold">Approved</span>
              )}
              {request.declined && (
                <span className="text-red-500 font-semibold">Declined</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
