// pages/admin/index.tsx
"use client";
import React, { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";
import SideNav from "@/Admincomponents/SideNav";
import Form from "@/Admincomponents/Form";
import Link from "next/link";

const Admin: React.FC = () => {
  const adminContext = useContext(AdminContext);

  if (!adminContext) {
    return <div>Loading...</div>;
  }

  const { loggedIn, loading } = adminContext;

  if (loading) {
    return (
      <div
        className="w-full h-full flex  relative items-center justify-center text-white font-bold text-3xl"
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
      className=" w-full h-full p-2  flex flex-col items-center justify-center xl:p-0"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {loggedIn ? (
        <React.Fragment>
          <SideNav />
          <Form />
        </React.Fragment>
      ) : (
        <div className="text-center flex items-center justify-center flex-col w-screen h-screen">
          <p className="text-xl font-semibold mb-4 text-white">
            You are not logged in.
          </p>
          <Link href={"/AdminLogin"}>
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
