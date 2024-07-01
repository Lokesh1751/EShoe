import React from "react";

function Process() {
  return (
    <div className="flex flex-col bg-[#F1F1EF] xl:m-10">
      <div className="flex flex-col items-center p-10 gap-10">
        <h1 className="text-3xl font-bold text-center">
          See how your shoes are made
        </h1>
        <p className="text-xl text-gray-400 text-center max-w-4xl">
          Each pair of shoes starts its journey in our design studio, where our
          team of experienced designers meticulously plans every detail. From
          selecting the finest eco-friendly materials to ensuring ergonomic
          comfort, every step is taken with you in mind. Our skilled artisans
          then bring these designs to life, combining traditional craftsmanship
          with modern techniques to create footwear that not only looks great
          but also stands the test of time. By prioritizing quality and
          sustainability, we aim to reduce waste and promote a greener future.
          Join us in celebrating the art of shoemaking, where innovation meets
          tradition, and style meets conscience.
        </p>
        <div className="flex flex-wrap items-center">
          <div className="flex flex-col items-center w-64">
            <p className="text-[#F7B64E] text-2xl">01.</p>
            <h1 className="text-2xl font-semibold">Pet canvas</h1>
            <p className="text-lg text-gray-400 text-center">
              Morbi eget bibendum sit adipiscing morbi ac nisl vitae maecenas
              nulla cursus.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-64 gap-2">
            <p className="text-[#F7B64E] text-2xl">02.</p>
            <h1 className="text-2xl font-semibold ml-14">
              Eco-friendly materials
            </h1>
            <p className="text-lg text-gray-400 text-center">
              Sed vulputate egestas ligula vitae vestibulum purus venenatis.
            </p>
          </div>
          <img
            src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-how-shoes-are-made-image.png"
            alt=""
            className="w-[200px] ml-10 xl:ml-0"
          />
          <div className="flex flex-col items-center w-64">
            <p className="text-[#F7B64E] text-2xl">03.</p>
            <h1 className="text-2xl font-semibold ml-14">
              Artisan craftsmanship
            </h1>
            <p className="text-lg text-gray-400 text-center">
              Nulla suscipit orci nec nulla ullamcorper laoreet mollis sapien.
            </p>
          </div>
          <div className="flex flex-col items-center w-64">
            <p className="text-[#F7B64E] text-2xl">04.</p>
            <h1 className="text-2xl font-semibold ml-14">
              Sustainable packaging
            </h1>
            <p className="text-lg text-gray-400 text-center">
              Integer at lacinia risus. Morbi at ex nulla. Duis vitae.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Process;
