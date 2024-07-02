"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebase.config";
import ShoeCard from "../../components/ShoeCard";

interface Shoe {
  id: string;
  name: string;
  url: string;
  price: string;
  gender: string;
  [key: string]: any;
  sizes: string;
  category: string;
}

function Kids() {
  const [shoes, setShoes] = useState<Shoe[]>([]);

  useEffect(() => {
    const userref = collection(FIRESTORE_DB, "items");
    const subs = onSnapshot(userref, (snapshot) => {
      const shoes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Shoe[]; // Type assertion
      setShoes(shoes.filter((item) => item.gender === "Kids"));
    });

    // Clean up subscription on unmount
    return () => subs();
  }, []);

  return (
    <div
      className="p-10 w-screen flex flex-col items-center justify-center "
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white"> Kid's Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
        {shoes.map((shoe) => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
}

export default Kids;
