"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons
import Link from "next/link";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebase.config";
import { AdminContext } from "@/context/AdminContext";

export default function Adlogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();
  const adminContext = useContext(AdminContext);
  if (!adminContext) {
    return;
  }
  const { loggedIn, setLoggedIn } = adminContext;

  const nextChar = (char: string) => {
    const code = char.charCodeAt(0);

    // Handle lowercase letters
    if (char >= "a" && char <= "z") {
      return String.fromCharCode(((code - 97 + 1 + 26) % 26) + 97);
    }

    // Handle uppercase letters
    if (char >= "A" && char <= "Z") {
      return String.fromCharCode(((code - 65 + 1 + 26) % 26) + 65);
    }

    // Non-alphabetic characters remain unchanged
    return char;
  };

  const converthashedpass = (password: string) => {
    let newpass = "";
    for (let i = 0; i < password.length; i++) {
      newpass += nextChar(password[i]);
    }
    return newpass;
  };

  const handleLogin = async () => {
    try {
      // Query Firestore for admin credentials
      const adminCredRef = collection(FIRESTORE_DB, "admincred");
      const q = query(adminCredRef, where("username", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const adminData = querySnapshot.docs[0].data();
        const passwordCorrect = converthashedpass(pass) === adminData.password;

        if (passwordCorrect) {
          setLoggedIn(true); // Set loggedIn to true if login is successful

          // Update Firestore to mark admin as logged in
          const adminDocRef = doc(
            FIRESTORE_DB,
            "admincred",
            querySnapshot.docs[0].id
          );
          await updateDoc(adminDocRef, {
            loggedIn: true,
          });

          router.push("/Admin"); // Navigate to Admin page if logged in
        } else {
          alert("Invalid email or password");
        }
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="w-screen relative p-10 h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link href={"/"}>
        <div className="absolute top-10 left-10">
          <FaHome size={34} color="white" />
        </div>
      </Link>
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center mb-4 ml-4 justify-center space-x-2">
          <h1 className="text-3xl">EShoe</h1>
          <img
            src="https://img.freepik.com/premium-photo/singlex-continuous-line-drawing-safety-hiking-boots_804788-5097.jpg"
            className="w-14 h-12"
            alt="Eshoe logo"
          />
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Admin Dashboard
        </h1>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-8 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
            id="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
            placeholder="Enter your password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {pass && (
            <div
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-400" />
              ) : (
                <FaEye className="text-gray-400" />
              )}
            </div>
          )}
        </div>
        <button
          type="button" // Use type="button" to prevent form submission
          className="w-full bg-gradient-to-r px-16 from-blue-400 to-purple-600 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
}
