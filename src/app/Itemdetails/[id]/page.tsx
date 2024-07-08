"use client";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebase.config";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CartContext } from "@/context/CartContext";

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
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { handleAddToCart } = cartContext;

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

  const getSizesArray = (sizesString: string) => {
    const [start, end] = sizesString.split("-").map(Number);
    const sizesArray = [];
    for (let i = start; i <= end; i++) {
      sizesArray.push(i);
    }
    return sizesArray;
  };

  if (loading) {
    return (
      <div
        className="text-white text-3xl font-bold text-center p-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!item) {
    return <div>No item found.</div>; // Handle case where item is null
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-full max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 rounded-lg p-6 shadow-lg">
          <div className="relative mb-4 w-full md:w-1/2">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
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
              className="w-full h-[600px] object-cover rounded-lg"
              alt={item.name}
            />
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2  p-2 rounded-full"
              onClick={handleNextImage}
            >
              <IoIosArrowForward size={24} />
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl text-white font-bold mb-4 underline">
              {item.name}
            </h1>
            <p className="text-green-600 text-3xl font-bold mb-4">
              Price: ₹{item.price}
            </p>
            <div className="border-t border-gray-300 pt-4">
              <p className="text-white mb-2 text-2xl font-bold">
                {item.gender}
              </p>
              <p className="text-white mb-2 text-lg">
                <span className="font-semibold">Sizes Available: </span>
                {item.sizes &&
                  getSizesArray(item.sizes).map((size) => (
                    <span
                      key={size}
                      className="inline-block cursor-pointer bg-gray-200 text-black rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                    >
                      {size}
                    </span>
                  ))}
              </p>
              <p className="text-white mb-2 text-lg">
                <span className="font-semibold">Category:</span> {item.category}
              </p>
              <p className="text-white mb-2 text-xl">
                <span className="font-semibold">Description:</span> {item.desc}
              </p>
              <button
                onClick={() => handleAddToCart(item as any)}
                className="mt-4 w-full bg-gradient-to-r from-gray-400 to-gray-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
