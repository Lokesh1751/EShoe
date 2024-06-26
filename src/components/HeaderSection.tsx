import React from 'react';

function HeaderSection() {
  return (
    <div
      className="w-full h-[600px] mr-4 p-14 md:p-8 gap-4 flex flex-col justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://t3.ftcdn.net/jpg/05/74/12/86/360_F_574128647_mO3OeZLdPObKYOxuWOtoAcqij8yMuDPM.jpg)`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-white text-5xl mb-4">Love the Planet <br /> we walk on</h1>
      <p className="text-2xl text-white mb-6">Step into Style: Discover Your Perfect Pair Today!</p>
      <div className="flex space-x-4">
        <button className="bg-white text-black py-2 px-4 rounded-md">Shop Men</button>
        <button className="bg-white text-black py-2 px-4 rounded-md">Shop Women</button>
      </div>
    </div>
  );
}

export default HeaderSection;
