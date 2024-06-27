import React from "react";

function Recycle() {
  return (
    <div className="flex flex-row gap-10 flex-wrap items-center justify-evenly p-10 bg-[#F1F1EF] m-10">
      <div className="flex flex-col gap-16">
        <p className=" text-gray-400 xl:w-[600px]">
          Eshoe Company is dedicated to sustainable practices, including the
          recycling of shoes. We believe in minimizing waste and maximizing
          resources by refurbishing and repurposing footwear. Join us in our
          commitment to a greener future through responsible shoe recycling.
          Together, let's make every step count towards a sustainable world
        </p>
        <div className="flex flex-row justify-center flex-wrap gap-10 xl:justify-normal">
          <img
            src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-3.svg"
            alt=""
          />
          <img
            src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-2.svg"
            alt=""
          />
          <img
            src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-1.svg"
            alt=""
            
          /> 
        </div>
      </div>
      <img
        src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-recycled-circle-iamge.jpg"
        alt=""
        className="rounded-[50%] border-2 border-black border-dotted"
      />
    </div>
  );
}

export default Recycle;
