import React from "react";

function AboutUs() {
  return (
    <div className="flex flex-col p-4 xl:flex-row xl:space-x-20">
      <img
        src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-home-about-image.jpg"
        alt="About Us"
        className="w-full"
      />
      <div className="flex flex-col space-y-4 mt-4 justify-center">
        <h1 className="text-[#F7B64E] text-xl sm:text-2xl">About us</h1>
        <p className="text-2xl sm:text-3xl font-semibold">
          Selected materials designed for comfort and sustainability
        </p>
        <p className="text-sm sm:text-base">
          At our core, we believe in selecting materials that offer both comfort
          and sustainability. Our journey begins with the careful selection of
          eco-friendly fabrics that not only feel great against your skin but
          also minimize our environmental footprint. We work closely with
          suppliers who share our values, ensuring that every step of the
          production process is aligned with our commitment to ethical and
          sustainable practices. Our designs are crafted with precision and
          care, blending timeless aesthetics with innovative techniques. We
          prioritize quality over quantity, ensuring that each piece is not only
          stylish but also durable and long-lasting. Our goal is to create
          products that you can cherish for years to come, reducing the need for
          frequent replacements and thereby contributing to a more sustainable
          world. We believe that fashion should not come at the cost of our
          planet. By choosing materials that are renewable, biodegradable, and
          recycled, we aim to reduce waste and promote a circular economy. Each
          item is thoughtfully designed to provide maximum comfort and
          functionality, making it easy for you to make sustainable choices
          without compromising on style or quality. Join us in our mission to
          create a more sustainable future. With every step you take, you are
          not only choosing comfort and style but also making a positive impact
          on the environment. Together, we can walk towards a greener, more
          sustainable world, one step at a time.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
