"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FIRESTORE_DB } from "../../firebase.config";
import { doc, getDoc,updateDoc } from "firebase/firestore";

interface UserContextType {
  loggedIn: boolean;
  loading: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: ()=> void
}

export const AdminContext = createContext<UserContextType | undefined>(
  undefined
);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router=useRouter();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const docRef = doc(FIRESTORE_DB, "admincred", "admincred");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { loggedIn } = docSnap.data();
          setLoggedIn(loggedIn);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
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
      router.push("/")
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  return (
    <AdminContext.Provider
      value={{ loggedIn, loading, setLoggedIn, setLoading,handleLogout }}
    >
      {children}
    </AdminContext.Provider>
  );
};
