import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="max-w-xl mx-auto mt-12 p-12 bg-zinc-900 rounded-2xl border border-white/5 shadow-2xl text-center">
      <h2 className="text-4xl mb-5 text-green-500 font-bold">Payment Successful!</h2>
      <p className="text-zinc-400 text-lg mb-10">
        Thank you for your order. We have securely received your payment and will process your shipment shortly.
      </p>
      <Link 
        to="/shop" 
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
