import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebase.config";
import ShoeCard from "./ShoeCard";

interface Shoe {
  id: string;
  name: string;
  url: string;
  price: string;
  gender: string;
  [key: string]: any;
  category: string;
  sizes: string;
}

function NewArrivels() {
  const [shoes, setShoes] = useState<Shoe[]>([]);

  useEffect(() => {
    const userref = collection(FIRESTORE_DB, "items");
    const subs = onSnapshot(userref, (snapshot) => {
      const shoes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Shoe[]; // Type assertion
      setShoes(shoes.splice(0, 6));
    });

    // Clean up subscription on unmount
    return () => subs();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">New Arrivals</h1>

      <div className="grid grid-cols-1 justify-evenly sm:grid-cols-2 md:grid-cols-3 gap-6">
        {shoes.map((shoe) => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
}

export default NewArrivels;
