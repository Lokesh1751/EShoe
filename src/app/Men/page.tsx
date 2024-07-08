"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebase.config";
import ShoeCard from "../../HomePageComponents/ShoeCard";
import Link from "next/link";

interface Shoe {
  id: string;
  name: string;
  url: string;
  price: string;
  gender: string;
  sizes: string;
  [key: string]: any;
  category: string;
}

function Men() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [boots, setBoots] = useState<Shoe[]>([]);
  const [sneakers, setSneakers] = useState<Shoe[]>([]);
  const [casual, setCasual] = useState<Shoe[]>([]);
  const [athletic, setAthletic] = useState<Shoe[]>([]);
  const [cat, setCat] = useState<Shoe[]>(shoes);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true); // New loading state

  useEffect(() => {
    const userref = collection(FIRESTORE_DB, "items");
    const subs = onSnapshot(userref, (snapshot) => {
      const shoes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Shoe[]; // Type assertion

      // Filter and set state for each category and gender
      setShoes(shoes.filter((item) => item.gender === "Men"));
      setBoots(
        shoes.filter(
          (item) => item.category === "Boots" && item.gender === "Men"
        )
      );
      setCasual(
        shoes.filter(
          (item) => item.category === "Casual" && item.gender === "Men"
        )
      );
      setSneakers(
        shoes.filter(
          (item) => item.category === "Sneakers" && item.gender === "Men"
        )
      );
      setAthletic(
        shoes.filter(
          (item) => item.category === "Athletic" && item.gender === "Men"
        )
      );
      setCat(shoes.filter((item) => item.gender === "Men"));

      setLoading(false); // Set loading to false when data is fetched
    });

    // Clean up subscription on unmount
    return () => subs();
  }, []);

  const handleCategoryClick = (category: string, shoes: Shoe[]) => {
    setCat(shoes); // Update the displayed shoes for the selected category
    setActiveCategory(category); // Update the active category state
  };

  return (
    <div>
      <div
        className="p-10 w-screen flex flex-col items-center justify-center "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-3xl font-bold text-white flex-wrap">
          Men's Collection
        </h1>
        <div className="flex flex-wrap gap-4 sm:gap-14 mb-6 mt-4">
          <button
            className={`text-white border-white border p-2 rounded-lg w-20 ${
              activeCategory === "All" ? "bg-white text-black" : ""
            }`}
            style={activeCategory === "All" ? { color: "black" } : {}}
            onClick={() => handleCategoryClick("All", shoes)}
          >
            All
          </button>
          <button
            className={`text-white border-white border p-2 rounded-lg w-20 ${
              activeCategory === "Casual" ? "bg-white text-black" : ""
            }`}
            style={activeCategory === "Casual" ? { color: "black" } : {}}
            onClick={() => handleCategoryClick("Casual", casual)}
          >
            Casual
          </button>
          <button
            className={`text-white border-white border p-2 rounded-lg w-20 ${
              activeCategory === "Boots" ? "bg-white text-black" : ""
            }`}
            style={activeCategory === "Boots" ? { color: "black" } : {}}
            onClick={() => handleCategoryClick("Boots", boots)}
          >
            Boots
          </button>
          <button
            className={`text-white border-white border p-2 rounded-lg w-20 ${
              activeCategory === "Athletic" ? "bg-white text-black" : ""
            }`}
            style={activeCategory === "Athletic" ? { color: "black" } : {}}
            onClick={() => handleCategoryClick("Athletic", athletic)}
          >
            Athletic
          </button>
          <button
            className={`text-white border-white border p-2 rounded-lg w-22 ${
              activeCategory === "Sneakers" ? "bg-white text-black" : ""
            }`}
            style={activeCategory === "Sneakers" ? { color: "black" } : {}}
            onClick={() => handleCategoryClick("Sneakers", sneakers)}
          >
            Sneakers
          </button>
        </div>
        {loading ? (
          <div className="text-white text-2xl font-bold">Loading...</div> // Display loading indicator
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
            {cat.map((shoe) => (
              <Link href={`/Itemdetails/${shoe.id}`}>
                <ShoeCard key={shoe.id} shoe={shoe} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Men;
