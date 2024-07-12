"use client";
import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";
import useCoupons from "@/hook/Fetchcoupan"; // Adjust the path as necessary

const Cart: React.FC = () => {
  const cartContext = useContext(UserContext);

  if (!cartContext) {
    return <div>Loading...</div>;
  }

  const {
    cartItems,
    handleDeleteCartItem,
    handleClearCart,
    handleOrderPlace,
    tprice,
    settprice,
    user,
  } = cartContext;

  const { coupons, loading } = useCoupons(user);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  console.log(coupons);

  const handleApplyCoupon = () => {
    const normalizedCouponCode = couponCode.trim().toLowerCase();
    const coupon = coupons.find(
      (c) => c.coupancode.trim().toLowerCase() === normalizedCouponCode
    );

    console.log("Available Coupons:", coupons); // Log available coupons
    console.log("Coupon being applied:", coupon); // Log the selected coupon

    if (coupon) {
      const minPrice = parseFloat(coupon.minprice);
      const discount = parseFloat(coupon.discount);

      if (tprice >= minPrice) {
        setDiscount(discount); // Apply discount
        settprice(discountedPrice);
        alert("Coupon applied successfully!");
      } else {
        alert(`Minimum price to apply this coupon is ₹${minPrice}`);
      }
    } else {
      alert("Invalid coupon code!");
    }
  };

  const discountedPrice = tprice - (tprice * discount) / 100;

  return (
    <div className="cart-container max-w-6xl mx-auto p-4">
      {cartItems.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li
                key={item.id + index}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                  onClick={() => handleDeleteCartItem(index)}
                >
                  <FaTrash className="text-lg" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-5 mt-6">
            <button
              className="bg-red-600 p-2 rounded-xl text-white text-l cursor-pointer"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button
              className="bg-red-600 p-2 rounded-xl text-white text-l cursor-pointer"
              onClick={handleOrderPlace}
            >
              Place Order
            </button>
            <button className="bg-green-600 p-2 rounded-xl text-white text-l cursor-pointer">
              Total Price: ₹{discountedPrice.toFixed(2)}
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Apply Coupon</h3>
            <div className="flex items-center">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="border border-gray-300 rounded-md p-2 mr-2"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-blue-600 text-white rounded-md px-4 py-2"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/026/442/original/empty-shopping-cart-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
            alt=""
            className="w-[500px] h-[500px]"
          />
          <p className="text-3xl font-bold">Cart is Empty!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
