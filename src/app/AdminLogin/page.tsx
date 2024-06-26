"use client";
import Link from "next/link";
import { useState } from "react";

export default function Adlogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform your login validation here
    if (email === "lokesh@gmail.com" && pass === "sujalangi") {
      setLoggedIn(true); // Set loggedIn to true if login is successful
    } else {
      // Handle invalid login scenario (optional)
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-purple-600">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <Link
          type="button" // Use type="button" to prevent form submission
          href={loggedIn ? "/Admin" : "/"}
          className="w-full bg-gradient-to-r px-16 from-blue-400 to-purple-600 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg"
          onClick={handleLogin}
        >
          Login
        </Link>
      </form>
    </div>
  );
}
