"use client";
import React, { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebase.config";
import { useRouter } from "next/navigation";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rpass, setrPass] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showRPassword, setShowRPassword] = useState(false); // State to toggle repeat password visibility
  const router = useRouter();

  const adduser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (pass === rpass) {
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, pass);
        router.push("/Login");
      } else {
        alert("Passwords are not the same!");
      }
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle repeat password visibility
  const toggleRPasswordVisibility = () => {
    setShowRPassword(!showRPassword);
  };

  return (
    <div
      className="w-screen relative h-screen flex items-center justify-center"
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
      <form
        onSubmit={adduser}
        className="bg-gray-100 rounded-lg shadow-lg p-8 w-full max-w-sm"
      >
        <div className="flex items-center mb-4 ml-4 justify-center space-x-2">
          <h1 className="text-3xl">EShoe</h1>
          <img
            src="https://img.freepik.com/premium-photo/single-continuous-line-drawing-safety-hiking-boots_804788-5097.jpg"
            className="w-14 h-12"
            alt="Eshoe logo"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password type
            id="password"
            name="password"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            onChange={(e) => setPass(e.target.value)}
          />
          {pass && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
              ) : (
                <FaEye className="text-gray-400 hover:text-gray-600" />
              )}
            </button>
          )}
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor="rpassword"
            className="block text-gray-700 font-bold mb-2"
          >
            Repeat Password
          </label>
          <input
            type={showRPassword ? "text" : "password"} // Toggle between text and password type
            id="rpassword"
            name="rpassword"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Repeat your password"
            onChange={(e) => setrPass(e.target.value)}
          />
          {rpass && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 focus:outline-none"
              onClick={toggleRPasswordVisibility}
            >
              {showRPassword ? (
                <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
              ) : (
                <FaEye className="text-gray-400 hover:text-gray-600" />
              )}
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-purple-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          <button className="bg-gradient-to-r from-blue-400 to-purple-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-10">
            <Link href={"/Login"}>Sign In</Link>
          </button>
        </div>
        <button
          type="button"
          className="bg-gradient-to-r from-blue-400 to-purple-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6"
        >
          <Link href={"/AdminLogin"}>Admin Login 👉🏻</Link>
        </button>
      </form>
    </div>
  );
}

export default SignUp;
