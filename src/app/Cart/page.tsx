"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";
import useCoupons from "@/hook/Fetchcoupan"; // Adjust the path as necessary
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FIRESTORE_DB } from "../../../firebase.config"; // Adjust the path as necessary
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

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
  const [vis, setVis] = useState(false);
  const [addresspage, setAddressPage] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      const q = query(
        collection(FIRESTORE_DB, "addresses"),
        where("userEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      const addresses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAddresses(addresses);
    };

    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const handleApplyCoupon = () => {
    const normalizedCouponCode = couponCode.trim().toLowerCase();
    const coupon = coupons.find(
      (c) => c.coupancode.trim().toLowerCase() === normalizedCouponCode
    );

    if (coupon) {
      const minPrice = parseFloat(coupon.minprice);
      const discount = parseFloat(coupon.discount);

      if (tprice >= minPrice) {
        const discountedPrice = tprice - (tprice * discount) / 100;
        setDiscount(discount); // Apply discount
        settprice(discountedPrice);
        alert("Coupon applied successfully!");
      } else {
        alert(`Minimum price to apply this coupon is ₹${minPrice}`);
      }
    }
  };

  const handleApply = (coupon: string) => {
    setCouponCode(coupon);
    handleApplyCoupon();
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    settprice(tprice / (1 - discount / 100));
    setDiscount(0);
    alert("Coupon removed successfully!");
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = quantity;
    cartContext.setCartItems(newCartItems);
    const newTotalPrice = newCartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    settprice(newTotalPrice);
  };

  const handleAddAddress = async () => {
    if (newAddress.trim() !== "") {
      const docRef = await addDoc(collection(FIRESTORE_DB, "addresses"), {
        userEmail: user.email,
        address: newAddress,
      });
      setAddresses([
        ...addresses,
        { id: docRef.id, userEmail: user.email, address: newAddress },
      ]);
      setNewAddress("");
      alert("Address added successfully!");
    }
  };

  const handleRemoveAddress = async (id: string) => {
    await deleteDoc(doc(FIRESTORE_DB, "addresses", id));
    setAddresses(addresses.filter((address) => address.id !== id));
    if (
      selectedAddress &&
      addresses.find((address) => address.id === id)?.address ===
        selectedAddress
    ) {
      setSelectedAddress("");
    }
    alert("Address removed successfully!");
  };

  const handleSelectAddress = (address: string) => {
    if (selectedAddress === address) {
      setSelectedAddress("");
    } else {
      setSelectedAddress(address);
    }
  };

  const discountedPrice = tprice - (tprice * discount) / 100;

  return (
    <div className="cart-container relative max-w-6xl mx-auto p-4 ">
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
                    className="w-[200px] h-[200px] object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-2xl font-medium">{item.name}</h3>
                    <p className="text-gray-600 text-lg">
                      ₹{item.price * item.quantity}
                    </p>
                    <p>Size: {item.size}</p> {/* Display size here */}
                    <div className="flex gap-2 items-center">
                      <button
                        className="bg-gray-100 p-2 cursor-pointer"
                        onClick={() =>
                          handleQuantityChange(
                            index,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="bg-gray-100 p-2 cursor-pointer"
                        onClick={() =>
                          handleQuantityChange(index, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
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
              onClick={() => setAddressPage(!addresspage)}
            >
              Place Order
            </button>
            <button className="bg-green-600 p-2 rounded-xl text-white text-l cursor-pointer">
              Total Price: ₹{discountedPrice.toFixed(2)}
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-bold flex gap-4">
              Apply Coupon{" "}
              {!vis ? (
                <FaArrowDown
                  onClick={() => setVis(!vis)}
                  style={{
                    fontSize: "30px",
                    color: "black",
                    cursor: "pointer",
                    border: "1px solid black",
                    borderRadius: "50%",
                    padding: "4px",
                  }}
                />
              ) : (
                <FaArrowUp
                  onClick={() => setVis(!vis)}
                  style={{
                    fontSize: "30px",
                    color: "black",
                    cursor: "pointer",
                    border: "1px solid black",
                    borderRadius: "50%",
                    padding: "4px",
                  }}
                />
              )}
            </h3>
            <div
              className={`transition-all duration-500 ease-in-out ${
                vis ? "max-h-full opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="flex flex-col">
                <div className="flex items-center mt-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="border p-2 rounded-l-md"
                  />
                  <button
                    className="bg-green-600 p-2 text-white rounded-r-md"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </button>
                </div>
                <div className="flex flex-wrap mt-4">
                  {coupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="bg-gray-200 p-4 m-2 rounded cursor-pointer"
                      onClick={() => handleApply(coupon.coupancode)}
                    >
                      <h4 className="font-bold">{coupon.coupancode}</h4>
                      <p>Min Price: ₹{coupon.minprice}</p>
                      <p>Discount: {coupon.discount}%</p>
                    </div>
                  ))}
                </div>
              </div>
              {couponCode && (
                <div className="flex items-center mt-4">
                  <span className="mr-2">Applied Coupon: {couponCode}</span>
                  <button
                    className="bg-red-600 p-2 text-white rounded-md"
                    onClick={handleRemoveCoupon}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
          {addresspage && (
            <div className="bg-white p-4 absolute top-[100%] z-30  left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md w-full max-w-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4">Select Address</h2>
                <p
                  className="cursor-pointer"
                  onClick={() => setAddressPage(false)}
                >
                  <FaTimes />
                </p>
              </div>

              <ul>
                {addresses.map((address) => (
                  <li
                    key={address.id}
                    className="border-b border-gray-200 py-2"
                  >
                    <div className="flex items-center justify-between">
                      <span>{address.address}</span>
                      <div className="flex items-center gap-2">
                        <button
                          className={`p-2 rounded-md ${
                            selectedAddress === address.address
                              ? "bg-gray-600 text-white"
                              : "bg-gray-200"
                          }`}
                          onClick={() => handleSelectAddress(address.address)}
                        >
                          {selectedAddress === address.address
                            ? "Selected"
                            : "Select"}
                        </button>
                        <button
                          className="text-white bg-red-600 p-2 hover:text-gray-800 focus:outline-none"
                          onClick={() => handleRemoveAddress(address.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Add new address"
                  className="border p-2 w-full rounded-md"
                />
                <button
                  className="bg-green-600 p-2 text-white rounded-md mt-2 w-full"
                  onClick={handleAddAddress}
                >
                  Add Address
                </button>
              </div>
              <div className="mt-4">
                <button
                  className="bg-red-600 p-2 text-white rounded-md w-full"
                  onClick={() => {
                    if (selectedAddress) {
                      handleOrderPlace(selectedAddress);
                    } else {
                      alert("Please select an address!");
                    }
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Cart is empty</h2>
          <p>Start adding items to your cart now!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
