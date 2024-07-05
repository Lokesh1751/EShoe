"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebase.config";

interface Item {
  id: string;
  name: string;
  url: string;
  price: string;
  sizes: string;
  gender: string;
  category: string;
  desc: string;
  // Add other fields that your items have
}

function Page() {
  const params = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItem = async () => {
      const itemId = Array.isArray(params.id) ? params.id[0] : params.id;
      if (itemId) {
        try {
          const docRef = doc(FIRESTORE_DB, "items", itemId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setItem({ id: docSnap.id, ...docSnap.data() } as Item);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      }
      setLoading(false);
    };

    fetchItem();
  }, [params.id]);

  if (loading) {
    return <div className="text-black text-2xl font-bold">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      {item ? (
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <div className=" rounded-lg p-6">
            <h1 className="text-3xl font-bold text-center mb-4">{item.name}</h1>
            <div className="flex justify-center">
              <img
                src={item.url}
                className="w-screen h-auto max-h-[80vh] object-cover rounded-lg "
                alt={item.name}
              />
            </div>
            <p className="text-red-600 text-2xl font-bold text-center my-4">
              Price: ₹{item.price}
            </p>
            <div className="border-t border-gray-300 pt-4">
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Gender:</span> {item.gender}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Sizes:</span> {item.sizes}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Category:</span> {item.category}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Description:</span> The Nike
                Kids Air Max 90 brings a classic design to the next generation.
                With a retro look, it features a durable leather and synthetic
                upper. The iconic Max Air unit provides superior cushioning for
                all-day comfort. Its rubber outsole offers excellent traction
                and grip on various surfaces. Breathable mesh panels ensure
                ventilation, keeping feet cool and dry. Bold colorways and
                striking details make it a standout in any wardrobe. Padded
                collar and tongue provide additional ankle support and comfort.
                Lightweight foam midsole delivers soft, responsive strides with
                every step. Flex grooves in the sole promote natural movement
                and flexibility. Perfect for active kids, blending style and
                functionality seamlessly.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-black text-2xl font-bold">Item not found</p>
      )}
    </div>
  );
}

export default Page;
