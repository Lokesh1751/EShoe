import React from "react";
import Link from "next/link";

function HeaderSection() {
  return (
    <div className="w-full h-[600px] relative flex flex-col justify-center bg-cover bg-center">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://cdn.pixabay.com/video/2017/08/10/11284-229221013_tiny.mp4"
        autoPlay
        loop
        muted
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content */}
      <div className="relative z-10 p-14 md:p-8 gap-4">
        <h1 className="text-white text-5xl mb-4">
          Love the Planet <br /> we walk on
        </h1>
        <p className="text-2xl text-white mb-6">
          Step into Style: Discover Your Perfect Pair Today!
        </p>
        <div className="flex space-x-4">
          <Link href="/Men">
            <button className="bg-white transition-all text-black py-2 px-4 rounded-md hover:bg-black hover:text-white">
              Shop Men
            </button>
          </Link>
          <Link href="/Women">
            <button className="bg-white transition-all text-black py-2 px-4 rounded-md hover:bg-black hover:text-white">
              Shop Women
            </button>
          </Link>
          <Link href="/Kids">
            <button className="bg-white transition-all text-black py-2 px-4 rounded-md hover:bg-black hover:text-white">
              Shop Kid's
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
