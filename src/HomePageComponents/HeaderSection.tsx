import React from "react";
import Link from "next/link";

function HeaderSection() {
  return (
    <div
      className="w-full h-[600px] p-14 md:p-8 gap-4 flex flex-col justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://wallpapers.com/images/hd/cactus-jack-travis-scott-nike-jordans-on-wood-xf2mfuw45cv065i3.jpg)`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-white text-5xl mb-4">
        Love the Planet <br /> we walk on
      </h1>
      <p className="text-2xl text-white mb-6">
        Step into Style: Discover Your Perfect Pair Today!
      </p>
      <div className="flex space-x-4">
        <Link href={"/Men"}>
          {" "}
          <button className="bg-white transition-all text-black py-2 px-4 rounded-md hover:bg-black hover:text-white">
            Shop Men
          </button>
        </Link>
        <Link href={"/Women"}>
          <button className="bg-white transition-all text-black py-2 px-4 rounded-md hover:bg-black hover:text-white">
            Shop Women
          </button>
        </Link>
        <Link href={"/Kids"}>
          <button className="bg-white transition-all text-black py-2 px-4 rounded-md hover:bg-black hover:text-white">
            Shop Kid's
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HeaderSection;
