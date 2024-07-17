"use client";
import React, { useState, useContext, useEffect } from "react";
import { FaShoppingCart, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebase.config";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { getDocs, collection } from "firebase/firestore";
import { useDebounce } from "@/debounce/Debounce";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shoename, setShoename] = useState("");
  const [items, setItems] = useState<Shoe[]>([]);
  const cont = useContext(UserContext);

  interface Shoe {
    id: string;
    name: string;
    url: string;
    price: string;
    desc: string;
    url2: string;
    url3: string;
  }

  if (!cont) {
    return null;
  }

  const { user, setUser, cartItems, wishlist } = cont;

  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      alert("Logged out successfully.");
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "items"));
        const fetchedItems: Shoe[] = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() } as Shoe);
        });
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };
    fetchItems();
  }, []);

  const debouncedShoename = useDebounce(shoename, 500);
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(debouncedShoename.toLowerCase())
  );

  return (
    <div className="relative flex flex-col p-4 sm:flex-row sm:justify-between sm:p-3 xl:flex-row xl:justify-between xl:p-4">
      <div className="flex flex-row justify-between items-center w-full cursor-pointer sm:w-auto xl:w-auto">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-2xl xl:text-4xl">EShoe</h1>
            <img
              src="https://img.freepik.com/premium-photo/single-continuous-line-drawing-safety-hiking-boots_804788-5097.jpg"
              className="w-12 h-12 sm:w-16 sm:h-20 xl:w-16 xl:h-20"
              alt="Eshoe logo"
            />
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:ml-10 xl:ml-10">
          <input
            type="text"
            placeholder="Search shoe..."
            className="border border-gray-200 mr-2 xl:w-[600px] p-2 sm:p-3 xl:p-4 outline-gray-500 rounded-full"
            onChange={(e) => setShoename(e.target.value)}
          />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-500 focus:outline-none sm:hidden xl:hidden"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col space-y-6 sm:space-y-0 sm:space-x-10 sm:flex sm:flex-row items-center w-full sm:w-auto mt-4 sm:mt-0 xl:space-y-0 xl:space-x-10 xl:flex xl:flex-row xl:w-auto xl:mt-0`}
      >
        <div className="flex items-center flex-col gap-5 cursor-pointer sm:flex-row sm:gap-12 xl:flex-row xl:gap-12">
          <Link href="/Men">
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Men
            </span>
          </Link>
          <Link href="/Women">
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Women
            </span>
          </Link>
          <Link href="/Kids">
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Kids
            </span>
          </Link>
        </div>
        {user ? (
          <div
            className="flex items-center space-x-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl">
              {user.email.slice(0, 1).toUpperCase()}
            </div>
            <button
              onClick={handleSignOut}
              className="text-gray-500 cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <p
            className="text-gray-500 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Link href="/Login">Login</Link>
          </p>
        )}
        <p
          className="text-gray-500 cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          <Link href="/FeedBacks">FeedBacks</Link>
        </p>
        <Link href={user ? "/Wishlist" : "/Login"}>
          <div className="relative">
            <p className="flex items-center gap-1 text-gray-500 rounded-full cursor-pointer">
              <FaHeart size={24} />
              {wishlist.length > 0 && user && (
                <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              )}
            </p>
          </div>
        </Link>
        <Link href={user ? "/Cart" : "/Login"}>
          <div className="relative">
            <p className="flex items-center gap-1 text-gray-500 rounded-full cursor-pointer">
              <FaShoppingCart size={24} />
              {cartItems.length > 0 && user && (
                <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </p>
          </div>
        </Link>
      </div>

      {shoename && (
        <div className="absolute top-full left-0 bg-white border border-gray-200  p-4 shadow-lg w-full z-50 ">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Link
                href={`Itemdetails/${item.id}`}
                key={item.id}
                className="block text-black py-2 hover:bg-gray-100 rounded"
              >
                {item.name}
              </Link>
            ))
          ) : (
            <div className="text-center text-xl">No Results Found!!</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
