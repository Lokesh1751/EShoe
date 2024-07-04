import React from "react";
import Link from "next/link";

function PosterSection() {
  return (
    <div className="flex gap-10 flex-wrap justify-center">
      <div
        className="w-full h-[500px] m-3  p-14 md:p-8 gap-4 flex flex-col justify-center items-center bg-cover bg-center rounded-xl xl:w-[40%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://ph-test-11.slatic.net/p/e7842887055e31d08a72248dfc74a9e3.jpg)`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-white text-3xl">Men</h1>
        <Link href={"/Men"}>
          {" "}
          <h1 className="text-white text-l border-white border-2 p-3 w-[150px] rounded-lg transition-all text-center cursor-pointer hover:bg-white hover:text-black ">
            Shop Men
          </h1>
        </Link>
      </div>
      <div
        className="w-full h-[500px] m-3  p-14 md:p-8 gap-4 flex flex-col justify-center items-center bg-cover bg-center rounded-xl xl:w-[40%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://img.ltwebstatic.com/images3_pi/2023/11/04/cd/169911196364e17da87ae54602a0fc8048f801f7d0_thumbnail_720x.webp)`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-white text-3xl">Women</h1>
        <Link href={"/Women"}>
          {" "}
          <h1 className="text-white text-l border-white border-2 rounded-lg transition-all p-3 w-[150px] text-center cursor-pointer hover:bg-white hover:text-black">
            Shop Women
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default PosterSection;
