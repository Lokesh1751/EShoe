"use client";
import React, { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../../../firebase.config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";

function Page() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const docRef = doc(FIRESTORE_DB, "admincred", "admincred");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { loggedIn, username } = docSnap.data();
          setLoggedIn(loggedIn);
          setEmail(username);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false); // Set loading to false when done fetching
      }
    };

    fetchAdminStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const docRef = doc(FIRESTORE_DB, "admincred", "admincred");
      await updateDoc(docRef, {
        loggedIn: false,
      });
      setLoggedIn(false);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  if (loading) {
    return (
      <div
        className="text-white text-2xl w-screen h-screen p-10 flex items-center justify-center"
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
      className="relative w-screen h-screen p-10 flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {loggedIn ? (
        <div className="bg-white shadow-md rounded-lg p-10 flex flex-col items-center">
          <div className="text-2xl font-bold mb-4">Lokesh Kumar</div>
          <div className="text-gray-600 mb-4">{email}</div>
          <Link href={"/"}>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </Link>
        </div>
      ) : (
        <div className="text-white text-2xl">You are not logged in.</div>
      )}
    </div>
  );
}

export default Page;
