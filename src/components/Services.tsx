import React from 'react'
import { FaLock, FaShippingFast, FaUndo } from 'react-icons/fa';

function Services() {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center p-8 gap-8">
    <div className="flex flex-row items-center gap-5 text-center">
      <FaLock className="text-3xl text-gray-800 mb-4" />
      <h2 className="text-xl font-semibold">Secure Payment</h2>
    </div>
    <div className="flex flex-row items-center gap-5 text-center">
      <FaShippingFast className="text-3xl text-gray-800 mb-4" />
      <h2 className="text-xl font-semibold">Express Shipping</h2>
    </div>
    <div className="flex flex-row items-center gap-5 text-center">
      <FaUndo className="text-3xl text-gray-800 mb-4" />
      <h2 className="text-xl font-semibold">Free Return</h2>
    </div>
  </div>
  )
}

export default Services
