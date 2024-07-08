"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebase.config";
import Main from "../../../HomePageComponents/Main";
import Footer from "@/HomePageComponents/Footer";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Item {
  id: string;
  name: string;
  url: string;
  url2: string;
  url3: string;
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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchItem = async () => {
      const itemId = Array.isArray(params.id) ? params.id[0] : params.id;
      if (itemId) {
        try {
          const docRef = doc(FIRESTORE_DB, "items", itemId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setItem({
              id: docSnap.id,
              name: data.name,
              url: data.url,
              url2: data.url2,
              url3: data.url3,
              price: data.price,
              sizes: data.sizes,
              gender: data.gender,
              category: data.category,
              desc: data.desc,
            });
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

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming there are three images (url, url2, url3)
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  if (loading) {
    return <div className="text-white text-2xl font-bold">Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-center items-center min-h-screen ">
        {item ? (
          <div className="w-full max-w-screen-xl mx-auto px-6">
            <div className="rounded-lg p-6">
              <h1 className="text-3xl text-white  font-bold text-center mb-4">
                {item.name}
              </h1>
              <div className="relative mb-4 flex items-center justify-center">
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                  onClick={handlePrevImage}
                >
                  <IoIosArrowBack size={24} />
                </button>
                <img
                  src={
                    currentImageIndex === 0
                      ? item.url
                      : currentImageIndex === 1
                      ? item.url2
                      : item.url3
                  }
                  className="w-full max-w-[800px] h-auto object-cover rounded-lg xl:h-[500px]"
                  alt={item.name}
                />
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                  onClick={handleNextImage}
                >
                  <IoIosArrowForward size={24} />
                </button>
              </div>
              <p className="text-red-600 text-2xl font-bold text-center my-4">
                Price: ₹{item.price}
              </p>
              <div className="border-t border-gray-300 pt-4">
                <p className="text-white mb-2">
                  <span className="font-semibold">Gender:</span> {item.gender}
                </p>
                <p className="text-white mb-2">
                  <span className="font-semibold">Sizes:</span> {item.sizes}
                </p>
                <p className="text-white mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {item.category}
                </p>
                <p className="text-white mb-2">
                  <span className="font-semibold">Description:</span>{" "}
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-black text-2xl font-bold">Item not found</p>
        )}
      </div>
    </div>
  );
}

export default Page;
