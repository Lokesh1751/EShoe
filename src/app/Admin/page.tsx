"use client";
import React, { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";
import Nav from "@/Admincomponents/Nav";
import Link from "next/link";

const Admin: React.FC = () => {
  const adminContext = useContext(AdminContext);

  if (!adminContext) return <div>Loading...</div>;

  const { loggedIn, loading } = adminContext;

  if (loading) {
    return (
      <div
        className="w-screen h-screen items-center justify-center   text-white font-bold text-3xl"
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

  return (
    <div
      className="w-screen h-screen p-6 flex justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {loggedIn ? (
        <div className="flex flex-col gap-5">
          <h1 className="text-white text-5xl text-center font-bold">Admin DashBoard</h1>
          <Nav />
          {/* <Form /> */}
        </div>
      ) : (
        <div className="text-center flex items-center justify-center flex-col w-screen h-screen">
          <p className="text-xl font-semibold mb-4 text-white">
            You are not logged in.
          </p>
          <Link href="/AdminLogin">
            <p className="text-white transition duration-300 ease-in-out inline-block cursor-pointer">
              Login as Admin
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Admin;
