"use client";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebase.config";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { UserContext } from "@/context/UserContext";
import { FaHeart } from "react-icons/fa";

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
}

function Page() {
  const params = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const cartContext = useContext(UserContext);

  if (!cartContext) {
    return null;
  }

  const {
    handleAddToCart,
    handleAddToWishlist,
    handleDeletewishlistitem,
    user,
  } = cartContext;

  const [isAdded, setIsAdded] = useState<boolean>(false);

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

            // Check if item is already in wishlist
            const wishlist = JSON.parse(
              localStorage.getItem("wishlist") || "[]"
            );
            setIsAdded(wishlist.includes(docSnap.id));
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
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  const addCart = (item: any, size: number | null) => {
    if (!size) {
      alert("Select size for shoe!!");
    } else {
      handleAddToCart(item, size);
      setSelectedSize(null);
    }
  };

  const handleaddwish = (item: any) => {
    handleAddToWishlist(item as any);
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    wishlist.push(item.id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsAdded(true);
  };

  const handledelwish = (itemId: string) => {
    handleDeletewishlistitem(itemId);
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const updatedWishlist = wishlist.filter((id: string) => id !== itemId);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsAdded(false);
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
        className="w-screen h-screen flex items-center justify-center mx-auto px-10 py-12"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-white text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!item) {
    return <div>No item found.</div>;
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
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
              onClick={handleNextImage}
            >
              <IoIosArrowForward size={24} />
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex gap-10">
              <h1 className="text-3xl text-white font-bold mb-4 underline">
                {item.name}
              </h1>
              <button
                className="text-white text-sm mb-4 w-[40px] h-[40px]"
                onClick={() =>
                  isAdded ? handledelwish(item.id) : handleaddwish(item)
                }
                style={{
                  color: user && isAdded ? "red" : "white",

                  borderRadius: "50%",
                }}
              >
                <FaHeart
                  style={{
                    fontSize: "30px",
                  }}
                />
              </button>
            </div>
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
                      className={`inline-block bg-gray-200 text-black rounded-full cursor-pointer px-3 py-1 text-sm font-semibold mr-2 mb-2 ${
                        selectedSize === size ? "bg-gray-950 text-white" : ""
                      }`}
                      onClick={() =>
                        setSelectedSize(selectedSize === size ? null : size)
                      }
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
                onClick={() => addCart(item as any, selectedSize)}
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
