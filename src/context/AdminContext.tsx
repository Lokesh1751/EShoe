"use client"
import React, { createContext, useState, useEffect } from "react";
import { FIRESTORE_DB } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

interface UserContextType {
  loggedIn: boolean;
  loading: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminContext = createContext<UserContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <AdminContext.Provider value={{ loggedIn, loading, setLoggedIn, setLoading }}>
      {children}
    </AdminContext.Provider>
  );
};
